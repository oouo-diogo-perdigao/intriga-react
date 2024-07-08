const webpack = require("webpack"); // basico
const path = require("path"); // basico
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin - Exporta html
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { spawn } = require("child_process");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin"); //Importar o manifest.json
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, "public");
const defaultOut = path.join(__dirname, "./build");

module.exports = (env, argv) => {
	console.clear();
	console.log(argv);

	const config = {
		context: path.resolve(__dirname, "src"),
		entry: defaultInclude + "/index.js",
		target: "node",

		//Entrada de dados de um arquivo react
		output: {
			//saida configurada para o diretório 'dist'
			path: defaultOut,
			//Saida do transpilador dos arquivos js e jsx, etc configuradas para 'index.js'
			filename: "index.js",
			//permite especificar o caminho base para todos os ativos em seu aplicativo
			publicPath: "/",
		},

		plugins: [
			//Configurações do plugin de empacotamento de html. Este plugin compila os arquivos html copiando-os para o projeto final
			new HtmlWebpackPlugin({
				filename: "index.html",
				favicon: defaultInclude + "/img/favicon.ico",
				template: defaultInclude + "/index.html", // Destino do arquivo
			}),
			new WebpackManifestPlugin({
				fileName: "manifest.json",
				basePath: defaultInclude,
				seed: require(path.join(defaultInclude, "/manifest.json")),
			}),
			new NodePolyfillPlugin({
				additionalAliases: ["process", "punycode"],
			}),
		],

		module: {
			rules: [
				{
					// Configurações para compilar o react
					test: /.jsx?$/, // Vamos pegar todos os arquivos que terminam em jsx
					exclude: /(node_modules|bower_components)/, // Exclui diretórios de serem compilados
					include: defaultInclude,
					use: [
						{
							loader: "babel-loader",
							options: {
								presets: [
									// Presets de formatação de código
									// "@babel/preset-env" preset mais atual para babel es5, usado para suporte em todos os navegadores
									"@babel/preset-env",
									[
										"@babel/preset-react",
										{
											runtime: "automatic",
										},
									],
								],
							},
						},
					],
				},
				{
					//file-loader exporta imagens para dentro da pasta img
					test: /\.(jpe?g|ico|png|gif|svg)$/i,
					use: [{ loader: "file-loader?name=img/[name].[ext]" }],
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						"style-loader", // inject CSS to page
						"css-loader", // translates CSS into CommonJS modules
						"sass-loader", //, // compiles Sass to CSS
					],
				},
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.(eot|ttf|woff|woff2)$/,
					type: "asset/resource",
					generator: {
						filename: "fonts/[name][ext][query]",
					},
					// use: [{ //antiga versao referente a fonte, nao funcionou
					// 	loader: 'url-loader',
					// 	options: { limit: 30000, name: '[name]-[hash].[ext]' },
					// }],
				},
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
			],
		},

		//Resolvendo conflitos de prioridades - ainda entendendo essa linha
		resolve: {
			extensions: [".js", ".jsx", ".ts", ".tsx"],
		},
	};

	if (argv.target.indexOf("web") >= 0) {
		config.target = "web";
		console.log("target = web");
	} else if (argv.target.indexOf("electron-renderer") >= 0) {
		config.target = "electron-renderer";
		console.log("target = electron-renderer");
	} else {
		console.error(
			`target = '${argv?.target}' defina: --target=web, --target=electron-renderer`
		);
	}

	if (argv.mode == "development") {
		//usando development como excessao para o webpack
		config.output.path += "/web-develop";
		config.devtool = "cheap-source-map"; //config.devtool = 'source-map'; devtool: 'inline-source-map',
		config.mode = "develop";

		config.plugins.concat([
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify("develop"),
			}),
		]);

		config.devServer = {
			//redirecionará 404s para /index.html
			historyApiFallback: true,
			//localizar breackpoints
			// writeToDisk: true,
		};
		config.stats = {
			colors: true,
			children: false,
			chunks: false,
			modules: false,
		};
	} else if (argv.mode === "production") {
		if (argv.target.indexOf("electron-renderer") >= 0) {
			config.output.path += "/electron";
		} else {
			config.output.path += "/web-production";
		}

		config.mode = "production";

		config.plugins.concat([
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: "bundle.css",
				chunkFilename: "[id].css",
			}),
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify("production"),
			}),
		]);

		config.devServer = {
			hot: true, // Atualiza projeto quando se adiciona ou remove modulos https://webpack.js.org/concepts/hot-module-replacement/
			//hotOnly: true, // Mesma coisa, mas não atualiza pagina
			host: "0.0.0.0", // Mesmo que localhost
			contentBase: path.resolve(__dirname, "dist"),
			stats: {
				colors: true,
				chunks: false,
				children: false,
			},

			before() {
				spawn("electron", ["."], {
					shell: true,
					env: process.env,
					stdio: "inherit",
				})
					.on("close", (code) => process.exit(0))
					.on("error", (spawnError) => console.error(spawnError));
			},
		};
	} else {
		console.error(
			`mode = '${argv?.mode}' defina: --mode=development, --mode=production ou --mode=electron`
		);
	}

	return config;
};

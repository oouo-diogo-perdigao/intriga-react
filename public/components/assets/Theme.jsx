import { useMemo } from "react";
//Não tenho certeza se precisa
import "@fontsource/roboto";
import "@fontsource/roboto-slab";

import {
	ThemeProvider,
	responsiveFontSizes,
	CssBaseline,
	createTheme,
	useMediaQuery,
} from "@mui/material";
import "../../scss/index.scss";

import { useSelector } from "react-redux";

/**
 * Cria tema em volta do aplicativo
 * Para emular esquema de cores preferidos use no chrome Ctrl+Shift+P => Emulate CSS prefers-color-scheme: light/dark
 * @param {React} props Pega os elementos filhos
 * @return {React.Component}
 */
export function Theme(props) {
	const selector = useSelector((state) => state.colorModeChange);

	let prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	if (selector.status != "auto") {
		prefersDarkMode = selector.status == "dark";
	}

	//adiciona ou remove a classe .light-mode do html
	document.documentElement.classList.toggle("light-mode", !prefersDarkMode);

	//todo aways dark mode
	// prefersDarkMode = 'dark';

	// Obtendo o valor de uma variável CSS
	const genericStyle = getComputedStyle(document.documentElement);

	const myTheme = {
		palette: {
			mode: prefersDarkMode ? "dark" : "light",
			primary: {
				light: genericStyle.getPropertyValue("--primaryLight"),
				main: genericStyle.getPropertyValue("--primary"),
				dark: genericStyle.getPropertyValue("--primaryDark"),
			},
			secondary: {
				light: genericStyle.getPropertyValue("--secondaryLight"),
				main: genericStyle.getPropertyValue("--secondary"),
				dark: genericStyle.getPropertyValue("--secondaryDark"),
			},
			success: {
				light: genericStyle.getPropertyValue("--successLight"),
				main: genericStyle.getPropertyValue("--success"),
				dark: genericStyle.getPropertyValue("--successDark"),
			},
			info: {
				light: genericStyle.getPropertyValue("--infoLight"),
				main: genericStyle.getPropertyValue("--info"),
				dark: genericStyle.getPropertyValue("--infoDark"),
			},
			warning: {
				light: genericStyle.getPropertyValue("--warningLight"),
				main: genericStyle.getPropertyValue("--warning"),
				dark: genericStyle.getPropertyValue("--warningDark"),
			},
			error: {
				light: genericStyle.getPropertyValue("--dangerLight"),
				main: genericStyle.getPropertyValue("--danger"),
				dark: genericStyle.getPropertyValue("--dangerDark"),
			},
			background: {
				//invenção minha ground
				ground: genericStyle.getPropertyValue("--backgroundGround"),
				default: genericStyle.getPropertyValue("--background"),
				paper: genericStyle.getPropertyValue("--backgroundPaper"),
			},
		},
		typography: {
			fontFamily: "Roboto,serif",
			h1: { fontFamily: "Roboto Slab,sans-serif", fontWeight: 600 },
			h2: { fontFamily: "Roboto Slab,sans-serif", fontWeight: 600 },
			h3: { fontFamily: "Roboto Slab,sans-serif", fontWeight: 500 },
			h4: { fontFamily: "Roboto Slab,sans-serif", fontWeight: 500 },
			h5: { fontFamily: "Roboto Slab,sans-serif", fontWeight: 400 },
			h6: { fontFamily: "Roboto Slab,sans-serif", fontWeight: 400 },
			subtitle1: { fontFamily: "Roboto Slab,sans-serif" },
			subtitle2: { fontFamily: "Roboto Slab,sans-serif" },
			// body1: { fontFamily: 'Roboto,serif' },
			// body2: { fontFamily: 'Roboto,serif' },
			// button: { fontFamily: 'Roboto,serif' },
			// caption: { fontFamily: 'Roboto Slab,serif' },
			overline: { fontFamily: "Roboto Slab,serif", textTransform: "" },
		},
		props: {
			MuiTypography: {
				variantMapping: {
					h2: "h1",
					h3: "h2",
					h4: "h3",
					h5: "h4",
					h6: "h5",
					// subtitle1: 'subtitle1',
					// subtitle2: 'subtitle2',
					// body1: 'body1',
					// body2: 'body2'
				},
			},
		},
	};

	const theme = useMemo(
		() => responsiveFontSizes(createTheme(myTheme), [prefersDarkMode]),
		[prefersDarkMode]
	);

	if (window.location.hostname == "localhost") {
		window.theme = theme;
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{props.children}
		</ThemeProvider>
	);
}

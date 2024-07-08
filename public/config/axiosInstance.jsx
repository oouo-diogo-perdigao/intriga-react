import axios from 'axios';
import { urls } from '../config/Urls';
export const axiosExternal = axios;

/**
 * Gerenciador de pedidos
 */
class AxiosInstance {
	/**
	 *
	 */
	constructor() {
		this.baseUrl = urls.beServer;
		this.authorization = localStorage.getItem('token');
	}
	/**
	 * Adiciona autorização ao pedido
	 * @param {*} config
	 * @return {Object}
	 */
	_getHeaders(config = {}) {
		if (!this.authorization) {
			this.authorization = localStorage.getItem('token');
		}
		config.headers = { Authorization: this.authorization, ...config.headers };
		return config;
	}
	/**
	 *
	 * @param {*} config
	 * @return {Promise}
	 */
	request(config = {}) {
		return axios.request(this._getHeaders(config));
	}
	/**
	 *
	 * @param {*} url
	 * @param {*} config
	 * @return {Promise}
	 */
	get(url, config = {}) {
		return axios.get(this.baseUrl + url, this._getHeaders(config));
	}
	/**
	 *
	 * @param {*} url
	 * @param {*} config
	 * @return {Promise}
	 */
	delete(url, config = {}) {
		return axios.delete(this.baseUrl + url, this._getHeaders(config));
	}
	/**
	 *
	 * @param {*} url
	 * @param {*} config
	 * @return {Promise}
	 */
	head(url, config = {}) {
		return axios.head(this.baseUrl + url, this._getHeaders(config));
	}
	/**
	 *
	 * @param {*} url
	 * @param {*} config
	 * @return {Promise}
	 */
	options(url, config = {}) {
		return axios.options(this.baseUrl + url, this._getHeaders(config));
	}
	/**
	 *
	 * @param {*} url
	 * @param {*} data
	 * @param {*} config
	 * @return {Promise}
	 */
	post(url, data = {}, config = {}) {
		return axios.post(this.baseUrl + url, data, this._getHeaders(config));
	}
	/**
	 *
	 * @param {*} url
	 * @param {*} data
	 * @param {*} config
	 * @return {Promise}
	 */
	put(url, data = {}, config = {}) {
		return axios.put(this.baseUrl + url, data, this._getHeaders(config));
	}
	/**
	 *
	 * @param {*} url
	 * @param {*} data
	 * @param {*} config
	 * @return {Promise}
	 */
	patch(url, data = {}, config = {}) {
		return axios.patch(this.baseUrl + url, data, this._getHeaders(config));
	}
}
export default new AxiosInstance();

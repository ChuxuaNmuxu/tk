import qs from 'qs';
import {isEmpty} from 'lodash'

const api = {
    pathResolve: (url) => `http://10.0.0.123:7001/${url}`,
    
    fetch: function (url, params = {}, method = 'GET', type = '') {
        let options = {
            method: method,
        };

        if (method === 'PUT') {
            options.headers = {
                'Content-Type': 'application/json'
            }
        }

        if (type === 'json') {
            options.body = JSON.stringify(params);
        } else if (method !== 'GET') {
            options.body = qs.stringify(params);
        }
        return fetch(url, options)
            .then(res => res.text())
            .then(text => text ? JSON.parse(text) : {})
            .catch((error) => {
                // TODO：处理来自本promise的错误
                throw new Error(error);
            });
    },

    get: function (url, params = {}) {
        let cacheUrl = url;
        if (!isEmpty(params)) {
            cacheUrl = url + (/\?/.test(url) ? '&' : '?') + qs.stringify(params)
        }
        return this.fetch(cacheUrl);
    },

    post: function (url, params, type = '') {
        return this.fetch(url, params, 'POST', type);
    },

    put: function (url, params, type = 'json') {
        return this.fetch(url, params, 'PUT', type);
    },
};

export default api;

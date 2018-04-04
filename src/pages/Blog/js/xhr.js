'use strict';

/**
 * Basic GET XMLHttpRequest function using Promise
 * @param {string} url - The URL of the POST request
 */
function get(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        console.log('Opening GET request...');

        xhr.open("GET", url);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log(`GET request to ${url} success.`);
                    resolve(xhr.response);
                } else {
                    console.log(`GET request to ${url} error. Status = ${xhr.status}.`);
                    console.log(`xhr.responseType = ${xhr.responseType}`);
                    console.log(`xhr.response = ${xhr.response}`);
                    reject(xhr.response);
                }
            }
        };

        xhr.send();
    })
}

/**
 * Basic POST XMLHttpRequest function using Promise
 * @param {string} url - The URL of the POST request
 * @param {string} query - The query string of the POST request
 * @param {object} [options] - The options available for the POST request
 */
function post(url, query, {token_WS_auth = ''} = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        console.log('Opening POST request...');

        xhr.open("POST", url);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // Bearer Authorization: used when storing token in WebStorage
        if (token_WS_auth !== '') {
            xhr.setRequestHeader('Authorization', `Bearer ${token_WS_auth}`);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log(`POST request to ${url} success.`);
                    resolve(xhr.response);
                } else {
                    console.log(`POST request to ${url} error. Status = ${xhr.status}.`);
                    console.log(`xhr.responseType = ${xhr.responseType}`);
                    console.log(`xhr.response = ${xhr.response}`);
                    reject(xhr.response);
                }
            }
        };

        xhr.send(query);
    })
}

export {
    get, post
};
/**
 * Basic POST XMLHttpRequest function using Promise
 * @param {string} url - The URL of the POST request
 * @param {string} query - The query string of the POST request
 */
function post(url, query) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log(`POST request to ${url} success.`);
                    resolve(xhr);
                } else {
                    console.log(`POST request to ${url} error. Status = ${xhr.status}.`);
                    reject(xhr);
                }
            }
        };
        xhr.send(query);
    })
}

export function postCheckEmDuplication(em) {
    const url = 'login/api/checkemduplication';  // POST route
    const query = `em=${em}`;  // Data to be POSTed

    return new Promise((resolve, reject) => {
        post(url, query).then(
            // Promise fulfilled (POST request initialised & sent)
            (xhr) => {
                console.log(`POST request to check em duplication success.`);
                resolve(xhr.response);
            },
            // Promise rejected (POST request failed)
            (xhr) => {
                console.log(`POST request to check em duplication failed.`);
                reject(xhr.response);
            }
        )
    })
}

export function postNewUser(em, pw) {
    const url = 'login/api/createuser';  // POST route
    const query = `em=${em}&pw=${pw}`;  // Data to be POSTed

    return new Promise((resolve, reject) => {
        post(url, query).then(
            // Promise fulfilled (POST request initialised & sent)
            (xhr) => {
                console.log(`POST request for new user success.`);
                resolve(xhr.status);
            },
            // Promise rejected (POST request failed)
            (xhr) => {
                console.log(`POST request for new user failed.`);
                reject(xhr.status);
            }
        )
    })
}
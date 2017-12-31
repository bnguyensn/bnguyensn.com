const createUserURL = '/createuser';

export function postNewUser(em, pw) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.open("POST", createUserURL);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Note: please only respond with 200 if the new user has been created successfully
                    resolve(xhr.status);
                } else {
                    // TODO: Handle errors
                    reject(xhr.status)
                }
            }
        };

        xhr.send(`em=${em}&pw=${pw}`);
    });
}
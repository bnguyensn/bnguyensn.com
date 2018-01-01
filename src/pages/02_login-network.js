const createUserURL = 'login/createuser';  // POST route for creating a new user

export function postNewUser(em, pw) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", createUserURL);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('POST request opened successfully.');
                    resolve(xhr.status);
                } else {
                    console.log('POST request error.');
                    reject(xhr.status)
                }
            }
        };
        console.log('Sending POST request.');
        xhr.send(`em=${em}&pw=${pw}`);
    });
}
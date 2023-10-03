const baseUrl = 'https://localhost:7194/test/testauth';

export function createObligatoryFormApiCall(user) {
    console.log(user)
    const userString = JSON.stringify(user)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userString
    }
    const promise = fetch(url, options);
    return promise;
}
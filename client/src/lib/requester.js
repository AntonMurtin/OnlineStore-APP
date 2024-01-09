
const requester = async (method, url, data) => {
    const options = {};

    if (method !== 'Get') {
        options.headers = {
            'content-type': 'application/json',
        };
        options.body = JSON.stringify(data);
    }

    const auth = localStorage.getItem('auth');

    if (auth) {
        auth = JSON.parse(auth);
    }
    if (auth.accessToken) {
        options.headers = {
            ...options.headers,
            'X-Authorization': auth.accessToken,
        };
    }

    const response = await fetch(url, data);
    if (response.status === 204) {
        return {}
    }
    const result = await response.json();
    if (!response.ok) {
        throw result;
    }
    return result;
};

export const requestFactory = () => {
    return {
        get: requester.bind(null, 'GET'),
        post: requester.bind(null, 'POST'),
        put: requester.bind(null, 'PUT'),
        patch: requester.bind(null, 'PATCH'),
        delete: requester.bind(null, 'DELETE'),
    }
};
import { requestFactory } from "../lib/requester";

const url = 'http://localhost:3030/users';

export const authServiceFactoty = () => {
    const request = requestFactory();
    return {
        login: (data) => request.post(`${url}/login`, data),
        register: (data) => request.post(`${url}/register`, data),
        logout: () => request.get(`${url}/logout`),
    };
};
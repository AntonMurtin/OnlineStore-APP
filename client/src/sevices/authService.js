import { requestFactory } from "../lib/requester";

const url = 'http://localhost:5000/users';
// const url = `${import.meta.env.VITE_APP_TITLE}/users`;
//  const url = `https://long-rose-chicken-tam.cyclic.app/users`;


export const authServiceFactoty = (token) => {
    const request = requestFactory(token);
    return {
        login: (data) => request.post(`${url}/login`, data),
        register: (data) => request.post(`${url}/register`, data),
        logout: () => request.get(`${url}/logout`),
    };
};
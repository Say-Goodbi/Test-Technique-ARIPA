import axios from 'axios';

const API_PORT = process.env.REACT_APP_BACKEND_PORT;
const API_HOST = process.env.REACT_APP_BACKEND_HOST;
const API_URL = `http://${API_HOST}:${API_PORT}`;

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000, // ms
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function get(endpoint) {
    return api.get(endpoint).then(res => res.data);
}

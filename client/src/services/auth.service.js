import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})
export const loginUser = async (email, password) => {
    const response = await api.post('/api/auth/login', {email, password})
    return response.data
}
export const registerUser = async (username, email, password) => {
    const response = await api.post('/api/auth/register', {username, email, password})
    return response.data
}
export const logOutUser = async () => {
    const response = await api.post('/api/auth/logout')
    return response.data
}
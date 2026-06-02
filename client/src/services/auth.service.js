import axios from 'axios'

const api = axios.create({
    baseURL:'https://rchat-8p4d.onrender.com',
    withCredentials:true
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
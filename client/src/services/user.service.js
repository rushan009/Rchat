import axios from 'axios'

const api = axios.create({
    baseURL:'https://rchat-8p4d.onrender.com',
    withCredentials:true
})

export const searchUsers = async (query) => {
    const response = await api.get(`/api/users/search?query=${query}`)
    return response.data
}
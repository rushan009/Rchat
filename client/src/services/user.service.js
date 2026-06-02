import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:5000',
    withCredentials:true
})

export const searchUsers = async (query) => {
    const response = await api.get(`/api/users/search?query=${query}`)
    return response.data
}
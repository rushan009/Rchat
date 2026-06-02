import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export const searchUsers = async (query) => {
    const response = await api.get(`/api/users/search?query=${query}`)
    return response.data
}
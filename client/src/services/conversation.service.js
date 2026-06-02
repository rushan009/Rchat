import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:5000',
    withCredentials:true
})

export const getConversations = async () => {
    const response = await api.get('/api/conversations')
    return response.data
}

export const createConversation = async (participantOne) => {
    const response = await api.post('/api/conversations', {participantOne})
    return response.data
}


import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:5000',
    withCredentials:true
})

export const getMessage = async (conversation) => {
    const conversationId = conversation._id
    console.log(conversationId);
    
    const response = await api.get(`/api/conversations/${conversationId}/messages`)
    return response.data
}
export const sendMessage = async (conversation, content) => {
    const conversationId = conversation._id
    console.log(conversationId);
    
    const response = await api.post(`/api/conversations/${conversationId}/messages`, {content})
    return response.data
}


import { Server } from "socket.io"; 

const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: [
                'http://localhost:5173',
                'https://rchat-theta.vercel.app'
            ],
            methods: ['GET', 'POST'],
            credentials: true
        }
    })

    io.on('connection', (socket) => {
        console.log('user connected:', socket.id);
        
        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(`user joined room: ${roomId}`);
        })
        
        socket.on('disconnect', () => {
            console.log(`user disconnected`, socket.id);
        })
    })

    return io
}

export default initSocket
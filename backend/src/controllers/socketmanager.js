import { Server} from "socket.io" 

export const connectToSocketServer = (httpServer) => {
  const io = new Server(httpServer)
  
  return io
}

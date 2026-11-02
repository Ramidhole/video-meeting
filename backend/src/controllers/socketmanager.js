import { Server } from "socket.io"

let connections = {}
let messages = {}
let timeOnline = {}

export const connectToSocketServer = (httpServer) => {
  const io = new Server(httpServer)

  io.on("connection", (socket) => {
    socket.on("join-call", (path) => {
      if (connections[path] === undefined) {
        connections[path] = []
      }
      connections[path].push(socket.id)
      timeOnline[socket.id] = new Date()

      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          socket.id,
          connections[path],
        )
      }
      if (messages[path] !== undefined) {
        for (let a = 0; a < messages[path].length; a++) {
          io.to(socket.id).emit(
            "chat-message",
            messages[path][a]["socket-id-sender"],
          )
        }
      }
    })

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message)
    })

    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomkey, roomvalue]) => {
          if (!isFound && roomvalue.includes(socket.id)) {
            return [roomkey, true]
          }
          return [room, isFound]
        },
        ["", false],
      )
      if (found === true) {
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = []
        }

        messages[matchingRoom].push({
          sender: sender,
          data: data,
          "socket-id-sender": socket.id,
        })

        console.log("message", matchingRoom, ":", sender, data)

        connections[matchingRoom].forEach((elem) => {
          io.to(elem).emit("chat-message", data, sender, socket.id)
        })
      }
    })
  })
}

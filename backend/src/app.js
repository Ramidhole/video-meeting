import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { createServer } from "node:http"
import { Server } from "socket.io"
import dns from "node:dns"

dns.setServers(["8.8.8.8", "8.8.4.4"])

const app = express()

const httpServer = createServer(app)
const io = new Server(httpServer)

app.set("port", process.env.PORT || 7000)

app.get("/home", (req, res) => {
  return res.json({ hello: "hello" })
})

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://idholer2_db_user:U3Px6lXfCy0snGrx@cluster0.j93v1ic.mongodb.net/",
    )

    console.log("MongoDB connected")

    httpServer.listen(app.get("port"), () => {
      console.log("listening on port 7000")
    })
  } catch (error) {
    console.error("MongoDB connection error:", error)
  }
}

start()

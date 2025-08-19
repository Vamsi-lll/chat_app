const express=require('express') // for creating the server
const {Server}=require('socket.io') // for websocket connection
const http=require('http')  // for connecting the express to work with the socket
const { use } = require('react')

const app=express()  // creating an instance for the express 

const server=http.createServer(app)  // connecting the http with express
const io=new Server(server)   // connecting socket with the server

app.use(express.static('public'))  // for connecting the front end

server.listen(8080,()=>{     // to running the server
    console.log('your server is running at:http://localhost:8080')
})

const express=require('express')   //importing the express to make the server
const socket=require('socket.io')  // for websocket two way connection
const http=require('http')         // http module to bind the socket to the url

const app=express();  //creating an object for the object
const server=http.createServer(app) // connecting the server with the socket
const io= socket(server)  //connect the socket with the server


io.on('connect',()=>{                           // this will give the conformation when someone is connect
    console.log("cool we got some one in here")
})

io.on('disconnect',()=>{                       // this will give the conformation some one leave the app
    console.log('left the chat.....')
})



server.listen(8080,()=>{
    console.log("your server is running in : http://localhost:8080")   // running the server
})

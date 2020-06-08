const express = require('express')
const fs = require('fs')
const socket = require('socket.io')
const app = express()
const calculationList = './data/calculationList.json'
const portNumber = process.env.PORT || 4000

const server = app.listen(portNumber, () => {
    console.log('listening to port '+portNumber)
})

const io = socket(server)

io.sockets.on('connection', (socket) => {
    socket.on("send", calculation => {
        console.log(calculation, 'calculation123')
        io.sockets.emit("calculations", {
          text: calculation,
        });
    })
})


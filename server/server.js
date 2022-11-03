const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')
const User = require('./models/User')
const bcrypt = require('bcryptjs')

dotenv.config()
connectDB()
const app = express()

app.use(express.json())

const __dirname1 = path.resolve()

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/client/build')))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
    })
} else {
    app.get('/', (req, res) => {
        res.send("API is Running on development")
    })
}

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server Started on PORT ${PORT}`))

const io = require('socket.io')(server, {
    cors: {
        origin: "http://192.168.0.212:3000",
        methods: ['GET', 'POST']
    }
})

io.on("connection", (socket) => {
    socket.on('setup', (socketID) => {
        console.log(socketID)
        socket.join(socketID)
        socket.on('get-login', (name, password) => {
            let error = []
            if(!name) {
                error.push({ msg: 'No name' })
            } else if(name.length < 3) {
                error.push({ msg: 'Name too short' })
            } else if(!password) {
                error.push({ msg: 'No password' })
            } else if(password.length < 3) {
                error.push({ msg: 'Password too short' })
            }
            socket.emit('load-error', error)
            if(error.length <= 0) {
                User.findOne({ name })
                .then(user => {
                    if(user) {
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if(err) throw err
    
                            if(isMatch) {
                                socket.emit('load-game')
                            } else {
                                error.push({ msg: 'Password incorrect' })
                                socket.emit('load-error', error)
                            }
                        })
                    } else {
                        error.push({ msg: 'User does not exist' })
                        socket.emit('load-error', error)
                    }
                })
            }
        })
        socket.on('get-register', (name, password) => {
            let error = []
            if(!name) {
                error.push({ msg: 'No name' })
            } else if(name.length < 3) {
                error.push({ msg: 'Name too short' })
            } else if(!password) {
                error.push({ msg: 'No password' })
            } else if(password.length < 3) {
                error.push({ msg: 'Password too short' })
            }
            socket.emit('load-error', error)
            if(error.length <= 0) {
                User.findOne({ name })
                .then(user => {
                    if(user) {
                        error.push({ msg: 'User already registered' })
                        socket.emit('load-error', error)
                    } else {
                        let theUser
                        let position = Math.floor(Math.random() * 100) + 1
                        User.findOne({ position })
                        .then(userPosition => {
                            if(userPosition) theUser = userPosition.position
                            while (theUser) {
                                theUser = false
                                position = Math.floor(Math.random() * 100) + 1
                                User.findOne({ position })
                                .then(userPosition2 => {
                                    if(userPosition2) theUser = userPosition2.position
                                })
                            }

                            const newUser = new User({
                                name,
                                password,
                                position
                            })
                            
                            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if(err) throw err
                                newUser.password = hash
                                newUser.save()
                                .then (socket.emit('load-game'))
                                .catch(err => console.log(err))
                            }))
                        })
                    }
                })
            }
        })
        socket.on('get-resources', (name) => {
            User.find({})
            .then(allUsers => {
                User.findOne({ name })
                .then(user => {
                    if (user) {
                    socket.emit('load-resources', user, allUsers)
                    }
                })
            })
        })
        socket.on('get-build-something', (building, spaceNumber, name) => {
            User.findOne({ name })
                .then(user => {
                    if (user) {
                        console.log('pls')
                        user.buildings[spaceNumber].name = building
                        user.save()
                        socket.emit('load-resources', user)
                    }
                })
        })
    })
})
import React, { useContext } from 'react'
import io from 'socket.io-client'
import { v4 as uuidV4 } from 'uuid'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

const ENDPOINT = 'http://192.168.0.212:5000'
const socketID = 'NorthAmerica1234'
let socket = io(ENDPOINT)
socket.emit('setup', socketID)

export function SocketProvider() {
    return socket
}
import React, { useEffect, useState } from 'react'
import { SocketProvider } from '../contexts/SocketProvider';

export default function LoginRegister({ playerName }) {

  const socket = SocketProvider()

  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [errors, setErrors] = useState()

  useEffect(() => {

    socket.once("load-error", error => {
    if(error[0] == null) {
        setErrors('')
    } else {
        setErrors(error[0].msg)
    }
    })
  }, [socket, errors, name, password])
  
  useEffect(() => {
      socket.once("load-game", () => {
        playerName(name)
      })
  }, [socket, name, playerName])

  function handleLoginRegisterSubmit(e) {
    e.preventDefault()
    socket.emit('get-login', name, password)
  }

  function handleRegister() {
    socket.emit('get-register', name, password)
  }

  return (
    <div className='login-register-wrapper'>
      <h1 className='login-register-title'>
        <span className='login-C1'>C</span>
        <span className='login-o1'>o</span>
        <span className='login-n1'>n</span>
        <span className='login-q1'>q</span>
        <span className='login-u1'>u</span>
        <span className='login-e1'>e</span>
        <span className='login-r1'>r</span>
        <span className='login-o2'>o</span>
        <span className='login-r2'>r</span>
        <span className='login-K1'>K</span>
        <span className='login-i1'>i</span>
        <span className='login-n2'>n</span>
        <span className='login-g1'>g</span>
        <span className='login-s1'>s</span>
      </h1>
      <form onSubmit={handleLoginRegisterSubmit} className='login-register-form'>
        <table>
          <tbody>
            <tr>
              <td><input onChange={e => setName(e.target.value)} maxLength="20" type="text" className='login-register-input' placeholder='Name'></input></td>
            </tr>
            <tr>
              <td><input onChange={e => setPassword(e.target.value)} maxLength="20" type="password" className='login-register-input' placeholder='Password'></input></td>
            </tr>
            <tr>
              <th>
                <button type="submit" className='login-register-login-btn'>Login</button>
                <button type="button" onClick={handleRegister} className='login-register-register-btn'>Register</button>
              </th>
            </tr>
            <tr>
              <th>
                <p className="login-register-errors">{errors}</p>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}
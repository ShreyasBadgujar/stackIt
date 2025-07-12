import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Backend_URL } from '../config'

const Login = () => {
  const [state, setState] = useState('Login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    const endpoint = state === 'Sign Up' 
      ? `${Backend_URL}/api/auth/register`
      : `${Backend_URL}/api/auth/login`

    const payload =
      state === 'Sign Up'
        ? { username, email, password }
        : { email, password }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || 'Something went wrong')
        return
      }

      localStorage.setItem('token', data.token)
      alert(`${state} successful`)
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Failed to connect to server')
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center m-auto'>
      <div className='flex flex-col gap-3 m-auto bg-gray-900 p-8 min-w-[340px] sm:min-w-96 border rounded-xl bg-black-300 text-white text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to StackIt</p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>UserName</p>
            <input
              className='border bg-gray-700 border-zinc-300 rounded w-full p-2 mt-1'
              type='text'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            className='border border-zinc-300 bg-gray-700 rounded w-full p-2 mt-1'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            className='border border-zinc-300 bg-gray-700 rounded w-full p-2 mt-1'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button type='submit' className='bg-primary text-white w-full py-3 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className='text-primary underline cursor-pointer'
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className='text-primary underline cursor-pointer'
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login

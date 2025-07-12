import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Backend_URL } from '../config'
import { User, Mail, Lock, LogIn, UserPlus, Sparkles } from 'lucide-react'

const Login = () => {
  const [state, setState] = useState('Login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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
    <div className='min-h-[80vh] flex items-center m-auto bg-gradient-to-br from-[#0F1419] via-[#181F1F] to-[#0F1419] relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <form onSubmit={onSubmitHandler} className='w-full max-w-md mx-auto relative z-10'>
        <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className='relative overflow-hidden bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl'>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-50"></div>
            
            <div className="relative z-10">
              {/* Enhanced Header */}
              <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                  </h1>
                </div>
                <p className="text-gray-300 text-lg">
                  Please {state === 'Sign Up' ? 'sign up' : 'log in'} to StackIt
                </p>
              </div>

              <div className="space-y-6">
                {/* Username Input (Only for Sign Up) */}
                {state === 'Sign Up' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-purple-400" />
                      <label className="block text-white text-lg font-semibold">
                        Username
                      </label>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <input
                        className="relative w-full bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm text-white px-6 py-4 rounded-xl outline-none border border-gray-600/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg placeholder-gray-400"
                        type='text'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <label className="block text-white text-lg font-semibold">
                      Email
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <input
                      className="relative w-full bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm text-white px-6 py-4 rounded-xl outline-none border border-gray-600/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg placeholder-gray-400"
                      type='email'
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-green-400" />
                    <label className="block text-white text-lg font-semibold">
                      Password
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <input
                      className="relative w-full bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm text-white px-6 py-4 rounded-xl outline-none border border-gray-600/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg placeholder-gray-400"
                      type='password'
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {/* Enhanced Submit Button */}
                <button 
                  type='submit' 
                  className="group relative w-full bg-gradient-to-r from-[#6421FF] to-[#8B5CF6] hover:from-[#541ACC] hover:to-[#7C3AED] text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-purple-500/25 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {state === 'Sign Up' ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                  </span>
                </button>

                {/* Enhanced Toggle Links */}
                <div className="text-center pt-4">
                  {state === 'Sign Up' ? (
                    <p className="text-gray-300 text-lg">
                      Already have an account?{' '}
                      <span
                        onClick={() => setState('Login')}
                        className='text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text underline cursor-pointer hover:from-purple-300 hover:to-blue-300 transition-all duration-300 font-semibold'
                      >
                        Login here
                      </span>
                    </p>
                  ) : (
                    <p className="text-gray-300 text-lg">
                      Create a new account?{' '}
                      <span
                        onClick={() => setState('Sign Up')}
                        className='text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text underline cursor-pointer hover:from-purple-300 hover:to-blue-300 transition-all duration-300 font-semibold'
                      >
                        Click here
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
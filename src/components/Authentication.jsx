import React from 'react'
import {auth, provider} from '../firebase-config.js'
import { signInWithPopup } from 'firebase/auth'
import googlelogo from '../assets/googlelogo.webp'


import Cookies from 'universal-cookie'
const cookies = new Cookies()


function Authentication({setIsAuth}) {


    const signInWithGoogle = async() => {
      const result = await signInWithPopup(auth, provider)
      try {
        cookies.set('auth-token', result.user.refreshToken)
        setIsAuth(true)
      } catch (error) {
        console.log(error)
      }
      
    
    }

  return (
    <div className='flex justify-center items-center container mx-auto flex-col py-12 gap-6'>
      <p className='text-[24px] font-black text-blue-500'>Welcome To Real Time Chat Application</p>
      <p className='text-[20px]'>Sign In With Google To Continue</p>
      <button className='border-2 flex justify-center items-center rounded-2xl p-2 gap-1' onClick={signInWithGoogle}><img className='w-8' src={googlelogo} alt="" />Sign In With Google</button>
      <p className='w-[300px] text-center'>This is real time chat application made by @Kowy, check out my other projects on my <a className='underline' href="https://github.com/KowyXYZ">GitHub</a></p>
    </div>
  )
}

export default Authentication

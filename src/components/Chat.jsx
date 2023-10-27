import React, { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from '../firebase-config'


function Chat({room}) {

    const [newMessage, setNewMessage] = useState('')

    const messagesRef = collection(db, 'messages')

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const queryMessages = query(messagesRef, where('room', '==', room), orderBy("createdAt"))
      const unsuscribe  = onSnapshot(queryMessages, (snapshot) => {
        console.log(snapshot)
        let messages = []
        snapshot.forEach((doc) => {
            messages.push({...doc.data(), id: doc.id})
        })

        setMessages(messages)
      })

      return () => unsuscribe()
    }, [])
    

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(newMessage === '') {
            return
        }   

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        })

        setNewMessage('')
    }

  return (
    <div className='w-full py-2 px-2'>

    <div className='flex justify-center border-2 border-b-0 items-center bg-blue-500 py-8 font-black rounded-t-2xl text-[24px] container mx-auto'>
        <p>Welcome to: {room.toUpperCase()}</p>
    </div>

    <div className='border-2 border-t-0 text-[20px] p-2 font-medium container mx-auto flex justify-center items-start rounded-b-2xl flex-col'>
        {messages.map((message) => {
            return(
                <div key={message}>
                    <p className='w-[300px]'><span className='font-bold text-blue-500'>{message.user}:</span> {message.text}</p>
                </div>
            )
            
        })}
        
    </div>

      <form onSubmit={handleSubmit} className='container mx-auto flex justify-center items-center border-2 rounded-2xl mt-4'>
        <input placeholder='Type your message here...' onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className='rounded-l-2xl w-full p-4 ' maxlength="25"/>
        <button type='submit' className='p-4 w-[150px] rounded-r-2xl bg-blue-500 '>Send</button>
      </form>
    </div>
  )
}

export default Chat

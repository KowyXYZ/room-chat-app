import { BrowserRouter } from "react-router-dom";
import Authentication from "./components/Authentication";
import { useState, useRef } from "react";
import Cookies from 'universal-cookie'
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies()



function App() {

  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState('')

  const roomInputRef = useRef(null)

  const signUserOut = async() => {
    await signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom('')
  }

  if(!isAuth) {
    return (
      <BrowserRouter>
        <div className="w-full">
          <Authentication setIsAuth={setIsAuth}/>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <div>
      {room ? 

      <div>
        <Chat room={room}/>
      </div> 
      
      : 
      
      <div className="w-full py-12">
        <div className="container mx-auto flex justify-center items-center flex-col gap-4 ">
          <div className="flex flex-col text-center justify-center gap-2">
            <label className="text-[24px] font-semibold">Enter Room Name</label>
            <input type="text" placeholder="?" className="px-3 py-2 rounded-2xl w-96" ref={roomInputRef}/>
          </div>
        
          <button className="bg-blue-500 px-8 py-2 rounded-2xl text-[18px] font-bold" onClick={() => setRoom(roomInputRef.current.value)}>Enter</button>
        </div>
        
      </div>}
      <div className="flex justify-center items-center">
        <button className="bg-red-600 px-8 py-2 rounded-2xl mt-4" onClick={signUserOut}>Sign out</button>
      </div>
    </div>
  )

  
}

export default App;

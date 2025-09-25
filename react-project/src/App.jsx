import { useState,useEffect} from 'react'
import ChatInput from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import WelcomeMessage from './components/WelcomeMessage'
import './App.css'

function App(){
  const [chatMessages, setChatMessages] = 
  useState(JSON.parse(
    localStorage.getItem('messages')
  )||[]);
  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])

  
  return (
    <div className="app-container">
      <WelcomeMessage />
      <ChatMessages 
      chatMessages={chatMessages}
      isLoading={isLoading}
      />
      
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  )}

export default App

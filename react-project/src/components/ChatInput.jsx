import {Chatbot} from 'supersimpledev'
import { useState } from 'react'
import './ChatInput.css'

export default function ChatInput({chatMessages, setChatMessages,isLoading,setIsLoading}){ //component
  const [inputText, setInputText] = useState('');

  function saveInputText(event){
    setInputText(event.target.value);
  }
  async function sendMessage(){
    if (isLoading === false){
      const newChatMessages =[...chatMessages, {message:inputText, sender:'user', id: crypto.randomUUID()}]
      setChatMessages(newChatMessages)
      setInputText('')
      setIsLoading(true)
      const response = await Chatbot.getResponseAsync(inputText)
      setChatMessages([...newChatMessages, {message:response, sender:'robot', id: crypto.randomUUID()}])
      setIsLoading(false)
      
    }
  }
  function checkKey(event){
    if (event.key === 'Enter'){
      sendMessage()
    }
    if (event.key === 'Escape'){
      setInputText('');
    }
  }

  function clearMessages(){
    setChatMessages([])
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot"
        size="30" 
        onChange={saveInputText}
        value={inputText}
        onKeyDown={checkKey}
        className="chat-input"
      />
      <button 
        className='send-button' 
        onClick={sendMessage}
      >Send</button>
      <button
      className="clear-button"
      onClick={clearMessages}>
        Clear
      </button>
    </div>
  );
}
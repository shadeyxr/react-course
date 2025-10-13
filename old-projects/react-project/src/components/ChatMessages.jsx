import { useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import './ChatMessages.css'

export default function ChatMessages({chatMessages, isLoading}){
  const messageContainerRef = useRef(null)

  useEffect(()=>{
    const containerElem = messageContainerRef.current;
    if (containerElem){
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="message-container" ref={messageContainerRef}>
      {chatMessages.map((chatMessage)=>{
        return (
          <ChatMessage 
          message={chatMessage.message} 
          sender={chatMessage.sender}
          key={chatMessage.id}
          isLoading={isLoading}
          />
        )
      })}
    </div>
  )
}


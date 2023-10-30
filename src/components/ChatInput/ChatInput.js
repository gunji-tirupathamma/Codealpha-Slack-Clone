import React, { useState } from 'react'
import {db, addDoc, collection, serverTimestamp} from '../../firebase'

import { useStateValue } from '../StateProvider/StateProvider'
import './ChatInput.css'

function ChatInput({channelName, channelId, addMessageToState}) {
    const[input,setInput]=useState('')
    const [{user}]=useStateValue()   
    
    
    const sendMessage = async (e) => {
      e.preventDefault();

      if (input.trim() !== '') {
          try {
              const messageRef = collection(db, 'rooms', channelId, 'messages');

              await addDoc(messageRef, {
                  message: input,
                  timestamp: serverTimestamp(),
                  user: user.displayName,
                  userImage: user.photoURL,
              });

              setInput('');
              addMessageToState({
                  message: input,
                  timestamp: new Date(),
                  user: user.displayName,
                  userImage: user.photoURL,
              });
          } catch (error) {
              console.error('Error sending message:', error);
          }
      }
  }

  return (
    <div className='chatinput'>
        <form>
        <input 
            placeholder={channelName ? `Message #${channelName?.toLowerCase()}` : 'Type a message'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={sendMessage}>Send</button>
        </form>
    </div>
  )
}

export default ChatInput
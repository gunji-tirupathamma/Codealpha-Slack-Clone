import React from 'react'
import './Message.css'

function Message({message, timestamp, user, userImage}) {
    console.log("userImage:",userImage)
    console.log("user:",user)
    
    let messageTime = null;

    if (timestamp instanceof Date) {
        messageTime = timestamp;
    } else if (timestamp?.toDate instanceof Function) {
        messageTime = timestamp.toDate();
    } else if (typeof timestamp === 'number') {
        messageTime = new Date(timestamp);
    } else if (typeof timestamp === 'string') {
        messageTime = new Date(timestamp); // Adjust this based on your timestamp format
    }

  return (
    <div className='message'>
        <img src={userImage} alt="" />
        <div className='message-info'>
            <h4>{user}  {' '}        
              <span className='date'>
              {messageTime ? new Intl.DateTimeFormat('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        }).format(messageTime) : 'Invalid Timestamp'}
              </span>
            </h4>
            <p>{message}</p>
        </div>
    </div>
  )
}

export default Message
 
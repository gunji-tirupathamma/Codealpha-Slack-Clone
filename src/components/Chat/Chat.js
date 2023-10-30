import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {db, collection, getDocs} from '../../firebase'

import './Chat.css'
import Message from '../Message/Message';
import ChatInput from '../ChatInput/ChatInput';

function Chat() {

    const {roomId}=useParams();
    const [roomDetails,setRoomDetails]=useState(null)
    const [roomMessages, setRoomMessages]=useState([])

    useEffect(() => {
      const fetchRoomDetails = async () => {
        if (roomId) {
          try {
            const querySnapshot = await getDocs(collection(db, 'rooms'));
            querySnapshot.forEach(doc => {
              if (doc.id === roomId) {
                setRoomDetails(doc.data());
              }     
            });
    
            const messageRef = collection(db, 'rooms', roomId, 'messages');

            console.log("messagereference:", messageRef)

            const querySnapshotMessages = await getDocs(messageRef);
            const messages = querySnapshotMessages.docs.map(doc => doc.data());

            messages.sort((a, b) => a.timestamp - b.timestamp);
                    // Reverse the order of messages
            setRoomMessages([...messages]);
    
          } catch (error) {
            console.error('Error fetching room details:', error);
          }
        }
      };
    
      fetchRoomDetails();
    }, [roomId]);
    
    // This useEffect will run whenever roomDetails changes

    useEffect(() => {
      console.log("roomDetails:", roomDetails);
    }, [roomDetails, roomMessages]); 

    const addMessageToState = (message) => {
      setRoomMessages(prevMessages => [...prevMessages, message]);
  };

  return (
    <div className='chat'>
        
        <div className='chat-header'>
            <div className='header-left'>
                <h4 className='channel-name'> 
                  <strong>#{roomDetails?.name}</strong>
                  <StarBorderOutlinedIcon />
                </h4>
            </div>
            <div className='header-right'>
                <p>
                    <InfoOutlinedIcon />Details
                </p>
            </div>
        </div>
        <div className='chat-messages'>
              {roomMessages && roomMessages.map(({message, timestamp, user, userImage},messageId)=>
                <Message 
                    key={messageId}
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                />
              )}
        </div>
        <ChatInput channelName={roomDetails?.name} channelId={roomId} addMessageToState={addMessageToState}/>
    </div>
  )
}

export default Chat

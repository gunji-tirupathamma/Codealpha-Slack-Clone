import React from 'react'
import{db, collection,addDoc} from '../../firebase'
import { useNavigate } from 'react-router-dom';


import './SidebarOption.css'

function Sidebaroption({Icon, title, id, addChannelOption, setChannels}) {

  const navigate=useNavigate()

  const selectChannel=()=>{
    if(id){
      navigate(`/room/${id}`)
    }else{
      navigate(title)
    }
  }

  const addChannel = async () => {
    try {
      const channelName = prompt('Please enter the channel name');

      if (channelName) {
        const docRef = await addDoc(collection(db,'rooms'),{
          name: channelName,
        });

        const newChannelId = docRef.id;
        setChannels(prevChannels => [
          ...prevChannels,
          { id: newChannelId, name: channelName },
        ]);
      }
    } catch (error) {
      console.error("Error adding channel:", error);
    }
  }


  return (
    <div className='sidebar-option' onClick={addChannelOption ? addChannel : selectChannel}>
        {Icon && <Icon className="sidebar-option-icon"/>}
        {Icon ? (<h3>{title}</h3>
        ) : (<h3 className='channel'>
            <span className='channel-hash'>#</span> {title}
            </h3>
            ) }
    </div>
  )
}

export default Sidebaroption

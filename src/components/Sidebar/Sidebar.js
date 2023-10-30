import React,{useState, useEffect} from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import SidebarOption from '../SidebarOption/SidebarOption'
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import { db } from '../../firebase';
import { getDocs, collection } from 'firebase/firestore';


import './Sidebar.css'
import { useStateValue } from '../StateProvider/StateProvider';

function Sidebar() {

  const [channels, setChannels]=useState([])
  const [{user}] = useStateValue()

  useEffect(() => {
    console.log("useeffect triggered")
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'rooms'));
        setChannels(querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
        })));
    }
    fetchData();
  }, []);

  

  return (
    <div className='sidebar'>
        <div className='sidebar-head'>
            <div className='head-info'>
                <h2>Tirupathamma</h2>
                <h3>
                   <FiberManualRecordIcon /> 
                   {user?.displayName}
                </h3>
            </div>
            <CreateIcon />            
        </div>
        <SidebarOption Icon={InsertCommentIcon} title="Thread" />
        <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
        <SidebarOption Icon={DraftsIcon} title="Saved items" />
        <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
        <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
        <SidebarOption Icon={AppsIcon} title="Apps" />
        <SidebarOption Icon={FileCopyIcon} title="File browser" />
        <SidebarOption Icon={ExpandLessIcon} title="Show less" />
        <hr/>
        <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
        <hr/>
        <SidebarOption Icon={AddIcon} title="Add Channels" addChannelOption={true}  setChannels={setChannels}/>
        {channels.map(channel=>(
          <SidebarOption title={channel.name} id={channel.id} />
        ))}
    </div>
  )
}

export default Sidebar

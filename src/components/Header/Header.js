import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import './Header.css'
import { useStateValue } from '../StateProvider/StateProvider';

function Header() {
  const [{user}]=useStateValue()
  console.log("userName:",user.displayName)
  console.log("userName:",user.photoURL)
  return (
    <div className='header'>
      <div className='header-left'>
          <AccountCircleIcon className="header-avatar"  alt={user.displayName}  src={user.photoURL}/>
          <AccessTimeIcon />
      </div>  
      <div className='header-search'>
            <SearchIcon />
            <input type="text" placeholder='search'/>
      </div>
      <div className="header-right">
            <HelpOutlineIcon />
      </div>
      
    </div>
  )
}

export default Header

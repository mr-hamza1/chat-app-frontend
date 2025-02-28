import React, { lazy, Suspense, useState } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Backdrop,
  Avatar,
  Badge,
} from '@mui/material'

import { blue, Orange } from '../constants/color'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon, 
  Notifications as NotificationsIcon,
} from '@mui/icons-material' 
 
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../constants/congfig'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExists } from '../../redux/reducers/auth'
import toast from 'react-hot-toast'
import { setIsMobileMenu, setIsNewGroup, setIsNotification, setIsProfile, setIsSearch } from '../../redux/reducers/misc'
import { setNotificationCount} from '../../redux/reducers/chat'
import { useMyChatsQuery } from '../../redux/api/api'
import { useErrors } from '../../Hooks/hook'
import AvatarCard from '../shared/AvatarCard'
import { transformImage } from '../../Lib/features'


  

const SearchDialog = lazy(() => import('../speacific/Search'));
const GroupDialog = lazy(() => import('../speacific/NewGroup'));
const NotificationsDialog = lazy(() => import('../speacific/Notifications'));


const Header = () => {

   const dispatch = useDispatch();

    const { isSearch, isNotification, isNewGroup} = useSelector((state) => state.misc);
    const { notificationCount} = useSelector((state) => state.chat);
    const { user} = useSelector((state) => state.auth);
    
    const avatarProfile = user?.avatar?.url;

  

  const navigate = useNavigate();

  const isProfileHandler = () => dispatch(setIsProfile(true));
  const handleMobile = () =>  dispatch(setIsMobileMenu(true));
  const openSearchDialog = () => dispatch(setIsSearch(true));

   const notificationHandler = () => {
    dispatch(setIsNotification(true));
    dispatch(setNotificationCount());
   }

   
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
  }
  
  const navigateToGroup = () => navigate('/groups')

  const logoutHandler = async() => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true })
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  }


  return (
    <>
      <Box sx={{ flexGrow: 1, }} height={"4rem"}>
      <AppBar position="static" sx={{
        bgcolor: blue,
      }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{
            display: { xs: "none", sm: "block" }
          }}>
            Chat App
          </Typography>
        
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconBtn title="Menu" icon={<MenuIcon />} onclick={handleMobile} />
          </Box>

          
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box >
            <IconBtn title="Search" icon={<SearchIcon />} onclick={openSearchDialog} />
            <IconBtn title="New Group" icon={<AddIcon />} onclick={openNewGroup} />
            <IconBtn title="Notification" icon={<NotificationsIcon />} onclick={notificationHandler} value={notificationCount} />
            <IconBtn title="Manage Group" icon={<GroupIcon />} onclick={navigateToGroup} />
            <IconBtn title="Logout" icon={<LogoutIcon />} onclick={logoutHandler} />
            <Tooltip title= "Profile">
            <IconButton color="inherit" size="large" sx={{ display: { md : "none", lg: "none" } }} onClick={isProfileHandler} >
            <Avatar
              key={user._id}
              src={transformImage(avatarProfile)}
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                border: "2px solid  white",

              }}
            />
            </IconButton>
            </Tooltip>

          </Box>           
        </Toolbar>
      </AppBar>
    </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open/>}>
          <SearchDialog />
       </Suspense>
      )
      }
      
      {isNewGroup && (
        <Suspense fallback={<Backdrop open/>}>
          <GroupDialog />
       </Suspense>
      )
      }

      {isNotification && (
        <Suspense fallback={<Backdrop open/>}>
          <NotificationsDialog />
       </Suspense>
      )
      }
      
      
     
    </>
  );
};

const IconBtn = ({ title, icon, onclick , value}) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onclick}>
      {value ? <Badge color='error' badgeContent={value}>{icon}</Badge> :  icon}

      </IconButton>
    </Tooltip>
  ); 
};

export default Header;
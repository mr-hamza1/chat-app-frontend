import { Drawer, Grid, Skeleton } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useErrors, useSocketEvents } from '../../Hooks/hook'
import { useMyChatsQuery } from '../../redux/api/api.js'
import { setIsDeleteMenu, setIsMobileMenu, setIsProfile, setSelectDeleteChat } from '../../redux/reducers/misc.js'
import { getSocket } from '../../socket.jsx'
import Title from '../shared/Title'
import ChatList from '../speacific/ChatList'
import Profile from '../speacific/Profile'
import Header from './Header'
import {incrementNotification, setNewMessagesAlert} from  '../../redux/reducers/chat.js'
import { getOrSaveFromStroage } from '../../Lib/features.js'
import DeleteChatMenu from '../dialog/deleteChatMenu.jsx'
import { ONLINE_USERS, NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from '../constants/event.js'


const AppLayout = (WrappedComponent) => {
  return (props) => {

    const params = useParams();
    const chatId = params.chatId;
    const navigate = useNavigate();

    const socket = getSocket();

    const dispatch = useDispatch();

    const deleteMenuAnchor = useRef(null);

    const [onlineUsers, setOnlineUsers] = useState([]);


    const { isMobileMenu , isProfile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    
    const { data, isLoading, isError, error, refetch } = useMyChatsQuery("");
    
    useErrors([{ isError, error }]);

    useEffect(()=>{

      getOrSaveFromStroage({key: NEW_MESSAGE_ALERT, value: newMessagesAlert})

    },[newMessagesAlert])
    
    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true))
      dispatch(setSelectDeleteChat({chatId, groupChat}))
      deleteMenuAnchor.current = e.currentTarget
      e.preventDefault(); 
    }


    const newMessagesAlertListner = useCallback((data)=>{
     
      if(data.chatId === chatId)  return;

      dispatch(setNewMessagesAlert(data))

    },[chatId])

    const newRequestListner = useCallback(()=>{
      dispatch(incrementNotification())
    },[])

    const refetchListner = useCallback(()=>{
        refetch()
        navigate("/")

    },[refetch, navigate])

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);
   
 
    const eventHandlers = { 
       [NEW_MESSAGE_ALERT] : newMessagesAlertListner,
       [NEW_REQUEST] : newRequestListner,
       [REFETCH_CHATS] : refetchListner,
       [ONLINE_USERS] : onlineUsersListener,
      }

    useSocketEvents(socket , eventHandlers)


    const handleIsMobileClose = () => dispatch(setIsMobileMenu(false));
    const handleIsProfileClose = () => dispatch(setIsProfile(false));



    return (
      <>
        <Title />
        <Header />

        <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />

        {
              isLoading ? (<Skeleton />) : (
            <Drawer open={isProfile} onClose={handleIsProfileClose} 
            PaperProps={{
              sx: {
                backgroundColor: "#1e1e1e", // Ensures the inside paper also changes
                color: "white", // Adjust text color
                width: "60%",
              },
            }}

            >
              <Profile user={user} />
              </Drawer>
              )
            }

         {
              isLoading ? (<Skeleton />) : (
            <Drawer open={isMobileMenu} onClose={handleIsMobileClose}>
              <ChatList
                w="70vw"
                  chats={data?.chats}
                  chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
              </Drawer>
              )
            }
     

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid item sm={4} md={3} sx={{
            display: { xs: "none", sm: "block" }
          }}
            height={"100%"}
            overflow={'auto'}
          >
            {
              isLoading ? (<Skeleton />) : (
                <ChatList
                  chats={data?.chats}
                  chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}

            />

              )
            }
           
          </Grid>
                      
          <Grid item xs={12} sm={8} md={5} lg={6}
            height={"100%"}  >
            
            <WrappedComponent {...props}  chatId={chatId} user={user} />
            
          </Grid>
          <Grid item md={4} lg={3} sx={{
            display: { xs: "none", md: "block" },
            padding: "2rem",
            bgcolor: "rgba(0,0,0,0.8)",
          }}
            height={"100%"} bgcolor="primary.main">
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    ); 
  };
};
export { AppLayout }

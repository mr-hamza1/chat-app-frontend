import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import { IconButton, Skeleton, Stack } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { grayColor } from '../Components/constants/color'
import FileMenu from "../Components/dialog/FileMenu"
import { AppLayout } from '../Components/layout/AppLayout'
import { InputBox } from '../Components/styles/styledComponent'
import MessageComponent from '../Components/shared/MessageComponent'
import { getSocket } from '../socket'
import {ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING}  from '../Components/constants/event'
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api'
import { useErrors, useSocketEvents } from '../Hooks/hook'
import {useInfiniteScrollTop} from '6pp'
import { useDispatch } from 'react-redux'
import { setIsFileMenu } from '../redux/reducers/misc'
import { removeMessagesAlert } from '../redux/reducers/chat'
import {TypingLoader} from '../Components/layout/Loader'
import { useNavigate } from 'react-router-dom'


function Chat({chatId, user}) {


  const containerRef = useRef(null); 
  const bottomRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] =  useState("")
  const [messages, setMessages] =  useState([])
  const [page, setPage] =  useState(1)
  const [fileMenuAnchor, setFileMenuAnchor] =  useState(null)

  const [iAmTyping , setIAmTyping] = useState(false)
  const [userTyping , setUserTyping] = useState(false)
  const typingTimeOut = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })
  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) =>{
    setMessage(e.target.value)

    if(!iAmTyping){
      socket.emit(START_TYPING, { chatId, members})
      setIAmTyping(true) 
    }

    if(typingTimeOut.current)  clearTimeout(typingTimeOut.current)

   typingTimeOut.current =  setTimeout(()=>{
      socket.emit(STOP_TYPING, { chatId, members})
      setIAmTyping(false) 
    },[1000])
  }
  
  const oldMessagesChunk = useGetMessagesQuery({chatId, page})

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error},
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error},
  ];

  const {data: oldMessages, setData: setOldMessages} = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.messages
    )

  const handleFileMenu = (e)=>{
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget)
  }

  useEffect(()=>{

    socket.emit(CHAT_JOINED, { userId: user._id, members })
    
    dispatch(removeMessagesAlert(chatId))

    return ()=>{
      setMessages([])
      setMessage("")
      setOldMessages([])
      setPage(1)
      socket.emit(CHAT_LEAVED, { userId: user._id, members })

    }
  },[chatId])

  useEffect(()=>{

    if(bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior:'smooth' })

  },[messages])

  useEffect(()=>{
    if(chatDetails.isError) return navigate("/") 

  },[chatDetails.isError])


  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!message.trim("")) {
      return
    }
    /// emittign message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  }

  const newMessageListner = useCallback((data)=> {
    if(data.chatId !== chatId) return
    setMessages((prev) => [...prev, data.message])
  }, [chatId] )

  const startTypingListner = useCallback((data)=>{
    if(data.chatId !== chatId) return ;


    setUserTyping(true)

  },[chatId])
  
  const stopTypingListner = useCallback((data)=>{
    if(data.chatId !== chatId) return ;

    setUserTyping(false)

  },[chatId])

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandlers = { 
     [ALERT] : alertListener,
     [NEW_MESSAGE] : newMessageListner,
     [START_TYPING] : startTypingListner,
     [STOP_TYPING] : stopTypingListner,
    }

  useSocketEvents(socket , eventHandlers)

  useErrors(errors)

  const allMessages = [...oldMessages, ...messages]

  return chatDetails.isLoading? <Skeleton/> : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
       
        {
          allMessages.map((i) => (
            <MessageComponent message={i} user={user} key={i._id} /> 
          ))
        }

        {userTyping && <TypingLoader />}

       <div ref={bottomRef} />

      </Stack>
      
      <form style={{
        height:"10%"
      }}
        onSubmit={SubmitHandler}
      >

        <Stack  direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"}>
          <IconButton
            sx={{
              position: "absolute",
              rotate: "30deg",
              left: "1.5rem",
            }}
            onClick={handleFileMenu}
          >
            <AttachFileIcon/>
          </IconButton>
          <InputBox placeholder='Type message Here ...'
            value={message}
            onChange={messageOnChange}
          />
             
          <IconButton type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: "rgb(25, 118, 210 )",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                backgroundColor: "rgb(0, 61, 119)",
              },
            }}
          >
              <SendIcon />
          </IconButton>
           </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId}/>

    </Fragment>
  );
}

export default AppLayout(Chat)
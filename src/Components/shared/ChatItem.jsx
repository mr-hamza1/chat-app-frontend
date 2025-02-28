import React, { memo} from 'react'
import { Link } from '../styles/styledComponent'
import AvatarCard from './AvatarCard'
import { Box, Stack, Typography } from '@mui/material'
import {matBlack, Orange} from '../constants/color'
import { setIsMobileMenu } from '../../redux/reducers/misc'
import { useDispatch } from 'react-redux'
import { motion } from "framer-motion";

const ChatItem = ({
    avatar =[],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
}) => {

      const dispatch = useDispatch();

        const handleIsMobileClose = () => dispatch(setIsMobileMenu(false));
    
    return (
        <Link   sx={{padding:"0"}}
            to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
            <motion.div 
            initial={{ opacity: 0, y:"-100%" }}
            whileInView={{ opacity: 1, y:0 }}
            transition={{delay: index*0.1}}
            style={{
                display: "flex",
                alignItems: "center",
                padding: "1rem",
                position: "relative",
                backgroundColor: sameSender ? "rgb(51, 51, 51)" : "unset",
                gap: "1rem",
                color: sameSender ? "white" : "unset",
            }}
            onClick={handleIsMobileClose}
            >

                
                
                <AvatarCard avatar={avatar} />

                <Stack sx={{paddingLeft: "1rem"}}>
                    <Typography>{name}</Typography>
                    {newMessageAlert && (
                        <Typography>{newMessageAlert.count} new Message</Typography>
                    )}
                </Stack>


                {isOnline && (
                    <Box style={{
                        position: "absolute",
                        width: "10px",
                        height: "10px",
                        top: "50%",
                        right: "1rem",
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: "50%",
                        transform: "translateY(-50%)",
                    }} />
                )}
            </motion.div>
        </Link>
    );
};


export default memo(ChatItem);
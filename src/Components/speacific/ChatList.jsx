import React from 'react'
import {Stack} from '@mui/material'
import ChatItem from '../shared/ChatItem.jsx';

const ChatList = ({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [{
        chatId: "",
        count: 0,
    },
 ],
    handleDeleteChat,
}) => {
    return (
        <Stack width={w}>
            {
                chats?.map((data, index) => {
                
                    const { name, avatar, _id, groupChat, members } = data;
                    
                    const newMessageAlert = newMessagesAlert.find(
                        ({ chatId }) => chatId === _id
                    );

                    const isOnline = members?.some((member) =>
                        onlineUsers.includes(member)
                      );
              
                    return (
                        <ChatItem
                            
                            key={_id}
                            name={name}
                            avatar={avatar}
                            groupChat={groupChat}
                            members={members}
                            isOnline={isOnline}
                            newMessageAlert={newMessageAlert}
                            handleDeleteChat={handleDeleteChat}
                            index={index}
                            _id={_id}
                            sameSender={chatId === _id}
                        />
                    );
                })
            }
          
        </Stack>
    );
}

export default ChatList
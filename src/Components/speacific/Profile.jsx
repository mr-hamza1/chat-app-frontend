import React from 'react'
import moment from 'moment';
import { Stack ,Avatar, Typography, IconButton } from '@mui/material'
import {
    Face as FaceIcon, 
    AlternateEmail as UsernameIcon,
    CalendarMonth as CalenderIcon,
 } from '@mui/icons-material'
import { transformImage } from '../../Lib/features';

const Profile = ({ user }) => {
     

    return (
        <Stack
            spacing={"2rem"}
            alignItems={"center"}
            direction={"column"}
        >
            
            <Avatar
                src={transformImage(user?.avatar?.url)}
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    border: "5px solid  white",
                    marginBottom: "1rem"
                }}
            />
            <ProfileCard text={user?.bio} heading={"Bio"}/>
            <ProfileCard text={user?.name} heading={"Name"}   Icon={<FaceIcon/>}/>
            <ProfileCard text={user?.username} heading={"Username"} Icon={<UsernameIcon/>}/>
            <ProfileCard text={moment(user?.createdAt).fromNow()} heading={"Joind"} Icon={<CalenderIcon/>}/>

           
      </Stack>
  )
}

const ProfileCard = ({ text, Icon, heading }) => (

    <Stack
        spacing={"1rem"}
        alignItems={"center"}
        textAlign={"center"}
        color={"white"}
        direction={"row"}
    >

        {Icon && Icon}
        <Stack>
            <Typography variant='body1'>{text}</Typography>
            <Typography color={"gray"} variant='caption'>{heading}</Typography>

        </Stack>
    </Stack>
);

export default Profile
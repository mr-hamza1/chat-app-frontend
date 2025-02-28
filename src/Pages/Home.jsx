import React from 'react'
import {AppLayout} from '../Components/layout/AppLayout'
import { Box , Typography } from '@mui/material';

function Home() {
  return ( 
    <Box height={"100%"} bgcolor={"rgba(0,0,0,0.1)"}>
      <Typography p={"2rem"} variant={"h5"} textAlign={"center"}>
          Select a Friend to Chat
       </Typography>
        </Box>
  )
}

export default AppLayout(Home);
import React, { useState } from 'react'
import { Link as LinkComponent,Navigate,useLocation} from 'react-router-dom'
import { Grid, Box, IconButton, Typography, Stack, Drawer, styled, Avatar} from '@mui/material'
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
  Group as GroupsIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material'
import { matBlack } from '../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../redux/thunk/admin';
 
const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const adminTabs = [{
     name: 'Dashboard',
     icon: <DashboardIcon />,
     path: '/admin/dashboard',
},
{
     name: 'Users',
     icon: <ManageAccountsIcon />,
     path: '/admin/users',
  },
{
     name: 'Chats',
     icon: <GroupsIcon />,
     path: '/admin/chats',
  },
{
     name: 'Messages',
     icon: <MessageIcon/>,
     path: '/admin/messages',
  },
]
 
const Sidebar = ({ w = '100%' }) => {

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(adminLogout())
  }
  
  const location = useLocation();
  return (
     <Stack  width={w}
    // sx={{  width: {   xs: w,    sm: '50vh',  },}} 
      p={"3rem"} spacing={"3rem"}>
      
       <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="h5" component="span" marginLeft={"3rem"}>
        BAT
      </Typography>

      <Avatar
        src="/images/bat-icon-removebg-preview.png" 
        alt="Bat Icon"
        sx={{ width: 100, height: 100 }} 
      />
    </Box>
      
    
      <Stack spacing={"1rem"}>
        {
          adminTabs.map((tab) => (
            <Link key={tab.path}
              to={tab.path}
              sx={
                location.pathname == tab.path && {
                  bgcolor: matBlack,
                  color: "white",
                  "&:hover": {
                    color: "white",
                  }
                }
              }
            >

              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                {tab.icon}
                <Typography fontSize={"1.2rem"}>{tab.name}</Typography>
              </Stack>
            </Link>
          ))
        }

        <Link onClick={logoutHandler}>
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                <ExitToAppIcon/>
                <Typography  fontSize={"1.2rem"}>LogOut</Typography>
              </Stack>
            </Link>
      </Stack>
     
    </Stack>
  );
}

const AdminLayout = ({ children }) => {
  
   const {isAdmin} = useSelector((state) => state.auth);

    
    const [isMobile, setIsMobile] = useState(false)

    const handleMobile = () => setIsMobile(!isMobile);
    
    const handleClose = () => setIsMobile(false);

    if (!isAdmin) return <Navigate to="/admin" />;


  return (
    <Grid container minHeight={'100vh'}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
            
      <Grid item
        md={4}
        lg={3}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        <Sidebar />
      </Grid>
      <Grid item
        xs={12}
        md={8}
        lg={9}
        sx={{ bgcolor: "#f5f5f5" }}
      >
        {children}
      </Grid>
            
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="70vw" />
      </Drawer>
    </Grid>
  );
}

export default AdminLayout
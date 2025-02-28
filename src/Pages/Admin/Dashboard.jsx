import {
    AdminPanelSettings as AdminPanelSettingsIcon,
    Group as GroupIcon,
    Message as MessageIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon,
} from '@mui/icons-material'
import { Box, Container, Paper, Skeleton, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { matBlack } from '../../Components/constants/color'
import AdminLayout from '../../Components/layout/AdminLayout'
import { DoughnutChart, LineChart } from '../../Components/speacific/Charts'
import { CurveButton, SearchField } from '../../Components/styles/styledComponent'
// import {useFetchData} from '6pp'
import { useErrors } from '../../Hooks/hook'
import { useAdminStatsQuery } from '../../redux/api/api'

const Dashboard = () => {

    // const data = useFetchData(
    //     `${server}/api/v1/admin/stats`,
    //     "dashboard-stats"
    //   );

    const {isLoading, data , isError, error} = useAdminStatsQuery()


     
    const {stats} = data || {}



        useErrors([
            {
                isError,
                error,
            }
        ])

        const singleChats = (stats?.totalChatsCount - stats?.groupsCount) || 0 ;

        const groupChats = stats?.groupsCount || 0;

    const Appbar = <>
        <Paper elevation={3}
            sx={{
                padding: "2rem",
                borderRadius: "1rem",
                margin: "2rem",
            }}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                <AdminPanelSettingsIcon sx={{ fontSize: '3rem' }} />

                <SearchField placeholder='Search...' /> 
                
                <CurveButton>Search</CurveButton>

                <Box flexGrow={1} />
                <Typography
                    display={{
                        xs: 'none',
                        lg: 'block',
                    }}
                    color={"rgba(0,0,0,0.7)"}
                    textAlign={"center"}
                >
                    {moment().format("dddd, D MMMM YYYY")}
                </Typography>
                <NotificationsIcon/>
            </Stack>
        </Paper>
    </>

    const widgets = <>
        <Stack
            direction={{
                sx: 'column',
                sm: 'row',
            }}
                 spacing="2rem"
                 justifyContent="space-between"
                 alignItems={"center"}
                 margin={"2rem 0"}
            >
              <Widget title={'Users'}
                      value={stats?.usersCount}
               Icon={<PersonIcon/>} />
            
            <Widget title={'Chats'}          
              value={stats?.totalChatsCount}
              Icon={<GroupIcon/>} />

              <Widget title={'Messages'}  value={stats?.messagesCount} Icon={<MessageIcon/>} />
       </Stack>
    </>


    return  (
        <AdminLayout>

{isLoading ? (
        <Skeleton height={"100vh"} />
      ) :

           ( <Container component={"main"}>
                {
                    Appbar
                }

                <Stack 
                  direction={{
              xs: "column",
              lg: "row",
            }}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{ gap: "2rem" }}
          >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "2rem 3.5rem",
                            borderRadius: "1rem",
                            width: "100%",
                            maxWidth: "45rem",
                        }}
                    >
                        <Typography margin={"2rem 0"} variant="h4">
                            Last Messages
                        </Typography>
                        
                        <LineChart value={stats?.messagesChart || [] } />
                    </Paper>

                    <Paper
                        elevation={3}
                        sx={{
                            padding: "1rem ",
                            borderRadius: "1rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: { xs: "100%", sm: "50%" },
                            position: "relative",
                            maxWidth: "25rem",
                        }}>
                        <DoughnutChart
                            labels={['Single Chats', 'Group Chats']}
                            value={[ singleChats, groupChats ]}
                           
                        />
                   
                        
                        <Stack
                            position={"absolute"}
                            direction={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            spacing={"0.5rem"}
                            width={"100%"}
                            height={"100%"}
                        >
                            <GroupIcon /> <Typography>Vs </Typography>
                            <PersonIcon />
                        </Stack>
                    </Paper>
                </Stack>

                {widgets}
            </Container>)
}
                
        </AdminLayout>
    );
}
export default Dashboard

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={7}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
    }}
    >
          <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid ${matBlack}`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
)
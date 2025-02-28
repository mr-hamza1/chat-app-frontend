import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useErrors } from '../../Hooks/hook'
import { transformImage } from '../../Lib/features'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api'
import { setIsNotification } from '../../redux/reducers/misc'
const Notifications = () => {

  const { isLoading, data, isError, error } = useGetNotificationsQuery()

  const { isNotification } = useSelector((state) => state.misc)
  
  const dispatch = useDispatch()
  
  useErrors([{ isError, error }])
  
  const [acceptRequest] = useAcceptFriendRequestMutation()

  const friendRequestHandler = async ({ _id, accept }) => {
    
    dispatch(setIsNotification(false))
    
    try {
      const res = await acceptRequest({ requestId: _id, accept })

      if (res.data?.success) {
        toast.success(res.data.message);
      }
      else   toast.error(res.data?.error || "Something Went Wrong");
    } catch (error) {
      toast.error(error.message || "Something Went Wrong");
    }
    
  }

  const handleCloseNotification = () => dispatch(setIsNotification(false))


  return (
    <Dialog open={isNotification} onClose={handleCloseNotification} >

      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {
          isLoading ? <Skeleton /> : <>
            {
          data?.allRequests.length > 0 ? (
            data?.allRequests?.map((i) => (
              <NotificationItem
                key={i._id}
                _id={i._id}
                sender={i.sender}
                handler={friendRequestHandler} />
            ))
          )
            : (<Typography textAlign={"center"}>
              0 Notifications
            </Typography>)
        }</>
        }
      
      </Stack>
    </Dialog>
  );
}

export default Notifications;


const NotificationItem = memo(({_id , sender , handler})=> {
    
  const { name, avatar } = sender;
  
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        width={"100%"}
        spacing={"1rem"}
      >
        <Avatar src={transformImage(avatar)} />
              
        <Typography
          variant="body1"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 1, // Number of lines to show
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis', // Adds "..." for truncated text
            width: '100%',
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>





        <Stack direction={{
          xs: "column",
          sm: "row",
        }}>
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>Reject</Button>
        </Stack>
        
      </Stack>
    </ListItem>

  );

})
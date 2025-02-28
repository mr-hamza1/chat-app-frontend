import { Dialog ,DialogTitle , Stack, Typography ,DialogActions , Button, Skeleton} from '@mui/material'
import React, { useState } from 'react'
import { SampleUsers } from '../constants/SampleChat'
import UserItem from '../shared/UserItem'
import { useAsyncMutation, useErrors } from '../../Hooks/hook'
import { useAddGroupMemberMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducers/misc'

const AddMemberDialog = ({ chatId }) => {

  const dispatch = useDispatch();
  
  const {isAddMember} = useSelector(state =>state.misc)

  const [addMembers , isLoadingAddMember] = useAsyncMutation(useAddGroupMemberMutation)


  const { data, isLoading, isError, error, refetch } = useAvailableFriendsQuery(chatId);

    const [selectedMembers, setSelectedMembers] = useState([]);
  
    const selectMemeberHandler = (_id) => {
      setSelectedMembers((prev) => prev.includes(_id) ?
        prev.filter((currMemeber) => currMemeber !== _id)
        : [...prev, _id]);
    }

  const closeHandler = () => {
    dispatch(setIsAddMember(false))
  }

  const addMemSubmitHandler = () => {
   addMembers("Adding members...",{
    chatId,
    members: selectedMembers,
   })
    closeHandler()
  }


  useErrors([{  isError, error }])


  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} sx={{
        width: {
          xs: "20rem",
          sm : "24rem",
          md: "28rem",
        }
      }}
       spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
      
      <Stack  spacing={"1rem"}>
        {
          isLoading?  <Skeleton/> : data?.friends?.length > 0 ? 
          (data?.friends?.map((i) => ( 
            <UserItem
              key={i._id}
              user={i}
              handler={selectMemeberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))) : (<Typography textAlign={"center"}>No Friends</Typography>)
         }
      </Stack>

        <Stack direction={"row"}
           alignItems={"center"}
          justifyContent={"space-evenly"}
        >
                <Button   color="error" onClick={closeHandler} >
                    cancel
                </Button>
                <Button color="primary" onClick={addMemSubmitHandler} variant="contained"  disabled={isLoadingAddMember}>
                    submit changes
                </Button>
        </Stack>  
    </Stack>

    </Dialog>
  )
}

export default AddMemberDialog
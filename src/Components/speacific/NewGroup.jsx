import React, { useState } from 'react'
import { Avatar, Button, Dialog, DialogTitle, Skeleton, Stack, Typography , TextField} from '@mui/material'
import { SampleUsers } from "../constants/SampleChat";
import UserItem from '../shared/UserItem'
import {useInputValidation} from '6pp'
import { useDispatch, useSelector } from 'react-redux';
import {  useAvailableFriendsQuery, useNewGroupMutation} from '../../redux/api/api';
import { useAsyncMutation, useErrors } from "../../Hooks/hook";
import {setIsNewGroup} from '../../redux/reducers/misc.js'
import toast from 'react-hot-toast';

const NewGroup = () => {
   
  const {isNewGroup}  = useSelector((state) => state.misc)

  const dispatch = useDispatch();

  const groupName = useInputValidation("");

  const { isLoading, data, isError, error } = useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);


  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemeberHandler = (_id) => {
    setSelectedMembers((prev) => prev.includes(_id) ?
      prev.filter((currMemeber) => currMemeber !== _id)
      : [...prev, _id]);
  }

  const errors = [
    { isError, error},
  ];

  useErrors(errors)

  // console.log(selectedMembers)

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });


    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  }



  
  return (
    <Dialog open={isNewGroup}  onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"}>

        <DialogTitle
          variant={"h5"}
          textAlign={"center"}>New Group</DialogTitle>

        <TextField
          label="Group name"
          value={groupName.value}
          onChange={groupName.changeHandler} />
        
        <Typography variant='body1'>Members</Typography>

        <Stack>
            {isLoading? (<Skeleton/>) :(
              data?.friends?.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemeberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          )))}
        </Stack>
        
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="contained" color="primary" onClick={submitHandler}>
            Create
          </Button>
          <Button variant="outlined" color="error" onClick={closeHandler} >
            Cancle
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default NewGroup;
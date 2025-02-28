import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLazySearchUserQuery, useSendRequestMutation,} from '../../redux/api/api';
import { setIsSearch } from '../../redux/reducers/misc';
import UserItem from '../shared/UserItem';
import { useAsyncMutation } from "../../Hooks/hook";

const Search = () => {
  
    const [users , setUsers] =  useState([])

  const search = useInputValidation("");

  const dispatch = useDispatch();

  const [sendFriendRequest,isLoadingSendRequest] = useAsyncMutation(useSendRequestMutation);

  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery()
  
  const handlecloseSearchDialog = () => dispatch(setIsSearch(false))
  
  useEffect(() => {

    const timeOutId = setTimeout(() => {
      
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((err) => console.log(err))
    }, 1000)

    return () => {
      clearTimeout(timeOutId)
    }
  },[search.value])
  
  

  const addFriendHandler = async(id) => {
   await sendFriendRequest("Sending friend request....", {userId: id})
  }

  return (
    <Dialog open={isSearch} onClose={handlecloseSearchDialog} >

      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
        slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
        />

        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
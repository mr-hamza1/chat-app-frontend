import React, { memo, Suspense, useEffect, useState , lazy} from 'react'
import { Grid ,IconButton , Tooltip , Box ,Drawer, Stack,TextField, Typography , Button, Backdrop, Skeleton, CircularProgress } from '@mui/material'
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Done as DoneIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material'
import { matBlack } from '../Components/constants/color'
import {useNavigate , useSearchParams} from 'react-router-dom'
import {Link} from '../Components/styles/styledComponent'
import AvatarCard from '../Components/shared/AvatarCard'
import UserItem from '../Components/shared/UserItem' 
import { useMyGroupsQuery, useChatDetailsQuery, useRenameGroupMutation, useRemoveGroupMemberMutation,  useDeleteChatMutation } from '../redux/api/api'
import LayoutLoader from '../Components/layout/Loader'
import { useAsyncMutation, useErrors } from '../Hooks/hook'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../redux/reducers/misc'
const  ConfirmDeleteDailog= lazy(() => import("../Components/dialog/ConfirmDeleteDailog"));
const  AddMemberDialog= lazy(() => import("../Components/dialog/AddMemberDialog"));


function Groups() {


  const chatId = useSearchParams()[0].get("group")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isAddMember} = useSelector(state =>state.misc)

  const myGroups = useMyGroupsQuery("")

  const groupDetails = useChatDetailsQuery(
    {chatId, populate: true},
    {skip: !chatId }
  )
  
  
  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)

  const [removeMember , isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation)

  const [deleteGroup , isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameupdatedValue, setGroupNameupdatedValue] = useState("");

  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [members , setMembers] = useState([])

  const navigateBack = () => {
    navigate("/");
  };

  const errors = [
    { isError: myGroups.isError, error: myGroups.error},
    { isError: groupDetails.isError, error: groupDetails.error},
  ];

  useErrors(errors)

  useEffect(()=>{

    const groupData = groupDetails.data
    if(groupData){
      setGroupName(groupData.chat.name)
      setGroupNameupdatedValue(groupData.chat.name)
      setMembers(groupData.chat.members)
    }

    return ()=>{
      setGroupName("")
      setGroupNameupdatedValue("")
      setMembers([])
      setIsEdit(false)
    }

  },[groupDetails.data])



   const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
   
  const updateGroupName = () => {
    setIsEdit(false); 
    updateGroup("Updating group name...",{
      chatId,
      name: groupNameupdatedValue,
    })
  }

  
  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const openConfirmDeleteHandler = () => { 
    setConfirmDeleteDialog(true);
    console.log("delete group ")
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
    console.log("close delete group ")
  }

  const deleteHandler = () => { 
    deleteGroup("Deleting group...", chatId)
    closeConfirmDeleteHandler()
    navigate("/groups")
  }

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true))
  }

  const removeMemberHandler = (userId) => {
    removeMember("Removing member...",{
      chatId,
      userId,
    })
  }

 

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
    setGroupNameupdatedValue(`Group Name ${chatId}`);
    }
    return () => {
      setGroupName("");
      setGroupNameupdatedValue("");
      setIsEdit(false);
    };
  },[chatId])
   
   


  const IconBtns = <>
     <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
    </Box>
    
    <Tooltip>
      <IconButton sx={{
        position: "absolute",
        top: "2rem",
        left: "2rem",
        bgcolor:matBlack,
        color: "white",
        ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
        <KeyboardBackspaceIcon />
        </IconButton>
     </Tooltip>
  </>

  
  const GroupName = <Stack
     direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"} >
    {
      isEdit ?
        <>
          <TextField 
          value={groupNameupdatedValue} 
          onChange={(e) => setGroupNameupdatedValue(e.target.value)}
           />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <DoneIcon /></IconButton>
        </> :
        <>  
          <Typography variant="h4">{groupName}</Typography>
          <IconButton  onClick={()=> setIsEdit(true)} disabled={isLoadingGroupName} >
            <EditIcon /></IconButton>
        </>
   }
  </Stack>

 
  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}>
       
       <Button color="error"   
       size="large"
        variant="outlined" 
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        DELETE Group</Button>

       <Button color="primary"
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >ADD MEMBER</Button>

    </Stack>
  );



  return myGroups.isLoading? <LayoutLoader/> : (
    <Grid container height={"100vh"} overflow={"hidden"}  >
      <Grid item sm={3}
        sx={{
          display: { xs: "none", sm: "block" },
          bgcolor: "#1976d2",
      }}>
            
        <GroupsList myGroups={myGroups?.data?.groups}  chatId={chatId} />

      </Grid>
      <Grid item xs={12} sm={8}
         sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }} 
      >
           
        {IconBtns}
        
        {groupName && <>
          {GroupName}
          
           <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
               variant="body1"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
            spacing={"2rem"}
            height={"50vh"}
            overflow={"auto"}
            >
            {/* Members */}
            
            {isLoadingRemoveMember? (<CircularProgress/>) : members?.map((i)=>(
              <UserItem user={i} key={i._id} isAdded styling={{
                boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                padding: "1rem 2rem",
                borderRadius: "1rem",
              }}
                handler={removeMemberHandler }
              />
            ))}

         
          </Stack>
          
          {ButtonGroup}
          
        </>}
      </Grid>

      {
        isAddMember && (
          <Suspense>
            <AddMemberDialog chatId={chatId}/>
          </Suspense>)
      }

      {
        confirmDeleteDialog &&
        <Suspense fallback={<Backdrop open/>} >
        <ConfirmDeleteDailog
          open={confirmDeleteDialog}
          handleClose={closeConfirmDeleteHandler}
          deleteHandler={deleteHandler}
            />
            </Suspense>
      }
   
      <Drawer sx={{
        display: {
          xs: "block",
          sm: "none",
          position: 'relative',
        }}}
  PaperProps={{
    sx: {
      bgcolor: "#1976d2", // Apply background color here
    },
  }} open={isMobileMenuOpen} onClose={handleMobileClose}>
        
          <GroupsList myGroups={myGroups?.data?.groups}   chatId={chatId} w={"60vw"} />

      </Drawer>
    </Grid>
  )
}

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w} sx={{
    height: "100vh",
    overflow: "auto",
  }} >
   {myGroups.length > 0 ? (
      myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link to={`?group=${_id}`} onClick={(e) => {
      if (chatId === _id)
      e.preventDefault();
    }} >
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        sx={{
        color:'#ffffff',
      }}>
        <AvatarCard avatar={avatar} />
        <Typography padding={"1rem"} color='inherit'>{name}</Typography>
      </Stack>
    </Link>
  );
});

 
export default Groups





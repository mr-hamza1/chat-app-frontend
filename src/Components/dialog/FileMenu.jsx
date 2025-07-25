import { Menu, MenuList, MenuItem, Tooltip, ListItemText } from '@mui/material'
import { 
    Image as ImageIcon,
    AudioFile as AudioFileIcon,
    VideoFile as VideoFileIcon,
    UploadFile as UploadFileIcon,
 } from '@mui/icons-material';
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsFileMenu, setUploadingLoader } from '../../redux/reducers/misc';
import toast from 'react-hot-toast'
import { useSendAttachementMutation } from '../../redux/api/api';

const FileMenu = ({anchorE1, chatId}) => {
    
    const { isFileMenu } = useSelector((state)=> state.misc)

    const dispatch = useDispatch();

    const [sendAttachments] = useSendAttachementMutation()

    const imageRef = useRef(null)
    const audioRef = useRef(null)
    const videoRef = useRef(null)
    const fileRef = useRef(null)

    const closeFileMenu = () =>{
        dispatch(setIsFileMenu(false))
    }

    const fileChangeHandler = async(e, key) =>{

      const files = Array.from(e.target.files)

      if(files.length <= 0 ) return 

      if(files.length > 5) return toast.error(`You can only send 5 ${key} at a time`)

        dispatch(setUploadingLoader(true))

      const toastId = toast.loading(`Sending ${key}...`)     
      closeFileMenu()

      try {

        const myForm = new FormData()


        myForm.append("chatId", chatId)
        files.forEach((file) => myForm.append("files", file))

        console.log(myForm)

        const res = await sendAttachments(myForm)


        if(res.data)
          toast.success(`Sent ${key} successfully`,{id: toastId})
        else
        toast.error(`Failed to send ${key}`,{id: toastId})
        
      } catch (error) {
        toast.error(error,{id: toastId})
      }
      finally{
        dispatch(setUploadingLoader(false))
      }

    }

  
    const selectImage = () => imageRef.current?.click()
    const selectAudio = () => audioRef.current?.click();
    const selectVideo = () => videoRef.current?.click();
    const selectFile = () => fileRef.current?.click();

    return (
        <Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeFileMenu}>
            <div style={{              
                  width: "10rem",
            }}>
            <MenuList>
                <MenuItem onClick={selectImage}>
                   <Tooltip title="Image">
                       <ImageIcon/>
                   </Tooltip>
                   <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
                   <input
                        type="file"
                        multiple
                        accept="image/png, image/jpeg, image/gif"
                        style={{ display: "none" }}
                        onChange={(e) => fileChangeHandler(e, "Images")}
                        ref={imageRef}
                      />
                </MenuItem>

                <MenuItem onClick={selectAudio}>
                   <Tooltip title="Audio">
                     <AudioFileIcon />
                   </Tooltip>
                   <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
                   <input
                     type="file"
                     multiple
                     accept="audio/mpeg, audio/wav"
                     style={{ display: "none" }}
                     onChange={(e) => fileChangeHandler(e, "Audios")}
                     ref={audioRef}
                   />
                </MenuItem>

                <MenuItem onClick={selectVideo}>
                  <Tooltip title="Video">
                    <VideoFileIcon />
                  </Tooltip>
                  <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
                  <input
                    type="file"
                    multiple
                    accept="video/mp4, video/webm, video/ogg"
                    style={{ display: "none" }}
                    onChange={(e) => fileChangeHandler(e, "Videos")}
                    ref={videoRef}
                  />
                </MenuItem>

                <MenuItem onClick={selectFile}>
                  <Tooltip title="File">
                    <UploadFileIcon />
                  </Tooltip>
                  <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
                  <input
                    type="file"
                    multiple
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                    onChange={(e) => fileChangeHandler(e, "Files")}
                    ref={fileRef}
                  />
                </MenuItem>



            </MenuList>
            </div>
        </Menu>
    );
}

export default FileMenu
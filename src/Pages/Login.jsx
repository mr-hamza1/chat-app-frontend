import React, { useState } from 'react';
import { useFileHandler, useInputValidation , useStrongPassword} from '6pp';
import  usernameValidator  from '../utils/validator';
// import { Container, Paper, Typography, TextField } from '@mui/material';
import * as Mui from '@mui/material';
import VisuallyHiddenInput from '../Components/styles/styledComponent';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import axios from 'axios';
import { server } from '../Components/constants/congfig.js';
import { useDispatch } from 'react-redux';
import { userExists } from '../redux/reducers/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



function Login() {
    let [isLogin, setIsLogin] = useState(true)
    let [isLoading, setIsLoading] = useState(false)
    
    const toggleLogin = () => setIsLogin((prev) => !prev);
    
    const name = useInputValidation("");
    const username = useInputValidation("", usernameValidator);
    // const password = useStrongPassword()
    const password = useInputValidation("");
    const bio = useInputValidation("");

    const avatar = useFileHandler("single")

    const navigate = useNavigate();


    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
    
       const toastId =  toast.loading("Logging in...")
        setIsLoading(true)

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                `${server}/api/v1/user/login`,
                {
                    username: username.value,
                    password: password.value,
                },
                config
            );
            dispatch(userExists(data.user));
            toast.success(data.message,{
                id: toastId,
            });

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something Went Wrong",{
                id: toastId,
            });
        }finally{
            setIsLoading(false)
        }
    }

const handleSignup = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Signing up...")
         setIsLoading(true)

         const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

        const formData = new FormData();
        formData.append("avatar", avatar.file);
        formData.append("name", name.value);
        formData.append("bio", bio.value);
        formData.append("username", username.value);
        formData.append("password", password.value);

        
        try {
            const { data } = await axios.post(`${server}/api/v1/user/new`,
                formData,
                config
            )
            dispatch(userExists(data.user));
      toast.success(data.message,{
            id: toastId,
        }
      );
        } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong",{
        id: toastId,
    });
    } 
    finally{
            setIsLoading(false)
        }
    };


    
    return (
        <div style={{
            backgroundColor: "rgb(120, 149, 241)",
        }}>
             <Mui.Container
            component={"main"}
            maxWidth="xs"
            style={{
                display: "flex",
                alignItems: "center",
                height: "100vh",
                // transform: 'scale(0.8)', // Scale down to 80%
                // transformOrigin: 'center', // Adjust origin if needed
                // width: '100%', // Ensure it scales correctly
                justifyContent: "center",
                bgColor: "black"
        }}>   
            <Mui.Paper elevation={3}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 4,
                    flexDirection : "column"
                    
              }}
            >

                {isLogin ? (<>

                    <Mui.Typography variant='h5'>Login</Mui.Typography>

                    <form style={{
                        marginTop: "1rem",
                        width : "100%"
                        }}
                        onSubmit={handleLogin}
                        > 
                         <Mui.TextField
                            label="username"
                            required
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={username.value}
                            onChange={username.changeHandler}
                        />
                        
                        {username.error && (
                            < Mui.Typography variant='caption' color="error">
                                {username.error}
                            </Mui.Typography>
                        )}

                         <Mui.TextField
                            label="password"
                            required
                            type='password'
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={password.value}
                            onChange={password.changeHandler}
                            // helperText="only numbers"
                        />

                        <Mui.Button
                            sx={{ marginTop: "1rem" }}
                            variant="contained"
                            type="submit"
                            color="primary"
                                fullWidth
                                disabled={isLoading}
                        >Login</Mui.Button>

                        <Mui.Typography textAlign={"center"} m={"1rem"}>
                            OR
                        </Mui.Typography>

                        <Mui.Button
                            variant="text"
                            onClick={toggleLogin}
                            fullWidth
                            disabled={isLoading}
                        >Sign Up instead</Mui.Button>

                    </form>
                </>
                )
                    : (<>

                        <Mui.Typography variant='h5'>Sign Up</Mui.Typography>

                        <form style={{
                            marginTop: "1rem",
                            width: "100%"
                            }}
                                onSubmit={handleSignup}
                            >

                            <Mui.Stack position={"relative"} width={"10rem"} margin={"auto"}>
                                <Mui.Avatar
                                    sx={{
                                        width : "10rem",
                                        height: "10rem",
                                        objectFit: "contain",
                                    }}
                                    src={avatar.preview}
                                />
                               

                                <Mui.IconButton sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    color: "white",
                                    bgcolor: "rgba(0, 0, 0,0.5)",
                                    ":hover":{
                                        backgroundColor: "rgba(0, 0, 0, 0.7)"
                                    },
                                }}
                                    component="label"
                                >
                                    <>
                                        <CameraAltIcon />
                                        <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                                    </>
                                </Mui.IconButton>  
                            </Mui.Stack>

                            {/*     // to check error in avatar file size*/}

                            {avatar.error && (
                                < Mui.Typography
                                    margin={"1rem auto"}
                                    width={"fit-content"}
                                    display={"block"}
                                    variant='caption'
                                    color="error">
                                
                                    {avatar.error}
                                </Mui.Typography>

                            )}    

                            <Mui.TextField
                                label="Name"
                                required
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                value={name.value}
                                onChange={name.changeHandler}
                            />
                            <Mui.TextField
                                label="Bio"
                                required
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                value={bio.value}
                                onChange={bio.changeHandler}
                            />
                            <Mui.TextField
                                label="Username"
                                required
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                value={username.value}
                                onChange={username.changeHandler}
                            />
                            {username.error && (
                                < Mui.Typography variant='caption' color="error">
                                    {username.error}
                                </Mui.Typography>
                            )}

                            <Mui.TextField
                                label="Password"
                                required
                                type='password'
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                // helperText="only numbers"
                                value={password.value}
                                onChange={password.changeHandler}
                            />
                            {password.error && (
                                < Mui.Typography variant='caption' color="error">
                                    {password.error}
                                </Mui.Typography>
                            )}

                            <Mui.Button
                                sx={{ marginTop: "1rem" }}
                                variant="contained"
                                type="submit"
                                color="primary"
                                fullWidth
                                disabled={isLoading}

                            >Sign Up</Mui.Button>

                            <Mui.Typography textAlign={"center"} m={"1rem"}>
                                OR
                            </Mui.Typography>

                            <Mui.Button
                                variant="text"
                                onClick={toggleLogin}
                                fullWidth
                                disabled={isLoading}

                            >Login instead</Mui.Button>

                        </form>
                    </>
                    )
                }
              
            </Mui.Paper>
        </Mui.Container>
       </div>


    );
}

export default Login;

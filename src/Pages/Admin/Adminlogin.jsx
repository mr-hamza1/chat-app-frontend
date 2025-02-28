import React, { useEffect } from 'react'
import { useInputValidation } from '6pp';
import {Navigate} from 'react-router-dom'
import * as Mui from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getAdmin } from '../../redux/thunk/admin';


const Adminlogin = () => {

    const {isAdmin} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const secretKey = useInputValidation("");

    useEffect(()=>{
        dispatch(getAdmin());
      },[dispatch])
    

    if (isAdmin)
        return <Navigate to='/admin/dashboard' />
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminLogin(secretKey.value))
  }


  return (
        <div style={{
            backgroundColor: "black",
        }}>
             <Mui.Container
            component={"main"}
            maxWidth="xs"
            style={{
                display: "flex",
                alignItems: "center",
                height: "100vh",
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
                  
                    <Mui.Typography variant='h5'>Admin Login</Mui.Typography>

                    <form style={{
                        marginTop: "1rem",
                        width : "100%"
                      }}
                          onSubmit={submitHandler}
                      >

                         <Mui.TextField
                            label="Secret Key"
                            required
                            type='password'
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={secretKey.value}
                            onChange={secretKey.changeHandler}
                            // helperText="only numbers"
                        />

                        <Mui.Button
                            sx={{ marginTop: "1rem" }}
                            variant="contained"
                            type="submit"
                            color="primary"
                            fullWidth
                        >Login</Mui.Button>
                    </form>
            </Mui.Paper>
        </Mui.Container>
       </div>


    );
}

export default Adminlogin
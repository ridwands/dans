import React, {useState} from 'react';
import {Button, Paper, Stack, TextField, Typography,Alert} from "@mui/material";
import {LoginPost} from "../../Repositories/auth";
import {tokenKey} from "../../Utils/Storage";

const Login = () => {
    const [textUsername,setTextUsername]=useState('')
    const [textPassword, setTextPassword] = useState("");
    const [error,setError]=useState('')

    const handleLogin = ()=>{
        const data={
            username: textUsername,
            password: textPassword
        }
        LoginPost(data).then((res)=>{
            if (res.code===200){
                setError('')
                localStorage.setItem(tokenKey,res.data.token)
                return window.location.href="/jobs"
            }else {
                setError(res)
            }
        }).catch((err)=>{
            setError(err)
        })
    }

    return (
        <div>
            {
                error!=="" &&
                <Alert severity="error">{JSON.stringify(error.message ?? error)}</Alert>
            }
            <Paper elevation={3} >
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    style={{ minHeight: '100vh' }}
                >
                    <Typography>Login Page</Typography>
                    <TextField onChange={(e)=>setTextUsername(e.target.value)} label="Username" focused />
                    <TextField onChange={e=>setTextPassword(e.target.value)} label="Password" type={"password"} focused />
                    <Button onClick={handleLogin} variant={"contained"}>Sign In</Button>
                </Stack>
            </Paper>
        </div>
    );
};

export default Login;

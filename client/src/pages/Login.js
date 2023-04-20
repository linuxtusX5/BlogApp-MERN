import React, {useState, useEffect} from 'react'
import {Box, Typography, TextField, Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {useDispatch} from 'react-redux';
import {authAction} from '../redux/store.js';
import I1 from '../assets/Waihou.png'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

const handleChange = (e) => {
  setInputs((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value
  }));
}

//form handle
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post('http://localhost:8080/api/v1/user/login',
    {email: inputs.email, password: inputs.password});
    if(data.success){
      localStorage.setItem('userID', data?.user._id);
      dispatch(authAction.login())
      toast.success('Login Successfully')
      navigate('/')
    }
  } catch (error) {
    console.log(error)
  }
  
}

useEffect(() => {
  const userID = localStorage.getItem("userID");
  if(userID){
    dispatch(authAction.login());
  }
},[])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={450} display={'flex'} flexDirection={'column'}
        alignItems={'center'} justifyContent={'center'} margin='auto'
        marginTop={5} boxShadow={'10px 10px 50px #ccc'} padding={3}
        borderRadius={5}
        style={{ backgroundImage: `url(${I1})` }}>
          <Typography variant='h4'
          padding={3} textAlign={'center'} textTransform={'uppercase'}
          ><b>Login</b></Typography>
          
          <TextField
            label="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
            label="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />
          <Button type='submit' sx={{borderRadius: 3, marginTop: 3}} variant='contained'>Login</Button>
          <Button sx={{borderRadius: 3, marginTop: 3}} onClick={() => navigate('/Register')}
          >Don't have Account? Please Register</Button>
        </Box>
      </form>
    </>
  )
}

export default Login
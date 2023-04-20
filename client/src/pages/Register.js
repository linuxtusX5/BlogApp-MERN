import React, {useState} from 'react'
import {Box, Typography, TextField, Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import I1 from '../assets/Waihou.png'

function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
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
    const { data } = await axios.post('http://localhost:8080/api/v1/user/register',
    {username: inputs.name, email: inputs.email, password: inputs.password});
    if(data.success){
      toast.success('Register Successfully')
      navigate('/Login')
    }
  } catch (error) {
    console.log(error)
  }
  
}

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
          ><b>Register</b></Typography>
          
          <TextField
            label="name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required
          />
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
          <Button type='submit' sx={{borderRadius: 3, marginTop: 3}} variant='contained'>Register</Button>
          <Button sx={{borderRadius: 3, marginTop: 3}} onClick={() => navigate('/Login')}
          >Already Register? Please login now</Button>
        </Box>
      </form>
    </>
  )
}

export default Register
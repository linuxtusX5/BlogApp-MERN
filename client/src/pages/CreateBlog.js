import React, {useState} from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast';
import I1 from '../assets/Waihou.png'

function CreateBlog() {
    const navigate = useNavigate();
    const id = localStorage.getItem('userID')
    const [input, setInput] = useState({
        title: '',
        description: '',
        image: ''
    })

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post('http://localhost:8080/api/v1/blog/create-blog', {
                title:input.title,
                description:input.description,
                image:input.image,
                user: id
            })
            if(data?.success){
                toast.success('Blog Created')
                navigate('/my-blogs')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e) => {
        setInput(preState => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <Box width={'40%'} border={'1px dashed grey'} borderRadius={10} padding={3} 
            margin='auto' boxShadow={'10px 10px 20px #ccc'} 
            display='flex' flexDirection={'column'}  marginTop={'30px'} 
            style={{ backgroundImage: `url(${I1})` }}>
                <Typography variant='h2' textAlign={'center'} fontWeight={'bold'} padding={3} color={'grey'}>Create A Post</Typography>
                <InputLabel sx={{mb:1, mt: 2, fontSize:'24px', fontWeight:'bold'}}>Title</InputLabel>
                <TextField required name='title' value={input.title} onChange={handleChange} margin='normal' variant='outlined'/>
                <InputLabel sx={{mb:1, mt: 2, fontSize:'24px', fontWeight:'bold'}}>Description</InputLabel>
                <TextField required name='description' value={input.description} onChange={handleChange} margin='normal' variant='outlined'/>
                <InputLabel sx={{mb:1, mt: 2, fontSize:'24px', fontWeight:'bold'}}>Image</InputLabel>
                <TextField required name='image' value={input.image} onChange={handleChange} margin='normal' variant='outlined'/>
                <Button type='submit' color='primary' variant='contained'>Done</Button>
            </Box>
        </form>
    </>
  )
}

export default CreateBlog
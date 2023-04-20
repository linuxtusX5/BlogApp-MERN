import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function BlogDatails() {
    const navigate = useNavigate();
    const [input, setInput] = useState({})
    const id = useParams().id
    const [blog, setBlog] = useState({})

        const getBlogDatail = async () => {
        try {
            const {data} = await axios.get(`http://localhost:8080/api/v1/blog/get-blog/${id}`)
            if(data?.success){
                setBlog(data?.blog)
                setInput({
                    title: data?.blog.title,
                    description: data.blog.description,
                    image: data?.blog.image
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getBlogDatail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

        const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.put(`http://localhost:8080/api/v1/blog/update-blog/${id}`, {
                title:input.title,
                description:input.description,
                image:input.image,
                user: id
            })
            if(data?.success){
                toast.success('Blog Updated')
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
            <Box width={'40%'} border={'1px dashed grey'} borderRadius={10} padding={3} margin='auto' boxShadow={'10px 10px 20px #ccc'} 
            display='flex' flexDirection={'column'}  marginTop={'30px'}>
                <Typography variant='h2' textAlign={'center'} fontWeight={'bold'} padding={3} color={'grey'}>Create A Post</Typography>
                <InputLabel sx={{mb:1, mt: 2, fontSize:'24px', fontWeight:'bold'}}>Title</InputLabel>
                <TextField required name='title' value={input.title} onChange={handleChange} margin='normal' variant='outlined'/>
                <InputLabel sx={{mb:1, mt: 2, fontSize:'24px', fontWeight:'bold'}}>Description</InputLabel>
                <TextField required name='description' value={input.description} onChange={handleChange} margin='normal' variant='outlined'/>
                <InputLabel sx={{mb:1, mt: 2, fontSize:'24px', fontWeight:'bold'}}>Image</InputLabel>
                <TextField required name='image' value={input.image} onChange={handleChange} margin='normal' variant='outlined'/>
                <Button type='submit' color='warning' variant='contained'>Update</Button>
            </Box>
        </form>
    </>
  )
}

export default BlogDatails
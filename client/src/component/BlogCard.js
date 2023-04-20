import * as React from 'react';
import {Box, Card, CardHeader, CardMedia, CardContent,
  Typography, IconButton} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from 'react-hot-toast';

function BlogCard({ title, description, username, image, time, id, isUser}) {
  const navigate =useNavigate()
  const handleEdit = () => {
    navigate(`/blog-datails/${id}`)
  }
  const handleDelete = async() => {
    try {
      const {data} = axios.delete(`http://localhost:8080/api/v1/blog/delete-blog/${id}`)
      if(data?.success){
        Toast.success('Blog Successfully deleted!')
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card sx={{ width: '40%', margin: 'auto', mt: 2, padding: 2, 
    boxShadow: '5px 5px 10px #ccc', ':hover':{
      boxShadow: '10px 10px 20px #ccc'
    }}}>
      {isUser &&(
        <Box display={'flex'}>
          <IconButton onClick={handleEdit} sx={{marginLeft: 'auto'}}>
            <EditIcon/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon/>
          </IconButton>
        </Box>
      )}
        <CardHeader 
          avatar={
            <Avatar sx={{bgcolor: red[500]}} aria-label='recipe'>
              {username}
            </Avatar>
          }
          title={username}
          subheader={time}/>
          <CardMedia
            component={'img'}
            height={'194'}
            image={image}
            alt='Image*'
          />
          <CardContent>
            <Typography variant='h6' color={'text.secondary'}>
              Title: {title}
            </Typography>
            <Typography variant='body2' color={'text.secondary'}>
              Description: {description}
            </Typography>
          </CardContent>
    </Card>
  )
}

export default BlogCard
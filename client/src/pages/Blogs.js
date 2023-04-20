import React,{useState, useEffect} from 'react'
import axios from 'axios'
import BlogCard from '../component/BlogCard'
import {Box, CircularProgress} from '@mui/material'

function Blogs() {
  const [blogs, setBlogs] = useState([])

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/blog/all-blog')
      if(data?.success){
        setBlogs(data?.blogs)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog?._id}
            id={blog?._id}
            isUser={localStorage.getItem('userID') === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
            />
        ))
      ) : (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <CircularProgress/>
        </Box>
      )}
    </div>
  )
}

export default Blogs
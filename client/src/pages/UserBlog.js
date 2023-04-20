import React, {useState, useEffect} from 'react'
import axios from 'axios'
import BlogCard from "../component/BlogCard.js";
import {CircularProgress,Box} from '@mui/material'

function UserBlog() {
    const [blogs, setBlogs] = useState([])

    const getUserBlog = async () => {
      try {
        const id = localStorage.getItem('userID')
        const {data} = await axios.get(`http://localhost:8080/api/v1/blog/user-blog/${id}`)
        if(data?.success){
          setBlogs(data?.userBlog.blog)
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getUserBlog()
    },[])
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user.username} // pass the username as a prop
              time={blog.createdAt}
            />
        ))
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'  }}>
            <CircularProgress />
        </Box>
        )}
    </div>
  )
}

export default UserBlog
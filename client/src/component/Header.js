import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from "@mui/material";
import { link, toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../redux/store";
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from 'react-hot-toast';
import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.isLogin) || localStorage.getItem("userID");
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(authAction.logout());
      toast.success("Logout Successfully!");
      navigate("/Login");
      localStorage.clear();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand><b>Blog App</b></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {isLogin && (
              <Nav className="me-auto">
                <Nav.Link href="/blogs">Blogs</Nav.Link>
                <Nav.Link href="/my-blogs">My Blogs</Nav.Link>
                <Nav.Link href="/create-blog">Create Blog</Nav.Link>
              </Nav>
            )}
              {!isLogin && (
              <><Nav className="me-auto"></Nav><Nav sx={{ display: 'flex', justifyContent: 'center' }}>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav></>
              )} 
              {isLogin && (
                <Button onClick={handleLogout} sx={{color:'#000'}}>
                  Logout
                </Button>
              )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

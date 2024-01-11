import React from 'react'
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Profile } from '../pages/Profile';
import { Signup } from '../pages/Signup';
import { UploadPost } from '../pages/UploadPost';

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/upload-post",
    element: <UploadPost />,
  },
  {
    path: "/profile",
    element: <Profile />,
  }
]

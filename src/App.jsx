import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import AuthGuard from "./utils/AuthGuard";
import { getLoggedInUserDetails, getLoginStatus } from "./store/usersSlice";

const LazyPosts = React.lazy(() => import('./components/Posts'));
const LazyUsers = React.lazy(() => import('./components/Users'));
const LazyLogin = React.lazy(() => import('./components/Login'));
const LazySignup = React.lazy(() => import('./components/Signup'));
const LazyUserDetail = React.lazy(() => import('./components/UserDetail'));
const LazyUserAccount = React.lazy(() => import('./components/UserAccount'));
const LazyPostDetail = React.lazy(() => import('./components/PostDetail'));
const LazyPostForm = React.lazy(() => import('./components/PostForm'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLoggedInUserDetails());
  }, [])

  const routes = [
    { path: "/posts", element: <LazyPosts /> },
    { path: "/users", element: <LazyUsers /> },
    { path: "/login", element: <LazyLogin /> },
    { path: "/signup", element: <LazySignup /> },
    { path: "/users/:userId", element: <LazyUserDetail /> },
    { path: "/posts/:id", element: <LazyPostDetail /> },
    { path: "/", element: <Navigate to="/posts" /> },
    { path: "/logout", element: <Navigate to="/posts" /> },
    {
      path: "/account",
      element: (
        <AuthGuard>
          <LazyUserAccount />
        </AuthGuard>
      ),
    },
    {
      path: "/posts/createPost",
      element: (
        <AuthGuard>
          <LazyPostForm />
        </AuthGuard>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

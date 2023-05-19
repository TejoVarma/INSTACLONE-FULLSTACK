import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import SignUpForm from "../components/user/SignupForm";
import LoginForm from "../components/user/LoginForm";
import PostHeader from "../components/post/PostHeader";
import AllPosts from "../components/post/AllPosts";
import NewPost from "../components/post/NewPost";
import { ProfilePage } from "../components/user/ProfilePage";


export default function Routers() {

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="posts" element={<PostHeader/>} >
                <Route path="all" element={<AllPosts />} />
                <Route path="new" element={<NewPost/>} />
                <Route path=":id" element={<ProfilePage />} />
            </Route>
        </Routes>
    </BrowserRouter>
}
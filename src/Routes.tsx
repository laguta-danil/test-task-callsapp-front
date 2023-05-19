import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import AddOrEditPost from "./components/Posts/AddOrEditPost";
import Posts from "./components/Posts/Posts";
import { RequireAuth, RequireNotAuthed } from "./services/auth";


export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/login" element={<RequireNotAuthed><Login/></RequireNotAuthed>}/>
            <Route path="/" element={<RequireAuth><Posts /></RequireAuth>}/>
            <Route path="/new" element={<RequireAuth><AddOrEditPost/></RequireAuth>}/>
            <Route path="/:id" element={<RequireAuth><AddOrEditPost/></RequireAuth>}/>
            <Route path='*' element={<RequireAuth><main><p>Theres nothing here!</p></main></RequireAuth>}/>
        </Routes>
    );
}
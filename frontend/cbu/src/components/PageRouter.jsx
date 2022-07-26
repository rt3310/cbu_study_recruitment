import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLoginPage from '../routes/AdminLoginPage';
import AdminPage from '../routes/AdminPage';
import CommunityPage from '../routes/CommunityPage';
import EnrollPage from '../routes/EnrollPage';
import LoginPage from '../routes/LoginPage';
import ManagePage from '../routes/ManagePage';
import PostPage from '../routes/PostPage';
import SignupPage from '../routes/SignupPage';

const PageRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/enroll" element={<EnrollPage />} />
                <Route path="/post" element={<PostPage />} />
                <Route path="/manage" element={<ManagePage />} />
                <Route path="/community" element={<CommunityPage />} />
            </Routes>
            <Routes>
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/main" element={<AdminPage />} />
            </Routes>
        </Router>
    );
};

export default PageRouter;
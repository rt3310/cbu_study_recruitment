import React from 'react';
import styled from 'styled-components';
import AdminLogin from '../components/admin/AdminLogin';

const LoginHeader = styled.div`
    width: 600px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: bold;
`;

const AdminSection = styled.div`
    background-color: #77f;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AdminLoginPage = () => {
    return (
        <AdminSection>
            <LoginHeader>씨부엉 Administrator Page</LoginHeader>
            <AdminLogin />
        </AdminSection>
    );
};

export default AdminLoginPage;
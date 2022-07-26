import React from 'react';
import LoginForm from '../components/login/LoginForm';
import styled from 'styled-components';

const LoginHeader = styled.div`
    width: 600px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: bold;
`;

const LoginSection = styled.div`
    background-color: #ccf;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoginPage = () => {
    return (
        <LoginSection>
            <LoginHeader>씨부엉 스터디 신청</LoginHeader>
            <LoginForm />
        </LoginSection>
    );
};

export default LoginPage;
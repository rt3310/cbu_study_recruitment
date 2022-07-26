import React from 'react';
import styled from 'styled-components';
import SignupForm from '../components/signup/SignupForm';

const SignupHeader = styled.div`
    width: 600px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: bold;
`;

const SignupSection = styled.div`
    background-color: #ccf;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SignupPage = () => {
    return (
         <SignupSection>
            <SignupHeader>씨부엉 스터디 신청 회원가입</SignupHeader>
            <SignupForm />
        </SignupSection>
    );
};

export default SignupPage;
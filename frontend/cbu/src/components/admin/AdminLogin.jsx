import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const LoginArea = styled.div`
    background-color: #fff;
    width: 600px;   
    height: 450px;
    border-radius: 2px;
    box-shadow: 0px 5px 10px 1px #0004;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InputArea = styled.div`
    height: 80px;
    border-radius: 2px;
    display: grid;
    grid-template-columns: 50px 300px;
    grid-template-rows: 50px 30px;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 -50px;
`;

const Input = styled.input`
    width: 300px;
    height: 50px;
    border:1px solid #000;
    border-radius: 2px;
    padding: 10px;
    outline: none;
`;

const LoginLabel = styled.span`
    font-size: 20px;
    text-align: center;
    width: 50px;
`;

const ErrorMessage = styled.span`
    color: red;
    grid-area: 2 / 2 / 2 / 2;
`;

const LoginButton = styled.button`
    width: 300px;
    height: 60px;
    background-color: #55f;
    border-radius: 2px;
    color: #fff;
    margin: 20px 0 0 0;
    font-size: 20px;
    transition-duration: 0.2s;
    &:hover {
        border: 1px solid #55f;
        background-color: #fff;
        color: #55f;
    }
`;

const AccessArea = styled.div`
    width: 300px;
    height: 30px;
    margin: 10px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AdminLogin = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        "loginId": "",
        "passwd": ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMemberData = () => {
            setLoading(true);
            try {
                axios.get("/api/admin/my").then(response => {
                    if (response.data.success === 0) {
                        navigate('/admin/main');
                    }
                });
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        getMemberData();
    }, []);

    const onChangeInput = (e) => {
        const nextLogin = {
            ...login,
            [e.target.name]: e.target.value
        };
        setLogin(nextLogin);
    };

    const postLoginData = () => {
        setLoading(true);
        try {
            axios.post("/api/admin/login", login).then(response => {
                console.log(response.data);
                if (response.data.success === 0) {
                    navigate('/admin/main');
                } else {
                    alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                }
            }).catch(error => {
                console.log(error);
                alert(error.response.data.error);
            })
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    if (loading) {
        return null;
    }

    return (
        <LoginArea>
            <InputArea>
                <LoginLabel><i className="fa-solid fa-user"></i></LoginLabel>
                <Input placeholder='아이디를 입력해주세요' name='loginId' onChange={onChangeInput} />
                <ErrorMessage></ErrorMessage>
            </InputArea>
            <InputArea>
                <LoginLabel><i className="fa-solid fa-key"></i></LoginLabel>
                <Input type='password' placeholder='비밀번호를 입력해주세요' name='passwd' onChange={onChangeInput} onKeyDown={e => e.key === "Enter" ? postLoginData() : null} />
                <ErrorMessage></ErrorMessage>
            </InputArea>
            <LoginButton onClick={() => postLoginData()}>로그인</LoginButton>
        </LoginArea>
    );
};

export default AdminLogin;
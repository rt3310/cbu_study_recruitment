import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignupArea = styled.div`
    background-color: #fff;
    width: 600px;   
    border-radius: 2px;
    box-shadow: 0px 5px 10px 1px #0004;
    display: flex;
    padding: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InputArea = styled.div`
    height: 80px;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Input = styled.input`
    width: 300px;
    height: 50px;
    border:1px solid #000;
    border-radius: 2px;
    padding: 10px;
    outline: none;
`;

const Select = styled.select`
    width: 300px;
    height: 50px;
    border:1px solid #000;
    border-radius: 2px;
    padding: 10px;
    outline: none;
    cursor: pointer;
`;

const ErrorMessage = styled.span`
    color: red;
`;

const SignupButton = styled.button`
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
    &:disabled {
        background-color: #aaa;
        cursor: not-allowed;
        &:hover{
            border: 0;
            color: #fff;
        }
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

const HomeButton = styled.button`
    background-color: transparent;
    color: #555;
    margin: 0 10px;
    &:hover {
        color: #55f;
    }
`;

const SignupForm = () => {
    const navigate = useNavigate();
    const gradeRef = useRef();
    const passwdRef = useRef();
    const passwdCheckRef = useRef();
    const signupBtnRef = useRef();
    const [passwdError, setPasswdError] = useState("");
    const [signup, setSignup] = useState({
        loginId: "",
        passwd: "",
        memberName: "",
        academic: "",
        grade: null,
        department: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!signup.loginId || !signup.passwd || !signup.memberName || !signup.academic
            || !signup.grade || !signup.department) {
            signupBtnRef.current.disabled = true;
        } else {
            signupBtnRef.current.disabled = false;
        }
        console.log(signup);
    }, [signup]);

    const onChangeInput = (e) => {
        const nextSignup = {
            ...signup,
            [e.target.name]: e.target.value
        };
        setSignup(nextSignup);
    }

    const academicOnChange = (e) => {
        if (e.target.value === "졸업") {
            gradeRef.current.value = "4";
            gradeRef.current.disabled = true;
        } else if (e.target.value === "입학") {
            gradeRef.current.value = "1";
            gradeRef.current.disabled = true;
        } else {
            gradeRef.current.disabled = false;
        }
        const nextSignup = {
            ...signup,
            [e.target.name]: e.target.value,
            [gradeRef.current.name]: gradeRef.current.value
        };
        setSignup(nextSignup);
    };

    const onChangePasswd = (e) => {
        if (passwdRef.current.value === passwdCheckRef.current.value) {
            setPasswdError("");
             const nextSignup = {
                ...signup,
                [passwdRef.current.name]: passwdRef.current.value
            };
            setSignup(nextSignup);
        } else {
            if (e.target.name === "passwdCheck") {
                setPasswdError("비밀번호가 일치하지 않습니다.");
            }
        }
    };

    const postSignupData = () => {
        setLoading(true);
        try {
            axios.post("/api/members/signup", signup).then(response => {
                console.log(response);
                if (response.data.success === 0) {
                    alert('회원가입이 완료되었습니다.');
                    navigate('/');
                }
            }).catch(error => {
                alert(error.response.data);
            });
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    if (!signup) {
        return null;
    }

    if (loading) {
        return null;
    }

    return (
        <SignupArea>
            <InputArea>
                <Input placeholder='아이디' name='loginId' onChange={onChangeInput} />
                <ErrorMessage></ErrorMessage>
            </InputArea>
            <InputArea>
                <Input type='password' placeholder='비밀번호' name='passwd' ref={passwdRef} onChange={onChangePasswd} />
                <ErrorMessage></ErrorMessage>
            </InputArea>
            <InputArea>
                <Input type='password' placeholder='비밀번호 확인' name='passwdCheck' ref={passwdCheckRef} onChange={onChangePasswd} />
                {passwdError && <ErrorMessage>{passwdError}</ErrorMessage>}
            </InputArea>
            <InputArea>
                <Input type='text' placeholder='이름' name='memberName' onChange={onChangeInput} />
                <ErrorMessage></ErrorMessage>
            </InputArea>
            <InputArea>
                <Select onChange={academicOnChange} name='academic'>
                    <option value="">--학적상태--</option>
                    <option value="재학">재학</option>
                    <option value="휴학">휴학</option>
                    <option value="졸업">졸업</option>
                    <option value="졸업예정">졸업예정</option>
                    <option value="입학">입학</option>
                    <option value="편입">편입</option>
                </Select>
                <ErrorMessage></ErrorMessage>
            </InputArea>
            <InputArea>
                <Select ref={gradeRef} name='grade' onChange={onChangeInput}>
                    <option value="">--학년--</option>
                    <option value={1}>1학년</option>
                    <option value={2}>2학년</option>
                    <option value={3}>3학년</option>
                    <option value={4}>4학년 이상</option>
                </Select>
                <ErrorMessage></ErrorMessage>
            </InputArea>
            <InputArea>
                <Select name='department' onChange={onChangeInput}>
                    <option value="">--학과--</option>
                    <option value="컴퓨터공학부">컴퓨터공학부</option>
                    <option value="게임공학과">게임공학과</option>
                    <option value="인공지능학과">인공지능학과</option>
                    <option value="기계공학과">기계공학과</option>
                    <option value="기계설계공학과">기계설계공학과</option>
                    <option value="메카트로닉스공학부">메카트로닉스공학부</option>
                    <option value="전자공학부">전자공학부</option>
                    <option value="신소재공학과">신소재공학과</option>
                    <option value="생명화학공학과">생명화학공학과</option>
                    <option value="나노반도체공학과">나노반도체공학과</option>
                    <option value="에너지전기공학과">에너지전기공학과</option>
                    <option value="경영학부">경영학부</option>
                    <option value="디자인공학부">디자인공학부</option>
                </Select>
                <ErrorMessage></ErrorMessage>
            </InputArea>
            <SignupButton ref={signupBtnRef} onClick={() => postSignupData()}>회원가입</SignupButton>
            <AccessArea>
                <HomeButton onClick={() => navigate('/')}>로그인 하러 가기</HomeButton>
            </AccessArea>
        </SignupArea>
    );
};

export default SignupForm;
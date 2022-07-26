import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import axios from 'axios';

const PostArea = styled.div`
    background-color: #fff;
    width: 1200px;   
    height: 800px;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    box-shadow: 0px 5px 10px 1px #0004;
    padding: 0 30px 30px;
`;

const PostHeader = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
`;

const PrevButton = styled.button`
    background-color: transparent;
    font-size: 20px;
    transition-duration: 0.5s;
    &:hover {
        transform: translateX(-2px);
        color: #aaf;
    }
`;

const PostButton = styled.button`
    margin: 0 0 0 auto;
    border: 1px solid #aaf;
    border-radius: 5px;
    background-color: #aaf;
    color: #fff;
    font-size: 16px;
    transition-duration: 0.5s;
    padding: 2px 7px;
    &:hover {
        background-color: #fff;
        color: #aaf;
    }
`;

const FormContainer = styled.div`
    height: 800px;
    padding: 20px;
`;

const Label = styled.p`
    font-size: 18px;
`;

const SubLabel = styled.p`
    font-size: 14px;
    margin: 5px 0;
`;

const StudyTitle = styled.div`
    margin: 0 0 20px 0;
`;

const StudyTitleInput = styled.input`
    border: 1px solid #55f;
    border-radius: 2px;
    width: 100%;
    padding: 5px 10px;
    font-size: 20px;
    outline: none;
`;

const StudyContent = styled.div`
    margin: 0 0 20px 0;
`;

const StudyContentInput = styled.div`
    border: 1px solid #55f;
    border-radius: 2px;
    width: 100%;
    height: 200px;
    padding: 8px 10px;
    font-size: 16px;
    outline: none;
    overflow: auto;
`;

const StudyAdditionalContainer = styled.div`
    display: flex;
    width: 100%;
    height: 300px;
`;

const StudyPreparation = styled.div`
    width: 33%;
    margin: 0 3% 0 0;
`;

const StudyPreparationInput = styled.input`
    border: 1px solid #aaf;
    border-radius: 2px;
    width: 100%;
    padding: 5px 10px;
    outline: none;
    margin: 10px 0;
`;

const StudyPreparationItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    border-right: 1px solid #aaf;
    border-left: 1px solid #aaf;
    padding: 10px 10px 5px;
`;

const StudyPreparationItem = styled.div`
    border: 1px solid #aaf;
    border-radius: 2px;
    background-color: #55f2;
    padding: 2px 6px;
    margin: 0 10px 10px 0;
`;

const StudyRequired = styled.div`
    width: 64%;
`;

const DeadlineContainer = styled.div`
    margin: 15px 0;
`;

const DeadlineSelector = styled.select`
    border: 1px solid #78a;
    border-radius: 2px;
    cursor: pointer;
    margin-right: 10px;
`;

const MemberCountContainer = styled.div`
    margin: 15px 0;
`;

const RestrictionContainer = styled.div`
    margin: 15px 0;
`;

const DeadlineDatePicker = styled(ReactDatePicker)`
    margin: 5px 0;
    width: 160px;
    text-align: center;
    box-shadow: 5px 5px 10px 0px #aaa4;
    border-radius: 2px;
    padding: 5px 0;
    cursor: pointer;
    outline: none;
    transition-duration: 0.5s;
    &:hover, :focus {
        background-color: #aaf;
        color: #fff;
    }
`;

const CheckButton = styled.input`
    &[type="checkbox"] {
        --active: #aaf;
        --active-inner: #fff;
        --focus: 2px rgba(39, 94, 254, .3);
        --border: #78a;
        --border-hover: #55f;
        --background: #fff;
        --disabled: #F6F8FF;
        --disabled-inner: #E1E6F9;
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 21px;
        outline: none;
        display: inline-block;
        vertical-align: top;
        position: relative;
        margin: 0;
        cursor: pointer;
        border: 1px solid var(--bc, var(--border));
        background: var(--b, var(--background));
        transition: background .3s, border-color .3s, box-shadow .2s;
        &::after {
            content: '';
            display: block;
            left: 0;
            top: 0;
            position: absolute;
            transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
        }
        &:checked {
            --b: var(--active);
            --bc: var(--active);
            --d-o: .3s;
            --d-t: .6s;
            --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
        }
        &:disabled {
            --b: var(--disabled);
            cursor: not-allowed;
            opacity: .9;
            &:checked {
                --b: var(--disabled-inner);
                --bc: var(--border);
            }
            & + span {
                color: #777;
                cursor: not-allowed;
            }
            & + label {
                cursor: not-allowed;
            }
        }
        &:hover {
            &:not(:checked):not(:disabled) {
                --bc: var(--border-hover);
            }
        }
        &:focus {
            box-shadow: 0 0 0 var(--focus);
        }
        &:not(.switch) {
            width: 21px;
            &::after {
                opacity: var(--o, 0);
            }
            &:checked {
                --o: 1;
            }
        }
        & + label {
            font-size: 14px;
            line-height: 21px;
            display: inline-block;
            vertical-align: top;
            cursor: pointer;
            margin-left: 4px;
        }
        &:not(.switch) {
            border-radius: 7px;
            &::after {
                width: 5px;
                height: 9px;
                border: 2px solid var(--active-inner);
                border-top: 0;
                border-left: 0;
                left: 7px;
                top: 4px;
                transform: rotate(var(--r, 20deg));
            }
            &:checked {
                --r: 43deg;
            }
        }
        &.switch {
            width: 38px;
            border-radius: 11px;
            &:checked {
                --ab: var(--active-inner);
                --x: 17px;
            }
            &:disabled {
                &:not(:checked) {
                    &::after {
                        opacity: .6;
                    }
                }
            }
            &::after {
                left: 2px;
                top: 2px;
                border-radius: 50%;
                width: 15px;
                height: 15px;
                background: var(--ab, var(--border));
                transform: translateX(var(--x, 0));
            }
        }
    }
    &[type="radio"] {
        --active: #aaf;
        --active-inner: #fff;
        --focus: 2px rgba(39, 94, 254, .3);
        --border: #78a;
        --border-hover: #55f;
        --background: #fff;
        --disabled: #F6F8FF;
        --disabled-inner: #E1E6F9;
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 21px;
        outline: none;
        display: inline-block;
        vertical-align: top;
        position: relative;
        margin: 0;
        cursor: pointer;
        border: 1px solid var(--bc, var(--border));
        background: var(--b, var(--background));
        transition: background .3s, border-color .3s, box-shadow .2s;
        border-radius: 50%;
        &::after {
            content: '';
            display: block;
            left: 0;
            top: 0;
            position: absolute;
            transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
            width: 19px;
            height: 19px;
            border-radius: 50%;
            background: var(--active-inner);
            opacity: 0;
            transform: scale(var(--s, .7));
        }
        &:checked {
            --b: var(--active);
            --bc: var(--active);
            --d-o: .3s;
            --d-t: .6s;
            --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
            --s: .5;
        }
        &:disabled {
            --b: var(--disabled);
            cursor: not-allowed;
            opacity: .9;
            &:checked {
                --b: var(--disabled-inner);
                --bc: var(--border);
            }
            & + label {
                cursor: not-allowed;
            }
        }
        &:hover {
            &:not(:checked):not(:disabled) {
                --bc: var(--border-hover);
            }
        }
        &:focus {
            box-shadow: 0 0 0 var(--focus);
        }
        &:not(.switch) {
            width: 21px;
            &::after {
                opacity: var(--o, 0);
            }
            &:checked {
                --o: 1;
            }
        }
        & + label {
            font-size: 14px;
            line-height: 21px;
            display: inline-block;
            vertical-align: top;
            cursor: pointer;
            margin-left: 4px;
        }
    }
`;

const CheckLabel = styled.label`
    margin-right: 20px;
    & > span {    
        padding-left: 5px;
        font-size: 14px;
        cursor: pointer;
    }
`;


const PostForm = () => {
    const navigate = useNavigate();
    const [preparationList, setPreparationList] = useState([]);
    const [deadline, setDeadline] = useState(new Date());
    const today = new Date();
    const [post, setPost] = useState({
        title: "",
        content: "",
        deadline: today.getFullYear() + '.' + String(today.getMonth() + 1).padStart(2, '0') + '.' + String(today.getDate()).padStart(2, '0') + ' ' + String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0') + ':' + String(today.getSeconds()).padStart(2, '0'),
        memberTotal: 2,
        studyPreparations: [],
        studyRestrictions: []
    });
    const [restriction, setRestriction] = useState("none");
    const [checkList, setCheckList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    const getMemberData = () => {
        setLoading(true);
        try {
            axios.get("/api/members/my").then(response => {
                console.log(response.data);
            }).catch(error => {
                navigate('/');
                alert('로그인이 필요합니다.');
            });
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };
    getMemberData();
    }, []);

    useEffect(() => {
        const nextPost = {
            ...post,
            studyRestrictions: checkList
        };
        setPost(nextPost);
    }, [checkList]);

    useEffect(() => {
        const nextPost = {
            ...post,
            studyPreparations: preparationList
        };
        setPost(nextPost);
    }, [preparationList]);

    useEffect(() => {
        const nextPost = {
            ...post,
            deadline: deadline.getFullYear() + '.' + String(deadline.getMonth() + 1).padStart(2, '0') + '.' + String(deadline.getDate()).padStart(2, '0') + " 00:00:00"
        }
        setPost(nextPost);
    }, [deadline]);

    useEffect(() => {
        console.log(post);
    }, [post]);
    
    const deletePreparation = (deleteIndex) => {
        setPreparationList(preparationList.filter((preparation, index) => index !== deleteIndex));
    };

    const addPreparation = (e) => {
        if (e.keyCode === 13) {
            setPreparationList([...preparationList, e.target.value])
            e.target.value = "";
        }
    };

    const formOnChange = (e) => {
        let value = e.target.value;

        if (!isNaN(value) && e.target.name !== 'title') {
            value = Number(value);
        }
        const nextPost = {
            ...post,
            [e.target.name]: value
        };
        setPost(nextPost);
    };

    const formContentOnKeyUp = (e) => {
        const nextPost = {
            ...post,
            content: e.target.innerHTML
        };
        setPost(nextPost);
    };

    const addCheckList = (e) => {
        if (e.target.checked === true) {
            setCheckList(checkList.concat(e.target.value));
        } else {
            setCheckList(checkList.filter(checked => checked !== e.target.value));
        }
    };

    const setRestrictionChanged = (e) => {
        if (restriction !== e.target.value) {
            setRestriction(e.target.value);
            setCheckList([]);
        }
    };

    const postStudy = () => {
        try {
            axios.post("/api/studies", post).then(response => {
                if (response.data.success === 0) {
                    alert('개설이 완료되었습니다.');
                    console.log(response.data.data.study);
                }
            }).catch(error => {
                console.log(error);
            });
        } catch (e) {
            console.log(e);
        }
    }

    if (!post) {
        return null;
    }

    if (loading) {
        return null;
    }

    return (
        <PostArea>
            <PostHeader>
                <PrevButton onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></PrevButton>
                <PostButton onClick={() => postStudy()}>개설하기</PostButton>
            </PostHeader>
            <FormContainer>
                <StudyTitle>
                    <Label>제목</Label>
                    <StudyTitleInput name='title' onChange={formOnChange} />
                </StudyTitle>
                <StudyContent>
                    <Label>내용</Label>
                    <StudyContentInput contentEditable onKeyUp={formContentOnKeyUp}></StudyContentInput>
                </StudyContent>
                <StudyAdditionalContainer>
                    <StudyPreparation>
                        <Label>준비물</Label>
                        <StudyPreparationItemContainer>
                            {
                                preparationList.map((preparation, index) => (
                                    <StudyPreparationItem key={index}>{preparation} <span style={{ cursor: 'pointer'}} onClick={() => deletePreparation(index)}><i className="fa-solid fa-xmark"></i></span></StudyPreparationItem>
                                ))
                            }
                        </StudyPreparationItemContainer>
                        <StudyPreparationInput onKeyDown={e => addPreparation(e)} placeholder="준비물을 입력해주세요"/>
                    </StudyPreparation>
                    <StudyRequired>
                        <Label>설정</Label>
                        <DeadlineContainer>
                            <SubLabel>모집 마감일</SubLabel>
                            <DeadlineDatePicker selected={deadline} onChange={setDeadline} dateFormat="yyyy.MM.dd (eee)" locale={ko} minDate={new Date()} />
                        </DeadlineContainer>
                        <MemberCountContainer>
                            <SubLabel>모집인원</SubLabel>
                            <CheckLabel>
                                <CheckButton type="radio" name='memberTotal' checked={post.memberTotal === 2 ? true : false} onClick={e => formOnChange(e)} value={2} readOnly />
                                <span>2명</span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="radio" name='memberTotal' checked={post.memberTotal === 3 ? true : false} onClick={e => formOnChange(e)} value={3} readOnly />
                                <span>3명</span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="radio" name='memberTotal' checked={post.memberTotal === 4 ? true : false} onClick={e => formOnChange(e)} value={4} readOnly />
                                <span>4명</span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="radio" name='memberTotal' checked={post.memberTotal === 5 ? true : false} onClick={e => formOnChange(e)} value={5} readOnly />
                                <span>5명</span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="radio" name='memberTotal' checked={post.memberTotal === 6 ? true : false} onClick={e => formOnChange(e)} value={6} readOnly />
                                <span>6명</span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="radio" name='memberTotal' checked={post.memberTotal === 7 ? true : false} onClick={e => formOnChange(e)} value={7} readOnly />
                                <span>7명</span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="radio" name='memberTotal' checked={post.memberTotal === 8 ? true : false} onClick={e => formOnChange(e)} value={8} readOnly />
                                <span>8명</span>
                            </CheckLabel>
                        </MemberCountContainer>
                        <RestrictionContainer>
                            <SubLabel>제한사항</SubLabel>
                            <CheckLabel>
                                <CheckButton type="radio" value="none" readOnly checked={restriction === "none" ? true : false} onClick={(e) => setRestrictionChanged(e)} />
                                <span>상관없음</span>
                            </CheckLabel>
                            <br /> <br />
                            <CheckLabel>
                                <CheckButton type="radio" value="block" readOnly checked={restriction === "block" ? true : false} onClick={(e) => setRestrictionChanged(e)} />
                                <span>Block</span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="checkbox" value="신입생제한" checked={checkList.find(checked => checked === "신입생제한") ? true : false} disabled={restriction === "block" ? false : true} onClick={(e) => addCheckList(e)} />
                                <span>신입생 <i className="fa-solid fa-xmark"></i></span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="checkbox" value="재학생제한" checked={checkList.find(checked => checked === "재학생제한") ? true : false} disabled={restriction === "block" ? false : true} onClick={(e) => addCheckList(e)} />
                                <span>재학생 <i className="fa-solid fa-xmark"></i></span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="checkbox" value="휴학생제한" checked={checkList.find(checked => checked === "휴학생제한") ? true : false} disabled={restriction === "block" ? false : true} onClick={(e) => addCheckList(e)} />
                                <span>휴학생 <i className="fa-solid fa-xmark"></i></span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="checkbox" value="편입생제한" checked={checkList.find(checked => checked === "편입생제한") ? true : false} disabled={restriction === "block" ? false : true} onClick={(e) => addCheckList(e)} />
                                <span>편입생 <i className="fa-solid fa-xmark"></i></span>
                            </CheckLabel>
                            <br /> <br />
                            <CheckLabel>
                                <CheckButton type="radio" value="only" readOnly checked={restriction === "only" ? true : false} onClick={(e) => setRestrictionChanged(e)} />
                                <span>Only</span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="checkbox" value="신입생만" checked={checkList.find(checked => checked === "신입생만") ? true : false} disabled={restriction === "only" ? false : true} onClick={(e) => addCheckList(e)} />
                                <span>신입생만</span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="checkbox" value="재학생만" checked={checkList.find(checked => checked === "재학생만") ? true : false} disabled={restriction === "only" ? false : true} onClick={(e) => addCheckList(e)} />
                                <span>재학생만</span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="checkbox" value="편입생만" checked={checkList.find(checked => checked === "편입생만") ? true : false} disabled={restriction === "only" ? false : true} onClick={(e) => addCheckList(e)} />
                                <span>편입생만</span>
                            </CheckLabel>
                            <CheckLabel>
                                <CheckButton type="checkbox" value="졸업생만" checked={checkList.find(checked => checked === "졸업/졸업예정자만") ? true : false} disabled={restriction === "only" ? false : true} onClick={(e) => addCheckList(e)} />
                                <span>졸업/졸업예정자만</span>
                            </CheckLabel>
                        </RestrictionContainer>
                    </StudyRequired>
                </StudyAdditionalContainer>
            </FormContainer>
        </PostArea>
    );
};

export default PostForm;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EnrollList from './EnrollList';

const EnrollContainer = styled.div`
    background-color: #fff;
    width: 1200px;   
    height: 800px;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    box-shadow: 0px 5px 10px 1px #0004;
    padding: 0 30px 30px;
`;

const EnrollHeader = styled.div`
    width: 100%;
    height: 70px;
    margin: 0 0 auto 0;
    position: relative;
    display: flex;
    align-items: center;
`;

const PrevButton = styled.button`
    background-color: transparent;
    font-size: 20px;
    transition-duration: 0.5s;
    margin: 0 10px;
    &:hover {
        transform: translateX(-2px);
        color: #aaf;
    }
`;

const HeaderLabel = styled.h3`
    margin: 0 10px -2px;
`;

const StudyCountStatus = styled.h3`
    margin: 0 0 0 auto;
`;

const DetailAllCloseButton = styled.button`
    margin: 0 10px 0 20px;
    background-color: transparent;
    font-size: 20px;
    transition-duration: 0.5s;
    &:hover {
        transform: translateY(-2px);
        color: #aaf;
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

const EnrollArea = () => {
    const [allFoldDetail, setAllFoldDetail] = useState(false);
    const navigate = useNavigate();
    const [notClosedCount, setNotClosedCount] = useState(null);
    const [studies, setStudies] = useState([]);
    const [viewProgressStudy, setViewProgressStudy] = useState(true);
    const [loading, setLoading] = useState(false);

    const getStudyData = () => {
        setLoading(true);
        try {
            axios.get("/api/studies").then(response => {
                if (response.data.success === 0) {
                    setStudies(response.data.data.studies);
                }
            }).catch(error => {
                console.log(error);
            });
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    const getNotClosedStudyData = () => {
        setLoading(true);
        try {
            axios.get("/api/studies/opened").then(response => {
                if (response.data.success === 0) {
                    setStudies(response.data.data.studies);
                }
            }).catch(error => {
                alert(error.response.data.error);
            })
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

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
        const getNotClosedCount = () => {
            setLoading(true);
            try {
                axios.get("/api/studies/count").then(response => {
                    if (response.data.success === 0) {
                        setNotClosedCount(response.data.data.notClosedCount);
                    }
                }).catch(error => {
                    console.log(error);
                });
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        getMemberData();
        getNotClosedCount();
        getNotClosedStudyData();
    }, []);

    useEffect(() => {
        if (viewProgressStudy) {
            getNotClosedStudyData();
        } else {
            getStudyData();
        }
    }, [viewProgressStudy]);

    if (loading) {
        return null;
    }
    
    return (
        <EnrollContainer>
            <EnrollHeader>
                <PrevButton onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></PrevButton>
                <HeaderLabel>모집 중인 스터디만 보기</HeaderLabel>
                <CheckButton type="checkbox" className="switch" checked={viewProgressStudy} onClick={() => setViewProgressStudy(!viewProgressStudy)}></CheckButton>
                <StudyCountStatus>현재 모집 중인 스터디: {notClosedCount}</StudyCountStatus>
                <DetailAllCloseButton onClick={() => setAllFoldDetail(true)}><i className="fa-solid fa-folder-minus"></i></DetailAllCloseButton>
            </EnrollHeader>
            <EnrollList studies={studies} studyCount={notClosedCount} emptyComment="개설된 스터디가 없습니다." allFoldDetail={allFoldDetail} setAllFoldDetail={setAllFoldDetail} status="enroll" />
        </EnrollContainer>
    );
};

export default EnrollArea;
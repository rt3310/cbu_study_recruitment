import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EnrollList from '../enroll/EnrollList';


const ManageContainer = styled.div`
    background-color: #fff;
    width: 1200px;   
    height: 800px;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    box-shadow: 0px 5px 10px 1px #0004;
    padding: 0 30px 30px;
`;

const ManageHeader = styled.div`
    width: 100%;
    height: 100px;
    margin: 0 0 auto 0;
    position: relative;
    display: flex;
    align-items: center;
`;

const SubHeader = styled.div`
    display: flex;
    align-items: center;
`;

const SubTitle = styled.h3`
    
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

const DetailAllCloseButton = styled.button`
    margin: 0 0 0 auto;
    background-color: transparent;
    font-size: 20px;
    transition-duration: 0.5s;
    &:hover {
        transform: translateY(-2px);
        color: #aaf;
    }
`;

const ManageArea = () => {
    const [appliedFoldDetail, setAppliedFoldDetail] = useState(false);
    const [openFoldDetail, setOpenFoldDetail] = useState(false);
    const navigate = useNavigate();
    const [appliedStudyCount, setAppliedStudyCount] = useState(null);
    const [openStudyCount, setOpenStudyCount] = useState(null);
    const [appliedStudies, setAppliedStudies] = useState([]);
    const [openStudies, setOpenStudies] = useState([]);
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
        const getNotClosedCount = () => {
            setLoading(true);
            try {
                axios.get("/api/members/my/studies/count").then(response => {
                    if (response.data.success === 0) {
                        setOpenStudyCount(response.data.data.studyCount);
                    }
                }).catch(error => {
                    console.log(error);
                });
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        const getMyAppliedCount = () => {
            setLoading(true);
            try {
                axios.get("/api/members/my/studies/applied/count").then(response => {
                    if (response.data.success === 0) {
                        setAppliedStudyCount(response.data.data.appliedStudyCount);
                    }
                }).catch(error => {
                    console.log(error);
                });
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        const getOpenStudyData = () => {
            setLoading(true);
            try {
                axios.get("/api/members/my/studies").then(response => {
                    if (response.data.success === 0) {
                        setOpenStudies(response.data.data.studies);
                    }
                }).catch(error => {
                    console.log(error);
                });
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        const getAppliedStudyData = () => {
            setLoading(true);
            try {
                axios.get("/api/members/my/studies/applied").then(response => {
                    if (response.data.success === 0) {
                        setAppliedStudies(response.data.data.studies);
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
        getMyAppliedCount();
        getOpenStudyData();
        getAppliedStudyData();
    }, []);

    if (loading) {
        return null;
    }
    
    return (
        <ManageContainer>
            <ManageHeader>
                <PrevButton onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></PrevButton>
            </ManageHeader>
            <SubHeader>
                <SubTitle>내가 신청한 스터디: {appliedStudyCount}</SubTitle>
                <DetailAllCloseButton onClick={() => setAppliedFoldDetail(true)}><i className="fa-solid fa-folder-minus"></i></DetailAllCloseButton>
            </SubHeader>
            <EnrollList studies={appliedStudies} studyCount={appliedStudyCount} emptyComment="신청한 스터디가 없습니다." allFoldDetail={appliedFoldDetail} setAllFoldDetail={setAppliedFoldDetail} status="enroll" />
            <hr />
            <SubHeader>
                <SubTitle>내가 개설한 스터디: {openStudyCount}</SubTitle>
                <DetailAllCloseButton onClick={() => setOpenFoldDetail(true)}><i className="fa-solid fa-folder-minus"></i></DetailAllCloseButton>
            </SubHeader>
            <EnrollList studies={openStudies} studyCount={openStudyCount} emptyComment="개설한 스터디가 없습니다." allFoldDetail={openFoldDetail} setAllFoldDetail={setOpenFoldDetail} status="manage" />
        </ManageContainer>
    );
};

export default ManageArea;
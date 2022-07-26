import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const EnrollLi = styled.li`
    /* border-bottom: 1px solid #ccd; */
    & > ul {
        display: flex;
        align-items: center;
        padding: 8px 0;
        &:hover {
            background-color: #55f2;
        }
    }
    & > ul > li {
        text-align: center;
    }
    &:nth-child(2n-1) {
        background-color: #aaf2;
    }
    &:last-child {
        border-radius: 0 0 5px 5px;
    }
`;


const EnrollNumber = styled.li`
    width: 60px;
`;

const EnrollTitle = styled.li`
    flex-grow: 1;
`;

const EnrollCreator = styled.li`
    width: 100px;
`;

const EnrollCreatedDate = styled.li`
    width: 100px;
`;

const EnrollDeadline = styled.li`
    width: 100px;
`;

const EnrollStatus = styled.li`
    width: 80px;
`;

const EnrollCount = styled.li`
    width: 70px;
`;

const EnrollAccess = styled.li`
    width: 70px;
`;

const PositiveButton = styled.button`
    color: #fff;
    border: 0.5px solid #aaf;
    background-color: #aaf;
    padding: 2px 7px;
    border-radius: 2px;
    transition-duration: 0.5s;
    &:hover {
        color: #aaf;
        background-color: #fff;
    }
`;

const NegativeButton = styled.button`
    color: #fff;
    border: 0.5px solid #faa;
    background-color: #faa;
    padding: 2px 7px;
    border-radius: 2px;
    transition-duration: 0.5s;
    &:hover {
        color: #faa;
        background-color: #fff;
    }
    &.delete {
        border: 0.5px solid #f77;
        background-color: #f77;
        &:hover {
            color: #f77;
            background-color: #fff;
        }
    }
`;

const EnrollDetail = styled.div`
    height: 0px;
    transition: height 0.5s;
    /* padding: 20px 40px; */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    &.opened {
        height: 300px;
    }
`;

const StudyContent = styled.div`
    border: 1px solid #ccf;
    background-color: #fff;
    border-radius: 2px;
    width: 600px;
    height: 250px;
    margin-right: 20px;
    overflow: auto;
    padding: 10px 14px;
`;

const PreparationList = styled.ul`
    border: 1px solid #ccf;
    background-color: #fff;
    border-radius: 2px;
    width: 180px;
    height: 250px;
    margin-right: 20px;
    overflow: auto;
    padding: 10px 14px;
    & > li:not(:last-child) {
        border-bottom: 1px solid #ccf;
    }
    & > li {
        padding: 5px;
    }
`;

const MemberList = styled.ul`
    border: 1px solid #ccf;
    background-color: #fff;
    border-radius: 2px;
    width: 200px;
    height: 250px;
    overflow: auto;
    padding: 10px 14px;
    & > li:not(:last-child) {
        border-bottom: 1px solid #ccf;
    }
    & > li {
        text-align: center;
        padding: 5px;
    }
`;

const MemberAcceptButton = styled.button`
    color: #fff;
    border: 0.5px solid #aaf;
    background-color: #aaf;
    padding: 0 5px;
    margin: 0 5px;
    border-radius: 2px;
    transition-duration: 0.5s;
    font-size: 12px;
    &:hover {
        color: #aaf;
        background-color: #fff;
    }
`;

const MemberRefuseButton = styled.button`
    color: #fff;
    border: 0.5px solid #faa;
    background-color: #faa;
    padding: 0 5px;
    border-radius: 2px;
    transition-duration: 0.5s;
    font-size: 12px;
    &:hover {
        color: #faa;
        background-color: #fff;
    }
`;

const RestrictionStatus = styled.span`
    font-size: 12px;
    padding: 0 4px;
    border-radius: 30px;
    margin: 0 0 0 5px;
    &.block {
        border: 1px solid #f558;
        background-color: #f553;
        color: #f00;
    }
    &.only {
        border: 1px solid #55f8;
        background-color: #55f3;
        color: #55f;
    }
`;

const EnrollListItem = (props) => {
    const { allFoldDetail, setAllFoldDetail } = props;
    const { study, index } = props;
    const { status } = props;
    const navigate = useNavigate();
    const [openDetail, setOpenDetail] = useState(false);
    const [member, setMember] = useState({
        id: null,
        memberName: "",
        academic: "",
        grade: null,
        department: ""
    });
    const [studyMembers, setStudyMembers] = useState(null);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const getMemberData = () => {
            setLoading(true);
            try {
                axios.get("/api/members/my").then(response => {
                    if (response.data.success === 0) {
                        setMember(response.data.data.member);
                    }
                }).catch(error => {
                    navigate('/');
                    alert('로그인이 필요합니다.');
                });
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        const getStudyMembers = () => {
            setLoading(true);
            try {
                axios.get("/api/studies/" + study.id + "/members").then(response => {
                    if (response.data.success === 0) {
                        setStudyMembers(response.data.data.studyMembers);
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
        getStudyMembers();
    }, []);

    useEffect(() => {
        if (allFoldDetail === true) {
            setOpenDetail(false);
            setAllFoldDetail(false);
        }
    }, [allFoldDetail]);

    const createMarkup = () => {
        return { __html: study.content };
    }

    const postStudyMembers = () => {
            setLoading(true);
            try {
                axios.post("/api/studies/" + study.id + "/members").then(response => {
                    if (response.data.success === 0) {
                        setStudyMembers(response.data.data.studyMembers);
                        alert('신청되었습니다.');
                        window.location.reload();
                    }
                }).catch(error => {
                    alert(error.response.data.error);
                });
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
    };
    
    const enrollOnClick = (e) => {
        e.stopPropagation();
        
        if (window.confirm('신청하시겠습니까?')) {
            postStudyMembers();
        }
    };

    const calcelStudyMember = (memberId) => {
        setLoading(true);
            try {
                axios.delete("/api/studies/" + study.id + "/members/" + memberId).then(response => {
                    if (response.data.success === 0) {
                        alert('취소되었습니다.');
                        window.location.reload();
                    }
                }).catch(error => {
                    alert(error.response.data.error);
                });
            } catch (e) {
                console.log(e);
            }
        setLoading(false);
    };

    const cancelOnClick = (e, memberId) => {
        e.stopPropagation();
        
        if (window.confirm('취소하시겠습니까?')) {
            calcelStudyMember(memberId);
        };
    }

    const toggleStudy = (status) => {
        setLoading(true);
        try {
            axios.put("/api/studies/" + study.id + "/" + status).then(response => {
                if (response.data.success === 0) {
                    status === "open" ? alert('공개되었습니다.') : alert('마감되었습니다.');
                    window.location.reload();
                }
            }).catch(error => {
                alert(error.response);
            });
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    const studyChangeOnClick = (e, status) => {
        e.stopPropagation();
        
        if (status === "close") {
            if (window.confirm('마감하시겠습니까?')) {
                toggleStudy(status);
            }
        } else {
            if (window.confirm('공개하시겠습니까?')) {
                toggleStudy(status);
            }
        }
    };

    const acceptStudyMember = (memberId) => {
        setLoading(true);
            try {
                axios.put("/api/studies/" + study.id + "/members/" + memberId).then(response => {
                    if (response.data.success === 0) {
                        alert('수락되었습니다.');
                        window.location.reload();
                    }
                }).catch(error => {
                    alert(error.response.data.error);
                });
            } catch (e) {
                console.log(e);
            }
        setLoading(false);
    };

    if (loading) {
        return null;
    }

    if (!studyMembers) {
        return null;
    }

    return (
        <EnrollLi>
            <ul onClick={() => setOpenDetail(!openDetail)}>
                <EnrollNumber>{index}</EnrollNumber>
                <EnrollTitle>{study.title}{
                    study.studyRestrictions.map((studyRestriction, index) => (
                        <RestrictionStatus key={index} className={studyRestriction.slice(-1) === "만" ? "only" : "block"}>{studyRestriction}</RestrictionStatus>
                    ))
                }
                </EnrollTitle>
                <EnrollCreator>{study.memberName}</EnrollCreator>
                <EnrollCreatedDate>{study.createdDate.split(' ')[0]}</EnrollCreatedDate>
                <EnrollDeadline>{study.deadline.split(' ')[0]}</EnrollDeadline>
                <EnrollStatus>{study.closed ? "마감" : "모집중"}</EnrollStatus>
                <EnrollCount>{study.memberTally}/{study.memberTotal}</EnrollCount>
                {status === "enroll" && !studyMembers.find(studyMember => studyMember.memberId === member.id) && <EnrollAccess>
                    <PositiveButton onClick={e => enrollOnClick(e)}>신청</PositiveButton>
                </EnrollAccess>}
                {status === "enroll" && studyMembers.find(studyMember => studyMember.memberId === member.id) && <EnrollAccess>
                    <NegativeButton onClick={e => cancelOnClick(e, member.id)}>취소</NegativeButton>
                </EnrollAccess>}
                {status === "manage" && study.closed && <EnrollAccess>
                    <PositiveButton onClick={(e) => studyChangeOnClick(e, "open")}>모집</PositiveButton>
                </EnrollAccess>}
                {status === "manage" && !study.closed && <EnrollAccess>
                    <NegativeButton onClick={(e) => studyChangeOnClick(e, "close")}>마감</NegativeButton>
                </EnrollAccess>}
                {status === "manage" && <EnrollAccess>
                    <NegativeButton className='delete'>삭제</NegativeButton>
                </EnrollAccess>}
            </ul>
            <EnrollDetail className={openDetail ? "opened" : null}>
                <div>
                    <span>내용</span>
                    <StudyContent dangerouslySetInnerHTML={createMarkup()}>
                    </StudyContent>
                </div>
                <div>
                    <span>준비물</span>
                    <PreparationList>
                        {
                            study.studyPreparations.map((studyPreparation, index) => (
                                <li key={index}>{studyPreparation}</li>
                            ))
                        }
                    </PreparationList>
                </div>
                <div>
                    <span>{status === "enroll" ? "신청멤버" : "신청목록"}</span>
                    <MemberList>
                        {studyMembers.map(studyMember => (
                            <li key={studyMember.id}>
                                {(studyMember.accepted || studyMember.memberId === member.id || study.memberId === member.id) &&
                                    studyMember.memberName + " | " + studyMember.memberDepartment +
                                    (studyMember.memberId !== study.memberId && (studyMember.memberId === member.id || study.memberId === member.id)
                                        ? (!studyMember.accepted ? " | 대기" : " | 승인")
                                        : "")}
                                <br />
                                {status === "manage" && !studyMember.accepted && <MemberAcceptButton onClick={() => acceptStudyMember(studyMember.memberId)}>수락</MemberAcceptButton>}
                                {status === "manage" && study.memberId !== studyMember.memberId && <MemberRefuseButton onClick={(e) => cancelOnClick(e, studyMember.memberId)}>{studyMember.accepted ? "추방" : "거절"}</MemberRefuseButton>}
                            </li>
                        ))}
                    </MemberList>
                </div>
            </EnrollDetail>
        </EnrollLi>
    );
};

export default EnrollListItem;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EnrollListItem from './EnrollListItem';

const EnrollUl = styled.ul`
    width: 100%;
    overflow: auto;
    height: 700px;
`;

const EnrollHead = styled.li`
    color: #fff;
    background-color: #aaf;
    padding: 4px 0;
    border-radius: 5px 5px 0 0;
    & ul {
        display: flex;
    }
    & > ul > li {
        text-align: center;
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

const StudyInfoArea = styled.div`
    background-color: #eee;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #555;
`;

const EnrollList = (props) => {
    const { studies, studyCount } = props;
    const { emptyComment } = props;
    const { status } = props;
    const { allFoldDetail, setAllFoldDetail } = props;    

    return (
        <EnrollUl>
            <EnrollHead>
                <ul>
                    <EnrollNumber>#</EnrollNumber>
                    <EnrollTitle>제목</EnrollTitle>
                    <EnrollCreator>개설자</EnrollCreator>
                    <EnrollCreatedDate>개설일</EnrollCreatedDate>
                    <EnrollDeadline>마감일</EnrollDeadline>
                    <EnrollStatus>상태</EnrollStatus>
                    <EnrollCount>인원</EnrollCount>
                    <EnrollAccess>신청</EnrollAccess>
                    {status==="manage" && <EnrollAccess>삭제</EnrollAccess>}
                </ul>
            </EnrollHead>
            {studies.map((study, index) => (
                <EnrollListItem key={study.id} allFoldDetail={allFoldDetail} setAllFoldDetail={setAllFoldDetail} study={study} index={index+1} status={status} />
            ))}
            {!studyCount && <StudyInfoArea>
                <p>{emptyComment}</p>
            </StudyInfoArea>}
        </EnrollUl>
    );
};

export default EnrollList;
import React from 'react';
import styled from 'styled-components';

const StudyManageContainer = styled.div`
    background-color: #fff;
    width: 1140px;
    height: 100%;
    display: grid;
    // 11 2 2 5 5
    grid-template-columns: repeat(6, 190px);
    grid-template-rows: repeat(16, 50px);
    align-items: center;
    justify-items: center;
`;

const TitleLabel = styled.h2`
    font-weight: normal;
`;

const SubLabel = styled.span`
    font-size: 14px;  
`;

const StudyManage = () => {
    return (
        <StudyManageContainer>
            <TitleLabel>스터디 모집기간 설정</TitleLabel>
            <SubLabel>종료일</SubLabel>
        </StudyManageContainer>
    );
};

export default StudyManage;
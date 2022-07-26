import React from 'react';
import styled from 'styled-components';

const LogLi = styled.li`
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

const LogNumber = styled.li`
    width: 60px;
`;

const LogId = styled.li`
    width: 60px;
`;

const LogMessage = styled.li`
    flex-grow: 1;
`;

const LogCreatedDate = styled.li`
    width: 140px;
`;

const LogType = styled.li`
    width: 80px;
`;

const LogCategory = styled.li`
    width: 100px;
`;

const LogMember = styled.li`
    width: 200px;
`;

const StudyLogListItem = (props) => {
    const { log } = props;
    const { index } = props;

    return (
        <LogLi>
            <ul>
                <LogNumber>{index}</LogNumber>
                <LogId>{log.id}</LogId>
                <LogType>{log.logType}</LogType>
                <LogCategory>{log.category}</LogCategory>
                <LogMessage>{log.memberName}님이 {log.message}</LogMessage>
                <LogCreatedDate>{log.createdDate}</LogCreatedDate>
                <LogMember>{log.memberLoginId} ({log.ip})</LogMember>
            </ul>
        </LogLi>
    );
};

export default StudyLogListItem;
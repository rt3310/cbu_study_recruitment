import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StudyLogListItem from './StudyLogListItem';

const StudyLogContainer = styled.div`
    width: 1140px;
    height: 100%;
    padding: 20px;
`;

const StudyLogList = styled.ul`
    width: 100%;
    overflow: auto;
    height: 700px;
`;

const StudyLogHead = styled.li`
    color: #fff;
    background-color: #33a;
    padding: 4px 0;
    border-radius: 5px 5px 0 0;
    & ul {
        display: flex;
    }
    & > ul > li {
        text-align: center;
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

const StudyLog = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        const getLogData = () => {
            setLoading(true);
            try {
                axios.get("/api/admin/logs").then(response => {
                    if (response.data.success === 0) {
                        setLogs(response.data.data.logHistories);
                    } else {
                        console.log(response.data.data.error);
                    }
                }).catch(error => {
                    console.log(error.response.data.error);
                });
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        }
        getLogData();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <StudyLogContainer>
            <StudyLogList>
                <StudyLogHead>
                    <ul>
                        <LogNumber>#</LogNumber>
                        <LogId>ID</LogId>
                        <LogType>Type</LogType>
                        <LogCategory>Category</LogCategory>
                        <LogMessage>Message</LogMessage>
                        <LogCreatedDate>Created Date</LogCreatedDate>
                        <LogMember>Member</LogMember>
                    </ul>
                </StudyLogHead>
                {
                    logs.map((log, index) => (
                        <StudyLogListItem key={log.id} log={log} index={index+1} />
                    ))
                }
            </StudyLogList>
        </StudyLogContainer>
    );
};

export default StudyLog;
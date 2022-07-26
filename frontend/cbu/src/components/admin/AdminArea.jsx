import React, { useState } from 'react';
import styled from 'styled-components';
import AdminNav from './AdminNav';
import AdminProfile from './AdminProfile';
import ManagerSetting from './ManagerSetting';
import MemberManage from './MemberManage';
import StudyLog from './StudyLog';
import StudyManage from './StudyManage';

const AdminContainer = styled.div`
    background-color: #fff;
    width: 1400px;   
    height: 800px;
    border-radius: 2px;
    box-shadow: 0px 5px 10px 1px #0004;
    display: flex;
`;

const AdminAccess = styled.div`
    width: 260px;
    height: 100%;
`;

const AdminArea = () => {
    const [selected, setSelected] = useState('studyManage');
    
    return (
        <AdminContainer>
            <AdminAccess>
                <AdminProfile />
                <AdminNav selected={selected} setSelected={setSelected} />
            </AdminAccess>
            {selected === "studyManage" && <StudyManage />}
            {selected === "studyLog" && <StudyLog />}
            {selected === "memberManage" && <MemberManage />}
            {selected === "managerSetting" && <ManagerSetting />}
        </AdminContainer>
    );
};

export default AdminArea;
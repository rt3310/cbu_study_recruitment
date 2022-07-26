import React from 'react';
import styled from 'styled-components';
import ManageArea from '../components/manage/ManageArea';
import MenuArea from '../components/menu/MenuArea';

const ManageSection = styled.div`
    background-color: #ccf;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ManagePage = () => {
    return (
        <ManageSection>
            <MenuArea />
            <ManageArea />
        </ManageSection>
    );
};

export default ManagePage;
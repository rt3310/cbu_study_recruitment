import React from 'react';
import styled from 'styled-components';
import CommunityArea from '../components/community/CommunityArea';
import MenuArea from '../components/menu/MenuArea';

const CommunitySection = styled.div`
    background-color: #ccf;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const CommunityPage = () => {
    return (
        <CommunitySection>
            <MenuArea />
            <CommunityArea />
        </CommunitySection>
    );
};

export default CommunityPage;
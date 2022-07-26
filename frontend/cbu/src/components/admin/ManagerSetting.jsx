import React from 'react';
import styled from 'styled-components';

const ManagerSettingContainer = styled.div`
    width: 1140px;
    height: 100%;  
`;

const TitleLabel = styled.h3`
    font-weight: normal;
`;

const ManagerSetting = () => {
    return (
        <ManagerSettingContainer>
            <TitleLabel></TitleLabel>
        </ManagerSettingContainer>
    );
};

export default ManagerSetting;
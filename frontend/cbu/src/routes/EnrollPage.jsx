import React from 'react';
import styled from 'styled-components';
import MenuArea from '../components/menu/MenuArea';
import EnrollArea from '../components/enroll/EnrollArea';

const EnrollSection = styled.div`
    background-color: #ccf;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const EnrollPage = () => {
    return (
        <EnrollSection>
            <MenuArea />
            <EnrollArea />
        </EnrollSection>
    );
};

export default EnrollPage;
import React from 'react';
import styled from 'styled-components';
import RoomCard from './RoomCard';

const CommunityContainer = styled.div`
    background-color: #fff;
    width: 1200px;   
    height: 800px;
    border-radius: 2px;
    box-shadow: 0px 5px 10px 1px #0004;
    padding: 30px 60px;
`;

const CommunityBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    overflow: auto;
`;




const CommunityArea = () => {
    return (
        <CommunityContainer>
            <CommunityBox>
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
            </CommunityBox>
        </CommunityContainer>
    );
};

export default CommunityArea;
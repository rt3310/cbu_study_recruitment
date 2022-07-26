import React from 'react';
import styled from 'styled-components';

const RoomCardContainer = styled.div`
    background-color: #fff;
    width: 400px;
    height: 140px;
    border-radius: 70px;
    box-shadow: 5px 5px 10px 0px #aaa;
    margin: 20px 40px;
    transition-duration: 0.5s;
    &:hover {
        transform: translateY(-5px);
        cursor: pointer;
        box-shadow: 5px 10px 20px -5px #aaa;
    }
`;

const RoomCard = () => {
    return (
        <RoomCardContainer>
            
        </RoomCardContainer>
    );
};

export default RoomCard;
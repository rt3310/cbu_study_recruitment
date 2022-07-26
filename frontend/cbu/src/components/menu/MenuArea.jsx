import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ApplyImg from '../../images/apply.png';

const MenuContainer = styled.div`
    background-color: #fff;
    width: 350px;
    height: 800px;
    border-radius: 2px;
    box-shadow: 0px 5px 10px 1px #0004;
    padding: 40px 20px;
    margin: 0 20px 0 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MenuTitle = styled.h3`
    text-align: center;
    margin: 0 0 20px 0;
    font-weight: normal;
`;

const MemberInfoArea = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 120px);
    margin: 0 0 20px 0;
    & > li {
        border: 1px solid #aaf;
        display: flex;
        margin: 5px 0;
        padding: 0 10px 0 0;
        font-size: 14px;
        height: 26px;
        line-height: 26px;
        &.department {
            grid-area: 2 / 1 / 2 / 3;
        }
        &.left {
            border-radius: 2px 0 0 2px;
        }
        &.right {
            border-radius: 0 2px 2px 0;
        }
        &.both {
            border-radius: 2px;
        }
    }
`;

const MemberInfoLabel = styled.span`
    background-color: #aaf;
    color: #fff;
    font-size: 14px;
    padding: 0 5px;
    margin: 0 10px 0 0;
    &.left {
        border-radius: 2px 0 0 2px;
    }
`;

const CardArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

const MenuCard = styled.button`
    width: 180px;
    height: 50px;
    border: 1px solid #aaf;
    background-color: #aaf;
    color: #fff;
    font-size: 18px;
    border-radius: 25px;
    transition-duration: 0.4s;
    margin: 10px 0;
    position: relative;
    &:hover {
        background-color: #fff;
        color: #aaf;
    }
`;

const LogoutButton = styled.button`
    position: absolute;
    background-color: transparent;
    top: 20px;
    right: 20px;
    font-size: 20px;
`;


const MenuArea = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [member, setMember] = useState({});

    useEffect(() => {
        const getMemberData = () => {
            setLoading(true);
            try {
                axios.get("/api/members/my").then(response => {
                    if (response.data.success === 0) {
                        setMember(response.data.data.member);
                    }
                }).catch(error => {
                    navigate('/');
                    alert('로그인이 필요합니다.');
                });
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        getMemberData();
    }, []);

    const logout = () => {
        setLoading(true);
        try {
            axios.get("/api/members/logout").then(response => {
                if (response.data.success === 0) {
                    alert('로그아웃 되었습니다.');
                    navigate('/');
                }
            }).catch(error => {
                console.log(error);
            });
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    if (loading) {
        return null;
    }

    return (
        <MenuContainer>
            <LogoutButton onClick={() => logout()}><i className="fa-solid fa-arrow-right-from-bracket"></i></LogoutButton>
            <MenuTitle>안녕하세요 {member.memberName}님</MenuTitle>
            <MemberInfoArea>
                <li className='left'><MemberInfoLabel>학적</MemberInfoLabel> {member.academic}</li>
                <li className='right'><MemberInfoLabel>학년</MemberInfoLabel> {member.grade}</li>
                <li className='department both'><MemberInfoLabel>학과</MemberInfoLabel> {member.department}</li>
            </MemberInfoArea>
            <CardArea>
                <MenuCard className="apply" onClick={() => navigate('/enroll')}>스터디 신청</MenuCard>
                <MenuCard onClick={() => navigate('/post')}>스터디 개설</MenuCard>
                <MenuCard onClick={() => navigate('')}>프로젝트 개설</MenuCard>
                <MenuCard onClick={() => navigate('/manage')}>스터디 관리</MenuCard>
                <MenuCard onClick={() => navigate('/community')}>커뮤니티</MenuCard>
            </CardArea>
        </MenuContainer>
    );
};

export default MenuArea;
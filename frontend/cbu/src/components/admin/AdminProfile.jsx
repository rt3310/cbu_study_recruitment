import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProfileContainer = styled.div`
    background-color: #337;
    width: 100%;
    height: 240px;
    border: 1px solid #aaf;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const ProfileTitle = styled.h2`
    color: #fff;
    font-weight: normal;
    margin: 30px 0 0;
`;

const LogoutButton = styled.button`
    color: #fff;
    position: absolute;
    background-color: transparent;
    bottom: 20px;
    left: 20px;
    font-size: 20px;
`;

const AdminProfile = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMemberData = () => {
            setLoading(true);
            try {
                axios.get("/api/admin/my").then(response => {
                    if (response.data.success === 0) {
                        setAdmin(response.data.data.admin);
                    } else {
                        alert(response.data.data.error);
                    }
                }).catch(error => {
                    navigate('/admin/login');
                });
            } catch (e) {
                console.log(e);
                navigate('/admin/login');
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
                    navigate('/admin/login');
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
        <ProfileContainer>
            <ProfileTitle>{admin.memberName}님 안녕하세요</ProfileTitle>
            <LogoutButton onClick={() => logout()}><i className="fa-solid fa-arrow-right-from-bracket"></i></LogoutButton>
        </ProfileContainer>
    );
};

export default AdminProfile;
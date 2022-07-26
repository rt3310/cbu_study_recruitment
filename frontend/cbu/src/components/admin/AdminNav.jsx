import React from 'react';
import styled from 'styled-components';

const Label = styled.span`
    color: #bbf;
    font-size: 20px;
`;

const NavContainer = styled.ul`
    background-color: #337;
    width: 100%;
    height: 560px;
    & > li {
        height: 80px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        transition-duration: 0.3s;
        &::after{
            content: '';
            position: absolute;
            border-style: solid;
            border-width: 20px 0 20px 20px;
            border-color: transparent #55a;
            display: none;
            width: 0;
            z-index: 1;
            top: 20px;
            right: -20px;
        }
        &:hover {
            cursor: pointer;
            background-color: #55a;
            &::after {
                display: block;
            }
            & ${Label} {
                color: #fff;
            }
        }
        &:not(:last-child) {
            border-bottom: 1px solid #aaf;
        }
        &.selected {
            background-color: #33a;
            &::after {
                border-color: transparent #33a;
                display: block;
            }
            & ${Label} {
                color: #fff;
            }
            &:hover {
                cursor: pointer;
                background-color: #55a;
                &::after {
                    border-color: transparent #55a;
                }
                & ${Label} {
                    color: #fff;
                }
            }
        }
    }
`;

const AdminNav = (props) => {
    const { selected, setSelected } = props;

    return (
        <NavContainer>
            <li onClick={(e) => setSelected("studyManage")} className={selected === "studyManage" ? "selected" : null}><Label>스터디 관리</Label></li>
            <li onClick={(e) => setSelected("")}><Label>프로젝트 관리</Label></li>
            <li onClick={(e) => setSelected("studyLog")} className={selected==="studyLog" ? "selected" : null}><Label>활동 로그</Label></li>
            <li onClick={(e) => setSelected("memberManage")} className={selected==="memberManage" ? "selected" : null}><Label>일반 사용자 관리</Label></li>
            <li onClick={(e) => setSelected("managerSetting")} className={selected==="managerSetting" ? "selected" : null}><Label>관리자 설정</Label></li>
            <li onClick={(e) => setSelected("")}><Label></Label></li>
            <li onClick={(e) => setSelected("")}><Label></Label></li>
        </NavContainer>
    );
};

export default AdminNav;
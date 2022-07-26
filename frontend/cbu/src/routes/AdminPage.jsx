import React from 'react';
import AdminArea from '../components/admin/AdminArea';
import styled from 'styled-components';

const AdminSection = styled.div`
    background-color: #77f;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AdminPage = () => {
    return (
        <AdminSection>
            <AdminArea />
        </AdminSection>
    );
};

export default AdminPage;
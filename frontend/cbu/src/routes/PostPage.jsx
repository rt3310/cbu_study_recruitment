import React from 'react';
import styled from 'styled-components';
import MenuArea from '../components/menu/MenuArea';
import PostForm from '../components/post/PostForm';

const PostSection = styled.div`
    background-color: #ccf;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const PostPage = () => {
    return (
        <PostSection>
            <MenuArea />
            <PostForm />
        </PostSection>
    );
};

export default PostPage;
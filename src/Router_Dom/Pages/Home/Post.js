import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import styled from 'styled-components';
import Like from './Like';

const PostContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const PostItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const FieldContainer = styled.div`
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => {
    const colors = ['#E6F7FF', '#E6FFE6', '#FFE6E6'];
    return colors[props.index % colors.length];
  }};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const FieldLabel = styled.p`
  font-weight: bold;
  margin-bottom: 4px;
`;

const FieldValue = styled.p`
  margin-bottom: 10px;
`;

function Post() {
  const [poststate, setpoststate] = useState(null);
  const postref = collection(db, "Demo");

  const GetPostFunction = async () => {
    const data = await getDocs(postref);
    setpoststate(data.docs.map((dataitem) => ({ ...dataitem.data(), id: dataitem.id })));
  };


  useEffect(() => {
    GetPostFunction();
  }, []);

  return (
    <PostContainer>
      {poststate?.map((postitem, index) => (
        <PostItem key={postitem.id}>
          <FieldContainer index={index}>
            <FieldLabel>Thought:</FieldLabel>
            <FieldValue>{postitem.title}</FieldValue>
          </FieldContainer>
          <FieldContainer index={index}>
            <FieldLabel>Description:</FieldLabel>
            <FieldValue>{postitem.description}</FieldValue>
          </FieldContainer>
          <FieldContainer index={index}>
            <FieldLabel>Username:</FieldLabel>
            <FieldValue>{postitem.username}</FieldValue>
          </FieldContainer>
          <FieldContainer>
            <Like postid={postitem.id} />
          </FieldContainer>
        </PostItem>
      ))}
    </PostContainer>
  );
}

export default Post;
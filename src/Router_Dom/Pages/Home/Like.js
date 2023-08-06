import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/Firebase';
import { FaHeart } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
`;

const LikeButton = styled.button`
  background-color: ${(props) => (props.hasLiked ? '#4CAF50' : '#F44336')};
  color: #fff;
  border: solid;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.hasLiked ? '#43A047' : '#D32F2F')};
  }
`;

function Like({ postid }) {
    const [user] = useAuthState(auth);
    const LikeRef = collection(db, "Likes");
    const likeDoc = query(LikeRef, where("postId", "==", postid));
    const [likestate, setlikestate] = useState(null);

    const PostLikeFunction = async (postid) => {
        try {
            let newDoc = await addDoc(LikeRef, { userId: user?.uid, postId: postid })
            if (user) {
                setlikestate((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const DeleteLikeFunction = async (postid) => {
        try {
            let deleteDocQuery = query(LikeRef, where("postId", "==", postid), where("userId", "==", user?.uid));

            let GetDeleteDocument = await getDocs(deleteDocQuery);
            let deleteDocument = doc(db, "Likes", GetDeleteDocument.docs[0].id);
            await deleteDoc(deleteDocument);
            if (user) {
                setlikestate((prev) => prev && prev.filter((like) => like.likeId !== deleteDocument.id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const GetLikeFunction = async () => {
        let likedata = await getDocs(likeDoc);
        setlikestate(likedata.docs.map((dataitem) => ({ userId: dataitem.data().userId, likeId: dataitem.id })));
    }

    let hasLoggedIn = likestate && likestate?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        GetLikeFunction();
    }, [likeDoc])

    return (
        <LikeContainer>
            <LikeButton hasLiked={hasLoggedIn} onClick={() => hasLoggedIn ? DeleteLikeFunction(postid) : PostLikeFunction(postid)}>
                {hasLoggedIn ? <><FaHeart /> </> : <><FaHeart /></>}
            </LikeButton>
            {likestate && <p>Likes: {likestate.length}</p>}
        </LikeContainer>
    )
}

export default Like;

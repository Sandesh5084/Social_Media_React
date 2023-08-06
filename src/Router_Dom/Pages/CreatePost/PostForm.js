import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, db } from "../../Firebase/Firebase";
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
  background-color:#f9f9f9;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s ease box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical; 
  transition: border-color 0.2s ease box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }
`;

const SubmitButton = styled.input`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #068FFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.2s ease box-shadow 0.3s ease background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
    background-color: #0056b3;
  }
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }
`;
const SuccessMessage = styled.p`
  color: #16FF00;
  font-size: 16px;
  margin-top: 10px;
`;
const HiddenTreasureContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
  font-size: 16px;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
`;

const HiddenTreasureMessage = styled.p`
  margin: 0;
  line-height: 1.6;
`;
const HeartIcon = styled.span`
  color: red;
`;

const TreasureButton = styled.button`
  background-color: #068FFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top:20px;
  transition: background-color,box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #11009E;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
`;

function PostForm() {
  let Navigate = useNavigate();
  let [user] = useAuthState(auth);
  let [submitStatus, setSubmitStatus] = useState(false);

  let handleSignUp = () => {
    Navigate('/SignUp');
  }

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().max(500, "You can add only 10 letters").required("Description is required"),
  });

  const { register, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const postRef = collection(db, "Demo");

  const handlePostSubmit = async (data) => {
    try {
      await addDoc(postRef, { ...data, username: user?.displayName, id: user?.uid });
      setSubmitStatus(true);

      setTimeout((e) => {
        setSubmitStatus(false);
        reset();
      }, 3000);
    }
    catch (error) {
      console.log('form submitting error', error)
    }

  };

  return (
    <>
      {user ? <FormContainer onSubmit={handleSubmit(handlePostSubmit)}>
        <Input type='text' placeholder='Enter title....' {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextArea type='text' placeholder='Description...' {...register("description")} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <SubmitButton type='submit' value='Submit' />
        {submitStatus && <SuccessMessage>"form submited successfully!"</SuccessMessage>}
      </FormContainer>
        : <HiddenTreasureContainer>
          <HiddenTreasureMessage>
            Hey, my friend<HeartIcon>&#10084;</HeartIcon>! 🙌 Looks like you've stumbled upon a hidden treasure! But before you can access the awesomeness, you need to <HeartIcon>sign up first</HeartIcon>! Join the fun and become a part of the coolest club in town! 😎💫 So what are you waiting for? Sign up now and let the adventure begin! 🚀🎉
          </HiddenTreasureMessage>
          <TreasureButton onClick={handleSignUp}>Sign Up</TreasureButton>
        </HiddenTreasureContainer>}
    </>
  );
}

export default PostForm;

import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, Provider } from '../Firebase/Firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa';

const StyledSignUp = styled.div`
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  padding: 20px;
  transition: border-color 0.2s ease box-shadow 0.3s ease background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }

  form {
    display: flex;
    flex-direction: column;

    input[type="text"],
    input[type="email"],
    input[type="age"],
    input[type="password"] {
      margin-bottom: 10px;
      padding: 10px;
      font-size: 16px;
      border: 0.5px solid #ccc;
      border-radius: 5px;
      &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }
    }

    p {
      color: red;
      margin-bottom: 5px;
    }

    input[type="submit"] {
      background-color: #865DFF;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }

    input[type="submit"]:hover {
      background-color: #6527BE;
    }
  }

  .google-signup {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    .google-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #007bff;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }

      .google-icon {
        font-size: 24px;
        margin-right: 10px;
      }
    }
  }
`;


function SignUp() {
  const Navigate = useNavigate();


  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, Provider);
      Navigate('/')

    }
    catch (error) {
      console.log("authentication cancelled", error)

    }
  }

  let schema = yup.object().shape(
    {
      fullname: yup.string().required("full name required"),
      email: yup.string().email().required("it is required field"),
      age: yup.number().min(18).required("age is required"),
      password: yup.string().min(4).max(8).required("password is required for your security"),
      confirmpassword: yup.string().oneOf([yup.ref("password"), null]).required("please enter correct password")
    }
  )


  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  let onSubmit = (data) => {
    console.log(data);
  }

  return (
    <StyledSignUp>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="full Name...." {...register("fullname")}></input>
        <p>{errors.fullname?.message}</p>
        <input type="email" placeholder="email...." {...register("email")}></input>
        <p>{errors.email?.message}</p>
        <input type="age" placeholder="age...." {...register("age")}></input>
        <p>{errors.age?.message}</p>
        <input type="password" placeholder="password...." {...register("password")}></input>
        <p>{errors.password?.message}</p>
        <input type="password" placeholder="confirmpassword...." {...register("confirmpassword")}></input>
        <p>{errors.confirmpassword?.message}</p>
        <input type="submit" ></input>
      </form>
      <div className="google-signup">
        <button className="google-button" onClick={handleGoogleSignIn}>
          <span className="google-icon"><FaGoogle /></span>Sign Up with Google
        </button>
      </div>
    </StyledSignUp>
  )
}

export default SignUp
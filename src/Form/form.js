import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";



function UserForm() {

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
    )
}

export default UserForm
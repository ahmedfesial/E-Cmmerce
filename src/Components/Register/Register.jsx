import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()
    const [successMsg, setSuccessMsg] = useState("")


    const { handleSubmit, values, errors, touched, handleChange } = useFormik({
        initialValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        },
        onSubmit: register,
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required").min(3, "Name length must be more than 2 chars").max(20, "Name length must be less than 20 chars"),
            email: Yup.string().required("Email is required").email("Enter a valid email"),
            // password: Yup.string().required("Password is required").matches("/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/", "Minimum 8 chars , at least one letter , one number and one special char"),
            password: Yup.string("Your password must be a string")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#^!%*?&]{8,}$/,
                    "Your password must at least contain 1 uppercase letter, 1 lowercase letter and 1 number, and must be 8 characters at least"
                )
                .required("A password is required"),
            rePassword: Yup.string().required("Password is required").oneOf([Yup.ref("password")], "The passwords doesn't match"),
            phone: Yup.string().required("Phone number is required")
        })

    })


    async function register(values) {
        setErrorMsg("")
        setSuccessMsg("")
        setIsLoading(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(({ data }) => {
            setIsLoading(false)
            setSuccessMsg(data.message)
            setTimeout(() => {
                navigate("/login")
            }, 1000);

        }).catch((err) => {
            setIsLoading(false)
            setErrorMsg(err.response.data.message)
            console.log(err);
        })
    }
    return (
        <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg px-8 py-10 flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold text-center text-green-700 dark:text-gray-200 mb-8 mt-8  uppercase">Registration</h1>

            <form onSubmit={handleSubmit} action="#" className="w-full flex flex-col gap-4">

                <div className="flex items-start flex-col justify-start">
                    <input placeholder='Full Name' onChange={handleChange} value={values.name} type="text" id="name" name="name" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500" />
                    {touched.name && errors.name && <p className='text-red-400'>{errors.name}</p>}
                </div>


                <div className="flex items-start flex-col justify-start">
                    <input onChange={handleChange} placeholder='Your Email' value={values.email} t type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500" />
                    {touched.email && errors.email && <p className='text-red-400'>{errors.email}</p>}
                </div>

                <div className="flex items-start flex-col justify-start">
                    <input onChange={handleChange} placeholder='Password' value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500" />
                    {touched.password && errors.password && <p className='text-red-400'>{errors.password}</p>}
                </div>

                <div className="flex items-start flex-col justify-start">
                    <input onChange={handleChange} value={values.rePassword} type="password" id="confirmPassword" placeholder='RePassword' name="rePassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500" />
                    {touched.rePassword && errors.rePassword && <p className='text-red-400'>{errors.rePassword}</p>}
                </div>

                <div className="flex items-start flex-col justify-start">
                    <input onChange={handleChange} value={values.phone} type="tel" id="phone" placeholder='Phone Number' name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500" />
                    {touched.phone && errors.phone && <p className='text-red-400'>{errors.phone}</p>}
                </div>

                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-slate-300" disabled={isLoading}>Register {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}</button>
                {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
                {successMsg && <p className='text-green-500'>{successMsg}</p>}

            </form>

            <div className="mt-4 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
                <Link to={'/login'} className="text-green-500 hover:text-green-600">Login</Link>
            </div>
        </div >

    )
}

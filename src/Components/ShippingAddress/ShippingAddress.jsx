import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';



export default function ShippingAddress() {

    const { cartId } = useParams()

    const [isLoading, setIsLoading] = useState(false)



    const { handleSubmit, values, errors, touched, handleChange } = useFormik({
        initialValues: {

            "city": "",
            "phone": "",
            "details": "",

        },
        onSubmit,
        validationSchema: Yup.object({
            city: Yup.string().required("City is required"),
            phone: Yup.string().required("Phone is required"),
            details: Yup.string().required("Details are required"),
        })

    })

    async function onSubmit() {
        setIsLoading(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cartId, { shippingAddress: values }, {
            headers: {
                token: localStorage.getItem("token")
            }, params: {
                url: "http://localhost:5173"
            }
        }).then(({ data }) => {
            setIsLoading(false)
            location.href = data?.session?.url

        }).catch((err) => {
            setIsLoading(false)
        })
    }

    return (

        <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg  px-8 py-10 flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold text-center text-green-800 dark:text-gray-200 mt-8 mb-8 uppercase">Add your shipping Information</h1>
            <form onSubmit={handleSubmit}  className="w-full flex flex-col gap-4">


                <div className="flex items-start flex-col justify-start">
                    <input onChange={handleChange} placeholder='City' value={values.city}  type="text" id="city" name="city" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500" />
                    {touched.city && errors.city && <p className='text-red-400'>{errors.city}</p>}
                </div>

                <div className="flex items-start flex-col justify-start">
                    <input onChange={handleChange} value={values.details} placeholder='Adress Details' type="text" id="details" name="details" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500" />
                    {touched.details && errors.details && <p className='text-red-400'>{errors.details}</p>}
                </div>

                <div className="flex items-start flex-col justify-start">
                    <input onChange={handleChange} value={values.phone} placeholder='Phone'  type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500" />
                    {touched.phone && errors.phone && <p className='text-red-400'>{errors.phone}</p>}
                </div>


                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-slate-300" disabled={isLoading}>Checkout {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}</button>
            </form>
        </div >

    )
}

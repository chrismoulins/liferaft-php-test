import { Container, Stack, Button } from "@mui/material"
import axios from 'axios'
import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form"
import TextInput from "./form-components/TextInput"
// import StateProvinceSelect from "./form-components/StateProvinceSelect"
import CountrySelect from "./form-components/CountrySelect"
import Header from './Header'
import { ToastContainer, toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import 'react-toastify/dist/ReactToastify.css'

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    houseNumber: yup.number().typeError('House Number must be a number').positive().integer().required('House Number is required'),
    streetName: yup.string().required('Street Name is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required')
  }).required()

const Form = () => {

    const toastSuccess = () => toast.success("Submit Successful")

    const toastError = (data) => toast.error("Submit Failed")

    const [countrySelected, setCountrySelected] = useState('');

    const { control, handleSubmit, formState:{ errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            houseNumber: '',
            streetName: '',
            city: '',
            country: ''
        },
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = (data) => {
        axios.post('/contact/submit', data)
            .then(function (response) {
                debugger
                if (response.data.success) { toastSuccess() }
            })
            .catch(function (error) {
                debugger
                if (error.response.data.success) { toastError() }
            })
    }

    return (
        <Container maxWidth="sm">
            <Header />
            <form>
                <Stack spacing={2}>
                    <TextInput 
                        name={"name"}
                        control={control}
                        label={"Full Name"}
                    />
                    <TextInput 
                        name={"email"}
                        control={control}
                        label={"Email"}
                    />
                    <TextInput 
                        name={"phone"}
                        control={control}
                        label={"Phone Number"}
                    />
                    <TextInput 
                        name={"houseNumber"}
                        control={control}
                        label={"House Number"}
                    />
                    <TextInput 
                        name={"streetName"}
                        control={control}
                        label={"Street Name"}
                    />
                    <TextInput 
                        name={"city"}
                        control={control}
                        label={"City"}
                    />
                    <CountrySelect 
                        name={"country"}
                        control={control}
                        label={"Country"}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    {/* <StateProvinceSelect 
                        name={"country"}
                        control={control}
                        label={"Country"}
                    /> */}
                    <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
                </Stack>
            </form>
            <ToastContainer />
        </Container>
    )
}

export default Form

import React, { useState } from 'react';
import { Container, Stack, Button } from "@mui/material"
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

import TextInput from "./form-components/TextInput"
import SelectSearch from "./form-components/SelectSearch"
import Header from './Header'

import {provinces, states, countries} from '../content/ContactFormData'

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    houseNumber: yup.number().typeError('House Number must be a number').positive().integer().required('House Number is required'),
    streetName: yup.string().required('Street Name is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    stateProvince: yup.string().required('State/Province is required')
  }).required()

const Form = () => {

    const toastSuccess = () => toast.success("Submit Successful")

    const toastError = () => toast.error("Submit Failed")

    const [countryHasStates, setCountryHasStates] = useState(false);
    const [countryHasProvinces, setCountryHasProvinces] = useState(false);

    const { control, resetField, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            houseNumber: '',
            streetName: '',
            city: '',
            country: '',
            stateProvince: ''
        },
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = (data) => {
        axios.post('/contact/submit',
            {
                "name": data.name,
                "email": data.email,
                "phoneNumber": data.phone,
                "address": {
                    "houseNumber": data.houseNumber,
                    "streetName": data.streetName,
                    "city": data.city,
                    "stateProvince": data.stateProvince,
                    "country": data.country
                }
            })
            .then(function (response) {
                if (response.data.success) { toastSuccess() }
            })
            .catch(function (error) {
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
                    <SelectSearch 
                        name={"country"}
                        control={control}
                        label={"Country"}
                        options={countries}
                        onSelectChange={(value) => {
                            resetField('stateProvince')
                            switch(value) {
                                case 'United States':
                                    setCountryHasStates(true)
                                    setCountryHasProvinces(false)
                                    break
                                case 'Canada':
                                    setCountryHasStates(false)
                                    setCountryHasProvinces(true)
                                    break
                                default:
                                    setCountryHasStates(false)
                                    setCountryHasProvinces(false)
                                    break
                            }
                        }}
                    />
                    {
                        countryHasStates ? (
                            <SelectSearch 
                                name={"stateProvince"}
                                control={control}
                                label={"State"}
                                options={states}
                            />
                        ) : countryHasProvinces ? (
                            <SelectSearch 
                                name={"stateProvince"}
                                control={control}
                                label={"Province"}
                                options={provinces}
                            />
                        ) : (
                            <TextInput 
                                name={"stateProvince"}
                                control={control}
                                label={"Province/State"}
                            />
                        )
                    }
                    <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
                </Stack>
            </form>
            <ToastContainer />
        </Container>
    )
}

export default Form
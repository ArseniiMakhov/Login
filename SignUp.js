import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SignUpValidation from './SignUpValidation';
import axios from 'axios';

function SignUp() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(SignUpValidation(values));
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    navigate('/')
                })
                .catch(err => console.log(err));
        }
    }

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: [e.target.value] }))
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center mb-3 text-primary'>Sign-up</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input type='text' name='name' onChange={handleInput} placeholder='Enter your Name' className='form-control rounded-0' />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' name='email' onChange={handleInput} placeholder='Enter your Email' className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' name='password' onChange={handleInput} placeholder='Enter your password' className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button className='btn btn-primary w-100 mb-1'>Sign up</button>
                    <Link to='/' className='btn btn-secondary border w-100 text-decoration-none'>Login</Link>
                </form>
            </div>
        </div>
    )
}

export default SignUp
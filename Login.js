import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    if (res.data === "Success") {

                        navigate('/home');
                    } else {
                        alert('No record existed');
                    }
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
                <h2 className='text-center mb-3 text-primary'>Sign-in</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter your Email' name='email' onChange={handleInput} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' onChange={handleInput} placeholder='Enter your password' name='password' className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-primary w-100 mb-1'>Log in</button>
                    <Link to='/signup' className='btn btn-secondary border w-100 text-decoration-none'>Create Accaunt</Link>
                </form>
            </div>
        </div>
    )
}

export default Login
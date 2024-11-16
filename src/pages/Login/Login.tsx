import Grid from '@mui/material/Grid2';
import "./Login.scss"
import { Avatar, Button, Link, TextField, Typography } from '@mui/material';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export type LoginFormValues = {
    email: string;
    password: string;
};

export type LoginResponse = {
    success: boolean;
    data?: any,
    error?: string;
}

const loginSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required")
}).required();


export default function Login() {

    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const navigate: NavigateFunction = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        if (!isAuthenticated) {
            setIsLoading(false);
            navigate("/");
        }
        else {
            navigate("/landing");
        }
    }, [isAuthenticated, navigate])

    const { control, handleSubmit, formState: { errors }, setError } = useForm<LoginFormValues>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(loginSchema),
        reValidateMode: 'onBlur'
    });

    const onSubmit: SubmitHandler<LoginFormValues> = async(data: LoginFormValues) => 
    {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setIsAuthenticated(true);
                navigate("/landing");
            }
        } 
        catch (error: any) {
            if (error.response.data.message === 'Invalid password') {
                setError("password", { message: "Invalid password" });
            }
            console.log('Response status:', error);        
        }
    }
    
    if (isLoading) {
        return <div>Loading...</div>
    }

  return (
    <div className='login-container'>
        <Grid container spacing={2} padding={2} justifyContent={'center'}>
            <Grid size={{ xs: 12, sm: 12 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: 'teal' }}>
                    <LockOpenRoundedIcon />
                </Avatar>
                <Typography variant='h5'>Sign-In</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
                <Controller control={control} name='email' render={({ field: { value, onBlur, onChange }}) => (
                    <TextField 
                     value={value}
                     onChange={onChange}
                     error={errors.email ? true : false } 
                     helperText={errors.email ? errors.email.message : '' } 
                     fullWidth
                     onBlur={onBlur}
                     label={"Email Address"} required></TextField>
                )}>
                </Controller>
            </Grid> 
            <Grid size={{ xs: 12, sm : 8 }}>
                <Controller control={control} name='password' render={({ field: { value, onBlur, onChange }}) => (
                    <TextField 
                     value={value}
                     onChange={onChange}
                     error={errors.password ? true : false } 
                     helperText={errors.password ? errors.password.message : '' } 
                     fullWidth
                     type='password'
                     onBlur={onBlur}
                     label={"Password"} 
                     required
                    ></TextField>
                )}>
                </Controller>
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
                <Button fullWidth variant='contained' onClick={handleSubmit(onSubmit)}>Sign In</Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
                <div className='reset-create-container'>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    <Link href="/signup" variant="body2">
                        Create Account
                    </Link>
                </div>
            </Grid>
        </Grid>
    </div>
  )
}
import "./CreateAccount.scss";
import { Avatar, Button, CssBaseline, Link, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";


type SignupFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const signupSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName:  yup.string().required("Last name is required"),
    email: yup.string().email().required("Email address is required"),
    password: yup.string().required("Password name is required"),
    confirmPassword: yup.string().required("Confirm password is required")
}).required();



export default function CreateAccount() {

    const { control, handleSubmit, formState: { errors }} = useForm<SignupFormValues>({
        resolver: yupResolver(signupSchema),
        reValidateMode: 'onBlur'
    });


    const onSubmit: SubmitHandler<SignupFormValues> = (data: SignupFormValues) => 
    {
        //TODO: Complete API for User Signup
    }


  return (
    <div className='create-account-container'>
        <CssBaseline/>
        <div className='create-account-header-container'>
            <Avatar sx={{ backgroundColor: 'orange'}}>
                <LockTwoToneIcon />
            </Avatar>
            <Typography variant='h5' component={'h1'}>
                Sign-Up
            </Typography>
            <div className='create-account-input-container'>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <Controller control={control} name='firstName' render={({ field: { value, onBlur, onChange }, formState: { errors } }) => (
                            <TextField
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                autoComplete='first' 
                                name='firstName' 
                                variant='outlined' 
                                required 
                                fullWidth 
                                label='First Name' 
                                autoFocus
                                error={errors.firstName ? true : false }
                                helperText={errors.firstName ? errors.firstName.message : '' }
                            ></TextField>
                        )}></Controller>
                    </Grid>
                    <Grid size={6}>
                        <Controller control={control} name='lastName' render={({ field: { value, onBlur, onChange }, formState: { errors } }) => (
                            <TextField
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                autoComplete='last' 
                                name='lastName' 
                                variant='outlined' 
                                required 
                                fullWidth 
                                label='Last Name'
                                error={errors.lastName ? true : false }
                                helperText={errors.lastName ? errors.lastName.message : '' }
                            ></TextField>
                        )}>
                        </Controller>
                    </Grid>
                    <Grid size={12}>
                        <Controller control={control} name='email' render={({ field: { value, onBlur, onChange }, formState: { errors }} ) => (
                            <TextField 
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                autoComplete='email' 
                                name='emailAddress' 
                                variant='outlined' 
                                required 
                                fullWidth 
                                label='Email'
                                error={errors.email ? true : false }
                                helperText={errors.email ? errors.email.message : '' }
                            ></TextField>
                        )}>
                        </Controller>
                    </Grid>
                    <Grid size={6}>
                        <Controller control={control} name='password' render={({field: { value, onBlur, onChange }, formState: { errors }}) => (
                            <TextField
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                type="password"
                                autoComplete='password' 
                                name='password' 
                                variant='outlined' 
                                required 
                                fullWidth 
                                label='Password'
                                error={errors.password ? true : false }
                                helperText={errors.password ? errors.password.message : '' }
                            ></TextField>
                        )}>
                        </Controller>
                    </Grid>
                    <Grid size={6}>
                        <Controller control={control} name='confirmPassword' render={({ field: { value, onBlur, onChange }, formState: { errors }}) => (
                            <TextField
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                type="password"
                                autoComplete='confirmPassword' 
                                name='confirm' 
                                variant='outlined' 
                                required 
                                fullWidth 
                                label='Confirm Password'
                                error={errors.confirmPassword ? true : false }
                                helperText={errors.confirmPassword ? errors.confirmPassword.message : '' }
                            ></TextField>
                        )}>
                        </Controller>
                    </Grid>
                    <Grid size={12}>
                        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>SIGN UP</Button>
                    </Grid>
                    <Grid container size={12}>
                        <Grid size={12}>
                            <Link href="#" variant="body2">
                                Already Have An Account? Sign In
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    </div>
  )
}
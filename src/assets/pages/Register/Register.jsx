import styles from './Register.module.css'
import Container from "@mui/material/Container"; 
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"; 
import TextField from '@mui/material/TextField'
import { Button } from "@mui/material"; 
import { Link } from 'react-router-dom' 
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup" 
import registerSchema from '../../../validations/authSchema' 
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Register() { 
 const navigate = useNavigate();   

  const [serverError, setServerError] = useState(null);
  const [serverSuccess, setServerSuccess] = useState(false);
  const {register,handleSubmit,formState: {errors,isSubmitting}} = useForm({
    resolver: yupResolver(registerSchema),
  }) 
  const onSubmit = async (data) => {
  console.log(data);
  try {
    const response = await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/Register', data);
    setServerSuccess(true);
    navigate('/login');
  } catch(error) { 
    console.log(error);
    setServerError("Registration failed. Please try again.");
  }
};
     
    
  
  return (
    <main>
      <Container maxWidth="sm">
        <Box sx={{bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 3, mt: 8}}>
          <Typography variant="h4" sx={{textAlign: 'center'}} component="h1" gutterBottom>
            Create an account
          </Typography> 

          <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Full Name" fullWidth margin="normal" {...register('fullName')} error={!!errors.fullName} helperText={errors.fullName?.message}></TextField>
            <TextField label="User Name" fullWidth margin="normal" {...register('userName')} error={!!errors.userName} helperText={errors.userName?.message}></TextField> 
            <TextField label="Email" fullWidth margin="normal" {...register('email')} error={!!errors.email} helperText={errors.email?.message}></TextField> 
            <TextField label="Phone Number" fullWidth margin="normal" {...register('phoneNumber')} error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message}></TextField> 
            <TextField label="Password" type="password" fullWidth margin="normal" {...register('password')} error={!!errors.password} helperText={errors.password?.message}></TextField> 
             <Button  type="submit" fullWidth  variant="contained" sx={{mt: 2, backgroundColor: '#000000', '&:hover': {backgroundColor: '#1c2024'}}}
             disabled={isSubmitting}>
            
            {isSubmitting?"Loading...":"Register"}
          </Button> 
          </Box> 

          
          <Typography variant="body2" sx={{textAlign: 'center', mt: 2}}>
            Already have an account? <Link to="/login">Login here</Link>
          </Typography>
        </Box>
      </Container>
    </main>
  ); 
}



import styles from "./Login.module.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"; 
import TextField from '@mui/material/TextField' 
import { Button } from "@mui/material"; 
import { Link } from 'react-router-dom' 
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup" 
import {loginSchema} from '../../../validations/authSchema' 
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Login() { 
  const navigate = useNavigate();
    const [serverError, setServerError] = useState(null);
  const [serverSuccess, setServerSuccess] = useState(false);
  const {register,handleSubmit,formState: {errors,isSubmitting}} = useForm({
    resolver: yupResolver(loginSchema),
  }) 
  const onSubmit = async (data) => {
  console.log(data);
  try {
    const response = await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/Login', data);
    setServerSuccess(true);
    navigate('/home');
  } catch(error) { 
    console.log(error);
    setServerError("Login failed. Please try again.");
  }
};

  return (
    <main>
      <Container maxWidth="sm">
        <Box sx={{bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 3, mt: 8}}>
          <Typography variant="h4" sx={{textAlign: 'center'}} component="h1" gutterBottom>
            Welcome To MONO
          </Typography> 

          <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Email" fullWidth margin="normal" {...login('email')} error={!!errors.email} helperText={errors.email?.message}></TextField> 
            <TextField label="Password" type="password" fullWidth margin="normal" {...login('password')} error={!!errors.password} helperText={errors.password?.message}></TextField>
          </Box> 

          <Button  type="submit" fullWidth  variant="contained" sx={{mt: 2, backgroundColor: '#000000', '&:hover': {backgroundColor: '#1c2024'}}}
          disabled={isSubmitting}>
            
            {isSubmitting?"Loading...":"Login"}
          </Button> 
          <Typography variant="body2" sx={{textAlign: 'center', mt: 2}}>
            Forgot your password? <Link to="/login">Click here</Link>
          </Typography>
        </Box> 
      </Container>
    </main>
  );
}

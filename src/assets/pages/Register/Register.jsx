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
export default function Register() {  

  const {register,handleSubmit} = useForm({
    resolver: yupResolver(registerSchema),
  }) 
  const onSubmit =(data) => {
    console.log(data);
  };
  return (
    <main>
      <Container maxWidth="sm">
        <Box sx={{bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 3, mt: 8}}>
          <Typography variant="h4" sx={{textAlign: 'center'}} component="h1" gutterBottom>
            Create an account
          </Typography> 

          <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Full Name" fullWidth margin="normal" {...register('fullName')}></TextField>
            <TextField label="User Name" fullWidth margin="normal" {...register('userName')}></TextField> 
            <TextField label="Email" fullWidth margin="normal" {...register('email')}></TextField> 
            <TextField label="Phone Number" fullWidth margin="normal" {...register('phoneNumber')}></TextField> 
            <TextField label="Password" type="password" fullWidth margin="normal" {...register('password')}></TextField> 
             <Button  type="submit" fullWidth  variant="contained" sx={{mt: 2, backgroundColor: '#000000', '&:hover': {backgroundColor: '#1c2024'}}}>
            Register
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

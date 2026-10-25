import styles from "./Login.module.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"; 
import TextField from '@mui/material/TextField' 
import { Button } from "@mui/material"; 
import { Link } from 'react-router-dom'
function Login() {
  return (
    <main>
      <Container maxWidth="sm">
        <Box sx={{bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 3, mt: 8}}>
          <Typography variant="h4" sx={{textAlign: 'center'}} component="h1" gutterBottom>
            Welcome To MONO
          </Typography> 

          <Box component={'form'}> 
            <TextField label="User Name" fullWidth margin="normal"></TextField> 
            <TextField label="Password" type="password" fullWidth margin="normal"></TextField>
          </Box> 

          <Button  type="submit" fullWidth  variant="contained" sx={{mt: 2, backgroundColor: '#000000', '&:hover': {backgroundColor: '#1c2024'}}}>
            Login
          </Button> 
          <Typography variant="body2" sx={{textAlign: 'center', mt: 2}}>
            Forgot your password? <Link to="/login">Click here</Link>
          </Typography>
        </Box> 
      </Container>
    </main>
  );
}

export default Login;
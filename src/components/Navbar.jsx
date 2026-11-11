import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom' 
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search'; 
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';


const links = [
  { label: 'Home', to: '/' },
  { label: 'Categories', to: '/categories' },
  { label: 'Products', to: '/products' },
  { label: 'Cart', to: '/cart' },
] 


export default function Navbar() { 
  const [search, setSearch] = useState('')
const navigate = useNavigate()

const handleSearch = (e) => {
  e.preventDefault()
  const value = search.trim()
  if (value) {
    navigate(`/products?search=${encodeURIComponent(value)}`)
  } 
}
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            fontWeight="bold"
            sx={{ color: 'inherit', textDecoration: 'none', letterSpacing: 2 }}
          >
            MONO
          </Typography> 
         <Box
  component="form"
  onSubmit={handleSearch}
  sx={{
    display: 'flex',
    alignItems: 'center',
    border: 1,
    borderColor: 'text.primary',
    borderRadius: 5,
    px: 2,
  }}
>
  <InputBase
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    sx={{ flexGrow: 1 }}
  />
  <IconButton type="submit" size="small">
    <SearchIcon />
  </IconButton>
</Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {links.map((link) => (
              <Button key={link.to} component={Link} to={link.to} color="inherit">
                {link.label}
              </Button>
            ))}
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{ bgcolor: 'text.primary', color: 'background.default', '&:hover': { bgcolor: 'text.secondary' } }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}


import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { Link } from 'react-router-dom' 
import  useCategories  from '../../hook/useCategories' 
import Categories from '../../components/Categories/Categories'



export default function Home() {
  const { data, isLoading, isError } = useCategories()
  const categories = data?.data


 

  return (
    <main>
    
      <Box sx={{ bgcolor: 'text.primary', color: 'background.default', py: { xs: 10, md: 16 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            Everything You Need, One Store
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, mb: 4 }}>
            Beauty, clothing, home tools, sports and electronics at the best prices.
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            size="large"
            sx={{ bgcolor: 'background.default', color: 'text.primary', px: 5, '&:hover': { bgcolor: 'grey.300' } }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Shop by Category
        </Typography>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress color="inherit" />
          </Box>
        )}

        {isError && (
          <Typography color="error" textAlign="center" sx={{ mt: 4 }}>
            Failed to load categories
          </Typography>
        )}

        {categories && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: 3, mt: 4,
            }}
          >
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </Box>
        )}
      </Container>

    
      <Box sx={{ bgcolor: 'action.hover', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Why MONO?
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: 3, mt: 4,
            }}
          >
            {features.map((f) => (
              <Box key={f.title} sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h6" fontWeight="bold">{f.title}</Typography>
                <Typography variant="body2" color="text.secondary">{f.text}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 4 - Sale banner */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            border: 2, borderColor: 'text.primary', borderRadius: 4,
            p: { xs: 4, md: 8 }, textAlign: 'center',
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Up to 50% Off
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Limited time offer on selected items
          </Typography>
          <Button component={Link} to="/products" variant="contained" sx={blackButton}>
            View Offers
          </Button>
        </Box>
      </Container>
    </main>
  ) 
}

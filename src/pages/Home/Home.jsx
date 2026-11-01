import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { Link } from 'react-router-dom'
import useCategories from '../../hook/useCategories'
import Categories from '../../components/Categories/Categories'

const features = [
  { title: 'Free Shipping', text: 'On all orders over $50' },
  { title: 'Secure Payment', text: 'Visa or cash on delivery' },
  { title: 'Easy Returns', text: '14 days return policy' },
  { title: '24/7 Support', text: 'We are always here to help' },
]

const blackButton = {
  bgcolor: 'text.primary',
  color: 'background.default',
  px: 5,
  py: 1.5,
  '&:hover': { bgcolor: 'text.secondary' },
}

export default function Home() {
  const { data, isLoading, isError } = useCategories()
  const categories = data?.data

  return (
    <main>
  
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
              gap: 3,
              mt: 4,
            }}
          >
            {categories.map((category) => (
              <Categories key={category.id} category={category} />
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
              gap: 3,
              mt: 4,
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

      
     
    </main>
  )
};
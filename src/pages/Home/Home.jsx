import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Categories from '../../components/Categories/Categories'

const features = [
  { title: 'Free Shipping', text: 'On all orders over $50' },
  { title: 'Secure Payment', text: 'Visa or cash on delivery' },
  { title: 'Easy Returns', text: '14 days return policy' },
  { title: '24/7 Support', text: 'We are always here to help' },
]

export default function Home() {
  return (
    <main>
      <Categories />

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
}
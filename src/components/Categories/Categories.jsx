import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { Link } from 'react-router-dom'
import useCategories from '../../hook/useCategories'

export default function Categories() {
  const { data, isLoading, isError } = useCategories({ limit: 8 })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress color="inherit" />
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">Failed to load categories</Alert>
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Shop by Category
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 3,
          mt: 4,
        }}
      >
        {data.data.map((category) => (
          <Card key={category.id} variant="outlined" sx={{ borderRadius: 3 }}>
            <CardActionArea
              component={Link}
              to={`/products?category=${category.id}`}
              sx={{ p: 4, textAlign: 'center' }}
            >
              <Typography variant="h6">{category.name}</Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  )
}

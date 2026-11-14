import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useProduct from '../../hook/useProductDetails' 
import useAddToCart from '../../hook/useAddToCart' 
import useAuthStore from '../../store/useAuthStore'

export default function ProductDetails() { 
  const token = useAuthStore((state) => state.token)
  const navigate = useNavigate()
  const { id } = useParams() 
  const {mutate: addToCart,isPending: addToCartPending} = useAddToCart();
  const { data: product, isLoading, isError } = useProduct(id) 
  const handleAddToCart = () => {
    if (!token) {
      navigate('/cart');
      return; 
    } 
    addToCart(product.id);

  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress color="inherit" />
      </Box>
    )
  }

  if (isError || !product) {
    return (
      <Container sx={{ py: 6 }}>
        <Alert severity="error">Failed to load product</Alert>
      </Container>
    )
  }

  const reviews = product.reviews ?? []

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button component={Link} to="/products" color="inherit" sx={{ mb: 3 }}>
        ← Back to products
      </Button>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 6,
        }}
      >
        <Box
          component="img"
          src={product.image ?? product.mainImg}
          alt={product.name}
          sx={{ width: '100%', maxHeight: 450, objectFit: 'contain', border: 1, borderColor: 'divider', borderRadius: 3, p: 2 }}
        />

        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={product.rate ?? 0} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({reviews.length} reviews)
            </Typography>
          </Box>

          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            ${product.price}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4 }}>
            {product.description ?? 'No description available.'}
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{ bgcolor: 'text.primary', color: 'background.default', px: 5, '&:hover': { bgcolor: 'text.secondary' } }}
            onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Reviews
      </Typography>

      {reviews.length === 0 && (
        <Typography color="text.secondary">No reviews yet.</Typography>
      )}

      {reviews.map((review, index) => (
        <Box key={review.id ?? index} sx={{ mb: 3 }}>
          <Typography fontWeight="bold">{review.userName ?? review.user ?? 'User'}</Typography>
          <Rating value={review.rate ?? review.rating ?? 0} readOnly size="small" />
          <Typography color="text.secondary">{review.comment}</Typography>
        </Box>
      ))}
    </Container>
  )
} 

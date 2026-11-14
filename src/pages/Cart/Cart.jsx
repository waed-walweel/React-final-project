import { Alert, Box, Button, CircularProgress, Container, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import useGuestCartStore from '../../store/useGuestCartStore'
import useGetItemCart from '../../hook/useGetItemCart'
import { useUpdateQty, useRemoveItem, useClearCart } from '../../hook/useCartActions'

export default function Cart() {
  const token = useAuthStore((state) => state.token)
  const guest = useGuestCartStore()
  const { data, isLoading, isError } = useGetItemCart()
  const updateQty = useUpdateQty()
  const removeItem = useRemoveItem()
  const clearCart = useClearCart()

  if (token && isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress color="inherit" /></Box>
  }
  if (token && isError) {
    return <Container sx={{ py: 6 }}><Alert severity="error">Failed to load cart</Alert></Container>
  }

  const serverItems = Array.isArray(data) ? data : data?.items ?? data?.cartItems ?? data?.data ?? []
  const items = token ? serverItems : guest.items

  const changeQty = (productId, count) =>
    token ? updateQty.mutate({ productId, count }) : guest.updateQty(productId, count)
  const remove = (productId) => (token ? removeItem.mutate(productId) : guest.removeItem(productId))
  const clear = () => (token ? clearCart.mutate() : guest.clear())

  const total = items.reduce((sum, item) => sum + item.price * (item.count ?? item.quantity ?? 1), 0)

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Cart</Typography>

      {!token && items.length > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          You are shopping as a guest. <Link to="/login">Login</Link> to checkout.
        </Alert>
      )}

      {items.length === 0 && (
        <Box sx={{ py: 4 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Your cart is empty.</Typography>
          <Button component={Link} to="/products" variant="outlined" color="inherit">Go shopping</Button>
        </Box>
      )}

      {items.map((item) => {
        const productId = item.productId ?? item.id
        const count = item.count ?? item.quantity ?? 1

        return (
          <Box key={productId} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2, borderBottom: 1, borderColor: 'divider' }}>
            {item.image && (
              <Box component="img" src={item.image} alt="" sx={{ width: 70, height: 70, objectFit: 'contain' }} />
            )}

            <Box sx={{ flexGrow: 1 }}>
              <Typography fontWeight="bold">{item.productName ?? item.name}</Typography>
              <Typography color="text.secondary">${item.price}</Typography>
            </Box>

            <Button size="small" color="inherit" disabled={count <= 1}
              onClick={() => changeQty(productId, count - 1)}>-</Button>
            <Typography>{count}</Typography>
            <Button size="small" color="inherit"
              onClick={() => changeQty(productId, count + 1)}>+</Button>

            <IconButton onClick={() => remove(productId)}><DeleteIcon /></IconButton>
          </Box>
        )
      })}

      {items.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
          <Button color="inherit" onClick={clear}>Clear cart</Button>
          <Typography variant="h6" fontWeight="bold">Total: ${total}</Typography>
        </Box>
      )}
    </Container>
  )
}
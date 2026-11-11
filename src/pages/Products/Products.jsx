import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import useProducts from '../../hook/useProducts'

const LIMIT = 4

export default function Products() {
    const [page, setPage] = useState(1)
    const { data, isLoading, isError } = useProducts({ page, limit: LIMIT })

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress color="inherit" />
            </Box>
        )
    }

    if (isError) {
        return <Alert severity="error">Failed to load products</Alert>
    }

    const products = data.data
    const pagesCount = Math.ceil(data.totalCount / LIMIT)

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ textAlign: 'center' }} gutterBottom>
                Products
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                    gap: 3,
                    mt: 4,
                }}
            >
                {products.map((product) => (
                    <Card key={product.id} variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardActionArea component={Link} to={`/products/${product.id}`}>
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                sx={{ height: 200, objectFit: 'contain', p: 1 }}
                            />
                            <CardContent>
                                <Typography variant="subtitle1" noWrap>
                                    {product.name}
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    ${product.price}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination count={pagesCount} page={page} onChange={(_, value) => setPage(value)} />
            </Box>
        </Container>
    )
}
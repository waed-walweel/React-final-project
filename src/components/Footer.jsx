import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import LanguageIcon from '@mui/icons-material/Language'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

const columns = [
  {
    title: 'SHOP',
    links: [
      { label: 'All Products', to: '/products' },
      { label: 'Categories', to: '/categories' },
      { label: 'New Releases', to: '/products' },
      { label: 'Editorial Archive', to: '/products' },
    ],
  },
  {
    title: 'SUPPORT',
    links: [
      { label: 'Order Tracking', to: '/profile' },
      { label: 'Returns & Care', to: '/' },
      { label: 'Shipping Inquiries', to: '/' },
      { label: 'Contact Bureau', to: '/' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'Design Ethos', to: '/' },
      { label: 'Ateliers', to: '/' },
      { label: 'Sustainability', to: '/' },
      { label: 'Careers', to: '/' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', to: '/' },
      { label: 'Terms of Service', to: '/' },
      { label: 'Cookie Settings', to: '/' },
      { label: 'Accessibility', to: '/' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      console.log('Subscribed:', email)
      setEmail('')
    }
  }

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider', mt: 8 }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.5fr repeat(4, 1fr)' },
            gap: 4,
          }}
        >
          
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: 2, mb: 1 }}>
              MONO
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Architectural, high-contrast lifestyle editorial and modular
              technical provisions for design-literate living.
            </Typography>

            <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex' }}>
              <InputBase
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  flexGrow: 1,
                  border: 1,
                  borderColor: 'divider',
                  px: 1.5,
                  fontSize: 10, 
                  borderRadius: 2,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{
                  borderRadius: 0,
                  bgcolor: 'text.primary',
                  color: 'background.default',
                  '&:hover': { bgcolor: 'text.secondary' },fontSize: 10, textTransform: 'none', px: 2, ml: 1, borderRadius: 2
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>

          {/* Link columns */}
          {columns.map((col) => (
            <Box key={col.title}>
              <Typography variant="caption" fontWeight="bold" sx={{ letterSpacing: 1 }}>
                {col.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    component={RouterLink}
                    to={link.to}
                    underline="hover"
                    color="text.secondary"
                    variant="body2"
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mt: 6,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © 2026 MONO Objects & Apparel. All rights reserved.
          </Typography>

          <Box>
            <IconButton size="small" color="inherit"><LanguageIcon fontSize="small" /></IconButton>
            <IconButton size="small" color="inherit"><RssFeedIcon fontSize="small" /></IconButton>
            <IconButton size="small" color="inherit"><EmailOutlinedIcon fontSize="small" /></IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}



import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAuthStore from '../store/useAuthStore'

export default function useGetItemsCart() {
  const token = useAuthStore((state) => state.token)

  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await axios.get('https://knowledgeshop.runasp.net/api/Carts', {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log('CART:', JSON.stringify(data, null, 2))  
      return data.response ?? data
    },
    enabled: !!token,
  })
}
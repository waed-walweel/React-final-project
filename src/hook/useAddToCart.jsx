import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import useAuthStore from '../store/useAuthStore'

export default function useAddToCart() {
  const token = useAuthStore((state) => state.token)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await axios.post(
        'https://knowledgeshop.runasp.net/api/Carts',
        { productId, count: 1 },
        { headers: { 'Accept-Language': 'en', Authorization: `Bearer ${token}` } },
      )
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })
}
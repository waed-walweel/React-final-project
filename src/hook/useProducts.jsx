import { useQuery, keepPreviousData } from '@tanstack/react-query'
import axios from 'axios'

export default function useProducts({ page = 1, limit = 8 } = {}) {
  return useQuery({
    queryKey: ['products', page, limit],
    queryFn: async () => {
      const { data } = await axios.get('https://knowledgeshop.runasp.net/api/Products', {
        params: { page, limit },
        headers: { 'Accept-Language': 'en' },
      })
      console.log(data) 
      return data.response
    },
    placeholderData: keepPreviousData,
  })
} 

import { useQuery, keepPreviousData } from '@tanstack/react-query'
import axios from 'axios'

export default function useCategories({ page = 1, limit = 4 } = {}) {
  return useQuery({
    queryKey: ['categories', page, limit],
    queryFn: async () => {
      const { data } = await axios.get('https://knowledgeshop.runasp.net/api/Categories', {
        params: { page, limit },
        headers: { 'Accept-Language': 'en' },
      })
      return data.response
    },
    placeholderData: keepPreviousData,
  })
}
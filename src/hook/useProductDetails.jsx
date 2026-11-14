import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await axios.get(`https://knowledgeshop.runasp.net/api/Products/${id}`, {
        headers: { 'Accept-Language': 'en' },
      })
      console.log(JSON.stringify(data, null, 2))
      return data.response ?? data
    },
    enabled: !!id,
  })
}
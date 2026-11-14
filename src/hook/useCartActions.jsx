import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import useAuthStore from '../store/useAuthStore'

const BASE = 'https://knowledgeshop.runasp.net/api/Carts'

function useCartMutation(request) {
  const token = useAuthStore((state) => state.token)
  const queryClient = useQueryClient()
  const config = { headers: { Authorization: `Bearer ${token}` } }

  return useMutation({
    mutationFn: (arg) => request(arg, config),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })
}

export const useUpdateQty = () =>
  useCartMutation(({ productId, count }, config) =>
    axios.patch(`${BASE}/${productId}`, { count }, config),
  )

export const useRemoveItem = () =>
  useCartMutation((productId, config) => axios.delete(`${BASE}/${productId}`, config))

export const useClearCart = () =>
  useCartMutation((_, config) => axios.delete(`${BASE}/clear`, config))
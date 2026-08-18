import { api } from '@/shared/services/api'

import type {
  AddCartItemDTO,
  Cart,
  CheckoutResponse,
  UpdateCartItemDTO,
} from '../types'

export const CartService = {
  getCart: async (): Promise<Cart> => {
    const { data } = await api.get<Cart>('/cart')
    return data
  },
  addItem: async (payload: AddCartItemDTO): Promise<Cart> => {
    const { data } = await api.post<Cart>('/cart/items', payload)
    return data
  },
  updateItem: async (
    productId: string,
    payload: UpdateCartItemDTO
  ): Promise<Cart> => {
    const { data } = await api.patch<Cart>(`/cart/items/${productId}`, payload)
    return data
  },
  removeItem: async (productId: string): Promise<void> => {
    await api.delete(`/cart/items/${productId}`)
  },
  checkout: async (): Promise<CheckoutResponse> => {
    const { data } = await api.post<CheckoutResponse>('/cart/checkout')
    return data
  },
}

import type { Product } from '@/catalog/types'

export interface CartItem {
  product: Product
  quantity: number
  subtotalInCents: number
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  subtotalInCents: number
  shippingInCents: number
  totalInCents: number
}

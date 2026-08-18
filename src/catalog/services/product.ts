import { api } from '@/shared/services/api'
import type { PaginatedResponse } from '@/shared/types'

import type { CreateProductDTO, GetProductsParams, Product } from '../types'

export const ProductService = {
  getProducts: async (
    params?: GetProductsParams
  ): Promise<PaginatedResponse<Product>> => {
    const { data } = await api.get<PaginatedResponse<Product>>('/products', {
      params,
    })
    return data
  },
  getProductById: async (productId: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${productId}`)
    return data
  },
  createProduct: async (product: CreateProductDTO): Promise<Product> => {
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('description', product.description)
    formData.append('priceInCents', String(product.priceInCents))
    formData.append('category', product.category)
    formData.append('stock', String(product.stock))
    formData.append('image', product.image)
    const { data } = await api.post<Product>('/products', formData)
    return data
  },
}

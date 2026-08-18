import type { ProductCategory } from './product'

export type ProductSort = 'newest' | 'price-asc' | 'price-desc'

export interface GetProductsParams {
  page?: number
  limit?: number
  search?: string
  category?: ProductCategory
  sort?: ProductSort
}

import type { ProductCategory } from './product'

export interface CreateProductDTO {
  name: string
  description: string
  priceInCents: number
  category: ProductCategory
  stock: number
  image: File
}

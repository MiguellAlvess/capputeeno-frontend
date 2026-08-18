export type ProductCategory = 'mugs' | 't-shirts'

export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  category: ProductCategory
  imageUrl: string
  stock: number
  createdAt: string
}

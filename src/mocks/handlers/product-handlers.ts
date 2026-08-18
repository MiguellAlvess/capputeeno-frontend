import { http, HttpResponse } from 'msw'

import type { Product, ProductCategory, ProductSort } from '@/catalog/types'

import { products } from '../data/product'

export const productHandlers = [
  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const limit = Number(url.searchParams.get('limit') ?? 12)
    const search = url.searchParams.get('search')
    const category = url.searchParams.get('category') as ProductCategory | null
    const sort = url.searchParams.get('sort') as ProductSort | null
    let filteredProducts = [...products]
    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      )
    }
    if (sort === 'newest') {
      filteredProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }
    if (sort === 'price-asc') {
      filteredProducts.sort((a, b) => a.priceInCents - b.priceInCents)
    }
    if (sort === 'price-desc') {
      filteredProducts.sort((a, b) => b.priceInCents - a.priceInCents)
    }
    const totalItems = filteredProducts.length
    const totalPages = Math.ceil(totalItems / limit)
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedProducts = filteredProducts.slice(start, end)
    return HttpResponse.json({
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    })
  }),

  http.get('/api/products/:productId', ({ params }) => {
    const product = products.find((product) => product.id === params.productId)
    if (!product) {
      return HttpResponse.json(
        {
          message: 'Product not found',
        },
        {
          status: 404,
        }
      )
    }
    return HttpResponse.json(product)
  }),

  http.post('/api/products', async ({ request }) => {
    const formData = await request.formData()
    const name = formData.get('name')
    const description = formData.get('description')
    const priceInCents = formData.get('priceInCents')
    const category = formData.get('category')
    const stock = formData.get('stock')
    const image = formData.get('image')
    if (
      typeof name !== 'string' ||
      typeof description !== 'string' ||
      typeof priceInCents !== 'string' ||
      typeof category !== 'string' ||
      typeof stock !== 'string'
    ) {
      return HttpResponse.json(
        {
          message: 'Invalid product data',
        },
        {
          status: 400,
        }
      )
    }
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      description,
      priceInCents: Number(priceInCents),
      category: category as ProductCategory,
      stock: Number(stock),
      imageUrl: image instanceof File ? URL.createObjectURL(image) : '',
      createdAt: new Date().toISOString(),
    }
    products.push(newProduct)
    return HttpResponse.json(newProduct, {
      status: 201,
    })
  }),
]

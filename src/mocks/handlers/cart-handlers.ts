import { http, HttpResponse } from 'msw'

import type { AddCartItemDTO, Cart, UpdateCartItemDTO } from '@/cart/types'

import { cartItems } from '../data/cart'
import { products } from '../data/product'

const SHIPPING_IN_CENTS = 4000

const getCart = (): Cart => {
  const subtotalInCents = cartItems.reduce(
    (total, item) => total + item.subtotalInCents,
    0
  )
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  const shippingInCents = cartItems.length > 0 ? SHIPPING_IN_CENTS : 0
  return {
    items: cartItems,
    totalItems,
    subtotalInCents,
    shippingInCents,
    totalInCents: subtotalInCents + shippingInCents,
  }
}

export const cartHandlers = [
  http.get('/api/cart', () => {
    return HttpResponse.json(getCart())
  }),
  http.post('/api/cart/items', async ({ request }) => {
    const body = (await request.json()) as AddCartItemDTO

    const product = products.find((product) => product.id === body.productId)
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
    if (body.quantity <= 0) {
      return HttpResponse.json(
        {
          message: 'Quantity must be greater than zero',
        },
        {
          status: 400,
        }
      )
    }
    const existingItem = cartItems.find(
      (item) => item.product.id === body.productId
    )
    if (existingItem) {
      existingItem.quantity += body.quantity
      existingItem.subtotalInCents =
        existingItem.quantity * product.priceInCents
      return HttpResponse.json(getCart(), {
        status: 201,
      })
    }
    cartItems.push({
      product,
      quantity: body.quantity,
      subtotalInCents: product.priceInCents * body.quantity,
    })
    return HttpResponse.json(getCart(), {
      status: 201,
    })
  }),

  http.patch('/api/cart/items/:productId', async ({ params, request }) => {
    const body = (await request.json()) as UpdateCartItemDTO
    if (body.quantity <= 0) {
      return HttpResponse.json(
        {
          message: 'Quantity must be greater than zero',
        },
        {
          status: 400,
        }
      )
    }
    const item = cartItems.find((item) => item.product.id === params.productId)

    if (!item) {
      return HttpResponse.json(
        {
          message: 'Cart item not found',
        },
        {
          status: 404,
        }
      )
    }
    item.quantity = body.quantity
    item.subtotalInCents = item.product.priceInCents * body.quantity
    return HttpResponse.json(getCart())
  }),

  http.delete('/api/cart/items/:productId', ({ params }) => {
    const itemIndex = cartItems.findIndex(
      (item) => item.product.id === params.productId
    )
    if (itemIndex === -1) {
      return HttpResponse.json(
        {
          message: 'Cart item not found',
        },
        {
          status: 404,
        }
      )
    }
    cartItems.splice(itemIndex, 1)
    return new HttpResponse(null, {
      status: 204,
    })
  }),

  http.post('/api/cart/checkout', () => {
    const orderId = crypto.randomUUID()
    cartItems.splice(0, cartItems.length)
    return HttpResponse.json(
      {
        orderId,
        message: 'Order successfully created',
      },
      {
        status: 201,
      }
    )
  }),
]

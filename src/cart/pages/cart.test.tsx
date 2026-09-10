import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import type { Cart } from '@/cart/types'
import { products } from '@/mocks/data/product'
import { server } from '@/mocks/server'

import { CartPage } from './cart'

const createCart = (quantity = 1): Cart => ({
  items: [
    {
      product: products[0],
      quantity,
      subtotalInCents: products[0].priceInCents * quantity,
    },
  ],
  totalItems: quantity,
  subtotalInCents: products[0].priceInCents * quantity,
  shippingInCents: 4000,
  totalInCents: products[0].priceInCents * quantity + 4000,
})

const renderCart = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('Cart', () => {
  it('should render the cart totals', async () => {
    server.use(http.get('/api/cart', () => HttpResponse.json(createCart())))
    renderCart()

    expect(
      await screen.findByRole('heading', { name: 'Seu carrinho' })
    ).toBeInTheDocument()
    expect(screen.getByText('Caneca de cerâmica rústica')).toBeInTheDocument()
    expect(screen.getByText('R$ 80,00')).toBeInTheDocument()
  })

  it('should update an item quantity', async () => {
    const user = userEvent.setup()
    server.use(
      http.get('/api/cart', () => HttpResponse.json(createCart())),
      http.patch('/api/cart/items/:productId', async ({ request }) => {
        const body = (await request.json()) as { quantity: number }
        return HttpResponse.json(createCart(body.quantity))
      })
    )
    renderCart()

    const quantitySelect = await screen.findByRole('combobox', {
      name: 'Quantidade de Caneca de cerâmica rústica',
    })
    await user.selectOptions(quantitySelect, '2')

    expect(await screen.findByText('R$ 120,00')).toBeInTheDocument()
    expect(screen.getByText(/Total \(2 produtos\)/)).toBeInTheDocument()
  })

  it('should remove an item', async () => {
    const user = userEvent.setup()
    let hasItems = true
    server.use(
      http.get('/api/cart', () =>
        HttpResponse.json(
          hasItems
            ? createCart()
            : {
                items: [],
                totalItems: 0,
                subtotalInCents: 0,
                shippingInCents: 0,
                totalInCents: 0,
              }
        )
      ),
      http.delete('/api/cart/items/:productId', () => {
        hasItems = false
        return new HttpResponse(null, { status: 204 })
      })
    )
    renderCart()

    await user.click(
      await screen.findByRole('button', {
        name: 'Remover Caneca de cerâmica rústica do carrinho',
      })
    )

    expect(
      await screen.findByText('Seu carrinho está vazio.')
    ).toBeInTheDocument()
  })

  it('should checkout and clear the cart', async () => {
    const user = userEvent.setup()
    server.use(
      http.get('/api/cart', () => HttpResponse.json(createCart())),
      http.post('/api/cart/checkout', () =>
        HttpResponse.json({
          orderId: 'order-id',
          message: 'Order successfully created',
        })
      )
    )
    renderCart()

    await user.click(
      await screen.findByRole('button', { name: 'Finalizar a compra' })
    )

    expect(await screen.findByRole('status')).toHaveTextContent(
      'Order successfully created'
    )
    await waitFor(() => {
      expect(
        screen.queryByText('Caneca de cerâmica rústica')
      ).not.toBeInTheDocument()
    })
  })
})

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ProductDetailsPage } from './product-details'

const renderProductDetails = (productId = '1') => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/products/${productId}`]}>
        <Routes>
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('ProductDetails', () => {
  it('should render product details', async () => {
    renderProductDetails()

    expect(
      await screen.findByRole('heading', {
        name: 'Caneca de cerâmica rústica',
      })
    ).toBeInTheDocument()
    expect(screen.getByText('R$ 40,00')).toBeInTheDocument()
    expect(
      screen.getByText(/Caneca de cerâmica com acabamento rústico/)
    ).toBeInTheDocument()
  })

  it('should add the product to the cart', async () => {
    const user = userEvent.setup()
    renderProductDetails()

    const addToCartButton = await screen.findByRole('button', {
      name: 'Adicionar ao carrinho',
    })
    await user.click(addToCartButton)

    expect(
      await screen.findByRole('button', { name: 'Adicionado ao carrinho' })
    ).toBeInTheDocument()
  })

  it('should show an error when the product does not exist', async () => {
    renderProductDetails('invalid-product')

    expect(
      await screen.findByText('Não foi possível carregar o produto')
    ).toHaveAttribute('role', 'alert')
  })
})

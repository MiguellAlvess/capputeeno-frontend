import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ProductCatalogPage } from './product-catalog'

describe('ProductCatalog', () => {
  it('should render products', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProductCatalogPage />
        </MemoryRouter>
      </QueryClientProvider>
    )
    expect(
      await screen.findByText('Caneca de cerâmica rústica')
    ).toBeInTheDocument()
    expect(screen.getByText('Caneca Black Ring')).toBeInTheDocument()
  })
})

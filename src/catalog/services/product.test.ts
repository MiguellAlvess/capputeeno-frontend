import { describe, expect, it } from 'vitest'

import { ProductService } from './product'

describe('ProductService', () => {
  it('should return products', async () => {
    const response = await ProductService.getProducts({
      page: 1,
      limit: 12,
    })

    expect(response.data.length).toBeGreaterThan(0)
    expect(response.pagination.page).toBe(1)
  })
})

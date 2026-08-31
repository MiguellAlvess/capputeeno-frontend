import { useQuery } from '@tanstack/react-query'

import { ProductService } from '../services/product'

export const useProductCatalog = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      ProductService.getProducts({
        page: 1,
        limit: 12,
      }),
  })
  return {
    products: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError,
  }
}

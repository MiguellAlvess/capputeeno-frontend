import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CartService } from '@/cart/services/cart'

import { ProductService } from '../services/product'

export const useProductDetails = (productId?: string) => {
  const queryClient = useQueryClient()
  const productQuery = useQuery({
    queryKey: ['products', productId],
    queryFn: () => ProductService.getProductById(productId!),
    enabled: Boolean(productId),
  })
  const addToCartMutation = useMutation({
    mutationFn: () =>
      CartService.addItem({
        productId: productId!,
        quantity: 1,
      }),
    onSuccess: (cart) => {
      queryClient.setQueryData(['cart'], cart)
    },
  })

  return {
    product: productQuery.data,
    isLoading: productQuery.isLoading,
    isError: productQuery.isError || !productId,
    addToCart: addToCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    hasAddedToCart: addToCartMutation.isSuccess,
    hasAddToCartError: addToCartMutation.isError,
  }
}

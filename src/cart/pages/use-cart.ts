import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CartService } from '../services/cart'
import type { Cart } from '../types'

const emptyCart: Cart = {
  items: [],
  totalItems: 0,
  subtotalInCents: 0,
  shippingInCents: 0,
  totalInCents: 0,
}

export const useCart = () => {
  const queryClient = useQueryClient()
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: CartService.getCart,
  })
  const updateItemMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => CartService.updateItem(productId, { quantity }),
    onSuccess: (cart) => {
      queryClient.setQueryData(['cart'], cart)
    },
  })
  const removeItemMutation = useMutation({
    mutationFn: CartService.removeItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })
  const checkoutMutation = useMutation({
    mutationFn: CartService.checkout,
    onSuccess: () => {
      queryClient.setQueryData(['cart'], emptyCart)
    },
  })

  return {
    cart: cartQuery.data,
    isLoading: cartQuery.isLoading,
    isError:
      cartQuery.isError ||
      updateItemMutation.isError ||
      removeItemMutation.isError ||
      checkoutMutation.isError,
    updateItemQuantity: updateItemMutation.mutate,
    removeItem: removeItemMutation.mutate,
    checkout: checkoutMutation.mutate,
    isUpdating: updateItemMutation.isPending || removeItemMutation.isPending,
    isCheckingOut: checkoutMutation.isPending,
    checkoutMessage: checkoutMutation.data?.message,
  }
}

import { CircleArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { CartItem } from '@/cart/components/cart-item'
import { OrderSummary } from '@/cart/components/order-summary'
import { Header } from '@/shared/components/header'
import { formatCurrency } from '@/shared/utils/format-currency'

import { useCart } from './use-cart'

export const CartPage = () => {
  const navigate = useNavigate()
  const {
    cart,
    isLoading,
    isError,
    updateItemQuantity,
    removeItem,
    checkout,
    isUpdating,
    isCheckingOut,
    checkoutMessage,
  } = useCart()

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-7 md:py-10">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-muted-foreground mb-6 flex items-center gap-2 text-sm"
        >
          <CircleArrowLeft size={18} />
          Voltar
        </button>

        {isLoading && <p>Carregando carrinho...</p>}
        {isError && (
          <p role="alert" className="text-destructive">
            Não foi possível atualizar o carrinho
          </p>
        )}
        {checkoutMessage && (
          <p role="status" className="mb-6 text-green-700">
            {checkoutMessage}
          </p>
        )}

        {cart && (
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <section>
              <h1 className="text-2xl font-medium uppercase">Seu carrinho</h1>
              <p className="mt-2 text-sm">
                Total ({cart.totalItems}{' '}
                {cart.totalItems === 1 ? 'produto' : 'produtos'}){' '}
                <strong>{formatCurrency(cart.subtotalInCents)}</strong>
              </p>

              {cart.items.length === 0 && !checkoutMessage && (
                <p className="mt-10">Seu carrinho está vazio.</p>
              )}

              <div className="mt-6 space-y-4">
                {cart.items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    isUpdating={isUpdating}
                    onQuantityChange={(productId, quantity) =>
                      updateItemQuantity({ productId, quantity })
                    }
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </section>
            <OrderSummary
              cart={cart}
              isCheckingOut={isCheckingOut}
              onCheckout={() => checkout()}
            />
          </div>
        )}
      </main>
    </>
  )
}

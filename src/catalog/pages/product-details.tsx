import { CircleArrowLeft, ShoppingBag } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Header } from '@/shared/components/header'
import { formatCurrency } from '@/shared/utils/format-currency'

import { useProductDetails } from './use-product-details'

const categoryLabels = {
  mugs: 'Caneca',
  't-shirts': 'Camiseta',
}

export const ProductDetailsPage = () => {
  const navigate = useNavigate()
  const { productId } = useParams()
  const {
    product,
    isLoading,
    isError,
    addToCart,
    isAddingToCart,
    hasAddedToCart,
    hasAddToCartError,
  } = useProductDetails(productId)

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

        {isLoading && <p>Carregando produto...</p>}

        {isError && <p role="alert">Não foi possível carregar o produto</p>}

        {product && (
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="aspect-square w-full rounded-sm object-cover"
            />

            <section className="flex flex-col">
              <p className="text-muted-foreground text-sm">
                {categoryLabels[product.category]}
              </p>
              <h1 className="mt-3 text-2xl font-light md:text-3xl">
                {product.name}
              </h1>
              <strong className="mt-2 text-xl font-semibold">
                {formatCurrency(product.priceInCents)}
              </strong>
              <p className="text-muted-foreground mt-5 text-xs">
                *Frete de R$40,00 para todo o Brasil. Grátis para compras acima
                de R$900,00.
              </p>

              <div className="mt-12 md:mt-16">
                <h2 className="text-muted-foreground text-sm font-medium uppercase">
                  Descrição
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-10 md:mt-auto">
                {hasAddToCartError && (
                  <p role="alert" className="text-destructive mb-2 text-sm">
                    Não foi possível adicionar o produto ao carrinho
                  </p>
                )}
                <Button
                  type="button"
                  size="lg"
                  onClick={() => addToCart()}
                  disabled={isAddingToCart}
                  className="w-full rounded-sm uppercase"
                >
                  <ShoppingBag />
                  {isAddingToCart
                    ? 'Adicionando...'
                    : hasAddedToCart
                      ? 'Adicionado ao carrinho'
                      : 'Adicionar ao carrinho'}
                </Button>
              </div>
            </section>
          </div>
        )}
      </main>
    </>
  )
}

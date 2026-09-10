import { Trash2 } from 'lucide-react'

import type { CartItem as CartItemType } from '@/cart/types'
import { formatCurrency } from '@/shared/utils/format-currency'

interface CartItemProps {
  item: CartItemType
  isUpdating: boolean
  onQuantityChange: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export const CartItem = ({
  item,
  isUpdating,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  const { product, quantity, subtotalInCents } = item

  return (
    <article className="bg-card overflow-hidden rounded-lg sm:flex">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="aspect-video w-full object-cover sm:aspect-auto sm:w-52"
      />
      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-light">{product.name}</h2>
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            disabled={isUpdating}
            aria-label={`Remover ${product.name} do carrinho`}
            className="text-destructive shrink-0 disabled:opacity-50"
          >
            <Trash2 size={20} />
          </button>
        </div>
        <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-relaxed">
          {product.description}
        </p>
        <div className="mt-6 flex items-end justify-between gap-4 sm:mt-auto">
          <label>
            <span className="sr-only">Quantidade de {product.name}</span>
            <select
              value={quantity}
              onChange={(event) =>
                onQuantityChange(product.id, Number(event.target.value))
              }
              disabled={isUpdating}
              className="border-border bg-card h-10 rounded-lg border px-3 disabled:opacity-50"
            >
              {Array.from(
                { length: product.stock },
                (_, index) => index + 1
              ).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <strong>{formatCurrency(subtotalInCents)}</strong>
        </div>
      </div>
    </article>
  )
}

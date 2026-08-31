import { useNavigate } from 'react-router-dom'

import type { Product } from '@/catalog/types'
import { formatCurrency } from '@/shared/utils/format-currency'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate()
  const handleProductClick = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <button
      type="button"
      onClick={handleProductClick}
      className="bg-card flex w-full cursor-pointer flex-col overflow-hidden text-left"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-64 w-full object-cover"
      />
      <div className="w-full px-3 py-2">
        <p className="text-muted-foreground truncate text-sm">{product.name}</p>
        <div className="bg-border my-2 h-px w-full" />
        <strong className="text-foreground text-sm font-semibold">
          {formatCurrency(product.priceInCents)}
        </strong>
      </div>
    </button>
  )
}

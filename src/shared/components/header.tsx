import { useQuery } from '@tanstack/react-query'
import { Search, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { CartService } from '@/cart/services/cart'
import { Input } from '@/components/ui/input'

export const Header = () => {
  const navigate = useNavigate()
  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: CartService.getCart,
  })

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-3xl font-bold"
        >
          capputeeno
        </button>
        <div className="flex items-center gap-6">
          <div className="relative w-80">
            <Input
              placeholder="Procurando por algo específico?"
              className="pr-10"
            />

            <Search
              size={18}
              className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
            />
          </div>
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="relative"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag size={22} />
            <span className="bg-destructive absolute -right-2 -bottom-2 flex size-4 items-center justify-center rounded-full text-[10px] text-white">
              {cart?.totalItems ?? 0}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

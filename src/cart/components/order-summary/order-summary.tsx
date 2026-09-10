import type { Cart } from '@/cart/types'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/shared/utils/format-currency'

interface OrderSummaryProps {
  cart: Cart
  isCheckingOut: boolean
  onCheckout: () => void
}

export const OrderSummary = ({
  cart,
  isCheckingOut,
  onCheckout,
}: OrderSummaryProps) => {
  return (
    <aside className="bg-card flex min-h-[34rem] flex-col p-6 lg:sticky lg:top-6">
      <h2 className="text-lg font-semibold uppercase">Resumo do pedido</h2>
      <dl className="mt-7 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt>Subtotal de produtos</dt>
          <dd>{formatCurrency(cart.subtotalInCents)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Entrega</dt>
          <dd>{formatCurrency(cart.shippingInCents)}</dd>
        </div>
        <div className="border-border flex justify-between gap-4 border-t pt-3 font-semibold">
          <dt>Total</dt>
          <dd>{formatCurrency(cart.totalInCents)}</dd>
        </div>
      </dl>
      <Button
        type="button"
        onClick={onCheckout}
        disabled={isCheckingOut || cart.items.length === 0}
        className="mt-7 h-11 rounded-sm bg-green-600 uppercase hover:bg-green-700"
      >
        {isCheckingOut ? 'Finalizando...' : 'Finalizar a compra'}
      </Button>
      <nav className="text-muted-foreground mt-auto flex flex-col items-start gap-3 text-xs font-medium uppercase underline">
        <a href="#ajuda">Ajuda</a>
        <a href="#reembolsos">Reembolsos</a>
        <a href="#entregas-e-frete">Entregas e frete</a>
        <a href="#trocas-e-devolucoes">Trocas e devoluções</a>
      </nav>
    </aside>
  )
}

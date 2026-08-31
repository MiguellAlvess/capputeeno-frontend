export const ProductFilters = () => {
  return (
    <div className="flex items-center justify-between">
      <nav className="flex items-center gap-8">
        <button
          type="button"
          className="border-highlight border-b-2 pb-1 text-sm font-semibold"
        >
          TODOS OS PRODUTOS
        </button>

        <button type="button" className="text-muted-foreground pb-1 text-sm">
          CAMISETAS
        </button>

        <button type="button" className="text-muted-foreground pb-1 text-sm">
          CANECAS
        </button>
      </nav>
      <button type="button" className="text-muted-foreground text-sm">
        Organizar por
      </button>
    </div>
  )
}

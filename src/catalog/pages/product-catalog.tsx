import { ProductFilters } from '@/catalog/components/product-filters'
import { ProductGrid } from '@/catalog/components/product-grid'
import { Header } from '@/shared/components/header'

import { useProductCatalog } from './use-product-catalog'

export const ProductCatalogPage = () => {
  const { products, isLoading, isError } = useProductCatalog()
  if (isLoading) {
    return <p>Carregando produtos...</p>
  }
  if (isError) {
    return <p>Não foi possível carregar os produtos</p>
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <ProductFilters />
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </main>
    </>
  )
}

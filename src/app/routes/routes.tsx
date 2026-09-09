import { Route, Routes } from 'react-router-dom'

import { ProductCatalogPage, ProductDetailsPage } from '@/catalog'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductCatalogPage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
    </Routes>
  )
}

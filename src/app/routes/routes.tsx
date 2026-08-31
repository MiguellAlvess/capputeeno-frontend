import { Route, Routes } from 'react-router-dom'

import { ProductCatalogPage } from '@/catalog'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductCatalogPage />} />
    </Routes>
  )
}

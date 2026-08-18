import { Route, Routes } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Catálogo</div>} />
      <Route path="/products/:productId" element={<div>Produto</div>} />
      <Route path="/cart" element={<div>Carrinho</div>} />
      <Route path="/admin/products/new" element={<div>Novo produto</div>} />
    </Routes>
  )
}

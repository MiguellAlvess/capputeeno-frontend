import { cartHandlers } from './cart-handlers'
import { productHandlers } from './product-handlers'

export const handlers = [...productHandlers, ...cartHandlers]

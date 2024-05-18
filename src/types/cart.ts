import { Volume } from './book'
export interface CartItemEntity {
  id: string
  quantity: number
  title: string
  volume: Volume
}

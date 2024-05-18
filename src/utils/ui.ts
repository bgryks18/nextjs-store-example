import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast'
import RemoveRedEyeOutlined from '@mui/icons-material/RemoveRedEyeOutlined'
import PriceCheck from '@mui/icons-material/PriceCheck'

export const categories = () => {
  return [
    { id: 'free-ebooks', label: 'category.free', icon: FreeBreakfastIcon },
    { id: 'paid-ebooks', label: 'category.paid', icon: PriceCheck },
    { id: 'full', label: 'category.viewable', icon: RemoveRedEyeOutlined },
  ]
}

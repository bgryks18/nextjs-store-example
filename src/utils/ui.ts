import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast'
import RemoveRedEyeOutlined from '@mui/icons-material/RemoveRedEyeOutlined'
import PriceCheck from '@mui/icons-material/PriceCheck'

export const categories = () => {
  return [
    { id: 'free-ebooks', label: 'Free E-Books', icon: FreeBreakfastIcon },
    { id: 'paid-ebooks', label: 'Paid E-Books', icon: PriceCheck },
    { id: 'full', label: 'Viewable', icon: RemoveRedEyeOutlined },
  ]
}

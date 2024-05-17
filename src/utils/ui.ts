import EggIcon from '@mui/icons-material/EggOutlined'
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfastOutlined'
import IcecreamIcon from '@mui/icons-material/IcecreamOutlined'
import RestaurantIcon from '@mui/icons-material/RestaurantOutlined'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenuOutlined'
import EggAltIcon from '@mui/icons-material/EggAltOutlined'

export const categories = () => {
  return [
    { id: '1', label: 'Dairy Eggs', icon: EggIcon },
    { id: '2', label: 'Breakfast', icon: FreeBreakfastIcon },
    { id: '3', label: 'Frozen', icon: IcecreamIcon },
    { id: '4', label: 'Vegetables', icon: RestaurantIcon },
    { id: '5', label: 'Fruits & Vegetables', icon: RestaurantMenuIcon },
    { id: '6', label: 'Dairy & Eggs', icon: EggAltIcon },
  ]
}

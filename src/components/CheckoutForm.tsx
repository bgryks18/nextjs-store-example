'use client'
import React from 'react'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Divider,
  FormControlLabel,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
} from '@mui/material'
import { useCart } from '@/hooks/useCart'
import { getCurrency } from '@/utils/currency'
import { PATH } from '@/types/common'
import { redirectTo } from '@/utils/lib'

export default function CheckoutForm() {
  const { cart, cartTotal } = useCart()
  const cartItems = cart.map((item) => (
    <TableRow key={item.id}>
      <TableCell sx={{ fontWeight: 'bold' }}>
        {item.quantity} x {item.title}
      </TableCell>
      <TableCell>
        {getCurrency(
          (item.volume.saleInfo.retailPrice?.amount || 0) * item.quantity,
          {
            currency: item.volume.saleInfo.retailPrice?.currencyCode,
          },
          item.volume.saleInfo.country
        )}
      </TableCell>
    </TableRow>
  ))

  if (cart.length === 0 || !cartTotal) {
    redirectTo(PATH.HOME, 'replace')
    return <></>
  }

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        mx: 'auto',
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <TableContainer
        component={Paper}
        sx={{ marginInline: 2, marginBlock: 2 }}
      >
        <Table>
          <TableBody>
            {cartItems}
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell>
                {getCurrency(
                  cartTotal,
                  {
                    currency: cart[0].volume.saleInfo.retailPrice?.currencyCode,
                  },
                  cart[0].volume.saleInfo.country
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography component="div" variant="h5" padding={2}>
        Add a new card to continue
      </Typography>
      <Divider />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card number</FormLabel>
          <Input endAdornment={<CreditCardIcon />} />
        </FormControl>
        <FormControl>
          <FormLabel>Expiry date</FormLabel>
          <Input endAdornment={<CreditCardIcon />} />
        </FormControl>
        <FormControl>
          <FormLabel>CVC/CVV</FormLabel>
          <Input endAdornment={<InfoOutlined />} />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card holder name</FormLabel>
          <Input placeholder="Enter cardholder's full name" />
        </FormControl>
        <FormControlLabel control={<Checkbox />} label="Remember the card" />
        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              textTransform: 'unset',
            }}
          >
            Add card
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

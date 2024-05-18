'use client'
import React, { useEffect } from 'react'
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
import { useTranslations } from 'next-intl'

export default function CheckoutForm() {
  const { cart, cartTotal } = useCart()
  const t = useTranslations()
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

  useEffect(() => {
    if (cart.length === 0 || !cartTotal) {
      redirectTo(PATH.HOME, 'replace')
    }
  }, [])

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
              <TableCell sx={{ fontWeight: 'bold' }}>
                {t('checkout.total')}
              </TableCell>
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
        {t('checkout.form.title')}
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
          <FormLabel>{t('checkout.form.cardNumber')}</FormLabel>
          <Input endAdornment={<CreditCardIcon />} />
        </FormControl>
        <FormControl>
          <FormLabel>{t('checkout.form.expiryDate')}</FormLabel>
          <Input endAdornment={<CreditCardIcon />} />
        </FormControl>
        <FormControl>
          <FormLabel>CVC/CVV</FormLabel>
          <Input endAdornment={<InfoOutlined />} />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>{t('checkout.form.cardHolderName')}</FormLabel>
          <Input placeholder={t('checkout.form.cardHolderNamePlaceholder')} />
        </FormControl>
        <FormControlLabel
          control={<Checkbox />}
          label={t('checkout.form.rememberCard')}
        />
        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              textTransform: 'unset',
            }}
          >
            {t('checkout.form.submit')}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

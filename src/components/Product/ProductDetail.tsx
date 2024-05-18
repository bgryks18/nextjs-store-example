'use client'
import { MouseEvent, useRef } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { makeStyles } from 'tss-react/mui'
import Rating from '@mui/material/Rating'
import { getCurrency } from '@/utils/currency'
import { useCart } from '@/hooks/useCart'
import { Volume } from '@/types/book'
import DiscountIcon from '@mui/icons-material/Discount'
import Link from 'next/link'
import { PATH } from '@/types/common'
import { Chip } from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
const useStyles = makeStyles()((theme) => ({
  container: {
    position: 'relative',
    animation: `$showProductBox 300ms ${theme.transitions.easing.easeInOut}`,
    maxWidth: 760,
    margin: '0 auto',
  },
  '@keyframes showProductBox': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  cardMedia: {
    maxHeight: 240,
    backgroundSize: 'contain',
    WebkitBackgroundSize: 'contain',
    aspectRatio: '1/1',
    backgroundColor: theme.palette.background.default,
    width: '100%',
  },

  cardContent: {
    paddingTop: 32,
    display: 'flex',
    justifyContent: 'space-between',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    rowGap: 8,
  },
  cardActions: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 3,
    padding: '0',
    margin: '0',
    '& button': {
      padding: 0,
      minWidth: 'auto',
      width: 32,
      height: 32,
    },
  },
  price: {
    display: 'flex',
    gap: 10,
  },
  currentPrice: {
    color: theme.palette.primary.main,
    fontWeight: '600',
  },
  oldPrice: {
    color: theme.palette.secondary.main,
    textDecoration: 'line-through',
    fontWeight: '600',
  },
  star: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 8,
  },
  discountButton: {
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    left: 10,
    color: theme.palette.common.white,
    padding: '6px 16px',
    fontSize: '12px',
    cursor: 'default',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewLink: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
      textDecoration: 'underline',
    },
  },
}))

const ProductBox = (volume: Volume) => {
  const { id, volumeInfo, saleInfo } = volume
  const { classes } = useStyles()

  const discount =
    saleInfo.listPrice && saleInfo.retailPrice
      ? saleInfo.retailPrice.amount < saleInfo.listPrice.amount
      : false
  return (
    <Card className={classes.container}>
      {discount && (
        <Typography className={classes.discountButton}>
          <DiscountIcon fontSize="inherit" />
        </Typography>
      )}
      <CardMedia
        className={classes.cardMedia}
        image={volumeInfo.imageLinks?.thumbnail || ''}
        title={volumeInfo.title}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="div" className={classes.cardInfo}>
          <Typography variant="body1" component="div" fontWeight="bold">
            <Link
              href={{
                pathname: `${PATH.BOOK}/${id}`,
              }}
            >
              {volumeInfo.title}
            </Link>
          </Typography>
          <Typography variant="body2" component="div" className={classes.star}>
            <Rating
              name="star"
              defaultValue={volumeInfo.averageRating}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography
              variant="body2"
              component="span"
              fontWeight="regular"
              color="gray"
            >
              ({volumeInfo.ratingsCount || 0})
            </Typography>
          </Typography>

          <Typography
            variant="body2"
            component="div"
            fontWeight="400"
            color="GrayText"
          >
            {volumeInfo.description}
          </Typography>

          {volumeInfo.previewLink && (
            <Link href={volumeInfo.previewLink} target="_blank">
              <Typography
                variant="body2"
                component="div"
                fontWeight="400"
                display="flex"
                alignItems="center"
                gap="2px"
                className={classes.previewLink}
              >
                <LinkIcon /> Click to preview
              </Typography>
            </Link>
          )}

          <Typography variant="body2" component="div" className={classes.price}>
            {saleInfo?.retailPrice && (
              <span className={classes.currentPrice}>
                {getCurrency(
                  saleInfo.retailPrice.amount,
                  {
                    currency: saleInfo.retailPrice.currencyCode,
                  },
                  saleInfo.country
                )}
              </span>
            )}
            {saleInfo.listPrice && discount && (
              <span className={classes.oldPrice}>
                {getCurrency(
                  saleInfo.listPrice.amount,
                  {
                    currency: saleInfo.listPrice.currencyCode,
                  },
                  saleInfo.country
                )}
              </span>
            )}
          </Typography>
          <Typography variant="body2" component="div" fontWeight="bold">
            {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Anonymous'}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            fontWeight="500"
            color="GrayText"
            gap={1}
            display="flex"
            flexWrap="wrap"
          >
            {volumeInfo.categories?.map((item) => {
              return <Chip key={item} label={item} />
            })}
          </Typography>
        </Typography>

        <CardActions className={classes.cardActions}>
          {saleInfo.saleability === 'FOR_SALE' && <Counter {...volume} />}
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default ProductBox

const Counter = (volume: Volume) => {
  const { id } = volume
  const countRef = useRef<HTMLDivElement>(null)
  const { cart, addToCart, removeFromCart } = useCart()

  const currentCount = Array.isArray(cart)
    ? cart.find((item) => item.id === id)?.quantity || 0
    : 0

  const handleIncrease = (e: MouseEvent<HTMLButtonElement>) => {
    addToCart(volume)
    e.preventDefault()
  }

  const handleDecrease = (e: MouseEvent<HTMLButtonElement>) => {
    removeFromCart(id)
    e.preventDefault()
  }

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        onClick={handleDecrease}
        sx={{
          visibility: currentCount >= 1 ? 'visible' : 'hidden',
        }}
        onDoubleClick={(e) => {
          e.preventDefault()
        }}
      >
        -
      </Button>

      <Typography
        component="div"
        textAlign="center"
        variant="body2"
        fontWeight="bold"
        ref={countRef}
      >
        {currentCount}
      </Typography>
      <Button
        size="small"
        variant="outlined"
        onClick={handleIncrease}
        onDoubleClick={(e) => {
          e.preventDefault()
        }}
      >
        +
      </Button>
    </>
  )
}

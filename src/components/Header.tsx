'use client'
import React, { useId, useState } from 'react'
import {
  AppBar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined'
import MoreIcon from '@mui/icons-material/MoreVert'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useCart } from '@/hooks/useCart'
import { PATH } from '@/types/common'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { getCurrency } from '@/utils/currency'
import Link from 'next/link'
import { makeStyles } from 'tss-react/mui'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import qs from 'qs'
import { useLocale, useTranslations } from 'next-intl'
import { Locale } from '@/types/i18n'
import { useRouter } from '@/utils/navigation'
import { countryFlags } from '@/utils/country'
import { getLocales } from '@/utils/getLocales'
import classNames from 'classnames'

const useStyles = makeStyles()((theme: Theme) => ({
  appBar: {
    color: theme.palette.common.black,
    height: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    top: 0,
    boxShadow: '0.5px 0.5px 2px #ddd',
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
      boxShadow: '0.5px 0.5px 2px #ddd',
      height: '60px',
      flexWrap: 'wrap',
    },
  },
  toolBar: {
    boxSizing: 'border-box',
    color: theme.palette.common.black,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
    minHeight: 'auto !important',
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  logoLink: {
    width: 220,
    maxWidth: '100%',
    aspectRatio: '2560/473',
    position: 'relative',

    '& img': {
      width: 240,
      maxWidth: '100%',
      aspectRatio: '2560/473',
    },
    [theme.breakpoints.down('md')]: {
      '& img': {
        width: 180,
        maxWidth: '100%',
        aspectRatio: '2560/473',
      },
    },
  },
  searchBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '48px',
    position: 'relative',
    '& > div': {
      width: '100%',
      height: '100%',
      borderRadius: 50,
      paddingRight: 0,

      '& input': {
        padding: 4,
        marginRight: 4,
        '&:-webkit-autofill': {
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: theme.palette.primary.main,
          transition: 'background-color 1s ease-in-out 0s',
          boxShadow: 'inset 0 0 20px 20px transparent',
        },

        '&:-webkit-autofill:hover': {
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: theme.palette.primary.main,
          transition: 'background-color 1s ease-in-out 0s',
          boxShadow: 'inset 0 0 20px 20px transparent',
        },

        '&:-webkit-autofill:focus': {
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: theme.palette.primary.main,
          transition: 'background-color 1s ease-in-out 0s',
          boxShadow: 'inset 0 0 20px 20px transparent',
        },

        '&:-webkit-autofill:active': {
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: theme.palette.primary.main,
          transition: 'background-color 1s ease-in-out 0s',
          boxShadow: 'inset 0 0 20px 20px transparent',
        },
      },
    },
    [theme.breakpoints.down('md')]: {
      height: '38px',
    },
  },
  searchButton: {
    height: '100%',
    borderRadius: '50px',
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    border: '0',
    minWidth: '118px',
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    [theme.breakpoints.down('md')]: {
      height: '38px',
      minWidth: 'auto',
      maxWidth: '90px',
    },
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    gap: 10,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  iconButton: {
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    width: 24,
    height: 24,
  },
  popover: {
    width: '300px',
    '& .MuiDivider-root': {
      marginBlock: 4,
    },
  },
  menuItem: {
    padding: '6px 16px',
    display: 'flex',
    alignItems: 'center',
    minHeight: '30px',
    gap: 4,
    [theme.breakpoints.down('md')]: {
      padding: '3px 9px',
    },
  },
  inlineLanguageSwitch: {
    display: 'flex',
    gap: 4,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inlineLanguageSelect: {
    marginLeft: 'auto',
  },
  quantity: {
    fontWeight: 400,
  },
  price: {
    fontWeight: 400,
    color: theme.palette.secondary.main,
  },
  select: {
    border: '0 !important',
    padding: 0,
    fontSize: 14,
    '& *': {
      border: '0 !important',
      padding: 0,
      margin: 0,
    },
  },
  progress: {
    position: 'absolute',
    left: 12,
    color: '#eee',
  },
}))

const Header = () => {
  const { classes } = useStyles()
  const logoUrl = '/logo.png'

  return (
    <AppBar className={classes.appBar} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters className={classes.toolBar}>
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'center'}
            columnSpacing={2}
          >
            <Grid item xs={2} md={3}>
              <div className={classes.logo}>
                <Link href={PATH.HOME} className={classes.logoLink}>
                  <Image src={logoUrl} alt="logo" fill />
                </Link>
              </div>
            </Grid>
            <Grid item xs={8} md={6}>
              <SearchForm />
            </Grid>
            <Grid item xs={2} md={3}>
              <MenuLinks />
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header

const MenuLinks = () => {
  const { classes } = useStyles()
  const userBasketPopoverId = useId()
  const userLanguageMenuId = useId()
  const mobileMenuId = useId()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const t = useTranslations()
  const locale = useLocale()
  const { cart, cartCount, cartTotal } = useCart()

  const [anchorUserBasketPopoverEl, setAnchorUserBasketPopoverEl] =
    useState<HTMLButtonElement | null>(null)

  const [anchorUserLanguageMenuEl, setAnchorUserLanguageMenuEl] =
    useState<HTMLButtonElement | null>(null)

  const [anchorMobileeMenuEl, setAnchorMobileeMenuEl] =
    useState<HTMLButtonElement | null>(null)

  const handleUserLanguageMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorUserLanguageMenuEl(event.currentTarget)
  }

  const handleUserBasketPopoverClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorUserBasketPopoverEl(event.currentTarget)
  }

  const handleMobileMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorMobileeMenuEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorUserBasketPopoverEl(null)
    setAnchorUserLanguageMenuEl(null)
    setAnchorMobileeMenuEl(null)
  }

  const isUserBasketPopoverOpen = Boolean(anchorUserBasketPopoverEl)
  const isUserLanguageMenuOpen = Boolean(anchorUserLanguageMenuEl)
  const isMobileMenuOpen = Boolean(anchorMobileeMenuEl)

  const cartItems = cart.map((item) => (
    <Typography
      variant={isMobile ? 'caption' : 'body2'}
      component="div"
      className={classes.menuItem}
      key={item.id}
    >
      <span className={classes.quantity}>
        {item.quantity} {item.title}
      </span>
      <span className={classes.price}>
        {getCurrency(
          (item.volume.saleInfo.retailPrice!.amount || 0) * item.quantity,
          {
            currency: item.volume.saleInfo.retailPrice!.currencyCode,
          },
          item.volume.saleInfo.country
        )}
      </span>
    </Typography>
  ))
  const setLanguage = async (lang: Locale) => {
    window.location.replace(PATH.HOME + lang)
  }

  const CurrentFlag = countryFlags[locale as Locale]

  const renderMenu = (
    <>
      <Badge badgeContent={cartCount} color="primary">
        <IconButton
          size="large"
          className={classes.iconButton}
          onClick={handleUserBasketPopoverClick}
        >
          <ShoppingBasketIcon />
        </IconButton>
      </Badge>
      <IconButton
        size="large"
        className={classes.iconButton}
        onClick={handleUserLanguageMenuClick}
      >
        <CurrentFlag className={classes.icon} />
      </IconButton>
      <Menu
        id={userLanguageMenuId}
        open={isUserLanguageMenuOpen}
        anchorEl={anchorUserLanguageMenuEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: classes.popover }}
      >
        {getLocales().map((locale) => {
          const Flag = countryFlags[locale]
          return (
            <MenuItem
              className={classes.menuItem}
              key={locale}
              onClick={() => {
                setLanguage(locale)
              }}
            >
              <Flag className={classes.icon} />
              <Typography variant="body2" component="span" fontWeight={400}>
                {t(`common.language.${locale}`)}
              </Typography>
            </MenuItem>
          )
        })}
      </Menu>
      <Menu
        id={userBasketPopoverId}
        open={isUserBasketPopoverOpen}
        anchorEl={anchorUserBasketPopoverEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: classes.popover }}
      >
        {cartCount > 0 ? (
          <Box>
            {cartItems}
            <Divider />
            <Typography
              variant="body2"
              component="div"
              className={classes.menuItem}
            >
              <span className={classes.quantity}>{t('checkout.total')}</span>
              <span className={classes.price}>
                {getCurrency(
                  cartTotal,
                  {
                    currency: cart[0].volume.saleInfo.retailPrice!.currencyCode,
                  },
                  cart[0].volume.saleInfo.country
                )}
              </span>
            </Typography>
            <Link href={PATH.CHECKOUT}>
              <MenuItem className={classes.menuItem}>
                <Typography variant="body2" component="span" fontWeight={400}>
                  {t('checkout.goToCart')}
                </Typography>
              </MenuItem>
            </Link>
          </Box>
        ) : (
          <Typography
            variant="body2"
            className={classes.menuItem}
            component="div"
          >
            {t('common.notification.noProductsInCard')}
          </Typography>
        )}
      </Menu>
    </>
  )

  const renderMobileMenu = (
    <>
      <Badge badgeContent={cartCount} color="primary">
        <IconButton
          size="small"
          className={classes.iconButton}
          onClick={handleMobileMenuClick}
        >
          <MoreIcon />
        </IconButton>
      </Badge>

      <Menu
        id={mobileMenuId}
        open={isMobileMenuOpen}
        anchorEl={anchorMobileeMenuEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: classes.popover }}
      >
        <Typography className={classes.inlineLanguageSwitch} component="div">
          <Typography
            component="div"
            className={classes.menuItem}
            variant="caption"
          >
            <CurrentFlag className={classes.icon} />
            {t(`common.language.${locale}`)}
          </Typography>

          <Select
            className={classNames(classes.select, classes.inlineLanguageSelect)}
          >
            {getLocales().map((locale) => {
              const Flag = countryFlags[locale]
              return (
                <MenuItem
                  className={classes.menuItem}
                  key={locale}
                  onClick={() => {
                    setLanguage(locale)
                  }}
                >
                  <Flag className={classes.icon} />
                  <Typography variant="body2" component="span" fontWeight={400}>
                    {t(`common.language.${locale}`)}
                  </Typography>
                </MenuItem>
              )
            })}
          </Select>
        </Typography>
        <Divider />

        {cartCount > 0 ? (
          <Box>
            {cartItems}
            <Divider />
            <Typography
              variant="caption"
              component="div"
              className={classes.menuItem}
            >
              <span className={classes.quantity}>Total</span>
              <span className={classes.price}>
                {getCurrency(
                  cartTotal,
                  {
                    currency: cart[0].volume.saleInfo.retailPrice!.currencyCode,
                  },
                  cart[0].volume.saleInfo.country
                )}
              </span>
            </Typography>
            <MenuItem onClick={handleMenuClose} className={classes.menuItem}>
              <Typography variant="caption" component="span" fontWeight={400}>
                <Link href={PATH.CHECKOUT}>{t('checkout.goToCart')}</Link>
              </Typography>
            </MenuItem>
          </Box>
        ) : (
          <Typography
            variant="caption"
            className={classes.menuItem}
            component="div"
          >
            {t('common.notification.noProductsInCard')}
          </Typography>
        )}
      </Menu>
    </>
  )
  return (
    <div className={classes.links}>
      {!isMobile && renderMenu}
      {isMobile && renderMobileMenu}
    </div>
  )
}

interface SearchFormProps {
  q: string
  by: 'title' | 'author'
}
const SearchForm = () => {
  const currentSearchParamms = useSearchParams()
  const t = useTranslations()
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const currentQuery = currentSearchParamms.get('q')
  const router = useRouter()
  const currentBy = (currentSearchParamms.get('by') || 'title') as
    | 'title'
    | 'author'
  const { handleSubmit, control } = useForm<SearchFormProps>({
    defaultValues: {
      by: currentBy,
      q: currentQuery || '',
    },
  })

  const onSubmit: SubmitHandler<SearchFormProps> = async (data) => {
    if (
      (!currentQuery && !data.q.trim()) ||
      (currentQuery && currentQuery.trim() === data.q.trim())
    ) {
      return
    }
    setIsLoading(true)
    const searchQuery = { q: data.q, by: data.by }
    const searchString = qs.stringify(searchQuery)
    router.replace(PATH.SEARCH + '?' + searchString, { locale: locale })
    setIsLoading(false)
  }

  const { classes } = useStyles()
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.searchBox}>
      <Controller
        name="q"
        control={control}
        render={({ field }) => (
          <OutlinedInput
            size="medium"
            margin="none"
            placeholder={t('search.placeholder')}
            startAdornment={<SearchIcon color="action" />}
            endAdornment={
              <>
                <Controller
                  name="by"
                  control={control}
                  render={({ field }) => (
                    <Select className={classes.select} {...field}>
                      <MenuItem value={'title'}>
                        {t('search.filter.title')}
                      </MenuItem>
                      <MenuItem value={'author'}>
                        {t('search.filter.author')}
                      </MenuItem>
                    </Select>
                  )}
                />

                <Button
                  variant="contained"
                  className={classes.searchButton}
                  type="submit"
                >
                  {isLoading && (
                    <CircularProgress size={20} className={classes.progress} />
                  )}

                  {t('search.submit')}
                </Button>
              </>
            }
            {...field}
          />
        )}
      />
    </form>
  )
}

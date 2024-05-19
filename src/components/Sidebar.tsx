'use client'
import { Divider, MenuItem, Paper, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { PATH } from '@/types/common'
import { categories } from '@/utils/ui'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import classnames from 'classnames'
import { useTranslations } from 'next-intl'

const useStyles = makeStyles()((theme) => ({
  container: {
    position: 'sticky',
    top: 100,
    left: 0,
    padding: 0,
    overflowY: 'auto',
    borderRadius: 4.8,

    [theme.breakpoints.down('md')]: {
      top: 0,
      maxHeight: 'unset',
      marginRight: 0,
    },
  },
  paper: {
    paddingBottom: 16,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    flexWrap: 'wrap',
    borderRadius: 4.4,

    '& .MuiMenuItem-root': {
      color: theme.palette.secondary.dark,
      display: 'flex',
      alignItems: 'center',
      columnGap: 8,
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 0,
      paddingBottom: 8,
      '& .MuiMenuItem-root': {
        padding: '2px 9px',
        columnGap: 2,
        '& span': {
          fontSize: '0.8rem',
        },
      },
    },
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
    padding: '16px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    [theme.breakpoints.down('md')]: {
      flexBasis: '100%',
      padding: '6px 16px',
    },
  },
  linkItem: {
    textDecoration: 'none !important',
    [theme.breakpoints.down('md')]: {
      marginInline: 6,
      borderRadius: '0 !important',
    },
  },
  active: {
    background: theme.palette.primary.main,
    '& .MuiMenuItem-root': {
      color: `${theme.palette.background.default} !important`,
    },
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
}))

const Sidebar = () => {
  const { classes } = useStyles()
  const searchParams = useSearchParams()
  const t = useTranslations()
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="body1" className={classes.title} component="div">
          {t('category.title')}
          <Divider />
        </Typography>

        {categories().map((item) => (
          <Link
            href={{
              pathname: PATH.HOME,
              query: {
                category: item.id,
              },
            }}
            className={classnames(classes.linkItem, {
              [classes.active]: searchParams
                .getAll('category')
                .includes(item.id),
            })}
            key={item.id}
          >
            <MenuItem>
              <item.icon />
              <Typography variant="body2" fontWeight="medium" component="span">
                {t(item.label)}
              </Typography>
            </MenuItem>
          </Link>
        ))}
      </Paper>
    </div>
  )
}

export default Sidebar

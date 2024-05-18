'use client'
import { Divider, MenuItem, Paper, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { PATH } from '@/types/common'
import { categories } from '@/utils/ui'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import classnames from 'classnames'

const useStyles = makeStyles()((theme) => ({
  container: {
    position: 'sticky',
    top: 100,
    left: 0,
    padding: 0,
    maxHeight: 'calc(100vh + (-140px))',
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
      top: 0,
      maxHeight: 'unset',
      marginRight: 0,
    },
  },
  paper: {
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    flexWrap: 'wrap',
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
      paddingBottom: 6,
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

    [theme.breakpoints.up('md')]: {
      '&:last-child': {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
      },
      '&>*:last-child': {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
      },
    },
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

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="body1" className={classes.title} component="div">
          Top Categories
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
                {item.label}
              </Typography>
            </MenuItem>
          </Link>
        ))}
      </Paper>
    </div>
  )
}

export default Sidebar

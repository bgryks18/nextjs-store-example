'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ReactNode } from 'react'
import {
  blueGrey,
  blue,
  common,
  grey,
  yellow,
  orange,
} from '@mui/material/colors'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir'

const theme = createTheme({
  // status: {
  //   danger: '#ff0000',
  // },
  typography: {
    fontWeightBold: 500,
    fontWeightMedium: 400,
    fontWeightRegular: 300,
    fontWeightLight: 200,
    fontFamily: 'inherit',
  },
  palette: {
    background: {
      default: grey[50],
    },
    common: {
      black: common.black,
    },
    primary: {
      main: blue[600],
    },
    secondary: {
      main: blueGrey[200],
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        filledWarning: {
          background: orange[400],
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          background: 'white',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: 'inherit',
          '@media screen and (max-width:991px)': {
            fontSize: '0.9rem',
          },
          '@media screen and (max-width:768px)': {
            fontSize: '0.8rem',
          },
          '@media screen and (max-width:525px)': {
            fontSize: '0.7rem',
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          '@media screen and (max-width:991px)': {
            fontSize: '0.9rem',
          },
          '@media screen and (max-width:768px)': {
            fontSize: '0.8rem',
          },
          '@media screen and (max-width:525px)': {
            fontSize: '0.7rem',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          '@media screen and (max-width:991px)': {
            minHeight: '36px',
          },
          '@media screen and (max-width:768px)': {
            minHeight: '32px',
          },
        },
      },
    },
  },
})

const Theme = ({ children }: { children: ReactNode }) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}

export default Theme

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}

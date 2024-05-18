'use client'
import { ReactNode } from 'react'
import { Container, Grid, useMediaQuery, useTheme } from '@mui/material'
import Header from './Header'
import Sidebar from './Sidebar'

const Page = ({
  children,
  showSidebar = true,
  showHeader = true,
}: {
  children: ReactNode
  showSidebar?: boolean
  showHeader?: boolean
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      {showHeader && <Header />}
      <Container maxWidth="xl" sx={{ marginBottom: 5 }}>
        <Grid container columnSpacing="24px">
          <Grid
            item
            xs={12}
            md={showSidebar ? 8 : 12}
            lg={showSidebar ? 9 : 12}
            order={isMobile ? 1 : 0}
            paddingTop="24px"
          >
            {children}
          </Grid>
          {showSidebar && (
            <Grid item xs={12} md={4} lg={3} paddingTop="24px">
              <Sidebar />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default Page

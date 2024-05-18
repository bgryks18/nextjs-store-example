'use client'
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ReactNode } from 'react'
import Masonry from '@mui/lab/Masonry'

const ProductList = ({
  title,
  children,
}: {
  title?: string | ReactNode
  children: ReactNode[]
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Grid
      item
      container
      columnSpacing="24px"
      rowGap="24px"
      sx={{ position: 'relative', margin: '0 -12px !important' }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          fontWeight: 'medium',
          paddingInline: '24px',
          width: '100%',
          paddingBottom: '4px',
        }}
      >
        {title && title}
      </Typography>

      <Grid item container>
        <Masonry
          columns={isMobile ? 1 : 3}
          spacing={3}
          defaultHeight={300}
          defaultColumns={isMobile ? 1 : 3}
          defaultSpacing={3}
        >
          {children}
        </Masonry>
      </Grid>
    </Grid>
  )
}

export default ProductList

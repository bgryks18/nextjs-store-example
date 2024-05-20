'use client'
import React, { ReactElement, ReactNode } from 'react'
import {
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

const ProductList = ({
  title,
  children,
}: {
  title?: string | ReactNode
  children: ReactElement[]
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Grid item container columnSpacing="24px" rowGap="24px">
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
        <ImageList
          variant="masonry"
          cols={isMobile ? 1 : 3}
          gap={18}
          component="div"
          sx={{
            padding: 0.5,
            margin: -0.5,
          }}
        >
          {React.Children.map(children, (child) => {
            return (
              <ImageListItem key={child.key} component="div">
                {child}
              </ImageListItem>
            )
          })}
        </ImageList>
      </Grid>
    </Grid>
  )
}

export default ProductList

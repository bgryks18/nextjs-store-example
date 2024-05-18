import Page from '@/components/Page'
import ProductBox from '@/components/Product/ProductBox'
import ProductList from '@/components/Product/ProductList'
import { VolumeListResponse } from '@/types/book'
import API from '@/utils/axios'
import { Typography } from '@mui/material'
import React from 'react'

const Home = async ({
  searchParams,
}: {
  searchParams: Record<string, any>
}) => {
  const getData = async () => {
    const categories =
      searchParams?.category && typeof searchParams?.category === 'string'
        ? searchParams?.category
        : Object.values(searchParams?.category || {})

    try {
      const { data } = await API.get<VolumeListResponse>('/volumes', {
        params: {
          q: 'intitle',
          filter: categories,
          maxResults: 40,
        },
      })
      return data.items || []
    } catch (err) {
      return []
    }
  }
  const products = await getData()

  return (
    <Page>
      {products.length === 0 ? (
        <Typography variant="h4" component="div" fontWeight="medium">
          No results
        </Typography>
      ) : (
        <ProductList title="Featured Books">
          {products.map((product) => (
            <ProductBox key={product.id} {...product} />
          ))}
        </ProductList>
      )}
    </Page>
  )
}

export default Home

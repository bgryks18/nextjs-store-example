import React from 'react'
import Page from '@/components/Page'
import ProductBox from '@/components/Product/ProductBox'
import ProductList from '@/components/Product/ProductList'
import Text from '@/components/Text'
import { VolumeListResponse } from '@/types/book'
import API from '@/utils/axios'
import { Alert } from '@mui/material'

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
        <Alert component="div" variant="filled" severity="warning">
          <Text i18nKey="common.notification.noResult" />
        </Alert>
      ) : (
        <ProductList title={<Text i18nKey="book.list.featuredBooks" />}>
          {products.map((product) => (
            <ProductBox key={product.id} {...product} />
          ))}
        </ProductList>
      )}
    </Page>
  )
}

export default Home

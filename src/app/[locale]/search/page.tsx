import Page from '@/components/Page'
import ProductBox from '@/components/Product/ProductBox'
import ProductList from '@/components/Product/ProductList'
import Text from '@/components/Text'
import { VolumeListResponse } from '@/types/book'
import { PATH } from '@/types/common'
import API from '@/utils/axios'
import { Typography } from '@mui/material'
import { redirect } from 'next/navigation'
import React from 'react'

const Search = async ({
  searchParams,
}: {
  searchParams: Record<string, any>
}) => {
  const keyword = searchParams.q

  if (!keyword) {
    redirect(PATH.HOME)
  }

  const getData = async () => {
    const by = searchParams.by === 'title' ? 'intitle' : 'inauthor'
    const categories =
      searchParams?.category && typeof searchParams?.category === 'string'
        ? searchParams?.category
        : Object.values(searchParams?.category || {})

    try {
      const { data } = await API.get<VolumeListResponse>('/volumes', {
        params: {
          q: keyword + by,
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
          <Text
            i18nKey="common.notification.noResultForKey"
            values={{ q: keyword }}
          />
        </Typography>
      ) : (
        <ProductList
          title={
            <Text
              i18nKey="common.notification.resultForKey"
              values={{ q: keyword }}
            />
          }
        >
          {products.map((product) => (
            <ProductBox key={product.id} {...product} />
          ))}
        </ProductList>
      )}
    </Page>
  )
}

export default Search

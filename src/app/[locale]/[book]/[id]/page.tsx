import Page from '@/components/Page'
import ProductDetail from '@/components/Product/ProductDetail'
import { Volume } from '@/types/book'
import API from '@/utils/axios'
import { Alert } from '@mui/material'
import React from 'react'

const BookDetail = async ({ params }: { params: { id: string } }) => {
  const getData = async () => {
    try {
      const { data } = await API.get<Volume>(`/volumes/${params.id}`, {})
      return data
    } catch (err) {
      return err
    }
  }
  const book = await getData()
  if (book instanceof Error) {
    return (
      <Page>
        <Alert component="div" variant="filled" severity="error">
          {book.message}
        </Alert>
      </Page>
    )
  }
  return (
    <Page>
      <ProductDetail {...(book as Volume)} />
    </Page>
  )
}

export default BookDetail

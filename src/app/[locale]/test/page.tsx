import Button from '@/components/Button'
import Post from '@/components/Post'
import { getTranslations } from 'next-intl/server'
import React from 'react'

const Page = async () => {
  const t = await getTranslations()
  const data: any[] = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'lorem ipsum dolor' },
        { id: 2, text: 'ipsum dolor' },
      ])
    }, 1000 * 1)
  })
  return (
    <div>
      page
      <br />
      {/* <Button /> */}
      {data.map((item) => {
        return <Post key={item.id} text={item.text} id={item.id} />
      })}
    </div>
  )
}

export default Page

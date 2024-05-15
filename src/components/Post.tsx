'use client'
import React from 'react'
import Button from './Button'

const Post = ({ text, id }: { text: string; id: number }) => {
  return (
    <div>
      <small>{id}</small>
      <p
        onClick={() => {
          console.log('copied')
        }}
      >
        {text}
        <Button />
      </p>
    </div>
  )
}

export default Post

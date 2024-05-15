'use client'
import React, { useState } from 'react'
import { Button as PRButton } from 'primereact/button'

const Button = () => {
  const [count, setCount] = useState<number>(0)
  return (
    <>
      <span>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum,
        quas aliquid aut repudiandae quam sunt odio iure, amet quidem veritatis
        eveniet est, eos facilis impedit possimus ex porro nobis cumque.
      </span>
      {/* <PRButton
        label={`${count}`}
        icon="pi pi-check"
        style={{ width: '100px' }}
        loading={count % 2 === 0}
        onClick={() => {
          'use client'
          console.log('clicked', window)
          setCount((prev) => prev + 1)
        }}
      /> */}
      <PRButton
        label={`${count}`}
        icon="pi pi-check"
        // loading={count % 2 === 0}
        onClick={() => setCount((prev) => prev + 1)}
      />
    </>
  )
}

export default Button

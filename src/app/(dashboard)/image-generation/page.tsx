'use client'

import React, { useEffect } from 'react'
import Configurations from '@/components/image-generation/Configurations'
import GeneratedImages from '@/components/image-generation/GeneratedImages'

const ImageGeneration = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }, 200)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className='container mx-auto grid gap-4 grid-cols-3 overflow-hidden '>
      <Configurations /> 
      <div className='col-span-2 p-4 rounded-xl flex items-center justify-center h-fit'>
        <GeneratedImages />
      </div>
    </section>
  )
}

export default ImageGeneration

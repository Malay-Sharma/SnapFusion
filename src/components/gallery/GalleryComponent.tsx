import React from 'react'
import { Tables } from '../../../database.types'
import Image from 'next/image'

type ImageProps = {
  url: string | undefined,
} & Tables<'generated_images'>

interface GalleryProps{
  images: ImageProps[]
}
const GalleryComponent = ({images}: GalleryProps) => {
  console.log(images)

  if(images.length === 0){
    return <div className='flex items-center justify-center h-[50vh] text-muted-foreground'>No Images Found!</div>
  }
  return (
    <div className='container mx-auto py-8'>
      <div className="columns-4 gap-4 space-y-4">
        {
          images.map((image, index) =>{
            return <div key={index}>
              <div className="relative overflow-hidden cursor-pointer transition-transform">
                <Image src={image.url || ""} alt={image.prompt || ""} width={image.width || 0} height={image.height || 0} className="object-cover rounded" />
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default GalleryComponent
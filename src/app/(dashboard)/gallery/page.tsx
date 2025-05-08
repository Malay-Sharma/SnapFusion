import { getImages } from '@/app/actions/image-actions';
import GalleryComponent from '@/components/gallery/GalleryComponent'
import React from 'react'

const Gallery = async () => {
  
  const {data: images} = await getImages();
  return (
    <section className='container mx-auto'>
      <h1 className='text-3xl font-semibold mb-2'>Collections</h1>
      <p className='text-muted-foreground mb-6'>
        Here, u can see all the images you have generated. Click to view.
      </p>
      <GalleryComponent images={ images || []}/>
    </section>
  )
}

export default Gallery
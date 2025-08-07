import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { NodeViewWrapper } from '@tiptap/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper/modules'

export const ImageGallery = ({ node }) => {
  const images = node.attrs.images || []
  console.log('Node attributes:', node.attrs) 

  return (
    <NodeViewWrapper className="image-swiper-wrapper">
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{ type: 'fraction' }}
      spaceBetween={10}
      navigation={true}
      centeredSlides={true}
      slidesPerView={1}
    >
      {images.map((src, id_) => (
        <SwiperSlide key={id_}>
          <img src={src} alt={`slide-${id_}`} />
        </SwiperSlide>
      ))}
    </Swiper>
    </NodeViewWrapper>
  )
}

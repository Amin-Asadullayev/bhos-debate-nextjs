import { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { NodeViewWrapper } from '@tiptap/react'
import { FcPrevious, FcNext } from 'react-icons/fc'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper/modules'

export const ImageGallery = ({ node }) => {
  const images = node.attrs.images || []

  const galleryPrevRef = useRef(null)
  const galleryNextRef = useRef(null)
  const [swiperReady, setSwiperReady] = useState(false)

  useEffect(() => {
    setSwiperReady(true)
  }, [])
  return (
    <NodeViewWrapper className="image-swiper-wrapper" style={{ position: 'relative' }}>
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ type: 'fraction' }}
        spaceBetween={10}
        centeredSlides={true}
        slidesPerView={1}
        navigation={
          swiperReady
            ? { prevEl: galleryPrevRef.current, nextEl: galleryNextRef.current }
            : false
        }
      >
        {images.map((src, id_) => (
          <SwiperSlide key={id_}>
            <img src={src} alt={`slide-${id_}`} />
          </SwiperSlide>
        ))}

        <div ref={galleryPrevRef} className="gallery-prev text-4xl">
          <FcPrevious />
        </div>
        <div ref={galleryNextRef} className="gallery-next text-4xl">
          <FcNext />
        </div>
      </Swiper>
    </NodeViewWrapper>
  )
}

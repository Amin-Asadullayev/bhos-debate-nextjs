import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ImageGallery } from '@/components/ImageGallery'

export const ImageSwiper = Node.create({
  name: 'imageSwiper',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      images: {
        default: [],
      },
    }
  },

  parseHTML() {
    return [
      { tag: 'div[data-type="image-swiper"]' },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const images = node.attrs.images || []
  
    return [
      'div',
      { class: 'swiper mySwiper', ...HTMLAttributes },
      [
        'div',
        { class: 'swiper-wrapper' },
        ...images.map((src) => [
          'div',
          { class: 'swiper-slide' },
          ['img', { src }],
        ]),
      ],
      ['div', { class: 'swiper-button-next' }],
      ['div', { class: 'swiper-button-prev' }],
      ['div', { class: 'swiper-pagination' }],
    ]
  },  

  addNodeView() {
    return ReactNodeViewRenderer(ImageGallery)
  },

  addCommands() {
    return {
      insertImageSwiper: (images) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: { images },
        })
      },
    }
  },
})

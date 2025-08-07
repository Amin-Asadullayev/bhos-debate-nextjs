'use client'

import { useEffect } from 'react'

export default function Swiper({ selector = '.swiper' }) {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.Swiper) {
            const swipers = document.querySelectorAll(selector)

            swipers.forEach((el) => {
                if (!el.swiper) {
                    new window.Swiper(el, {
                        slidesPerView: 1,
                        spaceBetween: 10,
                        navigation: {
                            nextEl: el.querySelector('.swiper-button-next'),
                            prevEl: el.querySelector('.swiper-button-prev'),
                        },
                        pagination: {
                            el: el.querySelector('.swiper-pagination'),
                            type: 'fraction',
                        },
                    })
                }
            })
        }
    }, [selector])

    return null
}

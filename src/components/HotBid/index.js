import React from 'react'
import cn from 'classnames'
import Slider from 'react-slick'
import Icon from '../Icon'
import Card from '../Card'

import styles from './HotBid.module.sass'

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button aria-label="arrow" aria-hidden="true" {...props}>
    {children}
  </button>
)

const settings = {
  infinite: true,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: (
    <SlickArrow>
      <Icon name="arrow-next" size="14" />
    </SlickArrow>
  ),
  prevArrow: (
    <SlickArrow>
      <Icon name="arrow-prev" size="14" />
    </SlickArrow>
  ),
  responsive: [
    {
      breakpoint: 1179,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        infinite: true,
      },
    },
  ],
}

const Hot = ({ classSection, info }) => {
  return (
    <div className={cn(classSection, styles.section)}>
      <div className={cn('container', styles.container)}>
        <div className={styles.wrapper}>
          <h2 className={cn('h3', styles.title)}>Hot bid</h2>
          <div className={styles.inner}>
            <Slider className="bid-slider" {...settings}>
              {info &&
                Object.keys(info)?.length &&
                Object.values(info)[0]?.map((x, index) => (
                  <Card key={index} className={styles.card} item={x} />
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hot

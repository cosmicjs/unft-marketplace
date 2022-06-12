import React from "react";
import cn from "classnames";
import Slider from "react-slick";
import Link from "next/link";
import styles from "./Categories.module.sass";
import Icon from "../../../components/Icon";
import Image from "../../../components/Image";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button aria-label="arrow" {...props}>{children}</button>
);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
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
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

const Categories = ( { info, type } ) => {
  return (
    <section className="section-bg">
      <div className={styles.section}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <h3 className={cn("h3", styles.title)}>Hot collections</h3>
            <div className={styles.inner}>
              <Slider className="collection-slider" {...settings}>
                {info?.length && info?.map(( category ) => (
                  Object.keys(category)?.map((key, index ) => (
                    <Link className={styles.item} href={`/search/${key}` || '/'} key={index}>
                    <div className={styles.cart}>
                      <div className={styles.gallery}>
                        {category[key]?.slice(0, 7)?.map((intro, index) => (
                          <div className={styles.preview} key={index}>
                            <Image
                              size={{ width: "100%", height: "98px" }}
                              src={intro?.metadata?.image?.imgix_url}
                              alt="Collection"
                              objectFit="cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className={styles.subtitle}>{type[key] || ''}</div>
                      <div className={styles.line}>
                        <div className={cn("status-stroke-black", styles.counter)}>
                          <span>{category[key]?.length}</span> items
                        </div>
                      </div>
                    </div>
                  </Link>
                  ))
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;

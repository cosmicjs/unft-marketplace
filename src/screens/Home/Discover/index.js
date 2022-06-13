import React, { useState, useCallback } from "react";
import cn from "classnames";
import { useRouter } from 'next/router';
import styles from "./Discover.module.sass";
import { Range, getTrackBackground } from "react-range";
import Slider from "react-slick";
import Icon from "../../../components/Icon";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import { filterDataByPrice, filterDataByColor } from "../../../lib/cosmic";
import { filterByType } from '../../../utils/filterDataByType';
import { ACTIVE_INDEX, OPTIONS } from "../../../utils/constants/appConstants";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button aria-label="arrow" aria-hidden="true" {...props}>{children}</button>
);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
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
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 100000,
        settings: "unslick",
      },
    ],
  };

  const STEP = 1;
  const MIN = 0;
  const MAX = 100;

const Discover = ( { info,type } ) => {
  const { push } = useRouter();
  const [activeIndex, setActiveIndex] = useState(type ? Object.entries(type)[0]?.[0] : ACTIVE_INDEX);
  const [option, setOption] = useState( OPTIONS[ 0 ] );

  const [rangeValues, setValues] = useState([50]);
  const [ visible, setVisible ] = useState( false );

  const [ filterResult, setFilterResult ] = useState( filterByType(info, activeIndex));

  const handleClick = ( href ) => {
    push( href );
  }

  const handleCategoryChange = ( index ) => {
    setActiveIndex( index );
    setFilterResult( filterByType(info, activeIndex) );
  }

  const getDataByFilterPrice = useCallback( async ( value ) => {
      setValues( value );
      const rangeParams = await filterDataByPrice(value[0]);
      await setFilterResult( rangeParams );
  },[] );

  const getDataByFilterOptions = useCallback( async ( value ) => {
      setOption( value );
      const optionsParams = await filterDataByColor(value);
      await setFilterResult( optionsParams );
  },[]);

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn( "container",styles.container )}>
        <div className={styles.head}>
          <div className={styles.stage}>
            Create, explore, & collect digital art.
          </div>
          <div className={styles.header}>
            <h3 className={cn("h3", styles.title)}>Discover</h3>
              <button
                onClick={() => handleClick( `/search/${activeIndex}` )}
                className={cn( "button-stroke",styles.button )} >
                Start search
              </button>
          </div>
        </div>
        <div className={styles.top}>
          <div className={styles.dropdown}>
              <Dropdown
                className={styles.dropdown}
                value={option}
                setValue={getDataByFilterOptions}
                options={OPTIONS}
              />
          </div>
          <div className={styles.nav}>
            {type && Object.entries(type)?.map((item, index) => (
              <button
                className={cn(styles.link, {
                  [styles.active]: item[0] === activeIndex,
                })}
                onClick={() => handleCategoryChange(item[0])}
                key={index}
              >
                {item[1]}
              </button>
            ))}
          </div>
          <button
            className={cn(styles.filter, { [styles.active]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <div className={styles.text}>Filter</div>
            <div className={styles.toggle}>
              <Icon name="filter" size="18" />
              <Icon name="close" size="10" />
            </div>
          </button>
        </div>
        <div className={cn(styles.filters, { [styles.active]: visible })}>
          <div className={styles.sorting}>
            <div className={styles.cell}>
              <div className={styles.label}>Price range</div>
              <Range
                values={rangeValues}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(rangeValues) => getDataByFilterPrice(rangeValues)}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "27px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "8px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values: rangeValues,
                          colors: ["#3772FF", "#E6E8EC"],
                          min: MIN,
                          max: MAX,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "24px",
                      width: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#3772FF",
                      border: "4px solid #FCFCFD",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-33px",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "18px",
                        fontFamily: "Poppins",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        backgroundColor: "#141416",
                      }}
                    >
                      {rangeValues[0].toFixed(1)}
                    </div>
                  </div>
                )}
              />
              <div className={styles.scale}>
                <div className={styles.number}>0 $</div>
                <div className={styles.number}>100 $</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.list}>
          <Slider
            aria-hidden="true"
            className={cn("discover-slider", styles.slider)}
            {...settings}
          >
            {filterResult?.length && filterResult?.map( ( info,index ) => (
                <Card className={styles.card} item={info} key={index} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Discover;

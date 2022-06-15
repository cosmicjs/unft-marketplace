import React, { useState, useEffect, useCallback, startTransition } from "react";
import cn from "classnames";
import { useRouter } from 'next/router';
import { Range,getTrackBackground } from "react-range";
import useDebounce from '../utils/hooks/useDebounce';
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import { filterDataByPrice, filterDataByColor, getSearchDataWith } from "../lib/cosmic";
import { useStateContext } from '../utils/context/StateContext';
import { filterByType } from '../utils/filterDataByType';
import { getAllDataByType, getDataByCategory } from '../lib/cosmic';
import { ACTIVE_INDEX, OPTIONS } from "../utils/constants/appConstants";

import styles from "../styles/pages/Search.module.sass";

const STEP = 1;
const MIN = 1;
const MAX = 100;

const Search = ({categoriesGroup, navigationItems}) => {
  const { query } = useRouter();
  const { categories } = useStateContext();

  const categoriesTypeData = categoriesGroup['type'] || categories[ 'type' ];
  const categoriesGroupsData = categoriesGroup['groups'] || categories[ 'groups' ];

  const [activeIndex, setActiveIndex] = useState( query['id'] || ACTIVE_INDEX );
  const [searchResult, setSearchResult] = useState( filterByType(categoriesGroupsData, query['id']));

  const [search, setSearch] = useState( "" );

  const debouncedSearchTerm = useDebounce(search, 600);

  const [ rangeValues, setRangeValues ] = useState( [ 50 ] );
  const [ option,setOption ] = useState( OPTIONS[ 0 ] );

  const getDataByFilterPrice = useCallback( async ( value ) => {
    setRangeValues( value );
    const rangeParams = await filterDataByPrice( value[0] );
    await setSearchResult( rangeParams );
  },[] );

  const getDataByFilterOptions = useCallback( async ( value ) => {
      setOption( value );
      const optionsParams = await filterDataByColor(value);
      await setSearchResult( optionsParams );
  },[] );

  const getDataBySearch = useCallback(async (search) => {
      const searchResult = await getSearchDataWith(search);
      await setSearchResult( searchResult );
    }, []);

  const handleCategoryChange = ( index ) => {
    setActiveIndex( index );
    setSearchResult( filterByType(categoriesGroupsData, activeIndex) );
  }

  const handleSubmit = ( e ) => {
    e.preventDefault();
    getDataBySearch( debouncedSearchTerm.toLowerCase().trim() );
  };

  useEffect(() => {
    let isMounted = true;

    if( debouncedSearchTerm?.length &&  isMounted) {
        getDataBySearch( debouncedSearchTerm.toLowerCase().trim() );
    } else {
      setSearchResult(filterByType(categoriesGroupsData, activeIndex ));
    };

    return () => {
      isMounted = false;
    }
  },[query, debouncedSearchTerm, getDataBySearch, categories, activeIndex, categoriesGroup, categoriesGroupsData] );

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.top}>
            <div className={styles.title}>Type your keywords</div>
            <form
              className={styles.search}
              action=""
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                className={styles.input}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="search"
                placeholder="Search ..."
                required
              />
              <button className={styles.result}>
                <Icon name="search" size="16" />
              </button>
            </form>
          </div>
          <div className={styles.sorting}>
            <div className={styles.dropdown}>
              <Dropdown
                className={styles.dropdown}
                value={option}
                setValue={getDataByFilterOptions}
                options={OPTIONS}
              />
            </div>
            <div className={styles.nav}>
              {categoriesTypeData && Object.entries(categoriesTypeData)?.map((item, index) => (
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
          </div>
          <div className={styles.row}>
            <div className={styles.filters}>
              <div className={styles.range}>
                <div className={styles.label}>Price range</div>
                <Range
                  values={rangeValues}
                  step={STEP}
                  min={MIN}
                  max={MAX}
                  onChange={(values) => getDataByFilterPrice(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: "36px",
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
                  <div className={styles.number}>$1</div>
                  <div className={styles.number}>$100</div>
                </div>
              </div>
              <div className={styles.reset} onClick={() => setRangeValues([50])}>
                <Icon name="close-circle-fill" size="24" />
                <span>Reset filter</span>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.list}>
                {searchResult?.length && searchResult?.map((x, index) => (
                  <Card className={styles.card} item={x} key={index} />
                ))}
              </div>
              <div className={styles.btns}>
                <button className={cn("button-stroke", styles.button)}>
                  <span>Load more</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </Layout>
  );
};

export default Search;

export async function getServerSideProps({ params }) {
  const navigationItems = await getAllDataByType( 'navigation' ) || [];

  const categoryTypes = await getAllDataByType( 'categories' ) || [];
  const categoriesData = await Promise.all( categoryTypes?.map( ( category ) => {
      return getDataByCategory( category?.id );
  } ) );

  const categoriesGroups = categoryTypes?.map(({ id }, index) => {
      return { [id]: categoriesData[index] };
    });

    const categoriesType = categoryTypes?.reduce((arr,{ title,id }) => {
      return { ...arr, [id]: title };
    },{} );

  const categoriesGroup = { groups: categoriesGroups, type: categoriesType }

  return {
    props: { navigationItems, categoriesGroup },
  };
}
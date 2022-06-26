import React, { useState, useEffect, useCallback, useRef } from "react";
import cn from "classnames";
import { useRouter } from 'next/router';
import useDebounce from '../utils/hooks/useDebounce';
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import { getSearchDataWith } from "../lib/cosmic";
import { useStateContext } from '../utils/context/StateContext';
import { filterByType } from '../utils/filterDataByType';
import priceRange from '../utils/constants/priceRange';
import handleQueryParams from '../utils/queryParams';
import { getAllDataByType, getDataByCategory } from '../lib/cosmic';
import { ACTIVE_INDEX,OPTIONS } from "../utils/constants/appConstants";
import useFetchData from '../utils/hooks/useFetchData'; 

import styles from "../styles/pages/Search.module.sass";

const Search = ({categoriesGroup, navigationItems}) => {
  const { query, push } = useRouter();
  const { categories } = useStateContext();

  const categoriesTypeData = categoriesGroup['type'] || categories[ 'type' ];

  const [activeIndex, setActiveIndex] = useState( query['categories'] || ACTIVE_INDEX );
  const [searchResult, setSearchResult] = useState([]);

  const {data, fetchData, hasError } = useFetchData([]);

  const [search, setSearch] = useState( "" );

  const debouncedSearchTerm = useDebounce(search, 600);

  const [ {min, max}, setRangeValues ] = useState((query['min'] || query['max']) ? {min: query['min'] || 1, max: query['max']} : priceRange);
  const [ option, setOption ] = useState(query['color'] || OPTIONS[ 0 ] );
  const [ isApplied,setIsApplied ] = useState( false );

  const searchElement = useRef( null );

  useEffect(() => {
    if (searchElement.current) {
      searchElement.current.focus();
    }
  },[ query ] );

  const handleChange = ( { target: { name,value } } ) => {
    isApplied && setIsApplied(false);
    setRangeValues( prevFields => ( {
      ...prevFields,
      [ name ]: value,
    } ) )
  };

  const handleFilterDataByParams = useCallback(async (categories, color, min, max) => {
      push({
        pathname: '/search',
        query: handleQueryParams({
          categories,
          color,
          min,
          max,
        })
          },undefined,{ shallow: true } );

      // const result = await fetch(`api/filter?min=${min}&max=${max}&color=${color}&categories=${categories}`);
      // const filterResult = await result.json();
      // await setSearchResult( filterResult['objects'] );
    fetchData( `api/filter?min=${min}&max=${max}&color=${color}&categories=${categories}` );
  },[fetchData, push] );

  console.log( 'Fetch DATA',data );

  const getDataByFilterPrice = useCallback(() => {
    if(min || max) {
      setIsApplied(true);
      handleFilterDataByParams(activeIndex, option, min, max);
    }
  },[handleFilterDataByParams, activeIndex, option, min, max] );

  const getDataByFilterOptions = useCallback( async ( color ) => {
    setOption( color );
    handleFilterDataByParams(activeIndex, color, min, max);
  },[activeIndex, handleFilterDataByParams, max, min] );

  const handleCategoryChange = useCallback(async ( index ) => {
    setActiveIndex( index );
    handleFilterDataByParams(index, option, min, max);
  }, [handleFilterDataByParams, option, max, min]);

  const handleReset = () => {
    setRangeValues(priceRange);
    setOption(OPTIONS[0]);
  }

  const getDataBySearch = useCallback( async ( search ) => {
      handleReset();

    const result = await fetch(`api/search?title=${search}`);
      const filterResult = await result.json();
      await setSearchResult( filterResult['objects'] );
    }, []);

  const handleSubmit = ( e ) => {
    e.preventDefault();
    getDataBySearch( debouncedSearchTerm.toLowerCase().trim() );
  };

  useEffect(() => {
    let isMounted = true;

    if(isMounted && debouncedSearchTerm?.length) {
      getDataBySearch( debouncedSearchTerm.toLowerCase().trim() );
    } else {
      handleFilterDataByParams(activeIndex, option, min, max);
    };

    return () => {
      isMounted = false;
    }
  },[debouncedSearchTerm] );

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
                ref={searchElement}
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
                <div className={styles.prices}>
                  <input
                    className={styles.input}
                    type="text"
                    value={min}
                    onChange={handleChange}
                    name="min"
                    placeholder="MIN"
                    required
                  />
                  <p className={styles.separator}>to</p>
                  <input
                    className={styles.input}
                    type="text"
                    value={max}
                    onChange={handleChange}
                    name="max"
                    placeholder="MAX"
                    required
                  />
                </div>
                <button
                  disabled={isApplied}
                  className={cn( isApplied ? "button": "button-stroke", styles.button )}
                  onClick={getDataByFilterPrice}
                >
                  Apply
                </button>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.list}>
                {searchResult?.length ? 
                  searchResult?.map((x, index) => (
                    <Card className={styles.card} item={x} key={index} />
                  )) :
                  <p className={styles.inform}>Try another category!</p>}
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
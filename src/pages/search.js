import React, { useState, useEffect, useCallback, useRef } from "react";
import cn from "classnames";
import { useRouter } from 'next/router';
import useDebounce from '../utils/hooks/useDebounce';
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import { useStateContext } from '../utils/context/StateContext';
import priceRange from '../utils/constants/priceRange';
import handleQueryParams from '../utils/queryParams';
import { getAllDataByType, getDataByCategory } from '../lib/cosmic';
import { ACTIVE_INDEX,OPTIONS } from "../utils/constants/appConstants";
import useFetchData from '../utils/hooks/useFetchData';

import styles from "../styles/pages/Search.module.sass";

const Search = ({categoriesGroup, navigationItems, categoryData}) => {
  const { query, push } = useRouter();
  const { categories } = useStateContext();

  const {data: searchResult, fetchData } = useFetchData(categoryData?.length ? categoryData : []);

  const categoriesTypeData = categoriesGroup[ 'type' ] || categories[ 'type' ];

  const [search, setSearch] = useState(query['search'] || "" );
  const debouncedSearchTerm = useDebounce(search, 600);

  const [activeIndex, setActiveIndex] = useState( query['category'] || ACTIVE_INDEX );
  const [ {min, max}, setRangeValues ] = useState((query['min'] || query['max']) ? {min: query['min'] || 1, max: query['max']} : priceRange);
  const [ option, setOption ] = useState(query['color'] || OPTIONS[ 0 ] );
  const [ isApplied, setIsApplied ] = useState( false );

  const handleChange = ( { target: { name,value } } ) => {
    isApplied && setIsApplied(false);
    setRangeValues( prevFields => ( {
      ...prevFields,
      [ name ]: value,
    } ) )
  };

  const handleFilterDataByParams = useCallback( async ( category,color,min,max ) => {
    search.length && setSearch( "" );

      push({
        pathname: '/search',
        query: handleQueryParams({
          category,
          color,
          min,
          max,
        })
      },undefined,{ shallow: true } );

      fetchData( `/api/filter?min=${min}&max=${max}&color=${color}&category=${category}` );
  },[fetchData, push, search.length] );

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
      push({
        pathname: '/search',
        query: handleQueryParams( {
          category: activeIndex,
          search
        })
      },undefined,{ shallow: true } );

      fetchData( `/api/search?title=${search}` );
    }, [activeIndex, fetchData, push]);

  const handleSubmit = ( e ) => {
    e.preventDefault();
    getDataBySearch( debouncedSearchTerm.toLowerCase().trim() );
  };

  useEffect(() => {
    let isMounted = true;

    if(isMounted && debouncedSearchTerm?.length) {
      getDataBySearch(debouncedSearchTerm.toLowerCase().trim());
    } else {
      !categoryData?.length && handleFilterDataByParams(activeIndex, option, min, max);
    };

    return () => {
      isMounted = false;
    }
  },[debouncedSearchTerm] );

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.row}>
            <div className={styles.filters}>
              <div className={styles.top}>
                <div className={styles.title}>Search</div>
              </div>
              <div className={styles.form}>
                <div className={styles.label}>Search keyword</div>
                <form
                  className={styles.search}
                  action=""
                  onSubmit={handleSubmit}
                >
                  <input
                    className={styles.input}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    name="search"
                    placeholder="Search..."
                    required
                  />
                  <button className={styles.result}>
                    <Icon name="search" size="16" />
                  </button>
                </form>
              </div>
              <div className={styles.sorting}>
                <div className={styles.dropdown}>
                  <div className={styles.label}>Select color</div>
                  <Dropdown
                    className={styles.dropdown}
                    value={option}
                    setValue={getDataByFilterOptions}
                    options={OPTIONS}
                  />
                </div>
              </div>
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

export async function getServerSideProps( { query } ) {
  const navigationItems = await getAllDataByType( 'navigation' ) || [];

  const categoryTypes = await getAllDataByType( 'categories' ) || [];
  const categoriesData = await Promise.all( categoryTypes?.map( ( category ) => {
      return getDataByCategory( category?.id );
  } ) );

  const categoryData = query?.hasOwnProperty( 'category' )  ?
    await getDataByCategory( query[ 'category' ] ) :
    {};

  const categoriesGroups = categoryTypes?.map(({ id }, index) => {
      return { [id]: categoriesData[index] };
    });

    const categoriesType = categoryTypes?.reduce((arr,{ title,id }) => {
      return { ...arr, [id]: title };
    },{} );

  const categoriesGroup = { groups: categoriesGroups, type: categoriesType }

  return {
    props: { navigationItems, categoriesGroup, categoryData },
  };
}
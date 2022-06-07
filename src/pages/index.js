import {useEffect, useCallback} from 'react'
import { useStateContext } from '../utils/context/StateContext';
import Layout from "../components/Layout";
import {Intro, Selection, Partners, HotBid, Categories, Discover, Description} from '../screens/Home'
import {  getDataByCategory, getAllDataByType } from '../lib/cosmic'

const Home = ({reviews, landing, categoryTypes, categoriesGroups,  categoriesType}) => {
  const { categories,onCategoriesChange } = useStateContext();

  const fetchCategoryData = useCallback((category, data) => {
    onCategoriesChange({ groups: category, type: data });
  },[ onCategoriesChange ] );

  useEffect(() => {
    let isMounted = true;

    if(!categories['groups']?.length && isMounted) {
      fetchCategoryData(categoriesGroups, categoriesType);
    }

    return () => {
      isMounted = false;
    }
  },[categories, categoriesGroups, categoriesType, fetchCategoryData]);

  return (
    <Layout>
        <Description info={landing[1]} />
        <HotBid classSection="section" info={categories['groups'][0]} />
        <Categories info={categories['groups']} type={categories['type']} />
        <Selection info={categories[ 'groups' ]} type={categoryTypes} />
        <Intro info={landing[0]}/>
        <Partners info={reviews} />
        <Discover info={categories[ 'groups' ]} type={categories[ 'type' ]} />
    </Layout>
  )
}

export async function getStaticProps() {
  const reviews = await getAllDataByType('reviews') || [];
  const landing = await getAllDataByType('landings')  || [];
  const categoryTypes = await getAllDataByType( 'categories' ) || [];
  const categoriesData = await Promise.all( categoryTypes?.map( ( category ) => {
      return getDataByCategory( category?.id );
    } ) );

    const categoriesGroups = categoryTypes?.map(({ id }, index) => {
      return { [id]: categoriesData[index] };
    });

    const categoriesType = categoryTypes?.reduce((arr,{ title,id }) => {
      return { ...arr, [id]: title };
    },{});

  return {
    props: { reviews, landing, categoryTypes, categoriesGroups,  categoriesType},
  }
}

export default Home;
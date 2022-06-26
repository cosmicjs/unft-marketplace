import React, { useState, useCallback } from "react";
import cn from "classnames";
import toast from 'react-hot-toast';
import { useStateContext } from '../../utils/context/StateContext';
import Layout from "../../components/Layout";
import HotBid from "../../components/HotBid";
import Discover from "../../screens/Home/Discover";
import Dropdown from "../../components/Dropdown";
import Modal from "../../components/Modal";
import OAuth from "../../components/OAuth";
import Image from "../../components/Image";
import { getDataBySlug, getAllDataByType, getDataByCategory } from '../../lib/cosmic';
import getStripe from '../../lib/getStripe';

import styles from "../../styles/pages/Item.module.sass";

const Item = ({ itemInfo, categoriesGroup, navigationItems }) => {
  const { onAdd, cartItems, cosmicUser } =  useStateContext();

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleAuthModal, setVisibleAuthModal] = useState(false);

  const counts = itemInfo?.[0]?.metadata?.count ? Array(itemInfo[ 0 ]?.metadata?.count ).fill(1).map( ( _,index ) => index + 1 ) : ['Not Available'];
  const [ option, setOption ] = useState( counts[0] );

  const handleAddToCart =() => {
    cosmicUser?.hasOwnProperty( 'id' ) ?
      handleCheckout() :
      handleOAuth();
  };

    const handleOAuth = useCallback(async (user) => {
    !cosmicUser.hasOwnProperty('id') && setVisibleAuthModal( true );

    if( !user && !user?.hasOwnProperty( 'id' ) ) return;
  }, [cosmicUser]);

  const handleCheckout = async () => {
    const addCart = await onAdd( itemInfo[0], option );

    if( addCart?.length ) {
      const stripe = await getStripe();

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addCart),
      } );

      if( response.statusCode === 500 ) return;

      const data = await response.json();
      toast.loading( 'Redirecting...', {
          position: "bottom-right"
      } );

      stripe.redirectToCheckout( { sessionId: data.id } )
    }
  }

  return (
      <Layout navigationPaths={navigationItems[0]?.metadata}>
        <div className={cn("section", styles.section)}>
          <div className={cn("container", styles.container)}>
            <div className={styles.bg}>
              <div className={styles.preview}>
                <div className={styles.categories}>
                  <div className={cn("status-purple", styles.category)}>
                    {itemInfo[0]?.metadata?.color}
                  </div>
              </div>
              <div className={styles.image}>
                <Image
                  size={{ width: "100%", height: "100%" }}
                  srcSet={`${itemInfo[0]?.metadata?.image?.imgix_url}`}
                  src={itemInfo[0]?.metadata?.image?.imgix_url}
                  alt="Item"
                  objectFit="cover"
                />
              </div>
              </div>
            </div>
            <div className={styles.details}>
              <h1 className={cn( "h3",styles.title )}>{itemInfo[0]?.title}</h1>
              <div className={styles.cost}>
                <div className={cn("status-stroke-green", styles.price)}>
                  {`$${itemInfo[0]?.metadata?.price}`}
                </div>
              <div className={styles.counter}>{itemInfo[ 0 ]?.metadata?.count > 0 ? `${itemInfo[ 0 ]?.metadata?.count} in stock` : 'Not Available'}</div>
              </div>
              <div className={styles.info}>
                {itemInfo[0]?.metadata?.description}
              </div>
              <div className={styles.nav}>
                {itemInfo[0]?.metadata?.categories?.map((x, index) => (
                  <button
                    className={cn(
                      { [styles.active]: index === activeIndex },
                      styles.link
                    )}
                    onClick={() => setActiveIndex(index)}
                    key={index}
                  >
                    {x?.title}
                  </button>
                ))}
              </div>
              <div className={styles.actions}>
                <div className={styles.dropdown}>
                <Dropdown
                  className={styles.dropdown}
                  value={option}
                  setValue={setOption}
                  options={counts}
                />
              </div>
              <div className={styles.btns}>
                <button
                  className={cn( "button",styles.button )}
                  onClick={handleAddToCart}
                >
                  Buy Now
                </button>
              </div>
              </div>
            </div>
          </div>
          <HotBid classSection="section" info={categoriesGroup['groups'][ 0 ]} />
          <Discover info={categoriesGroup['groups']} type={categoriesGroup['type']}/>
        </div>
        <Modal visible={visibleAuthModal} onClose={() => setVisibleAuthModal(false)}>
          <OAuth className={styles.steps} handleOAuth={handleOAuth} handleClose={() => setVisibleAuthModal(false)} />
        </Modal>
      </Layout>
  );
};

export default Item;


export async function getServerSideProps({ params }) {
  const itemInfo = await getDataBySlug( params.slug );

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

  const categoriesGroup = { groups: categoriesGroups,type: categoriesType }

  if (!itemInfo) {
    return {
      notFound: true,
    }
  }

  return {
    props: { itemInfo, navigationItems, categoriesGroup },
  };
}
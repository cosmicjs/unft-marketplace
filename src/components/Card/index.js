import React, { useState } from "react";
import cn from "classnames";
import AppLink from "../AppLink";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import Image from '../Image';

const Card = ({ className, item }) => {
  const [ visible,setVisible ] = useState( false );
  console.log('item', item)

  return (
    <div className={cn( styles.card,className )} aria-hidden="true">
      <AppLink className={styles.link} href={`/item/${item?.slug}` || '/'}>
      <div className={styles.preview}>
          <Image
            size={{ width: "100%", height: "360px" }}
            src={item?.metadata?.image?.imgix_url}
            alt="Card"
            objectFit="cover"
            />
        <div className={styles.control}>
          <div
            className={styles.category}
          >
            {item?.title}
          </div>
          <button
            className={cn(styles.favorite, { [styles.active]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <Icon name="heart" size="20" />
          </button>
          <button className={cn("button-small", styles.button)}>
            <span>{`$${item?.metadata?.price}`}</span>
            <Icon name="scatter-up" size="16" />
          </button>
        </div>
      </div>
      <div className={styles.foot}>
        <div className={styles.status}>
          <Icon name="candlesticks-up" size="20" />
            Highest Trends <span>{item?.highestBid}</span>
          </div>
          <div
            className={styles.bid}
            dangerouslySetInnerHTML={{ __html: item?.count }}
          />
        </div>
        </AppLink>
      </div>
  );
};

export default Card;

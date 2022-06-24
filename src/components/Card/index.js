import React, { useState } from "react";
import cn from "classnames";
import AppLink from "../AppLink";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import Image from '../Image';

const Card = ({ className, item }) => {
  const [ visible,setVisible ] = useState( false );

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
            <span>{`${item?.metadata?.categories[0]?.title}`}</span>
            <Icon name="scatter-up" size="16" />
          </button>
        </div>
      </div>
      <div className={styles.foot}>
            <div className={styles.status}>
              <p>{item?.title}</p>
              <p className={styles.count}>{item?.metadata?.count > 0 ?  `${item?.metadata?.count} Items` : 'Not Available'}</p>
            </div>
            <div
              className={styles.bid}
              dangerouslySetInnerHTML={{ __html: item?.count }}
            />
            <span className={styles.price}>{`$ ${item?.metadata?.price}`}</span>
        </div>
        </AppLink>
      </div>
  );
};

export default Card;

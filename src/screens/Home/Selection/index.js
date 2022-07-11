import React from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import AppLink from '../../../components/AppLink'
import styles from './Selection.module.sass'
import Icon from '../../../components/Icon'
import Image from '../../../components/Image'

const Selection = ({ info, type }) => {
  const { push } = useRouter()

  const handleClick = href => {
    push(href)
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={cn('button-stroke', styles.search)}
        onClick={() => handleClick('/search')}
      >
        Start your search
      </button>
      <div className={cn('section-pb', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.row}>
            <div className={styles.col}>
              {info?.length &&
                Object.values(info[0])[0]?.map(
                  (x, index) =>
                    index === 0 && (
                      <AppLink
                        className={styles.card}
                        href={`/item/${x.slug}`}
                        key={index}
                      >
                        <Image
                          size={{ width: '100%', height: '75vh' }}
                          srcSet={`${x.metadata?.image?.imgix_url} 2x`}
                          src={`${x.metadata?.image?.imgix_url}`}
                          alt="Selection"
                          className={styles.preview}
                          objectFit="cover"
                        />
                        <div className={styles.head}>
                          <div className={styles.line}>
                            <Image
                              className={styles.avatar}
                              size={{ width: '48px', height: '48px' }}
                              src={x.metadata?.image?.imgix_url}
                              alt="Avatar"
                              objectFit="cover"
                            />
                            <div className={styles.description}>
                              <div className={styles.title}>{x?.title}</div>
                              <div
                                className={styles.counter}
                              >{`${x?.metadata?.count} item`}</div>
                            </div>
                          </div>
                          <div className={styles.box}>
                            <div className={styles.content}>Best!</div>
                            <div
                              className={styles.price}
                            >{`${x?.metadata?.price} $`}</div>
                          </div>
                        </div>
                      </AppLink>
                    )
                )}
            </div>
            <div className={styles.col}>
              {info?.length &&
                Object.values(info[0])[0]?.map(
                  (x, index) =>
                    index > 0 &&
                    index < 4 && (
                      <AppLink
                        className={styles.item}
                        href={`/item/${x.slug}`}
                        key={index}
                      >
                        <div className={styles.preview}>
                          <Image
                            size={{ width: '160px', height: '160px' }}
                            srcSet={x.metadata?.image?.imgix_url}
                            src={x.metadata?.image?.imgix_url}
                            alt="Selection"
                            objectFit="cover"
                          />
                        </div>
                        <div className={styles.description}>
                          <div className={styles.title}>{x.title}</div>
                          <div className={styles.line}>
                            <Image
                              className={styles.avatar}
                              size={{ width: '48px', height: '48px' }}
                              src={x.metadata?.image?.imgix_url}
                              alt="Avatar"
                              objectFit="cover"
                            />
                            <div
                              className={styles.price}
                            >{`$${x?.metadata?.price}`}</div>
                            <div
                              className={styles.content}
                            >{`${x?.metadata?.count} item`}</div>
                          </div>
                          <button
                            className={cn(
                              'button-stroke button-small',
                              styles.button
                            )}
                          >
                            Show more
                          </button>
                        </div>
                      </AppLink>
                    )
                )}
            </div>
          </div>
          <div className={styles.sidebar}>
            <div className={styles.info}>
              Latest upload{' '}
              <span className={styles.smile} role="img" aria-label="fire">
                🔥
              </span>
            </div>
            <div className={styles.list}>
              {type?.map((x, index) => (
                <div className={styles.user} key={index}>
                  <AppLink href={`/search?category=${x.id}`}>
                    <div className={styles.avatar}>
                      <Image
                        size={{ width: '56px', height: '56px' }}
                        src={x.metadata?.image?.imgix_url}
                        alt="Avatar"
                        objectFit="cover"
                      />
                    </div>
                    <div className={styles.description}>
                      <div className={styles.name}>{x.metadata?.title}</div>
                      <div
                        className={styles.money}
                        dangerouslySetInnerHTML={{ __html: x.content }}
                      />
                    </div>
                  </AppLink>
                </div>
              ))}
            </div>
            <AppLink
              className={cn('button-stroke button-small', styles.button)}
              href="/search"
            >
              <span>Discover more</span>
              <Icon name="arrow-next" size="10" />
            </AppLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Selection

import Cosmic from 'cosmicjs';
import { OPTIONS,MIN } from '../utils/constants/appConstants';

// Secret environment variables add to the JavaScript bundle, open the next.config.js
//https://nextjs.org/docs/api-reference/next.config.js/environment-variables
const WRITE_KEY = process.env.cosmicWriteKey

const bucket = Cosmic().bucket({
  slug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  read_key: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
  write_key: WRITE_KEY,
})

const is404 = ( error ) => /not found/i.test( error?.message )

export async function getDataByCategory(id) {
  const params = {
    query: {
      "metadata.categories": [`${id}`],
      type: 'products',
    },
    props: 'title,slug,metadata,created_at',
    sort: '-created_at',
  }

  try {
    const data = await bucket.getObjects( params )
    return data.objects
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
}

export async function getAllDataByType(dataType = 'categories') {
  const params = {
    query: {
      type: dataType,
    },
    props: 'title,slug,id,metadata',
    sort: '-created_at',
  }

  try {
    const data = await bucket.getObjects( params )
    return data.objects
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
}

export async function getSearchDataWith(title) {
  const params = {
    query: {
      "title": { "$regex": title, "$options": "i" },
      type: 'products',
    },
    props: 'title,slug,metadata,created_at',
    sort: '-created_at',
  }

  try {
    const data = await bucket.getObjects( params )
    return data.objects
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
}

export async function filterDataByParams( price, color, categories ) {
  let queryParam = {};

  if( price > MIN ) {
    queryParam = { ...queryParam, "metadata.price": { "$lte": price },}
  }

  if( OPTIONS[0]?.toLocaleLowerCase() !== color?.toLocaleLowerCase() ) {
    queryParam = { ...queryParam, "metadata.color": color,}
  }

  //TODO need check filter
  if( categories ) {
    queryParam = { ...queryParam, "metadata.categories": { $in: categories },}
  }

  const params = {
    query: {
      ...queryParam,
      type: 'products',
    },
    props: 'title,slug,metadata,created_at',
  }

  try {
    const data = await bucket.getObjects(params)
    return data.objects
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
}
export async function getDataBySlug(slug) {
  const params = {
    query: {
      slug,
      type: 'products',
    },
    props: 'title,slug,metadata,created_at',
    sort: '-created_at',
  }

  try {
    const data = await bucket.getObjects( params )
    return data.objects
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
}

export async function uploadMediaFiles(file) {
  try {
    if( file ) {
      const data = await bucket?.addMedia({media: file})
      return data
    }
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
}



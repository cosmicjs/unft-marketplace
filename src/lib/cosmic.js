import Cosmic from 'cosmicjs';
const CosmicAuth = require("cosmicjs")();

const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG
const READ_KEY = process.env.COSMIC_READ_KEY
const WRITE_KEY = process.env.COSMIC_WRITE_KEY

const bucket = Cosmic().bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
  write_key: WRITE_KEY,
})

const is404 = ( error ) => /not found/i.test( error?.message )

export async function getAllDataForHome() {
  const params = {
    type: 'collections',
    props: 'title,slug,metadata,created_at,id',
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

export async function filterDataByPrice(param) {
  const params = {
    query: {
      "metadata.price": { "$lte": param },
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

export async function filterDataByColor(param) {
  const params = {
    query: {
      "metadata.color": param,
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
    const data = await bucket?.addMedia({media: file})
    return data
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
}

export async function createItem(fields) {
  try {
    const data = await bucket.addObject(fields)
    return data
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
}

export async function cosmicAuth(fields) {
  try {
    const data = await CosmicAuth.authenticate(fields);
    return data
  } catch( error ) {
    return error[ 'message' ];
  }
}

export async function getCosmicUser(token) {
  try {
    const data = await fetch( 'https://api.cosmicjs.com/v2/user',{
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    } );
    return data.json();
  } catch( error ) {
    return error[ 'message' ];
  }
}
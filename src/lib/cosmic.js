import Cosmic from 'cosmicjs'

const bucket = Cosmic().bucket({
  slug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  read_key: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
})

const is404 = error => /not found/i.test(error?.message)

export async function getDataByCategory(id) {
  const params = {
    query: {
      'metadata.categories': [`${id}`],
      type: 'products',
    },
    props: 'title,slug,metadata,created_at',
    sort: '-created_at',
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

export async function getAllDataByType(dataType = 'categories') {
  const params = {
    query: {
      type: dataType,
    },
    props: 'title,slug,id,metadata',
    sort: '-created_at',
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
    const data = await bucket.getObjects(params)
    return data.objects
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
}

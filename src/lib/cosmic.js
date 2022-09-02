import Cosmic from 'cosmicjs'

const bucket = Cosmic().bucket({
  slug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  read_key: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
})

const is404 = error => /not found/i.test(error?.message)

// new versions 
export async function getDataByCategory(id) {
  const query = {
    'metadata.categories': [`${id}`],
    type: 'products',
  };

  try {
    const data = await bucket.objects.find(query).props('title,slug,metadata,created_at');
    return data.objects
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
};

export async function getAllDataByType(dataType = 'categories') {
  try {
    const data = await bucket.objects.find({type: dataType}).props('title,slug,id,metadata')
    return data.objects
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
}

export async function getDataBySlug(slug) {
  try {
    const data = await bucket.objects.find({
      slug,
      type: 'products',
    }).props('title,slug,metadata,created_at')
    return data.objects
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
}

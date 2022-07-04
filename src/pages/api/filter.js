import Cosmic from 'cosmicjs';

const bucket = Cosmic().bucket({
  slug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  read_key: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
} )

export default async function filterHandler( req,res ) {
  const { query: {min, max, color, category, search} } = req;

  let queryParam = {};

  if( (typeof min !== 'undefined' && min !== 'undefined') || (typeof max !== 'undefined' && max !== 'undefined')) {
    queryParam = { ...queryParam, "metadata.price": {"$gte": typeof min !== 'undefined' ? Number(min) : 1, "$lte": typeof max !== 'undefined' ? Number(max) : 1000000000 },}
  }

  if(typeof color !== 'undefined' && color !== 'undefined' && color?.toLocaleLowerCase() !== "any color") {
    queryParam = { ...queryParam, "metadata.color": color,}
  }

  if(typeof category !== 'undefined' && category !== 'undefined' ) {
    queryParam = { ...queryParam, "metadata.categories": category,}
  }

  if(search && typeof search !== 'undefined' && search !== 'undefined') {
    queryParam = { ...queryParam, "title": { "$regex": search, "$options": "i" },}
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
    res.status( 200 ).json(data);
  } catch (error) {
    res.status(404).json(error)
  }
}












import Cosmic from 'cosmicjs';

const bucket = Cosmic().bucket({
  slug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  read_key: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
} )

export default async function searchHandler( req,res ) {
  const { query: {title} } = req;

  const params = {
    query: {
      "title": { "$regex": title, "$options": "i" },
      type: 'products',
    },
    props: 'title,slug,metadata,created_at',
    sort: '-created_at',
  }

  try {
    const data = await bucket.getObjects(params)
    res.status( 200 ).json(data);
  } catch (error) {
    res.status(404).json(error.message)
  }
}












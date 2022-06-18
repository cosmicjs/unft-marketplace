import Cosmic from 'cosmicjs';

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY

const bucket = Cosmic().bucket( {
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
})

export default async function categoryHandler(req, res) {
  const {
    query: { id },
    method,
  } = req;

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
    res.status(200).json(data.objects)
  } catch (error) {
    res.status(404).json(error.message)
  }
 }
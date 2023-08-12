import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  readKey: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
  writeKey: process.env.COSMIC_WRITE_KEY,
})

export default async function createHandler(
  { body: { title, description, price, count, color, image, categories } },
  res
) {
  const metadata = {
    description,
    price: Number(price),
    count: Number(count),
    color,
    image,
    categories,
  }
  try {
    const data = await cosmic.objects.insertOne({
      title: title,
      type: 'products',
      thumbnail: image,
      metadata,
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

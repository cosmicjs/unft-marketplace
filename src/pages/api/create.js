import Cosmic from 'cosmicjs';

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY

// Secret environment variables add to the JavaScript bundle, open the next.config.js
//https://nextjs.org/docs/api-reference/next.config.js/environment-variables
const WRITE_KEY = process.env.cosmicWriteKey

const bucket = Cosmic().bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
  write_key: WRITE_KEY,
})

export default async function createHandler({body: {title, description, price, count, color, image, category,}}, res) {

  const createItem = {
    title: title,
    type: "products",
    slug: "products",
    thumbnail: image,
    metafields: [
      {
        title: "Description",
        key: "description",
        type: "textarea",
        value: description
      },
      {
        title: "Price",
        key: "price",
        type: "text",
        value: price
      },
      {
        title: "Count",
        key: "count",
        type: "text",
        value: count
      },
      {
        title: "Color",
        key: "color",
        type: "text",
        value: color
      },
      {
        title: "Image",
        key: "image",
        type: "file",
        value: image
      },
      {
        title: "Categories",
        key: "categories",
        type: "objects",
        value: category
      },
    ]
  };

  try {
    const data = await bucket.addObject( createItem )
    res.status( 200 ).json(data)
  } catch (error) {
    res.status(404).json(error.message)
  }
}
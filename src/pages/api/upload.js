import Cosmic from 'cosmicjs';

// Secret environment variables add to the JavaScript bundle, open the next.config.js
//https://nextjs.org/docs/api-reference/next.config.js/environment-variables
const WRITE_KEY = process.env.cosmicWriteKey

const bucket = Cosmic().bucket({
  slug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  read_key: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
  write_key: WRITE_KEY,
} )

// export const config = {
//     api: {
//         bodyParser: {
//             sizeLimit: '4mb'
//         }
//     }
// }

export default async function uploadHandler( req,res ) {
  console.log( 'file upload API',req.body );
  try {
    if( file ) {
      const data = await bucket?.addMedia({media: req.body})
      res.status( 200 ).json(data)
    } else {
      res.status(401).json('Please upload a file')
    }
  } catch (error) {
    res.status(404).json(error.message)
  }
}
import Cosmic from 'cosmicjs';
import { getAllDataByType } from '../../../lib/cosmic';

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY

const bucket = Cosmic().bucket( {
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
})

export default async function categoryHandler(req, res) {
  const {
    query: { nameId },
  } = req;

  const response = await getAllDataByType( nameId );
  console.log('RESPONSE', response)
  res.status( 200 ).json(response)

// const params = {
//     query: {
//       type: nameId,
//     },
//     props: 'title,slug,id,metadata',
//     sort: '-created_at',
//   }

//   try {
//     const data = await bucket.getObjects( params )
//     console.log('data api', data);
//     res.status( 200 ).json({data })
//   } catch (error) {
//     res.status(404).json(error.message)
//   }
}
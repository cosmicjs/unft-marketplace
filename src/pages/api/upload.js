import Cosmic from 'cosmicjs';
import formidable from 'formidable';

const WRITE_KEY = process.env.cosmicWriteKey

const bucket = Cosmic().bucket({
  slug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  read_key: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
  write_key: WRITE_KEY,
})

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadHandler( req,res ) {
  const form = new formidable.IncomingForm({ multiple: false });
  
  try {
    form.parse( req, async ( err, fields, files ) => {
      if (err) return reject(err);

      if( files?.hasOwnProperty( 'files' ) ) {
        const file = {
          lastModifiedDate: files['files']?.lastModifiedDate,
          name: files['files']?.originalFilename,
          size: files['files']?.size,
          type: files['files']?.mimetype,
          webkitRelativePath: "",
        };

        const data = await bucket?.addMedia( { media: files['files'] } )
        console.log( 'MEDIA data', data );
        res.status( 200 ).json(data)
      } else {
        res.status(401).json(err)
      }
    } );

  } catch (error) {
    res.status(404).json(error.message)
  }
}
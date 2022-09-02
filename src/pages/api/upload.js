import Cosmic from 'cosmicjs'
import formidable from 'formidable'
import fs from 'fs'

const bucket = Cosmic().bucket({
  slug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  read_key: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
  write_key: process.env.COSMIC_WRITE_KEY,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function uploadHandler(req, res) {
  const form = new formidable.IncomingForm({ multiple: false })

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err)
      const cosmicRes = await saveFile(files.file)
      res.status(200).json(cosmicRes)
    })
  } catch (error) {
    res.status(404).json(error.message)
  }
}

const saveFile = async file => {
  const filedata = fs.readFileSync(file?.filepath)
  const media_object = { originalname: file.originalFilename, buffer: filedata }

  try {
    // Add media to Cosmic Bucket
    const cosmic_res = await bucket.media.insertOne({
      media: media_object,
    })
    await fs.unlinkSync(file?.filepath)
    console.log('cosmic_res', cosmic_res);
    return cosmic_res
  } catch (error) {
    console.log(error)
    return
  }
}

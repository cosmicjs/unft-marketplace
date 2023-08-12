import { createBucketClient } from '@cosmicjs/sdk'
import formidable from 'formidable'
import fs from 'fs'

const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  readKey: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
  writeKey: process.env.COSMIC_WRITE_KEY,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function uploadHandler(req, res) {
  const form = formidable({})

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err)
      const cosmicRes = await saveFile(files.file[0])
      res.status(200).json(cosmicRes)
    })
  } catch (error) {
    res.status(404).json(error.message)
  }
}

const saveFile = async file => {
  const filedata = fs.readFileSync(file?.filepath)
  const media = {
    originalname: file.originalFilename,
    buffer: filedata,
  }
  try {
    // Add media to Cosmic Bucket
    const cosmic_res = await cosmic.media.insertOne({
      media,
    })
    await fs.unlinkSync(file?.filepath)
    return await cosmic.media.insertOne({ media })
  } catch (error) {
    console.log(error)
    return error
  }
}

// const CosmicAuth = require('cosmicjs')()

export default async function authHandler({ body }, res) {
  try {
    const auth = await fetch('https://dashboard.cosmicjs.com/v3/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify(body),
    })
    const data = await auth.json()
    const user = data.user
    if (user) {
      res.status(200).json({ user })
    } else {
      res.status(409).json('Please first login to Cosmic')
    }
  } catch (error) {
    console.log(error)
    res.status(404).json(error.message)
  }
}

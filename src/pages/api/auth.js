const CosmicAuth = require("cosmicjs")();

export default async function authHandler({body}, res) {
  try {
    const data = await CosmicAuth.authenticate( body );

    if( data?.hasOwnProperty( 'token' ) ) {
      const cosmicUser = await fetch( 'https://api.cosmicjs.com/v2/user',{
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${data['token']}`
      }
      } );
      const user = await cosmicUser.json();

      res.status( 200 ).json(user);
    } else {
      res.status(409).json('Please first login to Cosmic');
    }
  } catch (error) {
    res.status(404).json(error.message)
  }
}
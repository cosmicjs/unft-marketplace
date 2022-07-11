import { Toaster } from 'react-hot-toast'
import { StateContext } from '../utils/context/StateContext'

import '../styles/app.sass'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Toaster />
      <Component {...pageProps} />
    </StateContext>
  )
}

export default MyApp

import { config } from '@fortawesome/fontawesome-svg-core'
import "./src/App.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
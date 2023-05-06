import { config } from "@fortawesome/fontawesome-svg-core";
import "./src/App.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { AuthProvider } from "./src/useauth/Useauth";
export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

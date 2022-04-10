import "../styles/globals.css";
import type { AppProps } from "next/app";
import gsap from "gsap";

function MyApp({ Component, pageProps }: AppProps) {
  gsap.config({
    autoSleep: 60,
    force3D: false,
    nullTargetWarn: false,
  });
  return (
    <div className="flexBodyContainer">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

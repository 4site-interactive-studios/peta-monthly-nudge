// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
// import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  // plugins: [cssInjectedByJsPlugin()],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       api: "modern-compiler",
  //     },
  //   },
  // },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/main.ts"),
      name: "4SitePETAMonthlyNudge",
      // the proper extensions will be added
      fileName: "4site-peta-monthly-nudge",
      formats: ["es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "@lottiefiles/lottie-player"],
      output: {
        manualChunks: undefined,
        assetFileNames: "4site-peta-monthly-nudge.css",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
          "@lottiefiles/lottie-player": "LottiePlayer",
        },
      },
    },
  },
});

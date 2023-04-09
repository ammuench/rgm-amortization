import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
// import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
// import { MakerRpm } from "@electron-forge/maker-rpm";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

const config: ForgeConfig = {
  packagerConfig: {
    icon: "./assets/icon/amorcalc-icon",
    executableName: "rgm-amortization-calculator",
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      exe: "rgm-amortization-calculator.exe",
      setupIcon: "./assets/icon/amorcalc-setup-icon.ico",
      name: "AmortizationCalculator",
    }),
    // new MakerZIP({}, ["darwin"]),
    // new MakerRpm({
    //   options: {
    //     icon: "/assets/icon/amorcalc-icon.png",
    //     homepage: "https://github.com/ammuench/rgm-amortization",
    //   },
    // }),
    new MakerDeb({
      options: {
        icon: "./assets/icon/amorcalc-icon.png",
        homepage: "https://github.com/ammuench/rgm-amortization",
        name: "AmortizationCalculator",
        productName: "Amortization Calculator",
      },
    }),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.tsx",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "ammuench",
          name: "rgm-amortization",
        },
        prerelease: true,
      },
    },
  ],
};

export default config;

# rgm-amortization
A simple amortization tool written with Electron and React


[Screencast from 04-08-2023 10:35:54 PM.webm](https://user-images.githubusercontent.com/2099658/230752807-2e343aa2-ff8d-400b-a67a-c6902067a14b.webm)

## Local Dev

Install all required packages with `yarn install`.

Start local preview by running `yarn start`

## Building

(All build instructions currently for a Debian-based Linux Distro)

### Windows Build

Please make sure you have Docker installed before building then run

```bash
cd build_scripts
bash startBuildDocker.sh
```

This will put you into Electron's Wine-Mono docker image

From there, once you are in the container, run

```bash
bash build_scripts/buildWindowsInDocker.sh
```

After compiling, the Windows build will be in the `/out/make` folder

### Linux Build

Run

```bash
yarn make
```

from the project root.  After compiling, the .deb build will be in the `/out/make` folder 

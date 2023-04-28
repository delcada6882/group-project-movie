import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'edu.mtech.ioncomp23',
  appName: 'MTech PWA',
  server: {
    url: 'http://localhost:4200/',
  },
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;

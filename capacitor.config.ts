import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.catatankeuangan',
  appName: 'Abayyydev Cashflow',
  webDir: 'out',
  server: {
    url: 'https://cashflow-app-vert.vercel.app/',
    cleartext: true,
  },
};

export default config;

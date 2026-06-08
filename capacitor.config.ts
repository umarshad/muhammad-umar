import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.umarshad.portfolio',
  appName: 'M. Umar',
  webDir: 'dist',
  server: {
    // When running as native app, app is bundled; API calls use production URL (see App.tsx)
    androidScheme: 'https',
    iosScheme: 'https',
  },
};

export default config;

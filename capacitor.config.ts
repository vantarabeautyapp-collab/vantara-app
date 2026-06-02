import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.vantara.app',
  appName: 'Vantara',
  webDir: 'out',
  // For dev: point to your local Next.js server IP
  // Change this to your machine's local IP when testing on a physical device
  // e.g. server: { url: 'http://192.168.1.100:3005', cleartext: true }
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0A0A0A',
      showSpinner: false,
    },
  },
}

export default config

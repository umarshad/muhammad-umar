# Building Native Apps (Android APK & iOS IPA)

This project uses **Capacitor** to wrap the portfolio PWA as native apps so you can install an **APK** on Android and an **IPA** on iOS.

**Building both:** Run `npm run build` then `npm run cap:sync` to refresh web assets for all platforms; then use `open:android` or `open:ios` as needed.

---

## Android (APK)

### Prerequisites

- **Node.js** and **npm** (already used for the web app)
- **Android Studio** (or Android SDK command-line tools) — [download](https://developer.android.com/studio)
- **JDK 17** (Android Studio usually bundles it)

### Build steps

#### 1. Build the web app and sync to Android

```bash
npm run build:android
```

This runs `npm run build` (Vite) and then syncs to the Android project (`dist/` → `android/`).

#### 2. Open the Android project and build the APK

**Option A — Android Studio (recommended)**

```bash
npm run open:android
```

This opens the `android/` folder in Android Studio. Then:

1. Wait for Gradle sync to finish.
2. **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
3. When the build finishes, click **Locate** in the notification to find the APK (e.g. `android/app/build/outputs/apk/debug/app-debug.apk`).

**Option B — Command line (if you have the Android SDK)**

```bash
cd android
./gradlew assembleDebug
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`.

#### 3. Install the APK on your device

- Copy `app-debug.apk` to your phone and open it to install, or
- Connect the device via USB, enable USB debugging, and run:  
  `adb install android/app/build/outputs/apk/debug/app-debug.apk`

### Release (signed) APK for Play Store or sharing

For a release build you need a signing key. In Android Studio:

1. **Build → Generate Signed Bundle / APK**.
2. Create or choose a keystore and sign the APK.

The signed release APK can be used for the Play Store or for direct distribution.

---

## iOS (IPA)

### Prerequisites

- **macOS** and **Xcode** (from the App Store)
- **CocoaPods** (if not already installed): `sudo gem install cocoapods`
- **Apple Developer account:** Free for running in the iOS Simulator; **paid** required for building an IPA and installing on a physical device or distributing via TestFlight/App Store.

### Build steps

#### 1. Build the web app and sync to iOS

```bash
npm run build:ios
```

Or run `npm run build` then `npm run cap:sync` to update all platforms.

#### 2. Open the iOS project in Xcode

```bash
npm run open:ios
```

This opens the `ios/` project in Xcode.

#### 3. Build and export an IPA

1. In Xcode, select a **real device** or **Any iOS Device** as the run destination (not a simulator, if you want an IPA).
2. **Product → Archive**.
3. When the archive completes, the Organizer window opens. Click **Distribute App**.
4. Choose **Ad Hoc**, **App Store Connect**, or **Development** as needed, then follow the prompts to export the **IPA** (or upload to TestFlight/App Store).

To run on the **iOS Simulator** only (no Apple Developer account required): select a simulator destination and use **Product → Run** (⌘R).

### Notes

- The IPA loads the app from the bundled `dist/` assets (works offline).
- The **contact form** uses `https://m-umar.vercel.app/api/send-email` when running in the native app.
- Bundle ID: `com.umarshad.portfolio` (set in `capacitor.config.ts` and the Xcode project).

---

## General notes

- Both apps load the portfolio from the bundled `dist/` assets (offline-capable).
- The **contact form** in both the APK and the IPA sends requests to `https://m-umar.vercel.app/api/send-email`.
- App ID / Bundle ID: `com.umarshad.portfolio`. Change it in `capacitor.config.ts` and in the native project settings if needed.

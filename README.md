# expo-network: iOS stops reporting network changes

On iOS, once every network listener has been removed, a new listener never gets an event again.
This lasts until the app restarts.

`useNetworkState` is affected too, because it removes its listener when it unmounts.

## Try it

1. `npm install`
2. `npx expo start`, then press `i` to open it in Expo Go on the iOS simulator.
3. Tap **Subscribe**. The screen shows `Events received: 1`.
4. Tap **Unsubscribe**.
5. Tap **Subscribe** again.

**Expected:** `Events received: 1`, like the first time.

**Actual:** `Events received: 0`, and it stays at 0. Network changes are not reported any more.

## Why

`NetworkModule.swift` keeps one `NWPathMonitor` for the whole app.
Removing the last listener cancels it, and a cancelled `NWPathMonitor` cannot be started again.
The fix is to create a new monitor each time listening starts.
The same code is still on the `main` branch of expo/expo.

## Versions

expo 57.0.27, expo-network 57.0.2, react-native 0.86.3, iOS 26.5 simulator.

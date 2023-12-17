<h1 align="center">React Native Voice</h1>
<p align="center">A speech-to-text library for <a href="https://reactnative.dev/">React Native.</a></p>. Folk from @react-native-voice/voice with a few improvements on usability.

```sh
yarn add @wdragon/react-native-voice

# or

npm i @wdragon/react-native-voice --save
```

Link the iOS package

```sh
npx pod-install
```

## Table of contents

- [Configuration in Expo](#expo-config)
- [Usage](#usage)
  - [Example](#example)
- [API](#api)

<h2 align="center">Configuration in Expo</h2>

After installing this npm package, add the [config plugin](https://docs.expo.io/guides/config-plugins/) to the [`plugins`](https://docs.expo.io/versions/latest/config/app/#plugins) array of your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": ["@react-native-voice/voice"]
  }
}
```

Then, add permissions inside the app.json configuration:

```json
"ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.anonymous.SpeectToTextApp",
 "infoPlist": {
        "NSSpeechRecognitionUsageDescription": "This app uses speech recognition to convert your speech to text.",
        "NSCameraUsageDescription": "This app uses the camera to let user put a photo in his profile page."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "permissions": ["android.permission.RECORD_AUDIO"],
      "package": "com.anonymous.SpeectToTextApp"
    },
```

<h2 align="center">Usage</h2>

<p align="center"><a href="https://github.com/wdragon/react-native-voice/blob/master/example/src/VoiceTest.tsx">Full example for Android and iOS.</a></p>

### Example

```javascript
import Voice from '@wdragon/react-native-voice';
import React, {Component} from 'react';

class VoiceTest extends Component {
  constructor(props) {
    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
  }
  onStartButtonPress(e){
    Voice.start('en-US');
  }
  ...
}
```

<h2 align="center">API</h2>

<p align="center">Static access to the Voice API.</p>

**All methods _now_ return a `new Promise` for `async/await` compatibility.**

| Method Name                          | Description                                                                                                                                                             | Platform     |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Voice.isAvailable()                  | Checks whether a speech recognition service is available on the system.                                                                                                 | Android, iOS |
| Voice.start(locale)                  | Starts listening for speech for a specific locale. Returns null if no error occurs.                                                                                     | Android, iOS |
| Voice.stop()                         | Stops listening for speech. Returns null if no error occurs.                                                                                                            | Android, iOS |
| Voice.cancel()                       | Cancels the speech recognition. Returns null if no error occurs.                                                                                                        | Android, iOS |
| Voice.destroy()                      | Destroys the current SpeechRecognizer instance. Returns null if no error occurs.                                                                                        | Android, iOS |
| Voice.removeAllListeners()           | Cleans/nullifies overridden `Voice` static methods.                                                                                                                     | Android, iOS |
| Voice.isRecognizing()                | Return if the SpeechRecognizer is recognizing.                                                                                                                          | Android, iOS |
| Voice.getSpeechRecognitionServices() | Returns a list of the speech recognition engines available on the device. (Example: `['com.google.android.googlequicksearchbox']` if Google is the only one available.) | Android      |

<h2 align="center">Events</h2>

<p align="center">Callbacks that are invoked when a native event emitted.</p>

| Event Name                          | Description                                            | Event                                           | Platform     |
| ----------------------------------- | ------------------------------------------------------ | ----------------------------------------------- | ------------ |
| Voice.onSpeechStart(event)          | Invoked when `.start()` is called without error.       | `{ error: false }`                              | Android, iOS |
| Voice.onSpeechRecognized(event)     | Invoked when speech is recognized.                     | `{ error: false }`                              | Android, iOS |
| Voice.onSpeechEnd(event)            | Invoked when SpeechRecognizer stops recognition.       | `{ error: false }`                              | Android, iOS |
| Voice.onSpeechError(event)          | Invoked when an error occurs.                          | `{ error: Description of error as string }`     | Android, iOS |
| Voice.onSpeechResults(event)        | Invoked when SpeechRecognizer is finished recognizing. | `{ value: [..., 'Speech recognized'] }`         | Android, iOS |
| Voice.onSpeechPartialResults(event) | Invoked when any results are computed.                 | `{ value: [..., 'Partial speech recognized'] }` | Android, iOS |
| Voice.onSpeechVolumeChanged(event)  | Invoked when pitch that is recognized changed.         | `{ value: pitch in dB }`                        | Android      |


**Notes on Android**

Even after all the permissions are correct in Android, there is one last thing to make sure this libray is working fine on Android. Please make sure the device has Google Speech Recognizing Engine such as `com.google.android.googlequicksearchbox` by calling `Voice.getSpeechRecognitionServices()`. Since Android phones can be configured with so many options, even if a device has googlequicksearchbox engine, it could be configured to use other services. You can check which serivce is used for Voice Assistive App in following steps for most Android phones:

`Settings > App Management > Default App > Assistive App and Voice Input > Assistive App`

Above flow can vary depending on the Android models and manufactures. For Huawei phones, there might be a chance that the device cannot install Google Services.

**How can I get `com.google.android.googlequicksearchbox` in the device?**

Please ask users to install [Google Search App](https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox&hl=en).

### iOS

Need to include permissions for `NSMicrophoneUsageDescription` and `NSSpeechRecognitionUsageDescription` inside Info.plist for iOS. See the included `VoiceTest` for how to handle these cases.

```xml
<dict>
  ...
  <key>NSMicrophoneUsageDescription</key>
  <string>Description of why you require the use of the microphone</string>
  <key>NSSpeechRecognitionUsageDescription</key>
  <string>Description of why you require the use of the speech recognition</string>
  ...
</dict>
```


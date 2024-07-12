# BasicCRUD app
<p align="right">
<img src="https://img.shields.io/badge/dependencies-expo%20go%202.19.3-brightgreen" />
</p>

<p align="center">
<img src="./assets/images/README.png" alt="drawing" width="1000"/>
</p>

#### Set up the environment
Run the following commands to install the required libraries.

```shell
npm install @react-navigation/native react-native-reanimated react-native-gesture-handler 
react-native-screens react-native-safe-area-context @react-native-community/masked-view @react-navigation/stack react-native-elements
```
```shell
npm install firebase --save
```
Next, create ```BasicCRUD\controllers\secrets.js``` with your Firebase credentials in the following format, this will let ```BasicCRUD\database\firebase.js``` connect into your database.

```javascript
const firebaseConfig = {
    apiKey: "secret.apiKey",
    authDomain: "secret.authDomain",
    databaseURL: "secret.databaseURL",
    projectId: "secret.projectId",
    storageBucket: "secret.storageBucket",
    messagingSenderId: "secret.messagingSenderId",
    appId: "secret.appId"
};

export const databaseTable = "secret.collectionName";
```

Your Firebase database should have a collection and the string-type fields name, email and mobile.
```plaintext
.
└── collection
    ├── name
    ├── email
    └── mobile
```



#### Start React Native App on Device
* Get inside the project folder ```cd <project_path>```.
* Run ```expo start```.
* When prompted, select ```a``` to run the app in an Android emulator.

To start the application in the Android device, first and foremost thing mobile device and system should be connected on the same network.

Same way you can run the app on iOS device for development purpose.

<p align="center">
<img src="assets/images/demo.gif" width="250" height="500"/>
</p>

#### Know Issues
Emulator-related Warning: Setting a timer for a long period of time, i.e. multiple minutes, 
is a performance and correctness issue on Android as it keeps the timer module awake, 
and timers can only be called when the app is in the foreground.
See (https://github.com/facebook/react-native/issues/12981)

##### Fix
* Navigate to your ```node_modules/react-native/Libraries/Core/Timers/JSTimers.js``` file.
* Look for the variable ```MAX_TIMER_DURATION_MS```.
* Change its value to ```10000 * 1000```.
* Save the changes (with auto format turned off) and re-build your app.

****
<p align="center"> :smile: </p>

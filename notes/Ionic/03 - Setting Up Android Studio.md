# 03 Setting up Android Studio

## Step after Configuration
[This was important (installing Android SDK Command Line Tools):](https://stackoverflow.com/a/64708730/494635). Before I did this, I had the "couldn't build until you accept licenses" issue. Not sure if this then allowed me to do the sdkmanager.bat thing below.


https://www.geeksforgeeks.org/how-to-fix-failed-to-install-the-following-android-sdk-packages-as-some-licenses-have-not-been-accepted-error-in-android-studio/
I had to go to C:\Users\Damien\AppData\Local\Android\Sdk\tools\bin and run sdkmanager.bat --licenses

I also had to set JAVA_HOME env variable to c:\Program Files\Java\jre1.8.0_291  (after installing Java. I think that Android Studio installed one somewhere too)


## Deploying to an actual phone
When I was using the demo conference app, I had to force update all of the npm packages with NCU (https://stackoverflow.com/a/22849716)
``` bash
 ionic build
 ionic capacitor add android
 ionic capcitor copy android   (builds then copies the built app into the wrapped Android app)
 npx cap open android  (opened up Android Studio)


```





Could not resolve dependency: npm ERR! peer @capacitor/core@"~2.4.0" from @capacitor/android@2.4.7
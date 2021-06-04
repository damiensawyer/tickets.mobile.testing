# Working with Capacitor

[Looks great](https://www.youtube.com/watch?v=y_UUjPkxlZ0&ab_channel=CititechStudioCititechStudio)

## Using CLI

### Android 

#### Misc Cap Commands
List devices: npx cap run android --list  

#### Creating a Cap App from scratch and deploying to phone (didn't work with Virtual device???)
ionic start (create project)
npm install @capacitor/android
npx cap add android
npx cap open android  (if I didn't do this the first time, I was missing a json file https://github.com/ionic-team/capacitor/discussions/3332)
npx cap run android

#### Making edits to an Android app and deploying
Option 1/ 
ionic capacitor sync android  (if you don't do this you get amissing gradle file error )
npx cap run android

Option 2/ (brlliant! Could live reload on phone and in browser at 192.168.1.95:8100)
ionic capacitor run android --livereload --external     (This will actually push changes live to the device as I'm saving in VS!)
ionic capacitor run android --livereload --external --host=192.168.1.95  (this is better. Set host to the 'wifi' ip. )



Running with the CAP 3 deploy stuff
    - ionic cap sync android
    - ionic cap run android 
    -- Note thaet this worked on a physical phone but not the emulator. ionic cap run android --list shows the devices, but the emulator didn't show. adb devices did show it. 

## Notes
Check out the new capacitor 3. I believe that it adds ability to deploy to device directly from CLI




### Getting Acedemind project going with capacitor
 ionic integrations enable capacitor
 npx capacitor add android
 ionic build
 npx cap copy android
 npx cap open android
 npx cap run android


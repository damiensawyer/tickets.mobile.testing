# Splash Screen
[docs](https://capacitorjs.com/docs/apis/splash-screen)
[plugin docs?](https://ionic.io/docs/premier-plugins/splashscreen)


# Waht I did
[See this](https://github.com/ionic-team/cordova-res#capacitor)
Used a plugin which generated assets from images

npm install -g cordova-res
I created a folder 'resources' in the root of the project and put in the following
splash.png (had to be at least 1920 wide)
icon.png (had to be 512 wide?)
android/icon-foreground.png  (see https://stackoverflow.com/a/66880836/494635)
android/icon-background.png 

Then run this. 

cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy


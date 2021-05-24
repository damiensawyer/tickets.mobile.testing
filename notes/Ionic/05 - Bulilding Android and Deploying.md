# Working with Capacitor

[Looks great - Ionic Capacitor Tutorial - Ionic Build Android & Ionic Build iOS](https://www.youtube.com/watch?v=y_UUjPkxlZ0&ab_channel=CititechStudioCititechStudio)


## Deploying Steps
- Added App Center Service Connection to Devops, including API key https://docs.microsoft.com/en-us/appcenter/distribution/vsts-deploy
- Generating Keystore (https://ionicframework.com/docs/deployment/play-store)
    - Keytool is here "c:\program files\android\android studio\jre\bin\keytool.exe" 
    -  /cygdrive/c/Program\ Files/Android/Android\ Studio/jre/bin/keytool.exe -genkey -v -keystore damotemp.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
    - I added keys keystorePassword, keyAlias and keyPassword as varibles in a group (under Pipelines -> Library in devops ). I also updloaded the keystore file as a secure file. 
- Create a Play Account here https://play.google.com/console  (I used damiensawyer@daddigital.com)
- [App Center Docs on pushing your Android App to Google Play](https://docs.microsoft.com/en-us/appcenter/distribution/stores/googleplay)
- About bumping versions https://stackoverflow.com/questions/54037164/increment-build-version-number-of-android-app-using-azure-devops-app-centre


## Deploying Notes
[Azure Yaml Expressions](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/expressions?view=azure-devops)
[Getting started with Capacitor build (looks good - I did this one, see below!)](https://sahansera.dev/multi-stage-builds-with-azure-pipelines-ionic/)
[Looks good - but Cordovo](https://dev.to/carlosgit2016/creating-building-and-deploying-an-ionic-application-using-azure-devops-and-app-center-1bhj)
[Sample with Capacitor (builds on devops, deploys via app center) EXCELLENT](https://www.codewithkarma.com/2020/10/ionic-capacitor-cicd-using-new-yaml.html)

[App Center, What's this?](https://appcenter.ms/)

[devops App Center Docs](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/app-center-distribute?view=azure-devops)
[App Center Docs](https://docs.microsoft.com/en-au/appcenter/)


### Deployment trials and erros I abandoned. 
- I did a sample build here https://dev.azure.com/damiensawyer/WelcomeMat/_git/AzurePipelinesTemplateForIonic. It was based on https://sahansera.dev/multi-stage-builds-with-azure-pipelines-ionic/. 
It built a dev and prod apk and signed the second one, then deployed both to https://appcenter.ms/. I'm going to try another method, namely deploying to appcenter using a release pipeline as opposed to a build pipeline. 
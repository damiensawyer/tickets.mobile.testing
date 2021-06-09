# ES Lint
[TS Lint is dead?](https://blog.palantir.com/tslint-in-2019-1a144c2317a9)
[How to setup eslint for react typescript projects](https://dev.to/leejianhowe/how-to-setup-eslint-for-react-typescript-projects-7ji)


## My hackages
- I created .eslintrc.js file in root. It killed everything with 100+ new errors
- I then deleted all the rules.. and got a stack of other errors (about 10)
- I then read [this](https://eslint.org/docs/user-guide/configuring/) and saw that there's eslintConfig config in package.json. Looks like I've got default settings for react-app and react-app/jest. not sure where those are.  
- I saw [this](https://eslint.org/docs/user-guide/configuring/rules#disabling-rules) on disabling warnings for a given line.
- I disabled the warning on a line like this

``` typescript
    /* eslint-disable-next-line */
    function logEpic(actions: any) {
        return actions.pipe(tap(console.log), ignoreElements())
    }
```
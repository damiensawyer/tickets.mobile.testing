module.exports = function () {
    return {
        files: [
            //'src/**/*.js'
        ],

        tests: [
            //'test/**/*Spec.js'
        ],

        setup: function (wallaby) {
            console.log('Damien was here')
            let jest = wallaby.testFramework;
            jest.setupFilesAfterEnv(["@relmify/jest-fp-ts"])

        }
    };
};




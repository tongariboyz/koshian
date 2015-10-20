# こしあん

[![Build Status][circleci-image]][circleci-url]
[![Coverage Status][codecov-image]][codecov-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![DevDependency Status][daviddm-dev-image]][daviddm-dev-url]


## Description

Koshian is [toggl](https://toggl.com/) client.


## Requirements

[React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)

- **Requirements**
  * Install Node.js 4.0 or newer.
  * Install npm v2.14.7
    * In the case React-Native v0.11.x
    * [React Dev Tools doesnot work v0.12.x or newer](https://github.com/facebook/react-native/issues/3373)
  * Install watchman newer

- **iOS Setup**
  * Xcode 6.3 or higher is required.

- **Chrome Setup**
  * Install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
  * Setup Chrome Developer Tools. Enable [Pause On Caught Exceptions](http://stackoverflow.com/questions/2233339/javascript-is-there-a-way-to-get-chrome-to-break-on-all-errors/17324511#17324511)



## Installation

```vi
$ npm i
```


## Development

1. Run server
  ```vi
  $ npm start
  ```

2. Open Project & Run

  - `$ open ios/koshian.xcodeproj`
  - In the Xcode, Press `Cmd + r`
  - In the Simulator, Press `Ctrl + Cmd + z` and select `Debug in Chrome`
  - In the Google Chrome, Open Developer Tools and select `React` tab

More detail, see [React Native Debugging Documents](https://facebook.github.io/react-native/docs/debugging.html#content)


[circleci-url]: https://circleci.com/gh/tongariboyz/koshian
[circleci-image]: https://img.shields.io/circleci/project/tongariboyz/koshian/master.svg?style=flat-square
[daviddm-url]: https://david-dm.org/tongariboyz/koshian
[daviddm-image]: https://img.shields.io/david/tongariboyz/koshian.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/tongariboyz/koshian#info=devDependencies
[daviddm-dev-image]: https://img.shields.io/david/dev/tongariboyz/koshian.svg?style=flat-square
[codecov-url]: https://codecov.io/github/tongariboyz/koshian
[codecov-image]: https://img.shields.io/codecov/c/github/tongariboyz/koshian.svg?style=flat-square

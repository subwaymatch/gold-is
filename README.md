<p align="center">
<img width="700" alt="gold-logo-with-text@2x" src="https://user-images.githubusercontent.com/1064036/92136228-6237e700-edd1-11ea-81be-fdddfe379b01.png">
  <br /><br />
  <a href="https://deepscan.io/dashboard#view=project&tid=10181&pid=13321&bid=220060" title="Deepscan"><img src="https://deepscan.io/api/teams/10181/projects/13321/branches/220060/badge/grade.svg" alt="Deepscan Badge" /></a>
  <a href="https://app.codacy.com/manual/subwaymatch/gold-is?utm_source=github.com&utm_medium=referral&utm_content=subwaymatch/gold-is&utm_campaign=Badge_Grade_Dashboard" title="Codacy"><img src="https://api.codacy.com/project/badge/Grade/5e7a9e7935534e57a9a49d716ff3338a" alt="Codacy Badge" /></a>
  <a href="https://opensource.org/licenses/MIT" title="MIT License"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
</p>


## What is it?

[Gold.is](https://gold.is) aims to tell you what your data looks like in plain human language.

## Features

- :crystal_ball: No need to run a backend server to run Jupyter notebooks or Python - [Gold.is](https://gold.is) uses [Pyodide](https://github.com/iodide-project/pyodide) to run Python 3.8 in the browser.
- :sparkles: Efficient data anlysis using `pandas` in the browser.
- :bar_chart: Visualize data with [Victory](https://formidable.com/open-source/victory/), a set of modular charting components for React (and React Native).
- :runner: Parallel computations using `numpy` under the hood - fast!
- :x: Drop any columns you don't need before running the analysis
- :left_right_arrow: Efficient data-sharing between JS and Python. Arrays addresses are shared between JS and Python instead of mem-copying ([https://pyodide.readthedocs.io/en/latest/using_pyodide_from_javascript.html](https://pyodide.readthedocs.io/en/latest/using_pyodide_from_javascript.html)).

## Browsers Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| >= 52 (Mar 2017)                                                                                                                                                                                                  | >= 57 (Mar 2017)                                                                                                                                                                                              | >= 11 (Sep 2017)                                                                                                                                                                                              | >= 44 (Mar 2017)                                                                                                                                                                                          | >= 16 (Oct 2017)                                                                                                                                                                                           |

- [WebAssembly](https://webassembly.org/) is used to integrate Python 3.8 runtime to the browser using [Pyodide](https://github.com/iodide-project/pyodide). Please check WebAssembly support in your browser at [https://caniuse.com/#feat=wasm](https://caniuse.com/#feat=wasm).
- ~~[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) are used to run Python scripts in non-main threads. You need to use a browser that supports Web Workers. You can check the browser support at [https://caniuse.com/#feat=webworkers](https://caniuse.com/#feat=webworkers).~~
- Due to a [known issue](https://github.com/iodide-project/pyodide/issues/441) with Pyodide, web workers are not being used at the moment. This will cause the browser to freeze when Python code is running.

## Acknowledgements

- **Jeongmin Lee**: Project manager / data analyst

## Screenshots

<p align="center">
  <img src="https://user-images.githubusercontent.com/1064036/92139164-fce5f500-edd4-11ea-99a0-9065fac66406.png" alt="Homepage Screenshot" width="720" />
  <br /><br /><br />
  <img src="https://user-images.githubusercontent.com/1064036/92139167-fd7e8b80-edd4-11ea-81bf-cd17ccffa408.png" alt="Load Data Page Screenshot" width="720" />
  <br /><br /><br />
  <img src="https://user-images.githubusercontent.com/1064036/92139174-ff484f00-edd4-11ea-805c-497d8bbd709a.png" alt="Select Columns Page Screenshot" width="720" />
  <br /><br /><br />
  <img src="https://user-images.githubusercontent.com/1064036/92139171-feafb880-edd4-11ea-8853-8d0c39fd5685.png" alt="Results Page Screenshot" width="720" />
  <br /><br /><br />
  <img src="https://user-images.githubusercontent.com/1064036/92139168-fd7e8b80-edd4-11ea-87b5-0a1e0d37e6d9.png" alt="Column Details Screenshot" width="720" />
  <br /><br />
</p>

## Deployment

![next-vercel-illustration](https://user-images.githubusercontent.com/1064036/89702608-860a2900-d908-11ea-83ad-aa228b4322ae.jpg)

Gold.is is built with [Next.js](https://nextjs.org/) and is continuously deployed to [Vercel](https://vercel.com/).

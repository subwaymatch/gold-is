# Gold.is

[![DeepScan grade](https://deepscan.io/api/teams/10181/projects/13321/branches/220060/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10181&pid=13321&bid=220060) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/5e7a9e7935534e57a9a49d716ff3338a)](https://app.codacy.com/manual/subwaymatch/gold-is?utm_source=github.com&utm_medium=referral&utm_content=subwaymatch/gold-is&utm_campaign=Badge_Grade_Dashboard)

## Features

- :sparkles: Analyze data with Python using `pandas` in the browser (yes, without a Python server in the backend - all computations are done in your browser).
- :bar_chart: Visualize data with [Plotly](https://plotly.com/javascript/), a graphing library built on top of [d3.js](https://d3js.org/) and [stack.gl](https://github.com/stackgl).
- :runner: Native `numpy` under the hood - fast!
- :left_right_arrow: Efficient data-sharing between JS and Python. Arrays addresses are shared between JS and Python instead of mem-copying.

## Browsers Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| >= 52 (Mar 2017)                                                                                                                                                                                                  | >= 57 (Mar 2017)                                                                                                                                                                                              | >= 11 (Sep 2017)                                                                                                                                                                                              | >= 44 (Mar 2017)                                                                                                                                                                                          | >= 16 (Oct 2017)                                                                                                                                                                                           |

- [WebAssembly](https://webassembly.org/) is used to integrate Python 3.8 runtime to the browser using [Pyodide](https://github.com/iodide-project/pyodide). Please check WebAssembly support in your browser at [https://caniuse.com/#feat=wasm](https://caniuse.com/#feat=wasm).
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) are used to run Python scripts in non-main threads. You need to use a browser that supports Web Workers. You can check the browser support at [https://caniuse.com/#feat=webworkers](https://caniuse.com/#feat=webworkers).

## Deployment

![next-vercel-illustration](https://user-images.githubusercontent.com/1064036/89702608-860a2900-d908-11ea-83ad-aa228b4322ae.jpg)

Gold.is is built with [Next.js](https://nextjs.org/) and is continuously deployed to [Vercel](https://vercel.com/).

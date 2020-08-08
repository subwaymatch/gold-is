# Gold.is

[![DeepScan grade](https://deepscan.io/api/teams/10181/projects/13321/branches/220060/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10181&pid=13321&bid=220060) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/5e7a9e7935534e57a9a49d716ff3338a)](https://app.codacy.com/manual/subwaymatch/gold-is?utm_source=github.com&utm_medium=referral&utm_content=subwaymatch/gold-is&utm_campaign=Badge_Grade_Dashboard)


## Browser Support

- [WebAssembly](https://webassembly.org/) is used to integrate Python 3.8 runtime to the browser using [Pyodide](https://github.com/iodide-project/pyodide). Please check WebAssembly support in your browser at [https://caniuse.com/#feat=wasm](https://caniuse.com/#feat=wasm).
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) are used to run Python scripts in non-main threads. Your need to use a browser that supports Web Workers (all modern browsers should work, although the speed may vary). You can check the browser support at [https://caniuse.com/#feat=webworkers](https://caniuse.com/#feat=webworkers).

## Deployment

![next-vercel-illustration](https://user-images.githubusercontent.com/1064036/89702608-860a2900-d908-11ea-83ad-aa228b4322ae.jpg)

Gold.is is built with [Next.js](https://nextjs.org/) and is continuously deployed to [Vercel](https://vercel.com/).

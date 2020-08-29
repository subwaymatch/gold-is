import { PyodideEnabledWindow } from 'typings/pyodide';
import qs from 'qs';

declare let window: PyodideEnabledWindow;

type RunCodeOptions = {
  reset?: boolean;
};

class PyodideManager {
  isLoaded: boolean;

  constructor() {
    this.isLoaded = false;

    // Only run if in browser
    if (typeof window !== 'undefined') {
      window.languagePluginUrl = 'https://pyodide-cdn2.iodide.io/v0.15.0/full/';
    }
  }

  async loadPyodide() {
    console.log('pyodideManager.loadPyodide()');

    if (this.isLoaded) {
      console.log('pyodide already loaded');
      return;
    }

    return new Promise((resolve, reject) => {
      window.languagePluginLoader
        .then(async () => {
          // Intercept Python stdout & stderr to StringIO
          window.pyodide.runPython(`import io, sys
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()`);

          this.isLoaded = true;

          await this.loadPackages(['pandas', 'numpy']);

          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async loadPackages(packages) {
    await window.pyodide.loadPackage(packages);
  }

  async loadCsvFromUrl(url) {
    if (!this.isLoaded) {
      await this.loadPyodide();
    }

    const urlQueryString = qs.stringify({
      url,
    });

    const proxiedUrl = `/api/sample?${urlQueryString}`;

    const codeResult = await this.runCode(`import pandas as pd
import pyodide

df_original = None
df = None

try:
  df_original = pd.read_csv(pyodide.open_url('${proxiedUrl}'))
  df = df_original.copy()
except:
  print('Error opening URL')
`);

    (window as any).codeResult = codeResult;
    console.log(codeResult);
  }

  async runCode(code: string, options?: RunCodeOptions) {
    if (!this.isLoaded) {
      await this.loadPyodide();
    }

    console.log(window.pyodide.loadedPackages);

    // Assign default options
    options = Object.assign(
      {
        reset: true,
      },
      options
    );

    try {
      if (options.reset === true) {
        window.pyodide.runPython(`sys.stdout = io.StringIO()
sys.stderr = io.StringIO()`);
      }

      const output = window.pyodide.runPython(code);
      const stdout = window.pyodide.runPython('sys.stdout.getvalue()');
      const stderr = window.pyodide.runPython('sys.stderr.getvalue()');

      return {
        hasError: false,
        output,
        stdout,
        stderr,
      };
    } catch (err) {
      return {
        hasError: true,
        errorMessage: err.message,
      };
    }
  }
}

export default PyodideManager;

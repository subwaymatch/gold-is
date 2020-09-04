import { PyodideEnabledWindow } from 'typings/pyodide';
import qs from 'qs';

declare let window: PyodideEnabledWindow;

type RunCodeOptions = {
  reset?: boolean;
};

class PyodideManager {
  isLoaded: boolean;
  initialGlobalKeys: string[];
  pyodide: any;

  constructor() {
    this.isLoaded = false;
    this.initialGlobalKeys = [];

    // Only run if in browser
    if (typeof window !== 'undefined') {
      window.languagePluginUrl = 'https://pyodide-cdn2.iodide.io/v0.15.0/full/';
    }
  }

  async loadPyodide() {
    if (this.isLoaded) {
      return;
    }

    return new Promise((resolve, reject) => {
      window.languagePluginLoader
        .then(async () => {
          this.pyodide = window.pyodide;

          // Intercept Python stdout & stderr to StringIO
          this.pyodide.runPython(`import io, sys
import pyodide
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()`);

          this.isLoaded = true;

          await this.loadPackages(['pandas', 'numpy']);

          resolve();
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  async loadPackages(packages) {
    await this.pyodide.loadPackage(packages);
  }

  async getLoadedPackages() {
    if (!this.isLoaded) {
      await this.loadPyodide();
    }

    return Object.keys(this.pyodide.loadedPackages);
  }

  async loadCsvFromUrl(url) {
    if (!this.isLoaded) {
      await this.loadPyodide();
    }

    const urlQueryString = qs.stringify({
      url,
    });

    const proxiedUrl = `/api/proxy/csv?${urlQueryString}`;

    const codeResult = await this.runCode(`import pandas as pd

df_original = None
df = None

try:
  df_original = pd.read_csv(pyodide.open_url('${proxiedUrl}'))
  df = df_original.copy()
except:
  df = pd.DataFrame({})
  print('Error opening URL')
`);

    (window as any).codeResult = codeResult;
  }

  async runCode(code: string, options?: RunCodeOptions) {
    if (!this.isLoaded) {
      await this.loadPyodide();
    }

    console.log(`loadedPackages: ${Object.keys(this.pyodide.loadedPackages)}`);

    // Assign default options
    options = Object.assign(
      {
        reset: false,
      },
      options
    );

    try {
      if (options.reset === true) {
        this.pyodide.runPython(`sys.stdout = io.StringIO()
sys.stderr = io.StringIO()`);
      }

      const output = this.pyodide.runPython(code);
      const stdout = this.pyodide.runPython('sys.stdout.getvalue()');
      const stderr = this.pyodide.runPython('sys.stderr.getvalue()');

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

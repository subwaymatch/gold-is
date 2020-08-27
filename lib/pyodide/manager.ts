import { PyodideEnabledWindow } from 'typings/pyodide';

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
    if (this.isLoaded) {
      return;
    }

    return new Promise((resolve, reject) => {
      window.languagePluginLoader
        .then(() => {
          // Intercept Python stdout & stderr to StringIO
          window.pyodide.runPython(`import io, sys
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()`);

          this.isLoaded = true;

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

  async runCode(code: string, options?: RunCodeOptions) {
    if (!this.isLoaded) {
      await this.loadPyodide();
    }

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

const instance = new PyodideManager();

export default instance;

class PyodideManager {
  constructor() {
    this.isLoaded = false;
    this.loadedPackages = [];

    // Only run if in browser
    if (typeof window !== 'undefined') {
      window.languagePluginUrl = 'https://pyodide-cdn2.iodide.io/v0.15.0/full/';
    }
  }

  async loadPyodide() {
    console.log(`loadPyodide isLoaded=${this.isLoaded}`);

    if (this.isLoaded) {
      console.log('pyodide already loaded');
      return;
    }

    console.log('now loading pyodide');

    return new Promise((resolve, reject) => {
      languagePluginLoader.then(() => {
        this.isLoaded = true;

        resolve();
      });
    });
  }

  async loadPackages(packages) {}

  async runCode(codeStr) {
    if (!this.isLoaded) await this.loadPyodide();

    console.log(pyodide.runPython(codeStr));
  }
}

const instance = new PyodideManager();

export default instance;

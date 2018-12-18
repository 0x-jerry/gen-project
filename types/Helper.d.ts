interface IConfig {
  project: string;
  author: {
    name: string;
    email: string;
  };
  packages: {
    dependencies: string[];
    devDependencies: string[];
  };
  js: boolean;
  ts: boolean;
  browser: boolean;
  node: boolean;
  library: boolean;
  /**
   * name: options
   */
  plugins: {
    [name: string]: JSON;
  };
  templates: ITemplate[];
}

interface ITemplate {
  /**
   * The path relative to the project of generated
   */
  path: string;
  /**
   * The template path
   */
  tpl: string;
}

class Helper {
  /**
   * ! Do not modify this, this is only read.
   */
  config: IConfig;
  addPlugin(name: string, options: JSON): void;
  addPackages(dependencies: string[], devDependencies: string[]): void;
  addTemplate(projectPath: string, tplPath: string): void;
  addTemplates(templates: ITemplate[]): void;
}

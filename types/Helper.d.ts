interface ITemplate {
  path: string;
  tpl: string;
}

class Helper {
  addPlugin(name: string, options: JSON): void;
  addPackages(dependencies: string[], devDependencies: string[]): void;
  addTemplate(projectPath: string, tplPath: string): void;
  addTemplates(templates: ITemplate[]): void;
}

import * as Generator from 'yeoman-generator'
import * as _s from "underscore.string";
import * as ReadPkgUp from "read-pkg-up";

interface PromptResult {
  projectName: string;
  description: string;
  repository: string;
}

interface PromptQuestion extends Generator.Question {
  type?: "input" | "confirm" | "list" | "rawlist" | "password";
  name: keyof PromptResult;
}

export = class extends Generator {
  constructor(args: string|string[], options: {}) {
    super(args, options);
  }

  private _mv(from: string, to: string) {
    this.fs.move(this.destinationPath(from), this.destinationPath(to));
  }

  public async _prompting(): Promise<PromptResult> {
    const pkg: ReadPkgUp.Package | undefined = ReadPkgUp.sync().pkg;
    const questions: PromptQuestion[] = [
      {
        type: "input",
        name: "projectName",
        message: "Your project name",
        default: _s.slugify(this.appname), // Default to current folder name
      },
      {
        type: "input",
        name: "description",
        message: "Project description",
        default: pkg && pkg.description,
      },
      {
        type: "input",
        name: "repository",
        message: "Repository name",
        default: pkg && (typeof pkg.repository === "string" ? pkg.repository : pkg.repository && pkg.repository.url),
      },
    ]
    const answers = await this.prompt(questions) as PromptResult;
    this.log("project name", answers.projectName);
    return answers;
  }

  async init() {
    const templateOptions = await this._prompting();
    this.fs.copyTpl(
      `${this.templatePath()}/**`,
      this.destinationPath(),
      templateOptions
    )
    this._mv("_package.json", "package.json");
    this._mv("_README.md", "README.md");
  }
};

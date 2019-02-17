import * as Generator from 'yeoman-generator'
import * as _s from "underscore.string";
import * as ReadPkgUp from "read-pkg-up";

interface PromptResult {
  projectName: string;
  description: string;
  repositoryName: string;
  authorName: string;
  authorEmail: string;
  authorUrl: string;
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
    const pkg: {[k: string]: any} | undefined = ReadPkgUp.sync({ normalize: false }).pkg;
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
        name: "repositoryName",
        message: "Repository name",
        default: pkg && JSON.stringify(pkg.repository),
      },
      {
        type: "input",
        name: "authorName",
        message: "Author name",
        default: pkg && pkg.author && pkg.author.name,
      },
      {
        type: "input",
        name: "authorEmail",
        message: "Author email",
        default: pkg && pkg.author && pkg.author.email,
      },
      {
        type: "input",
        name: "authorUrl",
        message: "Profile url",
        default: pkg && pkg.author && pkg.author.url,
      },
    ]
    return await this.prompt(questions) as PromptResult;
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
    this._mv("_LICENSE", "LICENSE");
  }
};

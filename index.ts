import * as Generator from 'yeoman-generator'

interface PromptResult {
  projectName: string;
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
    const questions: PromptQuestion[] = [
      {
        type: "input",
        name: "projectName",
        message: "Your project name",
        default: this.appname // Default to current folder name
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
  }
};

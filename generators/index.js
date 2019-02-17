"use strict";
const Generator = require("yeoman-generator");
module.exports = class extends Generator {
    constructor(args, options) {
        super(args, options);
    }
    _mv(from, to) {
        this.fs.move(this.destinationPath(from), this.destinationPath(to));
    }
    async _prompting() {
        const questions = [
            {
                type: "input",
                name: "projectName",
                message: "Your project name",
                default: this.appname
            },
        ];
        const answers = await this.prompt(questions);
        this.log("project name", answers.projectName);
        return answers;
    }
    async init() {
        const templateOptions = await this._prompting();
        this.fs.copyTpl(`${this.templatePath()}/**`, this.destinationPath(), templateOptions);
        this._mv("_package.json", "package.json");
    }
};

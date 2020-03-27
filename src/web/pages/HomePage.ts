import * as fs from "fs";

export class HomePage {
    private template: string;

    constructor() {
        // ToDo: Fix relative patch fuckery.
        this.template = fs.readFileSync('./src/web/html/home.html','utf8');
    }
    public render(): string {
        return this.template;
    }
}

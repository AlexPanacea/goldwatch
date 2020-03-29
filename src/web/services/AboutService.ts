import { IAboutContent } from "../interfaces/IAboutContent";

export class AboutService {
    public async renderedPage(): Promise<IAboutContent> {
        return Promise.resolve(
            {
                aboutTitle: "About goldwatch",
                content: "This is tool is made by 0x283A"
            });
    }
}

import { IAboutContent } from "../interfaces/IAboutContent.js";

export class AboutService {
	public async renderedPage(): Promise<IAboutContent> {
		return Promise.resolve({});
	}
}

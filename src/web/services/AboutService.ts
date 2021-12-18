import { IAboutContent } from "../interfaces/IAboutContent";

export class AboutService {
	public async renderedPage(): Promise<IAboutContent> {
		return Promise.resolve({});
	}
}

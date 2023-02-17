export interface IConfiguration {
	mangosSaveInterval: number;
	website: IWebsiteSetting;
	mysql: IMySQLSettings;
	sqlite: ISQLiteSettings;
}

export interface IWebsiteSetting {
	enabled: boolean;
	homePageSnapShots: number;
	showMailAmount: number;
}

interface IMySQLSettings {
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
}

interface ISQLiteSettings {
	location: string;
}

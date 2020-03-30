export interface IConfiguration {
    mangosSaveInterval: number;
    website: boolean;
    mysql: IMySQLSettings;
    sqlite: ISQLiteSettings;
}

export interface IMySQLSettings {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export interface ISQLiteSettings {
    location: string;
}

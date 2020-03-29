export interface IConfiguration {
    mangosSaveInterval: number;
    sqliteLocation: string;
    website: boolean;
    mysql: IMySQLSettings;
}

export interface IMySQLSettings {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

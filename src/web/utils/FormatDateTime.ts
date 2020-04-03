// tslint:disable: no-magic-numbers

import { raw } from "express";

export class FormatDateTime {
    public static epochToDate(epochSeconds: number): string {
        return new Date(epochSeconds * 1000).toLocaleTimeString();
    }

    public static secondsToTime(rawSeconds: number): string {
        const hours = Math.floor(rawSeconds / 3600);
        rawSeconds %= 3600;
        const minutes: number = Math.floor(rawSeconds / 60);
        const seconds: number = rawSeconds % 60;

        return (`${hours ? `${hours}:` : ""}${minutes ? `${this.prependZero(minutes)}:` : ""}${this.prependZero(seconds)}`);
    }

    private static prependZero(int: number): string {
        return (int <= 9) ? `0${int}` : `${int}`;
    }
}

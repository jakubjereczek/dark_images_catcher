import { Pixel } from "../interfaces/Pixel";
const appSettings = require('../config/appSettings.json');

export default class MyImage {

    name: string;
    pixels: Array<Pixel>;
    darkPercent = 0;
    filePath: string;
    fileNewlestPath: string = "";

    constructor(name: string, pixels: Array<Pixel>, filePath: string) {
        this.name = name;
        this.pixels = pixels;
        this.filePath = filePath;
        this.selectDarkPercent();
    }

    private selectDarkPercent() {
        console.log(`[INFO]: I calculate the number of dark pixels in the photo ${this.name}.`)
        let darkPixels = 0;
        for (let i = 0; i < this.pixels.length; i++) {
            const { r, g, b } = this.pixels[i];
            if (r < appSettings.RGB_COLOR_OF_DARK &&
                g < appSettings.RGB_COLOR_OF_DARK &&
                b < appSettings.RGB_COLOR_OF_DARK) {
                darkPixels += 1;
            }
        }
        this.darkPercent = (darkPixels / this.pixels.length) * 100;
    }

    public isDark(): boolean {
        return this.darkPercent > 50 ? true : false;
    }


}
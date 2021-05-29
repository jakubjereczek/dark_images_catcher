import { Pixel } from "./interfaces/Pixel";
import MyImage from "./models/MyImage";

const appSettings = require('./config/appSettings.json');
const { readdir } = require("fs").promises;
const Jimp = require("jimp");
const fs = require("fs");


export default class Main {

    private images: Array<MyImage> = [];

    constructor() {
        this.initialize();
    }

    async initialize() {
        const files = await readdir(appSettings.IN);

        for (const file of files) {
            if (!this.checkExtensions(this.getExtension(file)))
                continue;

            const filePath = `${appSettings.IN}\\${file.toString()}`;

            await Jimp.read(filePath).then((i: any) => {
                const image = i.bitmap;
                const pixels: Array<Pixel> = [];
                for (let x = 0; x < image.height; x++) {
                    for (let y = 0; y < image.width; y++) {
                        const pixelAsRGBA: Pixel = Jimp.intToRGBA(i.getPixelColor(x, y))
                        pixels.push(pixelAsRGBA)
                    }
                }
                const myImage = new MyImage(file.toString(), pixels, filePath);
                this.images.push(myImage);
            })
        }
        this.segregate();
    }

    private checkExtensions(fileExt: string): boolean {
        const availableExts = ["jpg", "jpeg", "png"];
        for (let i = 0; i < availableExts.length; i++) {
            const myExt = availableExts[i];
            if (myExt == fileExt) {
                return true;
            }
        }
        return false;
    }

    private getExtension(file: string) {
        return file.substring(file.lastIndexOf(".") + 1);
    }

    private async segregate() {
        for (let i = 0; i < this.images.length; i++) {
            const image = this.images[i];

            const ext = this.getExtension(image.filePath);
            const fileNameWithoutExt = image.name.replace(/\.[^.]*$/, '');

            let newFilePathBuilder = appSettings.OUT;

            let status = "";
            image.isDark() ? status = "dark" : status = "light";

            newFilePathBuilder += `\\${status}`

            if (!fs.existsSync(newFilePathBuilder)) { // Create folder if not exist.
                fs.mkdirSync(newFilePathBuilder);
            }

            fs.copyFile(image.filePath, `${newFilePathBuilder}\\${fileNameWithoutExt}_${status}_${image.darkPercent.toFixed()}.${ext}`, (err: any) => {
                console.log(`[INFO]: Photo named ${image.name} is ${status}. (${image.darkPercent.toFixed(2)}%)`)
                if (err) throw err;
            })
        }
    }

}
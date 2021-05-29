Hello,

I've never had any experience with Scala and I decided to made this in TypeScript in Node.js enviroment.
I don't know Scala because I want to be a Frontend or Web App developer in your company. Look at my Github profile for my project. 
My code is simply but is working in 100% , What I said before I made this in one day. (About 4/5 hours)

I really care about working in JavaScript, which I can do the most.

## How it is working?
* I use the library named Jimp (https://www.npmjs.com/package/jimp) to read the pixels from the image.
* I check the number of pixels that are darker than mine set in the config.
I consider pixels which has RGB beetween (0,0,0) to (89,89,89) as dark.
Then I count the number of black pixels in relation to all of them and this is the result.
* The last step is to create the final files with specific names.
name_dark_55.png
or name_light_33.jpng
/out/light
/out/dark

## How to run?
Change only the IN and OUT config values in /config/appSettings.js and 
run the application by using npm start< (before you must to use a command: npm install to install all neccessery dependeties)

## Demo
https://www.youtube.com/watch?v=E1hH5KfKCM0
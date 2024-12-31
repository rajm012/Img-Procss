const draw = require('../common/draw.js');
const constants = require('../common/constants.js');
const utils = require('../common/utils.js');

const {createCanvas} = require('canvas');
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');

const fs = require('fs');

if(fs.existsSync(constants.DATASET_DIR)){
    
    fs.readdirSync(constants.DATASET_DIR).forEach(fileName => 
       fs.rmSync(constants.DATASET_DIR+"/"+fileName,{recursive:true}
    ));
    fs.rmdirSync(constants.DATASET_DIR);
}

fs.mkdirSync(constants.DATASET_DIR);
fs.mkdirSync(constants.JSON_DIR);
fs.mkdirSync(constants.IMG_DIR);
console.log("GENERATING DATASET ...");

const fileNames = fs.readdirSync(constants.RAW_DIR);

if (fileNames.length === 0) {
    console.error('No files found in the RAW_DIR.');
    process.exit(1); // Exit the script if no files are found
}

const samples = [];
let id = 1;

fileNames.forEach(f => {
    const filePath = constants.RAW_DIR + "/" + f;
    const cont = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(cont);

    const { session, student, drawings } = jsonData;

    if (!drawings || typeof drawings !== 'object') {
        console.error(`Invalid drawings format in file: ${filePath}`);
        return;
    }

    for (let label in drawings) {
        if (drawings.hasOwnProperty(label)) {
            samples.push({
                id,
                label,
                student_name: student,
                student_id: session,
            });

            const paths = drawings[label]; 
            fs.writeFileSync(
                constants.JSON_DIR + '/' + id + '.json',
                JSON.stringify(paths, null, 2)
            );

            genImgFile(
                constants.IMG_DIR + '/' + id + '.png',
                paths
            );

            utils.printProgress(id, fileNames.length*8);
            id++;
        }
    }
});

if (samples.length === 0) {
    console.error('No samples generated.');
    process.exit(1); // Exit the script if no samples are generated
}

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples, null, 2));

fs.mkdirSync(constants.JS_OBJECTS, {recursive: true});

fs.writeFileSync(constants.SAMPLES_JS, 
    "const samples=" + JSON.stringify(samples, null, 2) + ";"
);

function genImgFile(outFile, paths) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw.paths(ctx, paths);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outFile, buffer);
}

 
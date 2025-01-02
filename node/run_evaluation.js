const constants = require('../common/constants.js');
const utils = require('../common/utils.js');

const KNN = require("../common/classifiers/knn.js");

const fs = require('fs');
const k = 30;

console.log("Running Evaluation...");

const {samples: trainingSamples} = JSON.parse(
    fs.readFileSync(constants.TRAINING)
);

const kNN = new KNN(trainingSamples, k);

const {samples: testingSamples} = JSON.parse(
    fs.readFileSync(constants.TESTING)
);

let totCnt = 0;
let corCnt = 0;
for(const sample of testingSamples){
    const {label: prediction} = kNN.predict(sample.point);
    corCnt += prediction == sample.label ? 1 : 0;
    totCnt++;
}
 
console.log("Accuracy: "+ corCnt + "/" + totCnt +
    "(" + utils.formatPercent(corCnt/totCnt) + ")"
);

console.log("GENERATING DECISION BOUNDARY");

const {createCanvas} = require('canvas');
const canvas = createCanvas(100,100);
const ctx = canvas.getContext('2d');

for(let x=0;x<canvas.width;x++){
    for(let y=0;y<canvas.height;y++){
        const point = [
            x/canvas.width,
            1-y/canvas.height
        ];
        const {label} = kNN.predict(point);
        const color = utils.styles[label].color;
        ctx.fillStyle = color;
        ctx.fillRect(x,y,1,1);
    }
}

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(constants.DECISION_BOUNDARY, buffer);

console.log("DONE");


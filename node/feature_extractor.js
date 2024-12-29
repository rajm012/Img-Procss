const constants = require('../common/constants.js');
const features = require('../common/features.js');

const fs = require('fs');

console.log("Extracting features...");

const samples = JSON.parse(
    fs.readFileSync(constants.SAMPLES)
);

for(const sample of samples){
    const paths = JSON.parse(
        fs.readFileSync(
            constants.JSON_DIR+'/'+sample.id+'.json'
        )
    );
    sample.point = [
        features.getPathCnt(paths),
        features.getPntCnt(paths)
    ]
}

const featuresNames = ["Path Count","Point Count"];

fs.writeFileSync(constants.FEATURES,
    JSON.stringify({
        featuresNames,
        samples
    })
);

console.log("Features extracted successfully!");

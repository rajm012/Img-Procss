const constants = require('../common/constants.js');
const featureFxns = require('../common/featureFxns.js');
const utils = require('../common/utils.js');

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
    const functions = featureFxns.inUse.map(f => f.function);
    sample.point = functions.map(f => f(paths));
}

const featuresNames = featureFxns.inUse.map(f => f.name);

console.log("Generating Splits...");

const trainLen = samples.length*0.5;

const training = [];
const testing = [];

for(let i=0;i<samples.length;i++){
    if(i<trainLen){
        training.push(samples[i]);
    }
    else{
        testing.push(samples[i]);
    }
}

const minMax = utils.normalizePoints(
    training.map(s => s.point)
);

utils.normalizePoints(
    testing.map(s => s.point),minMax
);

fs.writeFileSync(constants.FEATURES,
    JSON.stringify({
        featuresNames,
        samples: samples.map(s=>{
            return {
                point:s.point,
                label:s.label
            };
        })
    })
);

fs.writeFileSync(constants.FEATURES_JS,
    `const features=
    ${JSON.stringify({featuresNames,samples})}
    ;`
);
 
fs.writeFileSync(constants.TRAINING,
    JSON.stringify({
        featuresNames,
        samples: training.map(s=>{
            return {
                point:s.point,
                label:s.label
            };
        })
    })
);

fs.writeFileSync(constants.TRAINING_CSV,
    utils.toCSV([...featuresNames,"Label"],
        training.map(s=>[...s.point,s.label])
    )
);

fs.writeFileSync(constants.TRAINING_JS,
    `const training=
    ${JSON.stringify({featuresNames,samples:training})}
    ;`
);


fs.writeFileSync(constants.TESTING,
    JSON.stringify({
        featuresNames,
        samples: testing.map(s=>{
            return {
                point:s.point,
                label:s.label
            };
        })
    })
);

fs.writeFileSync(constants.TESTING_CSV,
    utils.toCSV([...featuresNames,"Label"],
        testing.map(s=>[...s.point,s.label])
    )
);

fs.writeFileSync(constants.TESTING_JS,
    `const testing=
    ${JSON.stringify({featuresNames,samples:testing})}
    ;`
);

fs.writeFileSync(constants.MIN_MAX_JS,
    `const minMax=
    ${JSON.stringify(minMax)}
    ;`
);

console.log("Features extracted successfully!");

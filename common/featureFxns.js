const featureFxns = {};

featureFxns.getPathCnt =(paths) =>{
    return paths.length;
}

featureFxns.getPntCnt =(paths) =>{
    const pnts =  paths.flat();
    return pnts.length;
}

featureFxns.getW = (paths) =>{
    const pnts = paths.flat();
    const x = pnts.map(pnt => pnt[0]);
    const min = Math.min(...x);
    const max = Math.max(...x);
    return max - min;
}

featureFxns.getH = (paths) =>{
    const pnts = paths.flat();
    const y = pnts.map(pnt => pnt[1]);
    const min = Math.min(...y);
    const max = Math.max(...y);
    return max - min;
}


featureFxns.inUse = [
    {name: "Width", function: featureFxns.getW},
    {name: "Height", function: featureFxns.getH},
];

if(typeof module !== 'undefined' && module.exports){
    module.exports = featureFxns;
}

const featureFxns = {};

featureFxns.getPathCnt =(paths) =>{
    return paths.length;
}

featureFxns.getPntCnt =(paths) =>{
    const pnts =  paths.flat();
    return pnts.length;
}

if(typeof module !== 'undefined' && module.exports){
    module.exports = featureFxns;
}

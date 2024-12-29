const features = {};

features.getPathCnt =(paths) =>{
    return paths.length;
}

features.getPntCnt =(paths) =>{
    const pnts =  paths.flat();
    return pnts.length;
}

if(typeof module !== 'undefined' && module.exports){
    module.exports = features;
}

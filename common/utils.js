const utils = {};

utils.flaggedUsers = [1663053145814,1663855324959,1663855328187];

utils.styles = {
    car: {color: 'gray',text:"🚘"},
    fish: {color: 'red',text:"🐟"},
    house: {color: 'yellow',text:"🏚️"},
    tree: {color: 'green',text:"🌳"},
    bicycle: {color: 'cyan',text:"🚲"},
    guitar: {color: 'blue',text:"🎸"},
    pencil: {color: 'magenta',text:"✏️"},
    clock: {color: 'lightgray',text:"⏱️"}
}

utils.formatPercent =(n) =>{
    return (n*100).toFixed(2) + '%';
}

utils.printProgress = (curr, tot) =>{
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent = utils.formatPercent(curr/tot);
    process.stdout.write(`Processing: ${curr}/${tot} (${percent})`);
}

utils.groupBy = (arr, key) =>{
    const grps = {};
    for(let obj of arr){
        const val = obj[key];
        if(!grps[val]){
            grps[val] = [];
        }
        grps[val].push(obj);
    }
    return grps;
}

utils.distance=(p1,p2)=>{
    return Math.sqrt(
       (p1[0]-p2[0])**2+
       (p1[1]-p2[1])**2
    );
}
 
utils.getNearest=(loc,points)=>{
    let minDist=Number.MAX_SAFE_INTEGER;
    let nearestIndex=0;
 
    for(let i=0;i<points.length;i++){
       const point=points[i];
       const d=utils.distance(loc,point);
 
       if(d<minDist){
          minDist=d;
          nearestIndex=i;
       }
    }
    return nearestIndex;
}

utils.invlerp=(min,max,val)=>{
    return (val-min)/(max-min);
}

utils.normalizePoints=(points,minMax)=>{
    let min,max;
    const dimensions=points[0].length;
    if(minMax){
       min=minMax.min;
       max=minMax.max;
    }else{
       min=[...points[0]];
       max=[...points[0]];
       for(let i=1;i<points.length;i++){
          for(let j=0;j<dimensions;j++){
             min[j]=Math.min(min[j],points[i][j]);
             max[j]=Math.max(max[j],points[i][j]);
          }
       }
    }
    for(let i=0;i<points.length;i++){
       for(let j=0;j<dimensions;j++){
          points[i][j]=
             utils.invlerp(min[j],max[j],points[i][j]);
       }
    }
    return {min,max};
}

if (typeof module !== 'undefined') {
    module.exports = utils;
}
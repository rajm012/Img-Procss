const utils = {};

utils.flaggedUsers = [1663053145814,1663855324959,1663855328187];

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

if (typeof module !== 'undefined') {
    module.exports = utils;
}
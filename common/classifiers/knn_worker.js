importScripts('../common/utils.js', '../common/classifiers/knn.js');

onmessage = function (e) {
    const { trainingSamples, testingSamples, startK, endK } = e.data;

    let bestK = startK;
    let bestAccuracy = 0;

    for (let k = startK; k <= endK; k++) {
        const kNN = new KNN(trainingSamples, k);
        let correctCount = 0;

        for (const testSample of testingSamples) {
            const { label } = kNN.predict(testSample.point);
            if (label === testSample.label) {
                correctCount++;
            }
        }

        const accuracy = correctCount / testingSamples.length;
        if (accuracy > bestAccuracy) {
            bestAccuracy = accuracy;
            bestK = k;
        }
    }

    postMessage({ bestK, bestAccuracy });
};

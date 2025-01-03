classes = {
    "car":0,
    "fish": 1,
    "house": 2,
    "tree": 3,
    "bicycle": 4,
    "guitar": 5,
    "pencil": 6,
    "clock": 7
}

FilePath  = "../data/dataset/training.csv"

def readFileFeatures(FilePath):

    f = open(FilePath, "r")   
    lines = f.readlines()

    X =[]
    y =[]

    for i in range(1, len(lines)):
        parts = lines[i].split(",")
        X.append(
            [float(parts[j]) for j in range(len(parts)-1)]
        )
        y.append(classes[parts[-1].strip()])

    return (X, y)

from sklearn.neighbors import KNeighborsClassifier

knn  = KNeighborsClassifier(
    n_neighbors=50,
    weights="uniform",
    algorithm="brute"
)

X,y = readFileFeatures(FilePath) 

knn.fit(X, y)

X,y = readFileFeatures("../data/dataset/testing.csv")

acc = knn.score(X, y)
print("Accuracy: ", acc)


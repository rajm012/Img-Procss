# KNN Classifier with Web Visualization

This project implements a K-Nearest Neighbors (KNN) classifier and provides an interactive web-based interface for visualizing and evaluating its performance. The implementation includes parallelized evaluation of different `k` values and dynamic updates to improve user experience.

---

## Project Structure

### **Folders and Contents**

```plaintext
.
├── common                  # Reusable components and utilities
│   ├── classifiers         # KNN implementations
│   └── js_objects          # JavaScript helpers for data processing
├── data                    # Datasets used for training and testing
│   ├── dataset             # Processed datasets in various formats
│   │   ├── img             # Images for testing
│   │   └── json            # JSON representations of datasets
│   └── raw                 # Raw data files
├── node                    # Node.js environment dependencies
│   └── node_modules        # External modules for the project
├── python                  # Placeholder for Python scripts (if applicable)
├── ScreenShots             # Screenshots of the application in action
└── web                     # Web interface for visualization
    ├── chart               # Graphing utilities for visualization
    └── js                  # Frontend JavaScript code
```

---

## Key Features

### **1. KNN Classifier**
- A custom implementation of the KNN algorithm in JavaScript.
- Optimized for real-time predictions with a configurable value of `k`.

### **2. Web-Based Visualization**
- An interactive interface for viewing training and testing datasets.
- Real-time updates when new data is added or evaluated.

### **3. Parallel Evaluation**
- Evaluation of different `k` values in parallel using Web Workers.
- Dynamic identification of the best-performing `k` value.

---

## Getting Started

### **Prerequisites**
- **Node.js**: Ensure Node.js is installed on your machine.
- **Browser**: A modern web browser for running the web interface.

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/rajm012/Img-process.git
   cd Img-Process
   ```

2. Install dependencies:
   ```bash
   cd node
   npm install
   ```

### **Usage**

#### **Running the Application**
1. Start the local server:
   ```bash
   npm start
   ```
2. Open the web interface in your browser:
   ```
   http://localhost:3000
   ```

#### **Customizing Parameters**
- Modify the value of `k` or the dataset in the `viewer.html` file or using the provided configuration panel in the web interface.

---

## How It Works

### **KNN Classifier**
- Implements the KNN algorithm using Euclidean distance.
- Processes training and testing data, predicts labels, and calculates accuracy.

### **Web Workers for Parallelism**
- Evaluates multiple values of `k` concurrently, reducing computation time.
- Dynamically updates the web interface with the best-performing `k`.

### **Visualization**
- Uses `chart.js` and custom drawing functions for displaying datasets and decision boundaries.

---

## Example Screenshots

| Feature                 | Screenshot                          |
|-------------------------|--------------------------------------|
| Dataset Visualization   | ![Dataset](../Img%20Procss/ScreenShots/1-Display.png) |
| Accuracy Results        | ![Results](../Img%20Procss/ScreenShots/3-Tested%20Samples.png) |
| Live Testing            | ![Testing](../Img%20Procss/ScreenShots/5-Testing.png) |  

---

## Contributions

### **How to Contribute**
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

## License

Open-source under the [MIT License](../LICENSE).Feel free to use and modify the code as required.

---

## Contact

For questions or feedback, feel free to reach out at:
- **Email**: rajmahimaurya@gmail.com
- **GitHub**: [rajm012](https://github.com/rajm012)

--- 
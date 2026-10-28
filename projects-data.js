// ============================================================
//  projects-data.js  —  এখানে শুধু project গুলোর তথ্য থাকবে
//  নতুন project যোগ করতে একটা { ... } block কপি করে নিচে বসান।
//
//  featured: true  → উপরে, বড় (2x) card হিসেবে দেখাবে
//  repo            → "username/repo-name"  (README এখান থেকেই আসবে)
//  branch          → default "main" (না থাকলে main, তারপর master চেষ্টা করবে)
//  caseHtml        → নিজের বানানো HTML file এর path (দিলে README এর বদলে এটা দেখাবে)
//  image           → card এর ছবি (ফাঁকা বা ভুল হলে ছবি নিজে থেকেই লুকিয়ে যাবে)
// ============================================================
window.PROJECTS = [
  {
    id: "covid-chest-xray",
    featured: true,
    file: "chest_xray_cnn.ipynb",
    category: "Machine Learning",
    title: "COVID-19 Chest X-Ray Classification",
    summary: "Four neural network architectures (Dense, CNN, Deep CNN and LSTM) trained under identical conditions to separate COVID-19, viral pneumonia and normal X-rays.",
    highlight: "A compact 3-block CNN <b>won with 90.91% test accuracy</b> and 17× fewer parameters than the Dense baseline. Adding depth made results worse.",
    tags: ["TensorFlow / Keras", "CNN", "LSTM"],
    image: "assets/img/chest-xray.jpg",          // TODO: নিজের ছবির নাম দিন
    repo: "sakibzzz641/COVID-19-Chest-Xray-Classification", // TODO: আসল repo নাম দিন
    caseHtml: ""
  },
  {
    id: "telco-churn",
    featured: true,
    file: "telco_churn.ipynb",
    category: "Classification",
    title: "Telco Customer Churn Prediction",
    summary: "6 models compared on 7,043 customers to predict who is likely to leave the service.",
    highlight: "Best model reached <b>0.844 ROC-AUC</b> on 7,043 customers.",
    tags: ["Python", "Scikit-learn", "Classification"],
    image: "assets/img/telco-churn.jpg",
    repo: "sakibzzz641/Telco-Customer-Churn-Prediction",
    caseHtml: ""
  },
  {
    id: "customer-segmentation",
    featured: false,
    file: "customer_segmentation.ipynb",
    category: "Clustering",
    title: "Customer Segmentation",
    summary: "K-Means, Hierarchical and DBSCAN clustering on 8,950 credit card customers.",
    highlight: "Three clustering methods compared on <b>8,950 credit card customers</b>.",
    tags: ["K-Means", "DBSCAN", "Hierarchical"],
    image: "assets/img/customer-segmentation.jpg",
    repo: "sakibzzz641/Customer-Segmentation-Kmeans-dbscan-clustering",
    caseHtml: ""
  },
  {
    id: "insurance-cost",
    featured: false,
    file: "insurance_regression.ipynb",
    category: "Regression",
    title: "Medical Insurance Cost Prediction",
    summary: "Regression pipeline on 1,337 records to predict medical insurance charges.",
    highlight: "Final model scored <b>R² 0.85</b> on 1,337 records.",
    tags: ["Python", "Regression", "Pandas"],
    image: "assets/img/insurance.jpg",
    repo: "sakibzzz641/Insurance-charges-regression",
    caseHtml: ""
  }
];

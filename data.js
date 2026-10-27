/* ==========================================================
   PORTFOLIO DATA: shudhu ei file edit korlei hobe.
   - Link/image khali ("") rakhle oi button ba image nijei lukiye jabe.
   - Notun item add korte { ... }, line ta copy kore comma diye boshao.
   - Image/file gulo assets/ folder e rakho.
   ========================================================== */
const DATA = {

  // ---------- Profile ----------
  profile: {
    name: "Md. Sakib Al Hasan",
    shortName: "Sakib Al Hasan",          // nav bar e dekhabe
    initials: "SH",                        // photo na thakle eta dekhabe
    tagline: "I turn raw data into useful predictions and clear decisions. Explore my projects and case studies to see how I solve real-world problems with Python and machine learning.",
    photo: "assets/img/photo.png",         // photo upload korle auto boshbe
    cv: "assets/cv/Sakib_Al_Hasan_Data_Science.pdf"
  },

  // ---------- Social (khali "" = icon dekhabe na) ----------
  social: {
    github: "https://github.com/sakibzzz641",
    linkedin: "https://linkedin.com/in/sakibzzz641",
    email: "sakibzzz641@gmail.com",
    kaggle: ""
  },

  // ---------- Hero tags ----------
  heroTags: {
    top: ["Data Science", "Machine Learning", "Python", "SQL", "Pandas", "NumPy", "Statistical Analysis"],
    bottom: ["Junior Data Scientist", "Scikit-learn", "XGBoost", "EDA", "Feature Engineering", "Data Visualization"]
  },

  // ---------- Skills ----------
  // ---------- Skills ----------

skills: [

{ icon: "Py", title: "Programming & Libraries", subgroups: [
{ title: "Languages", items: ["Python", "SQL"] },
{ title: "Python Libraries", items: ["Pandas", "NumPy", "Scikit-learn", "XGBoost", "Matplotlib", "Seaborn"] }
] },

{ icon: "ML", title: "Machine Learning", subgroups: [
{ title: "Supervised Learning", items: ["Linear Regression", "Logistic Regression", "KNN", "Naive Bayes", "SVM", "Decision Tree"] },
{ title: "Ensemble & Neural Network", items: ["Random Forest", "Gradient Boosting", "AdaBoost", "XGBoost", "Neural Network (MLP)"] },
{ title: "Unsupervised Learning", items: ["K-Means", "Hierarchical", "DBSCAN", "PCA"] }
] },

{ icon: "WF", title: "ML Workflow", items: ["Scaling & Encoding", "Feature Engineering", "Pipelines", "Cross-Validation", "GridSearchCV", "RandomizedSearchCV", "SMOTE"] },

{ icon: "Ev", title: "Model Evaluation", items: ["ROC-AUC", "Precision", "Recall", "F1-Score", "Confusion Matrix", "RMSE", "MAE", "R\u00B2", "Silhouette Score", "Elbow Method"] },

{ icon: "DA", title: "Data Analysis & Excel", subgroups: [
{ title: "Data Analysis", items: ["Data Cleaning", "EDA", "Data Visualization"] },
{ title: "Excel", items: ["PivotTable", "Slicers", "Power Query", "Power Pivot/DAX", "XLOOKUP"] }
] },

{ icon: "Tl", title: "Tools", items: ["Jupyter Notebook", "Git", "GitHub", "AI-assisted development tools", "MS Word", "MS PowerPoint", "MS Access"] }

],

  // ---------- Featured Projects ----------
  // color: "green" | "orange" | "blue" | "purple" (card er border/outline er rong)
  // image: "assets/img/projects/xxx.png" dile screenshot dekhabe, khali thakle chhoto chart dekhabe
  // thumb (image na thakle): "dots" | "mix" | "up"
  projects: [
    {
      title: "Customer Segmentation",
      color: "green",
      description: "Segmented 8,950 credit card customers with K-Means, Hierarchical and DBSCAN clustering after PCA (95% variance).",
      tags: ["Python", "PCA", "Clustering"],
      repo: "https://github.com/sakibzzz641/Customer-Segmentation-Kmeans-dbscan-clustering",
      demo: "",
      image: "",
      thumb: "dots"
    },
    {
      title: "Telco Customer Churn Prediction",
      color: "green",
      description: "Compared 6 models on 7,043 customers. Best result: 0.844 ROC-AUC with 77% recall on likely churners.",
      tags: ["XGBoost", "SMOTE", "Classification"],
      repo: "https://github.com/sakibzzz641/Telco-Customer-Churn-Prediction",   // TODO: churn repo link
      demo: "",
      image: "",
      thumb: "mix"
    },
    {
      title: "Medical Insurance Cost Prediction",
      color: "green",
      description: "Regression pipeline on 1,337 records. R\u00B2 of 0.85, with SHAP showing smoking status and age drive cost.",
      tags: ["Regression", "SHAP", "Cross-Validation"],
      repo: "https://github.com/sakibzzz641/Insurance-charges-regression",   // TODO: insurance repo link
      demo: "",
      image: "",
      thumb: "up"
    },
     {
      title: "Global Sales Dashboard (Excel)",
      color: "orange",
      description: "Interactive 4-page sales dashboard (Executive, Product, Regional, Customer) built with PivotTables and VBA automation.",
      tags: ["Excel", "Business Intelligence", "PivotTable", "Data Analytics", "Power Query", "Dashboard"],
      category: ["Excel", "Data Analysis"],
      repo: "https://github.com/sakibzzz641/Global-Superstore-Excel-Dashboard",   // TODO: Excel project repo link dile "View Project" button nijei cholye asbe
      demo: "",
      image: "",
      thumb: "mix"
    }
  ],

  // ---------- Case Studies ----------
  cases: [
    {
      title: "Credit Card Customer Segmentation",
      color: "green",
      tags: ["Clustering", "PCA", "K-Means"],
      problem: "Group customers by spending and repayment behavior to guide marketing and credit risk.",
      approach: "Log-transforms, correlation filtering, PCA (9 components), then K-Means, Hierarchical and DBSCAN compared by silhouette score.",
      result: "K-Means (k=2) found 60% purchase-active customers and 40% cash-advance, high-balance carriers."
    },
    {
      title: "Telecom Churn Retention",
      color: "green",
      tags: ["Classification", "XGBoost", "SMOTE"],
      problem: "Predict which customers are about to leave so the company can act early.",
      approach: "EDA, SMOTE for class imbalance, and 6 models compared with ROC-AUC and recall.",
      result: "88.6% of churners are on month-to-month contracts. Suggested auto-pay incentives and 1-year offers."
    },
    {
      title: "Insurance Cost Drivers",
      color: "green",
      tags: ["Regression", "XGBoost", "SHAP"],
      problem: "Estimate medical charges and explain what pushes them up.",
      approach: "Smoker \u00D7 BMI features cut baseline RMSE by 25%. 8 models tested with 5-fold CV and tuning.",
      result: "XGBoost reached R\u00B2 0.85 (RMSE about $4.6K). Smokers pay about 3.8x more on average."
    }
  ],

  // ---------- Certifications ----------
  // link: certificate URL, ba "assets/cert/xxx.pdf". Khali thakle button lukiye thakbe.
  certificates: [
    {
      title: "Data Science & Machine Learning with Python",
      issuer: "Ostad",
      details: [["Year", "2026"], ["Covers", "Python, SQL, NumPy, Pandas, Data Analysis, Scikit-learn , XGBoost, EDA, Feature Engineering, Data Visualization , Machine Learning"]],
      link: "https://ostad.app/share/certificate/c47905-md.-sakib-al-hasan"   // TODO: Ostad certificate link
    },
    {
      title: "Computer Basic and ICT Applications",
      issuer: "Dept. of Youth Development, Ministry of Youth and Sports, Govt. of Bangladesh",
      details: [["Period", "Jul\u2013Dec 2024"], ["Grade", "A+"], ["Certificate ID", "141231"], ["Covers", "MS Word, Excel, Access, PowerPoint"]],
      link: ""   // TODO: ICT certificate link
    }
  ],

  // ---------- About ----------
  about: {
    subtitle: "Junior Data Scientist from Narsingdi, Bangladesh.",
    paragraphs: [
      "I am a Mathematics (Hons) student who builds end-to-end data projects in Python: data cleaning, EDA, feature engineering, modeling and evaluation.",
      "I am looking for an entry-level Data Scientist or Data Analyst role where I can keep learning and turn data into decisions."
    ],
    education: [
      { title: "B.Sc. (Hons) in Mathematics", note: "Govt. Shahid Asad College, Shibpur, Narsingdi, National University. 4th year, expected 2027." },
      { title: "HSC (Science), GPA 4.42/5.00", note: "Narsingdi Public College, 2021." }
    ]
  },

  // ---------- Contact ----------
  contact: {
    text: "Open to entry-level Data Scientist and Data Analyst roles."
  }
};

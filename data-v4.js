/* ==========================================================
   PORTFOLIO DATA: shudhu ei file edit korlei hobe.
   - Link/image khali ("") rakhle oi button ba image nijei lukiye jabe.
   - Notun item add korte { ... }, line ta copy kore comma diye boshao.
   - Image/file gulo assets/ folder e rakho.
   - category: filter button er jonno. Notun category likhlei button nijei toiri hobe.
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

  // ---------- Projects ----------
  // Ekta block = ekta project card + tar detail page (project-v4.html?id=...)
  // id: ek-ek project er unique chhoto naam (space chhara, ingreji) - detail page link er jonno
  // color: "green" | "orange" | "blue" | "purple"
  // cover: "assets/img/projects/xxx.png" (khali hole chhoto chart dekhabe)
  // file: card er upore window bar e jei file er naam dekhabe (jemon xxx.ipynb)
  // badge: window bar er daan dike chhoto label
  // metrics: [["88%","LABEL"], ...] (3 ta dile bhalo dekhay)
  // note: ekta line er highlight (key finding)
  // repo: GitHub link | extra: {text:"Notebook", url:"..."} (optional, 2nd link)
  // video: YouTube video id (detail page e player dekhabe) | blocks: detail page er extra lekha/chhobi
  //   block type: h2 | p | ul (items) | img (src, caption)
  projects: [
    {
      id: "customer-segmentation",
      title: "Customer Segmentation",
      color: "green",
      file: "customer_segmentation.ipynb",
      badge: "\u2605 Featured \u00B7 clustering",
      cover: "",
      thumb: "dots",
      description: "Segmented 8,950 credit card customers with K-Means, Hierarchical and DBSCAN clustering after PCA (95% variance).",
      metrics: [["8,950", "CUSTOMERS"], ["95%", "VARIANCE KEPT (PCA)"], ["3", "CLUSTERING METHODS"]],
      note: "K-Means (k=2) found 60% purchase-active customers and 40% cash-advance, high-balance carriers.",
      tags: ["Python", "PCA", "K-Means", "DBSCAN"],
      category: ["Data Science", "Clustering"],
      repo: "https://github.com/sakibzzz641/Customer-Segmentation-Kmeans-dbscan-clustering",
      problem: "Group customers by spending and repayment behavior to guide marketing and credit risk.",
      approach: "Log-transforms, correlation filtering, PCA (9 components), then K-Means, Hierarchical and DBSCAN compared by silhouette score.",
      result: "K-Means (k=2) found 60% purchase-active customers and 40% cash-advance, high-balance carriers.",
      video: "",
      blocks: []
    },
    {
      id: "telco-churn",
      title: "Telco Customer Churn Prediction",
      color: "green",
      file: "telco_churn.ipynb",
      badge: "\u2605 Featured \u00B7 classification",
      cover: "",
      thumb: "mix",
      description: "Compared 6 models on 7,043 customers to predict who is about to leave, so the company can act early.",
      metrics: [["7,043", "CUSTOMERS"], ["0.844", "ROC-AUC"], ["77%", "RECALL ON CHURNERS"]],
      note: "88.6% of churners are on month-to-month contracts. Suggested auto-pay incentives and 1-year offers.",
      tags: ["XGBoost", "SMOTE", "Classification"],
      category: ["Data Science", "Classification"],
      repo: "https://github.com/sakibzzz641/Telco-Customer-Churn-Prediction",
      problem: "Predict which customers are about to leave so the company can act early.",
      approach: "EDA, SMOTE for class imbalance, and 6 models compared with ROC-AUC and recall.",
      result: "Best model reached 0.844 ROC-AUC with 77% recall on likely churners. 88.6% of churners are on month-to-month contracts, so auto-pay incentives and 1-year offers are suggested.",
      video: "",
      blocks: []
    },
    {
      id: "insurance-cost",
      title: "Medical Insurance Cost Prediction",
      color: "green",
      file: "insurance_regression.ipynb",
      badge: "\u2605 Featured \u00B7 regression",
      cover: "",
      thumb: "up",
      description: "Regression pipeline on 1,337 records that estimates medical charges and explains what pushes them up.",
      metrics: [["1,337", "RECORDS"], ["0.85", "R\u00B2 (XGBOOST)"], ["-25%", "BASELINE RMSE"]],
      note: "Smokers pay about 3.8x more on average. SHAP shows smoking status and age drive cost.",
      tags: ["Regression", "XGBoost", "SHAP"],
      category: ["Data Science", "Regression"],
      repo: "https://github.com/sakibzzz641/Insurance-charges-regression",
      problem: "Estimate medical charges and explain what pushes them up.",
      approach: "Smoker \u00D7 BMI features cut baseline RMSE by 25%. 8 models tested with 5-fold CV and tuning.",
      result: "XGBoost reached R\u00B2 0.85 (RMSE about $4.6K). Smokers pay about 3.8x more on average.",
      video: "",
      blocks: []
    },
    {
      id: "global-superstore-dashboard",
      title: "Global Superstore Sales & Profit Dashboard",
      color: "orange",
      file: "Global Super Store Dataset.xlsm",
      badge: "\u2605 Featured \u00B7 excel",
      cover: "",
      thumb: "mix",
      description: "Interactive 4-page Excel dashboard on 25,035 retail orders (2011-2014): sales, profit, products, regions and customers.",
      metrics: [["25,035", "ORDERS"], ["$12.6M", "TOTAL SALES"], ["11.6%", "PROFIT MARGIN"]],
      note: "Discounts above 20% push profit margin below zero, and Technology leads with 37.5% of total sales.",
      tags: ["Power Query", "DAX", "PivotTable", "Slicers"],
      category: ["Excel", "Data Analysis"],
      repo: "https://github.com/sakibzzz641/EXCEL-REPO-NAME",   // TODO: EXCEL-REPO-NAME bodle repo er asol naam dao
      problem: "Management needed quick answers on sales, profit, products, regions, customers and shipping from 25,035 retail orders (2011-2014).",
      approach: "Cleaned the data with Power Query, modelled it in the Excel Data Model, wrote DAX measures, then built PivotTable dashboards with slicers across 4 pages (Executive, Product, Regional, Customer).",
      result: "Discounts above 20% push profit margin below zero, and Technology leads with 37.5% of total sales. Southeast Asia and EMEA have the weakest margins.",
      video: "bOUNd_Z8_Yk",
      blocks: []
    }
    // Notun project (SQL / Power BI o): ekta { ... } block copy kore comma diye boshao
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
      { title: "B.Sc. (Hons) in Mathematics", note: "Govt. Shahid Asad College, Shibpur, Narsingdi. 4th year, expected 2027." },
      { title: "HSC (Science), GPA 4.42/5.00", note: "Narsingdi Public College, 2021." }
    ]
  },

  // ---------- Contact ----------
  contact: {
    text: "Open to entry-level Data Scientist and Data Analyst roles."
  }
};

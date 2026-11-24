/* ==========================================================
   PORTFOLIO DATA: shudhu ei file edit korlei hobe.
   - Link/image khali ("") rakhle oi button ba image nijei lukiye jabe.
   - Notun item add korte { ... }, line ta copy kore comma diye boshao.
   - Image/file gulo assets/ folder e rakho.
   - category: filter button er jonno (projects ar cases dui jaygatei). Notun category likhlei button nijei toiri hobe.
   ========================================================== */
const DATA = {

  // ---------- Profile ----------
  profile: {
    name: "Md. Sakib Al Hasan",
    shortName: "Sakib Al Hasan",          // nav bar e dekhabe
    role: "Data Analyst & Data Scientist",
    initials: "SH",                        // photo na thakle eta dekhabe
    tagline: "I turn raw data into clear insights, dashboards and useful predictions. Explore my projects and case studies to see how I solve real-world problems with Python, SQL, Excel and machine learning.",
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
    top: ["Data Analysis", "Data Science", "Machine Learning", "Python", "SQL", "Excel", "Pandas", "NumPy"],
    bottom: ["Data Analyst", "Data Scientist", "Scikit-learn", "XGBoost", "EDA", "Data Visualization"]
  },

  // ---------- Skills ----------
  // ---------- Skills ----------

skills: [
  {
    icon: "Py",
    title: "Programming & Data",
    description: "Prepare, transform and analyze structured datasets.",
    items: ["Python", "SQL", "Pandas", "NumPy", "Excel"]
  },
  {
    icon: "St",
    title: "Statistics & EDA",
    description: "Explore patterns, clean data and communicate findings.",
    items: ["Data Cleaning", "EDA", "Data Visualization", "Descriptive Analysis", "Hypothesis Testing"]
  },
  {
    icon: "ML",
    title: "Supervised Machine Learning",
    description: "Build and evaluate predictive models for real-world problems.",
    items: ["Scikit-learn", "Regression", "Classification", "Random Forest", "XGBoost", "Neural Network (MLP)"]
  },
  {
    icon: "Un",
    title: "Unsupervised Learning",
    description: "Find hidden groups and structure in unlabeled data.",
    items: ["Clustering", "K-Means", "Hierarchical", "DBSCAN", "PCA"]
  },
  {
    icon: "Viz",
    title: "Visualization & Reporting",
    description: "Turn analysis into clear charts, dashboards and reports.",
    items: ["Matplotlib", "Seaborn", "PivotTable", "Slicers", "Power Query", "Power Pivot/DAX"]
  },
  {
    icon: "WF",
    title: "Workflow & Evaluation",
    description: "Build reproducible workflows and measure model performance.",
    items: ["Feature Engineering", "Pipelines", "Cross-Validation", "ROC-AUC", "RMSE", "Git", "GitHub", "Jupyter Notebook", "AI-Assisted Development"]
  }
],

  tools: [
    { mark: "Py", name: "Python" },
    { mark: "DB", name: "SQL" },
    { mark: "X", name: "Excel" },
    { mark: "pd", name: "Pandas" },
    { mark: "np", name: "NumPy" },
    { mark: "ML", name: "Scikit-learn" },
    { mark: "XG", name: "XGBoost" },
    { mark: "M", name: "Matplotlib" },
    { mark: "S", name: "Seaborn" },
    { mark: "GH", name: "GitHub" },
    { mark: "J", name: "Jupyter" },
  ],

  // ---------- Featured Projects ----------
  // color: "green" | "orange" | "blue" | "purple" (card er border/outline er rong)
  // image: "assets/img/projects/xxx.png" dile screenshot dekhabe, khali thakle chhoto chart dekhabe
  // liveApp: live app link dile card-e Live App button dekhabe, khali thakle dekhabe na
  // thumb (image na thakle): "dots" | "mix" | "up"
  // Featured Projects-er clickable filter button (All, Data Science, Clustering...)
  // ekhankar protiti project's category array theke automatically toiri hoy.
  // Notun filter add korte je project-gulote filter chan, sekhane category-te naam din:
  // category: ["Data Science", "Power BI"]
  projects: [
    {
      id: "customer-segmentation",
      title: "Customer Segmentation",
      color: "green",
      description: "Segmented 8,950 credit card customers with K-Means, Hierarchical and DBSCAN clustering after PCA (95% variance).",
      tags: ["Python", "PCA", "Clustering"],
      category: ["Data Science", "Clustering"],
      repo: "https://github.com/sakibzzz641/Customer-Segmentation-Kmeans-dbscan-clustering",
      repoSlug: "sakibzzz641/Customer-Segmentation-Kmeans-dbscan-clustering",
      liveApp: "https://customer-segmentation-kmeans-dbscan-clustering.streamlit.app/",
      image: "projects/project/customer-segmentation/cover.jpg",
      thumb: "dots"
    },
    {
      id: "telco-customer-churn-prediction",
      title: "Telco Customer Churn Prediction",
      color: "green",
      description: "Compared 6 models on 7,043 customers. Best result: 0.844 ROC-AUC with 77% recall on likely churners.",
      tags: ["XGBoost", "SMOTE", "Classification"],
      category: ["Data Science", "Classification"],
      repo: "https://github.com/sakibzzz641/Telco-Customer-Churn-Prediction",
      repoSlug: "sakibzzz641/Telco-Customer-Churn-Prediction",
      liveApp: "",
      image: "projects/project/Telco-Customer-Churn-Prediction/cover.jpg",
      thumb: "mix"
    },
    {
      id: "medical-insurance-cost-prediction",
      title: "Medical Insurance Cost Prediction",
      color: "green",
      description: "Regression pipeline on 1,337 records. R\u00B2 of 0.85, with SHAP showing smoking status and age drive cost.",
      tags: ["Regression", "SHAP", "Cross-Validation"],
      category: ["Data Science", "Regression"],
      repo: "https://github.com/sakibzzz641/Insurance-charges-regression",
      repoSlug: "sakibzzz641/Insurance-charges-regression",
      liveApp: "",
      image: "projects/project/Medical-Insurance-Cost-Prediction/cover.jpg",
      thumb: "up"
    },
    {
      id: "global-superstore-sales-profit-dashboard-excel",
      title: "Global Superstore Sales & Profit Dashboard Excel",
      color: "orange",
      description: "Interactive 4-page dashboard on 25,035 retail orders ($12.6M sales, $1.47M profit): products, regions and customers.",
      tags: ["Excel", "Power Query", "DAX", "PivotTable", "Dashboard"],
      category: ["Excel", "Data Analysis", "Dashboard" ],
      repo: "https://github.com/sakibzzz641/Global-Superstore-Excel-Dashboard",
      repoSlug: "sakibzzz641/Global-Superstore-Excel-Dashboard",
      liveApp: "",
      image: "projects/project/Global-Superstore-Sales-Dashboard-Excel/cover.jpg",
      thumb: "mix"
    },
    {
      id: "supply-chain-logistics-dashboard-excel",
      title: "Supply Chain Logistics Dashboard Excel & VBA",
      color: "orange",
      description: "Interactive 7-page dashboard on 9,215 supply-chain orders (29.5M units, 19 plants): orders, freight, warehouses and delivery risk.",
      tags: ["Excel", "Power Query", "PivotTable", "VBA", "Dashboard"],
      category: ["Excel", "Data Analysis", "Dashboard"],
      repo: "https://github.com/sakibzzz641/Supply_Chain_Logistics_Analytics_Dashboard_Excel_and_VBA",
      repoSlug: "sakibzzz641/Supply_Chain_Logistics_Analytics_Dashboard_Excel_and_VBA",
      liveApp: "",
      image: "projects/project/Supply-Chain-Logistics-Dashboard-Excel/cover.jpg",
      thumb: "mix"
    },
    {
      id: "superstore-sales-eda",
      title: "Superstore Sales EDA",
      color: "blue",
      description: "Analyzed 9,993 Superstore retail orders (2015-2018) to find what drives profit, from category margins to discount impact and seasonality.",
      tags: ["Python", "Pandas", "EDA"],
      category: ["Data Science", "EDA"],
      repo: "https://github.com/sakibzzz641/superstore-sales-eda",
      repoSlug: "sakibzzz641/superstore-sales-eda",
      image: "projects/project/superstore-sales-eda/00_cover.png",
      thumb: "dots"
   }
     // Notun project: ekta { ... } block copy kore comma diye boshao (SQL / Power BI o ekbhabe)
  ],

  // ---------- Case Studies ----------
  // Case Studies-er clickable filter button-o niche-r category array theke automatically toiri hoy.
  // Notun filter add korte relevant case-er category-te naam din:
  // category: ["Data Science", "Power BI"]
  cases: [
    {
      title: "Credit Card Customer Segmentation",
      color: "green",
      tags: ["Clustering", "PCA", "K-Means"],
      category: ["Data Science", "Clustering"],
      repo: "https://github.com/sakibzzz641/Customer-Segmentation-Kmeans-dbscan-clustering",
      problem: "Group customers by spending and repayment behavior to guide marketing and credit risk.",
      approach: "Log-transforms, correlation filtering, PCA (9 components), then K-Means, Hierarchical and DBSCAN compared by silhouette score.",
      result: "K-Means (k=2) found 60% purchase-active customers and 40% cash-advance, high-balance carriers."
    },
    {
      title: "Telecom Churn Retention",
      color: "green",
      tags: ["Classification", "XGBoost", "SMOTE"],
      category: ["Data Science", "Classification"],
      repo: "https://github.com/sakibzzz641/Telco-Customer-Churn-Prediction",
      problem: "Predict which customers are about to leave so the company can act early.",
      approach: "EDA, SMOTE for class imbalance, and 6 models compared with ROC-AUC and recall.",
      result: "88.6% of churners are on month-to-month contracts. Suggested auto-pay incentives and 1-year offers."
    },
    {
      title: "Insurance Cost Drivers",
      color: "green",
      tags: ["Regression", "XGBoost", "SHAP"],
      category: ["Data Science", "Regression"],
      repo: "https://github.com/sakibzzz641/Insurance-charges-regression",
      problem: "Estimate medical charges and explain what pushes them up.",
      approach: "Smoker \u00D7 BMI features cut baseline RMSE by 25%. 8 models tested with 5-fold CV and tuning.",
      result: "XGBoost reached R\u00B2 0.85 (RMSE about $4.6K). Smokers pay about 3.8x more on average."
    },
    {
      title: "Global Superstore Sales & Profit Dashboard",
      color: "orange",
      tags: ["Excel", "Power Query", "DAX", "Dashboard"],
      category: ["Excel", "Data Analysis", "Dashboard"],
      repo: "https://github.com/sakibzzz641/Global-Superstore-Excel-Dashboard",
      problem: "Management needed quick answers on sales, profit, products, regions, customers and shipping from 25,035 retail orders (2011-2014).",
      approach: "Cleaned the data with Power Query, modelled it in the Excel Data Model, wrote DAX measures, then built PivotTable dashboards with slicers across 4 pages.",
      result: "Discounts above 20% push profit margin below zero, and Technology leads with 37.5% of total sales."
    },
    {
      title: "Supply Chain Logistics Risk Dashboard",
      color: "orange",
      tags: ["Excel", "Power Query", "VBA", "Dashboard"],
      category: ["Excel", "Data Analysis", "Dashboard"],
      repo: "https://github.com/sakibzzz641/Supply_Chain_Logistics_Analytics_Dashboard_Excel_and_VBA",
      problem: "Seven separate tables made it hard to see late orders, freight cost, warehouse cost and which ports, plants or carriers the business depends on too much.",
      approach: "Cleaned 7 tables with Power Query, built PivotTables and PivotCharts with slicers across 7 pages, and added VBA buttons plus a Key Takeaways page.",
      result: "98% of orders ship from one port and one plant carries 95% of warehouse cost. The busiest carrier (68% of orders) is also the least reliable at 2.9% late."
    },
    {
  title: "Superstore Retail Sales Analysis",
  color: "blue",
  tags: ["EDA", "Data Cleaning", "Visualization"],
  category: ["Data Science", "EDA"],
  repo: "https://github.com/sakibzzz641/superstore-sales-eda",
  problem: "Find which categories, regions and discount levels drive or hurt profit in US Superstore retail orders, and how seasonal sales are.",
  approach: "Cleaned the raw file (806 junk rows, 1 duplicate, 1 missing ZIP), built date and margin features, then analyzed categories, regions, segments, discount bands and monthly seasonality with Pandas, Matplotlib and Seaborn.",
  result: "Furniture brings 32% of sales at only a 2.5% margin, and average profit turns negative above 20% discount (-$78.0 per line item at 21-40%). Recommendation: cap discounts at 20%."
   }
  ],

  // ---------- Certifications ----------
  // link: certificate URL, ba "assets/cert/xxx.pdf". Khali thakle button lukiye thakbe.
  certificates: [
    {
      title: "Data Science & Machine Learning with Python",
      issuer: "Ostad",
      details: [["Year", "2026"], ["Covers", "Python, SQL, NumPy, Pandas, Data Analysis, Scikit-learn, XGBoost, EDA, Feature Engineering, Data Visualization, Machine Learning"]],
      link: "https://ostad.app/share/certificate/c47905-md.-sakib-al-hasan"
    },
    {
      title: "Computer Basic and ICT Applications",
      issuer: "Dept. of Youth Development, Ministry of Youth and Sports, Govt. of Bangladesh",
      details: [["Period", "Jul\u2013Dec 2024"], ["Grade", "A+"], ["Certificate ID", "141231"], ["Covers", "MS Word, Excel, Access, PowerPoint"]],
      link: "assets/pdf/computer_basic_and_ict_application.pdf"
    },
    {
      title: "Business Case Solving",
      issuer: "10 Minute School",
      details: [["Issued", "Nov 2, 2026"], ["Certificate ID", "6ae874d564bc5"], ["Covers", "SWOT Analysis, P.E.S.T.E.L, Porter's Five Forces, Case Reading Strategy"]],
      link: "assets/pdf/business_case_solving.pdf"
    }
  ],

  // ---------- About ----------
  about: {
    subtitle: "A Mathematics student who turns complex data into practical business insight.",
    paragraphs: [
      "I am Md. Sakib Al Hasan, a Data Analyst and Data Scientist from Narsingdi, Bangladesh. Alongside my B.Sc. (Hons) in Mathematics, I have built hands-on experience with Python, SQL, Excel, data analysis, machine learning and data visualization.",
      "My work covers the full analytics workflow: cleaning raw data, exploring patterns, engineering useful features, building and evaluating models, and presenting findings through clear dashboards. Recent projects include customer segmentation, churn prediction, insurance cost modeling and interactive Excel dashboards.",
      "I enjoy turning numbers into decisions that people can act on, and I am open to opportunities where I can contribute as a Data Analyst or Data Scientist while continuing to grow."
    ],
    education: [
      { title: "B.Sc. (Hons) in Mathematics", note: "National University · Govt. Shahid Asad College, Shibpur, Narsingdi · 4th year · Expected 2027" },
      { title: "Higher Secondary Certificate (HSC) - Science", note: "Narsingdi Public College, 2021." }
    ]
  },

  // ---------- Contact ----------
  contact: {
    text: "Open to Data Analyst and Data Scientist opportunities."
  }
};

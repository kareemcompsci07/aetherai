/**
 * AetherAI - Internationalization (i18n) System
 * File: i18n.js
 * Purpose: Support multilingual interface with dynamic language switching
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Make AI education accessible in every language.
 */

// Translation resources
const resources = {
  en: {
    app: {
      backendStatus: 'Backend status: {{status}}',
      title: 'AetherAI'
    },
    navbar: {
      home: 'Home',
      dashboard: 'Dashboard',
      experiments: 'Experiments',
      community: 'Community',
      profile: 'Profile'
    },
    dataset: {
      upload: 'Upload Dataset',
      select: 'Select Dataset',
      analyze: 'Analyze Dataset',
      placeholder: 'Drag & drop your dataset or click to browse',
      supported: 'Supports CSV, JSON, and image datasets'
    },
    training: {
      start: 'Start Training',
      model: 'Model',
      epochs: 'Epochs',
      batch: 'Batch Size',
      optimizer: 'Optimizer',
      lr: 'Learning Rate',
      progress: 'Training Progress',
      accuracy: 'Accuracy',
      loss: 'Loss'
    },
    results: {
      title: 'Results',
      finalAccuracy: 'Final Accuracy',
      finalLoss: 'Final Loss',
      trainingTime: 'Training Time',
      metrics: 'Training Metrics',
      featureMaps: 'Feature Maps'
    },
    mentor: {
      title: 'AI Mentor',
      placeholder: 'Ask me anything about AI, machine learning, or your experiment...',
      send: 'Send',
      thinking: 'AI is thinking...',
      welcome: 'Hello! I\'m your AI mentor. How can I help you with your AI journey today?'
    },
    visualization: {
      title: '3D Training Visualization',
      description: 'Watch your neural network learn in real-time'
    },
    collaboration: {
      title: 'Share Experiment',
      placeholder: 'Add a message to your classmates...',
      share: 'Share with Classmates',
      success: 'Experiment shared successfully!'
    },
    leaderboard: {
      title: 'Global Leaderboard',
      rank: 'Rank',
      student: 'Student',
      accuracy: 'Accuracy',
      dataset: 'Dataset',
      model: 'Model'
    },
    debug: {
      title: 'Debug Assistant',
      placeholder: 'Paste your error log here...',
      analyze: 'Analyze Error',
      help: 'I\'ll help you fix your AI errors'
    },
    carbon: {
      title: 'Carbon Savings',
      saved: 'Carbon saved by using AetherAI',
      equivalent: 'Equivalent to',
      trees: 'trees planted'
    },
    career: {
      title: 'Career Advisor',
      advice: 'Personalized career guidance based on your progress'
    },
    classroom: {
      title: 'Teacher Dashboard',
      summary: 'Class progress summary',
      monitor: 'Monitor student progress'
    },
    paper: {
      title: 'Research Paper Generator',
      generate: 'Generate Research Paper',
      download: 'Download PDF'
    },
    model: {
      title: 'Model Selector',
      custom: 'Build Custom Model',
      select: 'Select Model Architecture'
    },
    report: {
      title: 'Experiment Report',
      generate: 'Generate PDF Report',
      download: 'Download Report'
    },
    footer: {
      developedBy: 'Developed by',
      with: 'with',
      in: 'in',
      vision: 'Democratizing AI research for students in developing countries',
      version: 'Version 3.4.0 • Built entirely from a mobile device'
    }
  },
  ar: {
    app: {
      backendStatus: 'حالة الباك إند: {{status}}',
      title: 'إثيرآي'
    },
    navbar: {
      home: 'الرئيسية',
      dashboard: 'لوحة التحكم',
      experiments: 'التجارب',
      community: 'المجتمع',
      profile: 'الملف الشخصي'
    },
    dataset: {
      upload: 'رفع البيانات',
      select: 'اختر البيانات',
      analyze: 'تحليل البيانات',
      placeholder: 'اسحب وأفلت ملف البيانات أو انقر للاختيار',
      supported: 'يدعم CSV، JSON، ومجموعات الصور'
    },
    training: {
      start: 'ابدأ التدريب',
      model: 'النموذج',
      epochs: 'عدد الدورات',
      batch: 'حجم الدفعة',
      optimizer: 'أداة التحسين',
      lr: 'معدل التعلم',
      progress: 'تقدم التدريب',
      accuracy: 'الدقة',
      loss: 'الخسارة'
    },
    results: {
      title: 'النتائج',
      finalAccuracy: 'الدقة النهائية',
      finalLoss: 'الخسارة النهائية',
      trainingTime: 'وقت التدريب',
      metrics: 'مقاييس التدريب',
      featureMaps: 'خرائط الميزات'
    },
    mentor: {
      title: 'المرشد الذكي',
      placeholder: 'اسألني أي شيء عن الذكاء الاصطناعي أو تجربتك...',
      send: 'إرسال',
      thinking: 'الذكاء الاصطناعي يفكر...',
      welcome: 'مرحباً! أنا مرشدك الذكي. كيف يمكنني مساعدتك في رحلتك في الذكاء الاصطناعي اليوم؟'
    },
    visualization: {
      title: 'التصور ثلاثي الأبعاد',
      description: 'شاهد شبكتك العصبية تتعلم في الوقت الفعلي'
    },
    collaboration: {
      title: 'مشاركة التجربة',
      placeholder: 'أضف رسالة لزملائك...',
      share: 'شارك مع الزملاء',
      success: 'تمت مشاركة التجربة بنجاح!'
    },
    leaderboard: {
      title: 'التصنيف العالمي',
      rank: 'المرتبة',
      student: 'الطالب',
      accuracy: 'الدقة',
      dataset: 'مجموعة البيانات',
      model: 'النموذج'
    },
    debug: {
      title: 'مساعد التصحيح',
      placeholder: 'الصق سجل الخطأ هنا...',
      analyze: 'تحليل الخطأ',
      help: 'سأساعدك في إصلاح أخطاء الذكاء الاصطناعي'
    },
    carbon: {
      title: 'توفير الكربون',
      saved: 'تم توفير الكربون باستخدام إثيرآي',
      equivalent: 'يعادل',
      trees: 'أشجار مزروعة'
    },
    career: {
      title: 'مستشار الوظائف',
      advice: 'إرشادات وظيفية مخصصة بناءً على تقدمك'
    },
    classroom: {
      title: 'لوحة معلم',
      summary: 'ملخص تقدم الفصل',
      monitor: 'مراقبة تقدم الطلاب'
    },
    paper: {
      title: 'مولد الأوراق البحثية',
      generate: 'توليد ورقة بحثية',
      download: 'تنزيل PDF'
    },
    model: {
      title: 'اختيار النموذج',
      custom: 'بناء نموذج مخصص',
      select: 'اختر هيكل النموذج'
    },
    report: {
      title: 'تقرير التجربة',
      generate: 'توليد تقرير PDF',
      download: 'تنزيل التقرير'
    },
    footer: {
      developedBy: 'تم التطوير بواسطة',
      with: 'مع',
      in: 'في',
      vision: 'نشر أبحاث الذكاء الاصطناعي للطلاب في الدول النامية',
      version: 'الإصدار 3.4.0 • تم بناؤه بالكامل من جهاز محمول'
    }
  },
  fr: {
    app: {
      backendStatus: 'État du backend : {{status}}',
      title: 'AetherIA'
    },
    navbar: {
      home: 'Accueil',
      dashboard: 'Tableau de bord',
      experiments: 'Expériences',
      community: 'Communauté',
      profile: 'Profil'
    },
    dataset: {
      upload: 'Téléverser le jeu de données',
      select: 'Sélectionner le jeu de données',
      analyze: 'Analyser le jeu de données',
      placeholder: 'Glissez-déposez votre jeu de données ou cliquez pour parcourir',
      supported: 'Prend en charge CSV, JSON et les jeux de données d\'images'
    },
    training: {
      start: 'Démarrer l\'entraînement',
      model: 'Modèle',
      epochs: 'Époques',
      batch: 'Taille du lot',
      optimizer: 'Optimiseur',
      lr: 'Taux d\'apprentissage',
      progress: 'Progression de l\'entraînement',
      accuracy: 'Précision',
      loss: 'Perte'
    },
    results: {
      title: 'Résultats',
      finalAccuracy: 'Précision finale',
      finalLoss: 'Perte finale',
      trainingTime: 'Temps d\'entraînement',
      metrics: 'Métriques d\'entraînement',
      featureMaps: 'Cartes de caractéristiques'
    },
    mentor: {
      title: 'Mentor IA',
      placeholder: 'Demandez-moi tout sur l\'IA, l\'apprentissage automatique ou votre expérience...',
      send: 'Envoyer',
      thinking: 'L\'IA réfléchit...',
      welcome: 'Bonjour ! Je suis votre mentor IA. Comment puis-je vous aider dans votre parcours IA aujourd\'hui ?'
    },
    visualization: {
      title: 'Visualisation 3D de l\'entraînement',
      description: 'Regardez votre réseau de neurones apprendre en temps réel'
    },
    collaboration: {
      title: 'Partager l\'expérience',
      placeholder: 'Ajoutez un message à vos camarades de classe...',
      share: 'Partager avec les camarades',
      success: 'Expérience partagée avec succès !'
    },
    leaderboard: {
      title: 'Classement mondial',
      rank: 'Rang',
      student: 'Étudiant',
      accuracy: 'Précision',
      dataset: 'Jeu de données',
      model: 'Modèle'
    },
    debug: {
      title: 'Assistant de débogage',
      placeholder: 'Collez votre journal d\'erreur ici...',
      analyze: 'Analyser l\'erreur',
      help: 'Je vais vous aider à corriger vos erreurs d\'IA'
    },
    carbon: {
      title: 'Économies de carbone',
      saved: 'Carbone économisé en utilisant AetherIA',
      equivalent: 'Équivalent à',
      trees: 'arbres plantés'
    },
    career: {
      title: 'Conseiller en carrière',
      advice: 'Orientation professionnelle personnalisée en fonction de votre progression'
    },
    classroom: {
      title: 'Tableau de bord enseignant',
      summary: 'Résumé de la progression de la classe',
      monitor: 'Surveiller la progression des étudiants'
    },
    paper: {
      title: 'Générateur d\'articles de recherche',
      generate: 'Générer un article de recherche',
      download: 'Télécharger PDF'
    },
    model: {
      title: 'Sélecteur de modèle',
      custom: 'Créer un modèle personnalisé',
      select: 'Sélectionner l\'architecture du modèle'
    },
    report: {
      title: 'Rapport d\'expérience',
      generate: 'Générer un rapport PDF',
      download: 'Télécharger le rapport'
    },
    footer: {
      developedBy: 'Développé par',
      with: 'avec',
      in: 'à',
      vision: 'Démocratiser la recherche en IA pour les étudiants des pays en développement',
      version: 'Version 3.4.0 • Construit entièrement depuis un appareil mobile'
    }
  },
  es: {
    app: {
      backendStatus: 'Estado del backend: {{status}}',
      title: 'AetherIA'
    },
    navbar: {
      home: 'Inicio',
      dashboard: 'Panel',
      experiments: 'Experimentos',
      community: 'Comunidad',
      profile: 'Perfil'
    },
    dataset: {
      upload: 'Subir conjunto de datos',
      select: 'Seleccionar conjunto de datos',
      analyze: 'Analizar conjunto de datos',
      placeholder: 'Arrastra y suelta tu conjunto de datos o haz clic para explorar',
      supported: 'Soporta CSV, JSON y conjuntos de datos de imágenes'
    },
    training: {
      start: 'Iniciar entrenamiento',
      model: 'Modelo',
      epochs: 'Épocas',
      batch: 'Tamaño de lote',
      optimizer: 'Optimizador',
      lr: 'Tasa de aprendizaje',
      progress: 'Progreso del entrenamiento',
      accuracy: 'Precisión',
      loss: 'Pérdida'
    },
    results: {
      title: 'Resultados',
      finalAccuracy: 'Precisión final',
      finalLoss: 'Pérdida final',
      trainingTime: 'Tiempo de entrenamiento',
      metrics: 'Métricas de entrenamiento',
      featureMaps: 'Mapas de características'
    },
    mentor: {
      title: 'Mentor IA',
      placeholder: 'Pregúntame cualquier cosa sobre IA, aprendizaje automático o tu experimento...',
      send: 'Enviar',
      thinking: 'La IA está pensando...',
      welcome: '¡Hola! Soy tu mentor IA. ¿Cómo puedo ayudarte en tu viaje de IA hoy?'
    },
    visualization: {
      title: 'Visualización 3D del entrenamiento',
      description: 'Observa cómo tu red neuronal aprende en tiempo real'
    },
    collaboration: {
      title: 'Compartir experimento',
      placeholder: 'Agrega un mensaje a tus compañeros de clase...',
      share: 'Compartir con compañeros',
      success: '¡Experimento compartido con éxito!'
    },
    leaderboard: {
      title: 'Clasificación mundial',
      rank: 'Rango',
      student: 'Estudiante',
      accuracy: 'Precisión',
      dataset: 'Conjunto de datos',
      model: 'Modelo'
    },
    debug: {
      title: 'Asistente de depuración',
      placeholder: 'Pega tu registro de errores aquí...',
      analyze: 'Analizar error',
      help: 'Te ayudaré a corregir tus errores de IA'
    },
    carbon: {
      title: 'Ahorro de carbono',
      saved: 'Carbono ahorrado usando AetherIA',
      equivalent: 'Equivalente a',
      trees: 'árboles plantados'
    },
    career: {
      title: 'Asesor de carrera',
      advice: 'Orientación profesional personalizada según tu progreso'
    },
    classroom: {
      title: 'Panel de profesor',
      summary: 'Resumen del progreso de la clase',
      monitor: 'Monitorear el progreso de los estudiantes'
    },
    paper: {
      title: 'Generador de artículos de investigación',
      generate: 'Generar artículo de investigación',
      download: 'Descargar PDF'
    },
    model: {
      title: 'Selector de modelo',
      custom: 'Crear modelo personalizado',
      select: 'Seleccionar arquitectura del modelo'
    },
    report: {
      title: 'Informe de experimento',
      generate: 'Generar informe PDF',
      download: 'Descargar informe'
    },
    footer: {
      developedBy: 'Desarrollado por',
      with: 'con',
      in: 'en',
      vision: 'Democratizar la investigación en IA para estudiantes de países en desarrollo',
      version: 'Versión 3.4.0 • Construido completamente desde un dispositivo móvil'
    }
  },
  zh: {
    app: {
      backendStatus: '后端状态：{{status}}',
      title: '以太AI'
    },
    navbar: {
      home: '首页',
      dashboard: '仪表板',
      experiments: '实验',
      community: '社区',
      profile: '个人资料'
    },
    dataset: {
      upload: '上传数据集',
      select: '选择数据集',
      analyze: '分析数据集',
      placeholder: '拖放您的数据集或点击浏览',
      supported: '支持CSV、JSON和图像数据集'
    },
    training: {
      start: '开始训练',
      model: '模型',
      epochs: '训练轮数',
      batch: '批次大小',
      optimizer: '优化器',
      lr: '学习率',
      progress: '训练进度',
      accuracy: '准确率',
      loss: '损失'
    },
    results: {
      title: '结果',
      finalAccuracy: '最终准确率',
      finalLoss: '最终损失',
      trainingTime: '训练时间',
      metrics: '训练指标',
      featureMaps: '特征图'
    },
    mentor: {
      title: 'AI导师',
      placeholder: '问我关于AI、机器学习或您的实验的任何问题...',
      send: '发送',
      thinking: 'AI正在思考...',
      welcome: '你好！我是你的AI导师。今天我能如何帮助你学习AI？'
    },
    visualization: {
      title: '3D训练可视化',
      description: '实时观察你的神经网络学习过程'
    },
    collaboration: {
      title: '分享实验',
      placeholder: '给同学们添加一条消息...',
      share: '与同学分享',
      success: '实验已成功分享！'
    },
    leaderboard: {
      title: '全球排行榜',
      rank: '排名',
      student: '学生',
      accuracy: '准确率',
      dataset: '数据集',
      model: '模型'
    },
    debug: {
      title: '调试助手',
      placeholder: '在此粘贴您的错误日志...',
      analyze: '分析错误',
      help: '我将帮助您修复AI错误'
    },
    carbon: {
      title: '碳排放节省',
      saved: '使用以太AI节省的碳排放',
      equivalent: '相当于',
      trees: '棵树种植'
    },
    career: {
      title: '职业顾问',
      advice: '根据您的进度提供个性化职业指导'
    },
    classroom: {
      title: '教师仪表板',
      summary: '班级进度摘要',
      monitor: '监控学生进度'
    },
    paper: {
      title: '研究论文生成器',
      generate: '生成研究论文',
      download: '下载PDF'
    },
    model: {
      title: '模型选择器',
      custom: '构建自定义模型',
      select: '选择模型架构'
    },
    report: {
      title: '实验报告',
      generate: '生成PDF报告',
      download: '下载报告'
    },
    footer: {
      developedBy: '由',
      with: '与',
      in: '在',
      vision: '为发展中国家的学生普及AI研究',
      version: '版本 3.4.0 • 完全从移动设备构建'
    }
  }
};

class I18n {
  constructor() {
    this.language = 'en'; // Default language
    this.observers = [];
    
    // Load language from localStorage
    const savedLang = localStorage.getItem('aetherai_language');
    if (savedLang && resources[savedLang]) {
      this.language = savedLang;
    }
  }

  // Get current language
  getLanguage() {
    return this.language;
  }

  // Set language
  setLanguage(lang) {
    if (resources[lang]) {
      this.language = lang;
      localStorage.setItem('aetherai_language', lang);
      this.notifyObservers(lang);
    } else {
      console.warn(`Language ${lang} not supported`);
    }
  }

  // Translate a key
  t(key, params = {}) {
    const keys = key.split('.');
    let value = resources[this.language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    // Return fallback in English if not found
    if (value === undefined) {
      value = this.t(key, params, 'en');
    }
    
    // Replace parameters
    if (value && typeof value === 'string') {
      for (const [param, paramValue] of Object.entries(params)) {
        value = value.replace(`{{${param}}}`, paramValue);
      }
    }
    
    return value || key;
  }

  // Subscribe to language changes
  subscribe(callback) {
    this.observers.push(callback);
    callback(this.language);
    
    // Return unsubscribe function
    return () => {
      this.observers = this.observers.filter(cb => cb !== callback);
    };
  }

  // Notify all observers
  notifyObservers(lang) {
    this.observers.forEach(callback => {
      try {
        callback(lang);
      } catch (error) {
        console.error('Error in i18n observer:', error);
      }
    });
  }

  // Get available languages
  getAvailableLanguages() {
    return Object.keys(resources).map(lang => ({
      code: lang,
      name: {
        en: 'English',
        ar: 'العربية',
        fr: 'Français',
        es: 'Español',
        zh: '中文'
      }[lang],
      nativeName: {
        en: 'English',
        ar: 'العربية',
        fr: 'Français',
        es: 'Español',
        zh: '中文'
      }[lang]
    }));
  }
}

// Create singleton instance
const i18n = new I18n();

export default i18n;

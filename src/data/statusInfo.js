export const STATUS_INFO_MAP = {
  Employed: {
    id: "Employed",
    badge: "Wage Employment",
    title: {
      en: "Employed (Formal Wage Work)",
      hi: "वेतनभोगी रोजगार (नियमित नौकरी)"
    },
    meaning: {
      en: "You are currently working in a salaried job (full-time or contract) with regular monthly pay.",
      hi: "आप वर्तमान में नियमित मासिक वेतन के साथ एक वेतनभोगी नौकरी (पूर्णकालिक या अनुबंध) में कार्यरत हैं।"
    },
    whatHappensNext: {
      en: "Your reported employer and salary details are submitted to the MSInS Verification Desk. Once matched with EPFO or confirmed by HR, your outcome is verified, protecting your employment record and institutional rating.",
      hi: "आपके द्वारा रिपोर्ट किए गए नियोक्ता और वेतन विवरण MSInS सत्यापन डेस्क को भेजे जाते हैं। EPFO या HR द्वारा पुष्टि के बाद, आपका परिणाम सत्यापित हो जाता है।"
    },
    suggestedProof: {
      en: "Salary slip, offer letter, or EPFO UAN number helps immediate verification.",
      hi: "वेतन पर्ची, प्रस्ताव पत्र या EPFO UAN नंबर तत्काल सत्यापन में सहायता करता है।"
    },
    accentColor: "emerald"
  },
  "Self-employed": {
    id: "Self-employed",
    badge: "Micro-Entrepreneurship",
    title: {
      en: "Self-Employed / Own Enterprise",
      hi: "स्वरोजगार / स्वयं का उद्यम"
    },
    meaning: {
      en: "You run your own repair unit, shop, service freelance practice, or trade without a single employer.",
      hi: "आप बिना किसी एकल नियोक्ता के अपनी मरम्मत इकाई, दुकान, फ्रीलांस कार्य या व्यापार चलाते हैं।"
    },
    whatHappensNext: {
      en: "Your enterprise is registered under Maharashtra nano-enterprise tracking. You become eligible for Mudra/CMEGP credit linkage support and state trade exhibitions.",
      hi: "आपका उद्यम महाराष्ट्र नैनो-उद्यम ट्रैकिंग के तहत पंजीकृत होता है। आप मुद्रा/CMEGP ऋण सहायता और राज्य व्यापार प्रदर्शनियों के पात्र बन जाते हैं।"
    },
    suggestedProof: {
      en: "Udyam registration number, shop photo, GSTIN, or customer payment receipt helps fast-track verification.",
      hi: "उद्यम पंजीकरण संख्या, दुकान का फोटो, जीएसटी नंबर या ग्राहक रसीद त्वरित सत्यापन में मदद करती है।"
    },
    accentColor: "cyan"
  },
  Apprenticeship: {
    id: "Apprenticeship",
    badge: "On-the-Job Contract",
    title: {
      en: "Apprenticeship (NAPS / NATS / MMYY)",
      hi: "शिक्षुता (NAPS / NATS / MMYY)"
    },
    meaning: {
      en: "You are engaged in a formal structured on-the-job apprenticeship contract with government-subsidized monthly stipend.",
      hi: "आप सरकारी सब्सिडी वाले मासिक वजीफे के साथ एक औपचारिक ऑन-द-जॉब शिक्षुता अनुबंध में कार्यरत हैं।"
    },
    whatHappensNext: {
      en: "Your monthly attendance is auto-tracked via the Apprenticeship portal. Upon 12-month completion, you receive a National Apprenticeship Certificate (NAC) with high permanent hiring priority.",
      hi: "आपकी मासिक उपस्थिति अप्रेंटिसशिप पोर्टल से स्वतः ट्रैक होती है। 12 महीने पूरा होने पर राष्ट्रीय शिक्षुता प्रमाणपत्र (NAC) जारी होता है।"
    },
    suggestedProof: {
      en: "Apprenticeship Contract ID or MMYY Trainee Roll Number.",
      hi: "अप्रेंटिसशिप अनुबंध आईडी या MMYY प्रशिक्षु रोल नंबर।"
    },
    accentColor: "purple"
  },
  Seeking: {
    id: "Seeking",
    badge: "Placement Priority",
    title: {
      en: "Actively Seeking Employment",
      hi: "सक्रिय रूप से रोजगार की तलाश में"
    },
    meaning: {
      en: "You completed training and are currently looking for a job or awaiting an offer.",
      hi: "आपने प्रशिक्षण पूरा कर लिया है और वर्तमान में नौकरी की तलाश कर रहे हैं या प्रस्ताव की प्रतीक्षा कर रहे हैं।"
    },
    whatHappensNext: {
      en: "Selecting this instantly flags your profile to the District Skill Employment Center. You will receive customized bridge-course recommendations, direct invites to nearby MIDC Job Melas, and priority call-center assistance.",
      hi: "इसे चुनने पर आपकी प्रोफ़ाइल ज़िला रोजगार मार्गदर्शन केंद्र को भेजी जाती है। आपको लक्षित ब्रिज-कोर्स, नज़दीकी जॉब मेलों के निमंत्रण और कॉल-सेंटर प्राथमिकता मिलेगी।"
    },
    suggestedProof: {
      en: "No proof needed! Simply keep your phone and district location updated so employers can reach you.",
      hi: "किसी दस्तावेज़ की आवश्यकता नहीं! बस अपना फ़ोन नंबर और ज़िला अपडेट रखें ताकि नियोक्ता संपर्क कर सकें।"
    },
    accentColor: "amber"
  },
  Studying: {
    id: "Studying",
    badge: "Higher Education",
    title: {
      en: "Further Studies / Higher Education",
      hi: "उच्च शिक्षा / आगे की पढ़ाई"
    },
    meaning: {
      en: "You have opted to pursue further education (Degree, Advanced Diploma, or Competitive Exams).",
      hi: "आपने आगे की पढ़ाई (डिग्री, उच्च डिप्लोमा या प्रतियोगी परीक्षा) जारी रखने का विकल्प चुना है।"
    },
    whatHappensNext: {
      en: "Active placement telephone follow-ups are temporarily paused so you are not disturbed, while your NSQF certificates remain safely stored in your DigiLocker Credential Wallet.",
      hi: "सक्रिय प्लेसमेंट कॉल अस्थायी रूप से रोक दी जाती हैं ताकि आपको परेशानी न हो, जबकि आपके प्रमाणपत्र डिजिलॉकर में सुरक्षित रहते हैं।"
    },
    suggestedProof: {
      en: "College name or course admission slip (optional).",
      hi: "कॉलेज का नाम या प्रवेश पर्ची (वैकल्पिक)।"
    },
    accentColor: "blue"
  },
  Student: {
    id: "Student",
    badge: "Current Learner",
    title: {
      en: "Full-time Student",
      hi: "पूर्णकालिक छात्र"
    },
    meaning: {
      en: "You are currently enrolled in a formal educational institution.",
      hi: "आप वर्तमान में एक औपचारिक शैक्षणिक संस्थान में नामांकित हैं।"
    },
    whatHappensNext: {
      en: "We will track your graduation timeline to provide timely career guidance and placement opportunities.",
      hi: "हम आपको समय पर करियर मार्गदर्शन और प्लेसमेंट के अवसर प्रदान करने के लिए आपके स्नातक होने की समयरेखा को ट्रैक करेंगे।"
    },
    suggestedProof: {
      en: "Student ID Card or latest semester mark sheet.",
      hi: "छात्र आईडी कार्ड या नवीनतम सेमेस्टर मार्कशीट।"
    },
    accentColor: "indigo"
  },
  Intern: {
    id: "Intern",
    badge: "Early Exposure",
    title: {
      en: "Internship / Trainee",
      hi: "इंटर्नशिप / प्रशिक्षु"
    },
    meaning: {
      en: "You are gaining practical work experience in a professional setting for a limited duration.",
      hi: "आप एक सीमित अवधि के लिए पेशेवर सेटिंग में व्यावहारिक कार्य अनुभव प्राप्त कर रहे हैं।"
    },
    whatHappensNext: {
      en: "Internships often lead to pre-placement offers (PPO). We help you document this experience in your career journey.",
      hi: "इंटर्नशिप अक्सर प्री-प्लेसमेंट ऑफर (PPO) की ओर ले जाती है। हम आपकी करियर यात्रा में इस अनुभव को दस्तावेजीकरण करने में आपकी सहायता करते हैं।"
    },
    suggestedProof: {
      en: "Internship Offer Letter or Certificate.",
      hi: "इंटर्नशिप ऑफर लेटर या सर्टिफिकेट।"
    },
    accentColor: "cyan"
  },
  Upskilling: {
    id: "Upskilling",
    badge: "Skill Enhancement",
    title: {
      en: "Upskilling / Certifying",
      hi: "कौशल उन्नयन / प्रमाणन"
    },
    meaning: {
      en: "You are already working or studying but taking additional courses to upgrade your skills.",
      hi: "आप पहले से ही काम कर रहे हैं या पढ़ रहे हैं लेकिन अपने कौशल को उन्नत करने के लिए अतिरिक्त पाठ्यक्रम ले रहे हैं।"
    },
    whatHappensNext: {
      en: "Your profile is updated with the new skill set, making you eligible for higher-tier job roles and wage growth.",
      hi: "आपकी प्रोफ़ाइल नए कौशल सेट के साथ अपडेट की गई है, जो आपको उच्च-स्तरीय नौकरी भूमिकाओं और वेतन वृद्धि के लिए पात्र बनाती है।"
    },
    suggestedProof: {
      en: "Course enrollment receipt or micro-credential certificate.",
      hi: "पाठ्यक्रम नामांकन रसीद या माइक्रो-क्रेडेंशियल प्रमाणपत्र।"
    },
    accentColor: "rose"
  }
};

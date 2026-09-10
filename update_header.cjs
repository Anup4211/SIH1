const fs = require('fs');

let file = fs.readFileSync('src/components/shared/Header.jsx', 'utf8');

// Replace hook destruction
file = file.replace('const { language, toggleLanguage, t } = useLanguage();', 'const { language, setLanguage, t } = useLanguage();');

// Replace language button
const startMarker = '{/* Language Toggle Button (English ⇄ Hindi) */}';
const endMarker = '</button>';
const startIndex = file.indexOf(startMarker);
const endIndex = file.indexOf(endMarker, startIndex) + endMarker.length;

const replacement = `          {/* Language Selector (English / Hindi / Marathi) */}
          <div className="flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-700/80 shadow-inner">
            <button
              onClick={() => setLanguage("en")}
              className={\`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer \${
                language === "en" ? "bg-cyan-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }\`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={\`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer \${
                language === "hi" ? "bg-cyan-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }\`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage("mr")}
              className={\`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer \${
                language === "mr" ? "bg-cyan-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }\`}
            >
              मराठी
            </button>
          </div>`;

file = file.slice(0, startIndex) + replacement + file.slice(endIndex);
fs.writeFileSync('src/components/shared/Header.jsx', file, 'utf8');
console.log('Header successfully modified!');

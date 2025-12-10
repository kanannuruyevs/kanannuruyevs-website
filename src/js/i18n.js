document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    const mobileLanguageSwitcher = document.getElementById('mobile-language-switcher');

    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        languageSwitcher.value = lang;
        mobileLanguageSwitcher.value = lang;

        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    };

    languageSwitcher.addEventListener('change', (event) => {
        setLanguage(event.target.value);
    });

    mobileLanguageSwitcher.addEventListener('change', (event) => {
        setLanguage(event.target.value);
    });

    // Check for saved language or browser language
    const savedLang = localStorage.getItem('language');
    const browserLang = navigator.language.split('-')[0];

    if (savedLang && ['en', 'az', 'ru'].includes(savedLang)) {
        setLanguage(savedLang);
    } else if (['az', 'ru'].includes(browserLang)) {
        setLanguage(browserLang);
    } else {
        setLanguage('en'); // Default to English
    }
});

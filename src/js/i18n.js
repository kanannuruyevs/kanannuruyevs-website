document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    const mobileLanguageSwitcher = document.getElementById('mobile-language-switcher');

    window.setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        if (languageSwitcher) languageSwitcher.value = lang;
        if (mobileLanguageSwitcher) mobileLanguageSwitcher.value = lang;

        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
                element.setAttribute('placeholder', translations[lang][key]);
            }
        });

        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    };

    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', (event) => {
            window.setLanguage(event.target.value);
        });
    }

    if (mobileLanguageSwitcher) {
        mobileLanguageSwitcher.addEventListener('change', (event) => {
            window.setLanguage(event.target.value);
        });
    }

    // Check for saved language or browser language
    const savedLang = localStorage.getItem('language');
    const browserLang = navigator.language.split('-')[0];

    if (savedLang && ['en', 'az', 'ru'].includes(savedLang)) {
        window.setLanguage(savedLang);
    } else if (['az', 'ru'].includes(browserLang)) {
        window.setLanguage(browserLang);
    } else {
        window.setLanguage('en'); // Default to English
    }
});

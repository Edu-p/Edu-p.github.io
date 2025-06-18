/* eslint-disable @typescript-eslint/no-explicit-any */
import { createI18n } from 'vue-i18n';
import pt from './locale/pt.json' assert { type: "json" };
import en from './locale/en.json' assert { type: "json" };

const i18n = createI18n({
    legacy: false,
    locale: 'en-US',
    fallbackLocale: 'pt-BR',
    messages: {
        'en-US': en as any,
        'pt-BR': pt as any
    }
});

export default i18n;

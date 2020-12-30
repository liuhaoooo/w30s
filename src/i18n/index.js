import i18n from 'react-native-i18n';
import jp from './jp';
import zh from './zh';
i18n.defaultLocale = 'jp';
i18n.fallbacks = true;
i18n.translations = { zh, jp };
i18n.locale = 'zh'
export { i18n };
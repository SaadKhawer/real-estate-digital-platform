import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "properties": "Properties",
      "about": "About Us",
      "contact": "Contact",
      "login": "Log In",
      "signup": "Sign Up",
      "dashboard": "Dashboard",
      "logout": "Log Out",
      "find_dream_home": "Find Your Dream",
      "home_highlight": "Home",
      "hero_subtitle": "Discover the perfect property that fits your lifestyle. Premium real estate for sale and rent.",
      "search_placeholder": "Search by location...",
      "property_type": "Property Type",
      "search": "Search",
      "featured_properties": "Featured Properties",
      "view_all": "View All"
    }
  },
  ur: {
    translation: {
      "home": "ہوم",
      "properties": "پراپرٹیز",
      "about": "ہمارے بارے میں",
      "contact": "رابطہ کریں",
      "login": "لاگ ان کریں",
      "signup": "سائن اپ",
      "dashboard": "ڈیش بورڈ",
      "logout": "لاگ آؤٹ",
      "find_dream_home": "اپنا خوابوں کا",
      "home_highlight": "گھر تلاش کریں",
      "hero_subtitle": "ایسی پراپرٹی دریافت کریں جو آپ کے طرز زندگی کے مطابق ہو۔ خرید و فروخت کے لیے پریمیم رئیل اسٹیٹ۔",
      "search_placeholder": "مقام کے لحاظ سے تلاش کریں...",
      "property_type": "پراپرٹی کی قسم",
      "search": "تلاش کریں",
      "featured_properties": "نمایاں پراپرٹیز",
      "view_all": "سب دیکھیں"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

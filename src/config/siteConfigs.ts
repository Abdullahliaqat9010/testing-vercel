// Site Config =============================================================
export const config = {
  siteTitle: process.env.REACT_APP_SITE_TITLE,
  apiDomain: process.env.REACT_APP_API
};

// Google Maps Configs =====================================================
export const googleMapConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
};

export const userToken = sessionStorage.getItem('auth') || '';

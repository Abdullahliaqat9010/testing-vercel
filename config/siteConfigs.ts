// Site Config =============================================================
export const config = {
  siteTitle: process.env.SITE_TITLE,
  apiDomain: process.env.APP_API
};

// Google Maps Configs =====================================================
export const googleMapConfig = {
  apiKey: process.env.GOOGLE_MAP_API_KEY || '',
};

export const userToken = typeof window === 'object' && localStorage.getItem('auth');
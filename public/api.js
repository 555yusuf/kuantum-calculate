// KuantumCalculate Global API Servis Katmanı (api.js)

// API Base URL (Aynı origin üzerinden sunulduğu için relative path kullanıyoruz)
const API_BASE_URL = '';

// Axios Instance Oluşturma
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Axios Request Interceptor - Her istekte token ekleme (Bearer anahtar kelimesi OLMADAN)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kuantum_token');
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hata Yönetimi Fonksiyonu - SweetAlert2 Entegrasyonu
function handleError(err) {
  console.error('API Hatası:', err);
  let errMsg = 'Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.';
  
  if (err.response && err.response.data) {
    const data = err.response.data;
    if (typeof data === 'string') {
      errMsg = data;
    } else if (data.message) {
      errMsg = data.message;
    } else if (data.error) {
      errMsg = data.error;
    }
  } else if (err.message) {
    errMsg = err.message;
  }
  
  Swal.fire({
    icon: 'error',
    title: 'Hata oluştu!',
    text: errMsg,
    confirmButtonText: 'Tamam',
    confirmButtonColor: '#10b981', // Zümrüt Yeşili
    background: '#1d1d23',
    color: '#f3f4f6'
  });
}

// API İstek Fonksiyonları
const ApiService = {
  // Auth İstekleri
  register: async (userData) => {
    try {
      const response = await api.post('/api/users/register', userData);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/api/users/login', credentials);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await api.get('/api/users');
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  // Borsa Analiz İstekleri
  getPrices: async (payload) => {
    try {
      const response = await api.post('/api/company/prices', payload);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getLumpSum: async (payload) => {
    try {
      const response = await api.post('/api/company/amount', payload);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getMarketTiming: async (payload) => {
    try {
      const response = await api.post('/api/company/timing', payload);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getDca: async (payload) => {
    try {
      const response = await api.post('/api/company/dca', payload);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  deleteAccount: async (userId, credentials) => {
    try {
      const response = await api.post(`/api/users/user-delete/${userId}`, credentials);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
};
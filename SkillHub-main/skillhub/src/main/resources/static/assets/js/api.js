/**
 * SkillHub - Central API Client & Authentication Service
 * Communicates with Spring Boot REST Backend on port 8080
 */

const API_CONFIG = {
  get baseUrl() {
    if (window.location.protocol.startsWith('http')) {
      const custom = localStorage.getItem('skillhub_api_base');
      if (custom && !custom.includes(':8080') && custom !== window.location.origin) {
        return custom.replace(/\/+$/, '');
      }
      return '';
    }
    const custom = localStorage.getItem('skillhub_api_base');
    if (custom && !custom.includes(':8080')) return custom.replace(/\/+$/, '');
    return 'http://localhost:8081';
  },
  set baseUrl(url) {
    if (!url) {
      localStorage.removeItem('skillhub_api_base');
    } else {
      localStorage.setItem('skillhub_api_base', url.replace(/\/+$/, ''));
    }
  }
};

/**
 * Universal request wrapper
 */
async function request(endpoint, options = {}) {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  const adminToken = getAdminToken();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(adminToken ? { 'X-Admin-Token': adminToken } : {}),
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers
    });

    const contentType = res.headers.get('content-type') || '';
    let data;

    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      const errorMsg = (data && data.message) || (typeof data === 'string' && data) || `Request failed with status ${res.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, err);
    throw err;
  }
}

/**
 * Toast Notification Utility
 */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: 'bi-check-circle-fill text-success',
    danger: 'bi-exclamation-triangle-fill text-danger',
    warning: 'bi-exclamation-circle-fill text-warning',
    info: 'bi-info-circle-fill text-primary'
  };

  const toast = document.createElement('div');
  toast.className = 'toast-custom shadow-lg';
  toast.innerHTML = `
    <i class="bi ${icons[type] || icons.info} fs-4"></i>
    <div class="flex-grow-1 pe-2">
      <div class="small fw-semibold text-dark">${message}</div>
    </div>
    <button type="button" class="btn-close btn-close-sm" aria-label="Close"></button>
  `;

  toast.querySelector('.btn-close').addEventListener('click', () => toast.remove());

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Student Authentication & Session Management
 */
const AUTH_KEY = 'skillhub_current_user';

function getCurrentUser() {
  try {
    const userStr = localStorage.getItem(AUTH_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(AUTH_KEY);
  } else {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }
}

function clearCurrentUser() {
  localStorage.removeItem(AUTH_KEY);
}

function requireAuth(redirectPath = 'login.html') {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = redirectPath;
    return null;
  }
  return user;
}

/**
 * Administrator Authentication & Session Management
 */
const ADMIN_TOKEN_KEY = 'skillhub_admin_token';
const ADMIN_USER_KEY = 'skillhub_admin_user';

function getAdminToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

function getAdminUser() {
  try {
    const u = sessionStorage.getItem(ADMIN_USER_KEY);
    return u ? JSON.parse(u) : null;
  } catch (e) {
    return null;
  }
}

function setAdminSession(token, user) {
  if (!token) {
    clearAdminSession();
  } else {
    sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
    sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user || { username: 'admin' }));
  }
}

function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  sessionStorage.removeItem(ADMIN_USER_KEY);
}

function isAdminAuthenticated() {
  return Boolean(getAdminToken());
}

/**
 * API Service Modules
 */
const api = {
  students: {
    login: (email, password) => request('/students/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),
    register: (student) => request('/students/register', {
      method: 'POST',
      body: JSON.stringify(student)
    }),
    getAll: () => request('/students'),
    getById: (id) => request(`/students/${id}`),
    update: (id, student) => request(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(student)
    }),
    delete: (id) => request(`/students/${id}`, {
      method: 'DELETE'
    })
  },

  skills: {
    getAll: () => request('/skills'),
    getById: (id) => request(`/skills/${id}`),
    search: (name) => request(`/skills/search?name=${encodeURIComponent(name)}`),
    create: (skill) => request('/skills', {
      method: 'POST',
      body: JSON.stringify(skill)
    }),
    update: (id, skill) => request(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skill)
    }),
    delete: (id) => request(`/skills/${id}`, {
      method: 'DELETE'
    })
  },

  studentSkills: {
    getAll: () => request('/student-skills'),
    getByStudent: (studentId) => request(`/student-skills/student/${studentId}`),
    create: (studentSkill) => request('/student-skills', {
      method: 'POST',
      body: JSON.stringify(studentSkill)
    }),
    delete: (id) => request(`/student-skills/${id}`, {
      method: 'DELETE'
    })
  },

  requests: {
    create: (learningRequest) => request('/requests', {
      method: 'POST',
      body: JSON.stringify(learningRequest)
    }),
    getAll: () => request('/requests'),
    getLearnerRequests: (learnerId) => request(`/requests/learner/${learnerId}`),
    getMentorRequests: (mentorId) => request(`/requests/mentor/${mentorId}`),
    updateStatus: (id, status) => request(`/requests/${id}/status?status=${encodeURIComponent(status)}`, {
      method: 'PUT'
    }),
    delete: (id) => request(`/requests/${id}`, {
      method: 'DELETE'
    })
  },

  ratings: {
    create: (rating) => request('/ratings', {
      method: 'POST',
      body: JSON.stringify(rating)
    }),
    getAll: () => request('/ratings'),
    getByMentor: (mentorId) => request(`/ratings/mentor/${mentorId}`),
    delete: (id) => request(`/ratings/${id}`, {
      method: 'DELETE'
    })
  },

  admin: {
    login: (username, password) => request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),
    verify: () => request('/admin/verify'),
    getStudents: () => request('/admin/students'),
    deleteStudent: (id) => request(`/admin/students/${id}`, {
      method: 'DELETE'
    }),
    getSkills: () => request('/admin/skills'),
    createSkill: (skill) => request('/admin/skills', {
      method: 'POST',
      body: JSON.stringify(skill)
    }),
    deleteSkill: (id) => request(`/admin/skills/${id}`, {
      method: 'DELETE'
    }),
    getRequests: () => request('/admin/requests'),
    deleteRequest: (id) => request(`/admin/requests/${id}`, {
      method: 'DELETE'
    }),
    getRatings: () => request('/admin/ratings'),
    deleteRating: (id) => request(`/admin/ratings/${id}`, {
      method: 'DELETE'
    }),
    logout: () => {
      clearAdminSession();
    }
  },

  async checkHealth() {
    try {
      await request('/skills', { method: 'GET' });
      return true;
    } catch (e) {
      return false;
    }
  }
};

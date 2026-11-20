// API and WebSocket Utilities for 4Walls

export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://fourwalls-1.onrender.com');

// Resolve WebSocket URL from HTTP URL
export function getWsUrl() {
  const url = new URL(BACKEND_URL);
  const protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${url.host}`;
}

// Resolve media URL (handles relative static files, uploaded backend files, or external URLs)
export function resolveMediaUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  if (path.startsWith('/uploads/')) {
    return `${BACKEND_URL}${path}`;
  }
  return path;
}

// Token storage helpers
const TOKEN_KEY = '4walls_admin_token';
const USER_KEY = '4walls_admin_user';

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminAuth(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getAdminUser() {
  try {
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
  } catch (e) {
    return null;
  }
}

export function clearAdminAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// Generic Authenticated Fetch Wrapper
async function authFetch(endpoint, options = {}) {
  const token = getAdminToken();
  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // If body is not FormData, default to application/json
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public Fetch APIs
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchPropertiesApi() {
  const res = await fetch(`${BACKEND_URL}/api/properties`);
  if (!res.ok) throw new Error('Failed to fetch properties');
  return res.json();
}

export async function fetchBuildingPropertiesApi(building) {
  const res = await fetch(`${BACKEND_URL}/api/properties/${encodeURIComponent(building)}`);
  if (!res.ok) throw new Error(`Failed to fetch properties for ${building}`);
  return res.json();
}

export async function fetchInteriorApi() {
  const res = await fetch(`${BACKEND_URL}/api/interior`);
  if (!res.ok) throw new Error('Failed to fetch interior assets');
  return res.json();
}

export async function fetchBlogsApi() {
  const res = await fetch(`${BACKEND_URL}/api/blogs`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

export async function fetchCategoriesApi() {
  const res = await fetch(`${BACKEND_URL}/api/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchAboutApi() {
  const res = await fetch(`${BACKEND_URL}/api/about`);
  if (!res.ok) throw new Error('Failed to fetch about content');
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin Auth & Management APIs
// ─────────────────────────────────────────────────────────────────────────────

export async function loginAdminApi(email, password) {
  const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }
  setAdminAuth(data.token, data.user);
  return data;
}

export async function verifyAdminApi() {
  return authFetch('/api/admin/verify');
}

export async function fetchAdminStatsApi() {
  return authFetch('/api/admin/stats');
}

// Upload Media (Single file: image or video)
export async function uploadMediaApi(file) {
  const formData = new FormData();
  formData.append('file', file);
  return authFetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
}

// Upload Multiple Media
export async function uploadMultipleMediaApi(files) {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('files', file));
  return authFetch('/api/upload-multiple', {
    method: 'POST',
    body: formData,
  });
}

// Properties Management
export async function addBuildingApi(name) {
  return authFetch('/api/admin/buildings', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function deleteBuildingApi(name) {
  return authFetch(`/api/admin/buildings/${encodeURIComponent(name)}`, {
    method: 'DELETE',
  });
}

export async function addPropertyApi(propertyData) {
  return authFetch('/api/admin/properties', {
    method: 'POST',
    body: JSON.stringify(propertyData),
  });
}

export async function updatePropertyApi(building, id, propertyData) {
  return authFetch(`/api/admin/properties/${encodeURIComponent(building)}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(propertyData),
  });
}

export async function deletePropertyApi(building, id) {
  return authFetch(`/api/admin/properties/${encodeURIComponent(building)}/${id}`, {
    method: 'DELETE',
  });
}

// Interior Management
export async function addInteriorApi(itemData) {
  return authFetch('/api/admin/interior', {
    method: 'POST',
    body: JSON.stringify(itemData),
  });
}

export async function updateInteriorApi(id, itemData) {
  return authFetch(`/api/admin/interior/${id}`, {
    method: 'PUT',
    body: JSON.stringify(itemData),
  });
}

export async function deleteInteriorApi(id) {
  return authFetch(`/api/admin/interior/${id}`, {
    method: 'DELETE',
  });
}

// Blogs Management
export async function addBlogApi(blogData) {
  return authFetch('/api/admin/blogs', {
    method: 'POST',
    body: JSON.stringify(blogData),
  });
}

export async function updateBlogApi(id, blogData) {
  return authFetch(`/api/admin/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(blogData),
  });
}

export async function deleteBlogApi(id) {
  return authFetch(`/api/admin/blogs/${id}`, {
    method: 'DELETE',
  });
}

// Categories Management
export async function addCategoryApi(name) {
  return authFetch('/api/admin/categories', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function deleteCategoryApi(name) {
  return authFetch(`/api/admin/categories/${encodeURIComponent(name)}`, {
    method: 'DELETE',
  });
}

// About Us & Leadership Management
export async function updateAboutApi(aboutData) {
  return authFetch('/api/admin/about', {
    method: 'PUT',
    body: JSON.stringify(aboutData),
  });
}

// Leads Management
export async function fetchLeadsApi() {
  return authFetch('/api/admin/leads');
}

export async function updateLeadStatusApi(id, status) {
  return authFetch(`/api/admin/leads/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export async function deleteLeadApi(id) {
  return authFetch(`/api/admin/leads/${id}`, {
    method: 'DELETE',
  });
}

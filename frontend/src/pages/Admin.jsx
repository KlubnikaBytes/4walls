import React, { useState, useEffect, useCallback } from 'react';
import {
  getAdminToken,
  getAdminUser,
  loginAdminApi,
  clearAdminAuth,
  fetchPropertiesApi,
  fetchInteriorApi,
  fetchBlogsApi,
  fetchCategoriesApi,
  addCategoryApi,
  deleteCategoryApi,
  fetchLeadsApi,
  fetchAdminStatsApi,
  uploadMediaApi,
  addBuildingApi,
  deleteBuildingApi,
  addPropertyApi,
  updatePropertyApi,
  deletePropertyApi,
  addInteriorApi,
  updateInteriorApi,
  deleteInteriorApi,
  addBlogApi,
  updateBlogApi,
  deleteBlogApi,
  fetchAboutApi,
  updateAboutApi,
  updateLeadStatusApi,
  deleteLeadApi,
  resolveMediaUrl,
} from '../utils/api';
import { useWebSocket } from '../utils/useWebSocket';

export default function Admin() {
  const [token, setToken] = useState(getAdminToken());
  const [user, setUser] = useState(getAdminUser());

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('info@4walls.co.in');
  const [loginPassword, setLoginPassword] = useState('4walls');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState('properties'); // 'properties' | 'interior' | 'blogs' | 'about' | 'leads' | 'stats'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Data States
  const [propertiesData, setPropertiesData] = useState({ buildings: [], properties: {} });
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [interiorItems, setInteriorItems] = useState([]);
  const [blogsList, setBlogsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([
    'Leasing',
    'Legal & GST',
    'Market Reports',
    'Interior',
    'Investment'
  ]);
  const [leadsList, setLeadsList] = useState([]);
  const [aboutData, setAboutData] = useState({ heading: '', p1: '', p2: '', leaders: [] });
  const [statsData, setStatsData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  // Modals & Form States
  const [propertyModal, setPropertyModal] = useState({ open: false, isEdit: false, data: null });
  const [buildingModal, setBuildingModal] = useState({ open: false, name: '' });
  const [interiorModal, setInteriorModal] = useState({ open: false, isEdit: false, data: null });
  const [blogModal, setBlogModal] = useState({ open: false, isEdit: false, data: null });
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCatInModal, setSelectedCatInModal] = useState('Leasing');

  // Uploading state
  const [uploading, setUploading] = useState(false);

  // Live WebSocket Logs
  const [wsLogs, setWsLogs] = useState([]);

  // Scroll To Top Utility
  const scrollToTop = useCallback((smooth = false) => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      const mainWrap = document.querySelector('.admin-main-wrap');
      if (mainWrap) mainWrap.scrollTop = 0;
    } catch {
      window.scrollTo(0, 0);
    }
  }, []);

  // Listen to window scroll to show/hide floating back to top button
  useEffect(() => {
    const handleWindowScroll = () => {
      setShowScrollTop(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // Auto-scroll to top immediately whenever activeTab or selectedBuilding changes
  useEffect(() => {
    scrollToTop(false);
  }, [activeTab, selectedBuilding, scrollToTop]);

  const handleTabSwitch = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    scrollToTop(false);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // WebSocket Event Handler
  const handleWsMessage = useCallback((msg) => {
    const timestamp = new Date().toLocaleTimeString();
    if (msg.type === 'PROPERTIES_UPDATED') {
      setPropertiesData(msg.payload);
      setWsLogs((prev) => [`[${timestamp}] 🏢 Properties updated in real-time`, ...prev.slice(0, 15)]);
      showToast('Properties updated live via WebSocket!', 'info');
    } else if (msg.type === 'INTERIOR_UPDATED') {
      setInteriorItems(msg.payload);
      setWsLogs((prev) => [`[${timestamp}] 🎨 Interior gallery updated in real-time`, ...prev.slice(0, 15)]);
      showToast('Interior gallery updated live via WebSocket!', 'info');
    } else if (msg.type === 'BLOGS_UPDATED') {
      setBlogsList(msg.payload);
      setWsLogs((prev) => [`[${timestamp}] 📚 Blogs updated in real-time`, ...prev.slice(0, 15)]);
      showToast('Blogs updated live via WebSocket!', 'info');
    } else if (msg.type === 'CATEGORIES_UPDATED') {
      if (Array.isArray(msg.payload) && msg.payload.length > 0) {
        setCategoriesList(msg.payload);
        setWsLogs((prev) => [`[${timestamp}] 🏷️ Categories updated in real-time`, ...prev.slice(0, 15)]);
        showToast('Categories updated live via WebSocket!', 'info');
      }
    } else if (msg.type === 'ABOUT_UPDATED') {
      setAboutData(msg.payload);
      setWsLogs((prev) => [`[${timestamp}] 👥 About & Leadership updated in real-time`, ...prev.slice(0, 15)]);
      showToast('About Us section updated live via WebSocket!', 'info');
    } else if (msg.type === 'NEW_LEAD') {
      setLeadsList((prev) => [msg.payload, ...prev]);
      setWsLogs((prev) => [`[${timestamp}] 📬 New Lead received: ${msg.payload.name || 'Client'}`, ...prev.slice(0, 15)]);
      showToast(`New consultation inquiry from ${msg.payload.name || 'a client'}!`, 'info');
    } else if (msg.type === 'LEAD_STATUS_CHANGED') {
      setLeadsList((prev) =>
        prev.map((l) => (l.id === msg.payload.id ? { ...l, status: msg.payload.status } : l))
      );
    }
  }, []);

  const { isConnected } = useWebSocket(handleWsMessage);

  // Load all data
  const loadAllData = useCallback(async () => {
    if (!token) return;
    setLoadingData(true);
    try {
      const [propRes, intRes, blogRes, catRes, leadRes, aboutRes, statRes] = await Promise.all([
        fetchPropertiesApi().catch(() => ({ data: { buildings: [], properties: {} } })),
        fetchInteriorApi().catch(() => ({ data: [] })),
        fetchBlogsApi().catch(() => ({ data: [] })),
        fetchCategoriesApi().catch(() => ({ data: [] })),
        fetchLeadsApi().catch(() => ({ data: [] })),
        fetchAboutApi().catch(() => ({ data: { heading: '', p1: '', p2: '', leaders: [] } })),
        fetchAdminStatsApi().catch(() => ({ stats: null })),
      ]);

      if (propRes.data) {
        setPropertiesData(propRes.data);
        if (!selectedBuilding && propRes.data.buildings?.length) {
          setSelectedBuilding(propRes.data.buildings[0]);
        }
      }
      if (intRes.data) setInteriorItems(intRes.data);
      if (blogRes.data) setBlogsList(blogRes.data);
      if (catRes.data && Array.isArray(catRes.data) && catRes.data.length > 0) {
        setCategoriesList(catRes.data);
      }
      if (leadRes.data) setLeadsList(leadRes.data);
      if (aboutRes.data) setAboutData(aboutRes.data);
      if (statRes.stats) setStatsData(statRes.stats);
    } catch (err) {
      console.error('Error loading admin data:', err);
      showToast('Failed to load some data. Check backend connection.', 'error');
    } finally {
      setLoadingData(false);
    }
  }, [token, selectedBuilding]);

  useEffect(() => {
    if (token) {
      loadAllData();
    }
  }, [token, loadAllData]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await loginAdminApi(loginEmail, loginPassword);
      setToken(res.token);
      setUser(res.user);
      showToast('Logged in successfully!');
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminAuth();
    setToken(null);
    setUser(null);
    showToast('Logged out of Admin Portal.');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // PROPERTIES & BUILDINGS HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────

  const handleAddBuilding = async (e) => {
    e.preventDefault();
    if (!buildingModal.name.trim()) return;
    try {
      const res = await addBuildingApi(buildingModal.name.trim());
      setPropertiesData(res.data);
      setSelectedBuilding(buildingModal.name.trim());
      setBuildingModal({ open: false, name: '' });
      showToast(`Building "${buildingModal.name.trim()}" added successfully!`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteBuilding = async (bldg) => {
    if (!window.confirm(`Are you sure you want to delete building "${bldg}" and all its properties?`)) return;
    try {
      const res = await deleteBuildingApi(bldg);
      setPropertiesData(res.data);
      const remaining = res.data.buildings || [];
      setSelectedBuilding(remaining[0] || '');
      showToast(`Building "${bldg}" removed.`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleSaveProperty = async (e) => {
    e.preventDefault();
    const form = e.target;
    const propData = {
      building: selectedBuilding,
      name: form.propName.value,
      folder: form.propFolder.value,
      size: form.propSize.value,
      workstation: form.propWorkstation.value,
      cabin: form.propCabin.value,
      conferenceRoom: form.propConference.value,
      reception: form.propReception.value,
      pantry: form.propPantry.value,
      carParking: form.propParking.value,
      rent: form.propRent.value,
      images: propertyModal.data?.images || ['1.jpg'],
    };

    try {
      if (propertyModal.isEdit) {
        const res = await updatePropertyApi(selectedBuilding, propertyModal.data.id, propData);
        setPropertiesData(res.data);
        showToast('Property updated successfully!');
      } else {
        const res = await addPropertyApi(propData);
        setPropertiesData(res.data);
        showToast('New property created successfully!');
      }
      setPropertyModal({ open: false, isEdit: false, data: null });
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property unit?')) return;
    try {
      const res = await deletePropertyApi(selectedBuilding, id);
      setPropertiesData(res.data);
      showToast('Property deleted.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleUploadPropertyImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadMediaApi(file);
      const currentImages = propertyModal.data?.images || [];
      setPropertyModal((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          images: [...currentImages, res.url],
        },
      }));
      showToast('Photo uploaded and added to property!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleAddManualImage = (val) => {
    if (!val || !val.trim()) return;
    const currentImages = propertyModal.data?.images || [];
    setPropertyModal((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        images: [...currentImages, val.trim()],
      },
    }));
  };

  const handleRemovePropertyImage = (idx) => {
    const currentImages = propertyModal.data?.images || [];
    setPropertyModal((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        images: currentImages.filter((_, i) => i !== idx),
      },
    }));
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // INTERIOR DESIGN HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────

  const handleSaveInterior = async (e) => {
    e.preventDefault();
    const form = e.target;
    const itemData = {
      path: form.assetPath.value,
      type: form.assetType.value,
      title: form.assetTitle.value,
    };

    try {
      if (interiorModal.isEdit) {
        const res = await updateInteriorApi(interiorModal.data.id, itemData);
        setInteriorItems(res.data);
        showToast('Interior item updated!');
      } else {
        const res = await addInteriorApi(itemData);
        setInteriorItems(res.data);
        showToast('New interior design asset added!');
      }
      setInteriorModal({ open: false, isEdit: false, data: null });
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteInterior = async (id) => {
    if (!window.confirm('Delete this interior item?')) return;
    try {
      const res = await deleteInteriorApi(id);
      setInteriorItems(res.data);
      showToast('Interior item deleted.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleUploadInteriorFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadMediaApi(file);
      const isVideo = file.type.includes('video') || file.name.endsWith('.mp4');
      setInteriorModal((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          path: res.url,
          type: isVideo ? 'video' : 'image',
          title: prev.data?.title || file.name.replace(/\.[^/.]+$/, ''),
        },
      }));
      showToast('File uploaded successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOGS / KNOWLEDGE CENTRE HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────

  const handleCreateCategory = async (catName) => {
    const trimmed = String(catName || '').trim();
    if (!trimmed) {
      showToast('Please enter a category name.', 'error');
      return;
    }
    try {
      const res = await addCategoryApi(trimmed);
      if (res.data) setCategoriesList(res.data);
      setSelectedCatInModal(trimmed);
      setIsAddingCategory(false);
      setNewCategoryName('');
      showToast(`Category "${trimmed}" added!`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteCategory = async (catName) => {
    if (!window.confirm(`Remove category "${catName}"?`)) return;
    try {
      const res = await deleteCategoryApi(catName);
      if (res.data) setCategoriesList(res.data);
      if (selectedCatInModal === catName) {
        setSelectedCatInModal(res.data?.[0] || 'Leasing');
      }
      showToast(`Category "${catName}" removed.`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    const form = e.target;
    let finalCat = selectedCatInModal;

    if (isAddingCategory && newCategoryName.trim()) {
      finalCat = newCategoryName.trim();
      try {
        const catRes = await addCategoryApi(finalCat);
        if (catRes.data) setCategoriesList(catRes.data);
      } catch (err) {
        // proceed
      }
    } else if (form.blogCat?.value && form.blogCat.value !== '__NEW__') {
      finalCat = form.blogCat.value;
    }

    const blogData = {
      title: form.blogTitle.value,
      cat: finalCat || 'Leasing',
      author: form.blogAuthor.value,
      readTime: form.blogReadTime.value,
      img: blogModal.data?.img || form.blogImg.value,
      excerpt: form.blogExcerpt.value,
      content: form.blogContent.value,
    };

    try {
      if (blogModal.isEdit) {
        const res = await updateBlogApi(blogModal.data.id, blogData);
        setBlogsList(res.data);
        showToast('Blog article updated!');
      } else {
        const res = await addBlogApi(blogData);
        setBlogsList(res.data);
        showToast('New article published in Knowledge Centre!');
      }
      setBlogModal({ open: false, isEdit: false, data: null });
      setIsAddingCategory(false);
      setNewCategoryName('');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      const res = await deleteBlogApi(id);
      setBlogsList(res.data);
      showToast('Blog article deleted.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleUploadBlogCover = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadMediaApi(file);
      setBlogModal((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          img: res.url,
        },
      }));
      showToast('Cover photo uploaded!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // ABOUT US & LEADERSHIP HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────

  const handleUploadLeaderPhoto = async (leaderId, file) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadMediaApi(file);
      setAboutData((prev) => ({
        ...prev,
        leaders: prev.leaders.map((l) => (l.id === leaderId ? { ...l, image: res.url } : l)),
      }));
      showToast('Leader photo uploaded! Click "Save About Changes" to apply.');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveAbout = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await updateAboutApi(aboutData);
      setAboutData(res.data);
      showToast('About Us & Leadership section updated successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleAddLeader = () => {
    const newLeader = {
      id: Date.now(),
      name: 'New Leader',
      role: 'Director | 4Walls Property Solutions',
      image: '/team/nitin.jpg',
      bio: 'Commercial real estate specialist with extensive leadership experience.',
    };
    setAboutData((prev) => ({
      ...prev,
      leaders: [...(prev.leaders || []), newLeader],
    }));
    showToast('New leader card added! Update details and save.');
  };

  const handleDeleteLeader = (leaderId) => {
    if (!window.confirm('Remove this leader profile?')) return;
    setAboutData((prev) => ({
      ...prev,
      leaders: prev.leaders.filter((l) => l.id !== leaderId),
    }));
    showToast('Leader removed. Remember to click "Save About Changes".');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // LEADS HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────

  const handleUpdateLeadStatus = async (id, status) => {
    try {
      await updateLeadStatusApi(id, status);
      setLeadsList((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      showToast(`Lead status updated to ${status}.`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Delete this lead entry?')) return;
    try {
      await deleteLeadApi(id);
      setLeadsList((prev) => prev.filter((l) => l.id !== id));
      showToast('Lead entry removed.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: UNAUTHENTICATED LOGIN VIEW
  // ─────────────────────────────────────────────────────────────────────────────

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '440px', width: '100%', background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '16px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '100px', background: 'rgba(31, 149, 164, 0.1)', color: 'var(--brass)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Management Portal
            </div>
            <h1 style={{ fontFamily: 'Fraunces', fontSize: '32px', margin: '0 0 8px', color: 'var(--ink)' }}>4Walls Admin</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: 0 }}>Sign in to manage commercial spaces, interiors, and blogs.</p>
          </div>

          {loginError && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>Admin ID (Email)</label>
              <input
                type="email"
                required
                autoComplete="username"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--paper)', fontSize: '14px' }}
                placeholder="info@4walls.co.in"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--paper)', fontSize: '14px' }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="btn-brass"
              style={{ width: '100%', padding: '14px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 600, marginTop: '8px' }}
            >
              {loginLoading ? 'Authenticating...' : 'Sign In to Control Center'}
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Configured Credentials: <strong>info@4walls.co.in</strong> / <strong>4walls</strong></span>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: AUTHENTICATED DASHBOARD
  // ─────────────────────────────────────────────────────────────────────────────

  const currentBuildingProperties = propertiesData.properties[selectedBuilding] || [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', color: 'var(--ink)' }}>
      <style>{`
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }
        .admin-sidebar {
          width: 270px;
          background: #0F172A;
          color: #E2E8F0;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 100;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .admin-main-wrap {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #F8FAFC;
        }
        .nav-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: 10px;
          border: none;
          font-size: 13.5px;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
          border-left: 3px solid transparent;
        }
        .mobile-nav-toggle {
          display: none;
        }
        .mobile-overlay {
          display: none;
        }
        @media (max-width: 960px) {
          .mobile-nav-toggle {
            display: inline-flex !important;
          }
          .admin-sidebar {
            position: fixed !important;
            left: 0;
            top: 0;
            bottom: 0;
            transform: translateX(-100%);
            box-shadow: 10px 0 30px rgba(0,0,0,0.4);
          }
          .admin-sidebar.open {
            transform: translateX(0) !important;
          }
          .mobile-overlay.open {
            display: block !important;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(4px);
            z-index: 99;
          }
        }
      `}</style>

      {/* Toast Alert */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: showScrollTop ? '80px' : '24px', right: '24px', zIndex: 99999,
          background: toast.type === 'error' ? '#EF4444' : toast.type === 'info' ? '#1F95A4' : '#10B981',
          color: '#fff', padding: '12px 20px', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => scrollToTop(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99990,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '30px',
            background: 'linear-gradient(135deg, #0F172A, #1E293B)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.25)',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(15, 23, 42, 0.35)';
            e.currentTarget.style.background = '#1F95A4';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.25)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #0F172A, #1E293B)';
          }}
          title="Scroll to Top"
        >
          <span style={{ fontSize: '15px', fontWeight: 800 }}>↑</span>
          <span>Top</span>
        </button>
      )}

      {/* Mobile Drawer Overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)} 
      />

      {/* ── LUXURY MODERN LEFT SIDEBAR ─────────────────────────────────────── */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #1F95A4, #0E6570)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '15px', letterSpacing: '0.05em', boxShadow: '0 4px 12px rgba(31,149,164,0.35)' }}>
                4W
              </div>
              <div>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', margin: 0, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>4Walls</h2>
                <span style={{ fontSize: '10px', color: '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>CMS Control Center</span>
              </div>
            </div>
            {/* Close button for mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="mobile-nav-toggle"
              style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontSize: '20px', cursor: 'pointer' }}
            >✕</button>
          </div>

          {/* WebSocket Status Indicator Pill */}
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '20px', background: isConnected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)', border: `1px solid ${isConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}` }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isConnected ? '#10B981' : '#F59E0B', display: 'inline-block', animation: isConnected ? 'pulseDot 2s infinite' : 'none' }}></span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: isConnected ? '#34D399' : '#FBBF24', letterSpacing: '0.02em' }}>
              {isConnected ? 'Real-Time Sync Active' : 'Connecting to Server...'}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{ flex: 1, padding: '20px 14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 10px 8px' }}>
            Content Management
          </div>

          {[
            { id: 'properties', label: 'Properties & Buildings', icon: '🏢', count: currentBuildingProperties.length },
            { id: 'interior', label: 'Interior Showcase', icon: '🎨', count: interiorItems.length },
            { id: 'blogs', label: 'Knowledge Centre', icon: '📚', count: blogsList.length },
            { id: 'about', label: 'About Us & Leaders', icon: '👥', count: aboutData.leaders?.length },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabSwitch(item.id)}
                className="nav-btn"
                style={{
                  background: isActive ? 'linear-gradient(135deg, rgba(31, 149, 164, 0.3), rgba(31, 149, 164, 0.15))' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  fontWeight: isActive ? 600 : 500,
                  borderLeft: isActive ? '3px solid #1F95A4' : '3px solid transparent',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '17px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: isActive ? '#1F95A4' : 'rgba(255,255,255,0.08)',
                    color: isActive ? '#FFFFFF' : '#94A3B8'
                  }}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '16px 10px 8px' }}>
            System & Leads
          </div>

          {[
            { id: 'leads', label: 'Client Inquiries', icon: '📬', count: leadsList.length, isNew: leadsList.some(l => l.status === 'New') },
            { id: 'stats', label: 'System Overview & Logs', icon: '📊' },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabSwitch(item.id)}
                className="nav-btn"
                style={{
                  background: isActive ? 'linear-gradient(135deg, rgba(31, 149, 164, 0.3), rgba(31, 149, 164, 0.15))' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  fontWeight: isActive ? 600 : 500,
                  borderLeft: isActive ? '3px solid #1F95A4' : '3px solid transparent',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '17px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: item.isNew ? '#EF4444' : isActive ? '#1F95A4' : 'rgba(255,255,255,0.08)',
                    color: '#FFFFFF'
                  }}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer User Info */}
        <div style={{ padding: '16px 14px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #334155, #1E293B)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#38BDF8' }}>
              AD
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email || 'info@4walls.co.in'}
              </div>
              <div style={{ fontSize: '10px', color: '#10B981', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Super Administrator
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <a 
              href="/" 
              target="_blank" 
              rel="noreferrer" 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '7px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: '#CBD5E1', fontSize: '11px', textDecoration: 'none', fontWeight: 500, textAlign: 'center' }}
            >
              Public Site ↗
            </a>
            <button 
              onClick={handleLogout}
              style={{ padding: '7px 8px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.1)', color: '#FCA5A5', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
            >
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT WRAPPER ─────────────────────────────────────────── */}
      <div className="admin-main-wrap">
        {/* Modern Sticky Top Header */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #E2E8F0',
          padding: '14px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Hamburger button for mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="mobile-nav-toggle"
              style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '18px', color: '#334155' }}
            >
              ☰
            </button>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                4Walls Management / {activeTab === 'properties' ? 'Properties' : activeTab === 'interior' ? 'Interior' : activeTab === 'blogs' ? 'Blogs' : activeTab === 'about' ? 'About Us' : activeTab === 'leads' ? 'Inquiries' : 'System'}
              </div>
              <h1 style={{ fontSize: '19px', fontWeight: 700, margin: '2px 0 0', color: '#0F172A', lineHeight: 1.2 }}>
                {activeTab === 'properties' && '🏢 Buildings & Commercial Units'}
                {activeTab === 'interior' && '🎨 Interior Design Portfolio'}
                {activeTab === 'blogs' && '📚 Knowledge Centre (Articles)'}
                {activeTab === 'about' && '👥 About Us & Leadership Team'}
                {activeTab === 'leads' && '📬 Client Inquiries & Leads'}
                {activeTab === 'stats' && '📊 System Overview & Live WebSocket Monitor'}
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', background: '#F1F5F9', padding: '5px 12px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              Connected as <strong>{user?.email || 'Admin'}</strong>
            </span>
          </div>
        </header>

        {/* Content Body Container */}
        <div style={{ flex: 1, padding: '32px 32px 64px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* TAB 1: PROPERTIES & BUILDINGS */}
          {/* ─────────────────────────────────────────────────────────────────── */}
        {activeTab === 'properties' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              {/* Building Selector Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-soft)' }}>Select Building:</span>
                {(propertiesData.buildings || []).map((bldg) => (
                  <button
                    key={bldg}
                    onClick={() => setSelectedBuilding(bldg)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: selectedBuilding === bldg ? '2px solid var(--brass)' : '1px solid var(--line)',
                      background: selectedBuilding === bldg ? 'var(--brass)' : 'var(--white)',
                      color: selectedBuilding === bldg ? '#fff' : 'var(--ink)',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    {bldg} ({(propertiesData.properties[bldg] || []).length})
                  </button>
                ))}
                <button
                  onClick={() => setBuildingModal({ open: true, name: '' })}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1px dashed var(--brass)', background: 'transparent', color: 'var(--brass)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  + Add New Building
                </button>
                {selectedBuilding && !['Mani Casadona', 'Ecospace'].includes(selectedBuilding) && (
                  <button
                    onClick={() => handleDeleteBuilding(selectedBuilding)}
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #EF4444', background: '#FEE2E2', color: '#B91C1C', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Delete {selectedBuilding}
                  </button>
                )}
              </div>

              {/* Add Property Button */}
              <button
                onClick={() =>
                  setPropertyModal({
                    open: true,
                    isEdit: false,
                    data: {
                      name: 'Office Space',
                      folder: `${selectedBuilding.toLowerCase().replace(/\s+/g, '')}-unit`,
                      size: '1200 sq.ft',
                      workstation: 16,
                      cabin: 2,
                      conferenceRoom: 1,
                      reception: 'Yes',
                      pantry: 'Yes',
                      carParking: 1,
                      rent: '65 K onwards',
                      images: ['1.jpg'],
                    },
                  })
                }
                className="btn-brass"
                style={{ padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
              >
                + Add Property to {selectedBuilding || 'Building'}
              </button>
            </div>

            {/* Properties Table / Grid */}
            {currentBuildingProperties.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--line)' }}>
                <p style={{ color: 'var(--ink-soft)', fontSize: '16px' }}>No property units found in {selectedBuilding}. Click "+ Add Property" to create one.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
                {currentBuildingProperties.map((prop) => {
                  const firstImg = prop.images?.[0] || '1.jpg';
                  const imgSrc = firstImg.startsWith('/') || firstImg.startsWith('http')
                    ? resolveMediaUrl(firstImg)
                    : selectedBuilding === 'Ecospace'
                    ? `/ecospace/${prop.folder}/${firstImg}`
                    : `/manicasadona/${prop.folder}/${firstImg}`;

                  return (
                    <div key={prop.id} style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ height: '180px', position: 'relative', background: '#E2E8F0' }}>
                        {firstImg.endsWith('.mp4') ? (
                          <video src={imgSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted autoPlay loop />
                        ) : (
                          <img
                            src={imgSrc}
                            alt={prop.name}
                            onError={(e) => { e.target.src = '/hero.png'; }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        )}
                        <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '11px', padding: '4px 8px', borderRadius: '4px' }}>
                          {prop.images?.length || 1} Media
                        </span>
                        <span style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'var(--brass)', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '4px 8px', borderRadius: '4px' }}>
                          {prop.size}
                        </span>
                      </div>

                      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                            <h3 style={{ fontSize: '18px', margin: 0 }}>{prop.name}</h3>
                            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--brass)' }}>{prop.rent}</span>
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '16px' }}>Folder / Ref: <code>{prop.folder || 'N/A'}</code></div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '13px', color: 'var(--ink)' }}>
                            <div>💻 {prop.workstation} Workstations</div>
                            <div>🚪 {prop.cabin} Cabins</div>
                            <div>🎙️ {prop.conferenceRoom ? `${prop.conferenceRoom} Conf. Room` : 'No Conf.'}</div>
                            <div>🚗 {prop.carParking} Parking</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                          <button
                            onClick={() => setPropertyModal({ open: true, isEdit: true, data: { ...prop } })}
                            style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--paper)', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                          >
                            ✏️ Edit Unit
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(prop.id)}
                            style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEE2E2', color: '#991B1B', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* TAB 2: INTERIOR DESIGNING */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {activeTab === 'interior' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '22px', margin: '0 0 4px' }}>Interior Design Showcase Assets</h2>
                <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: '14px' }}>Manage architectural portfolio photos and video walkthroughs displayed on <code>/interior</code>.</p>
              </div>
              <button
                onClick={() =>
                  setInteriorModal({
                    open: true,
                    isEdit: false,
                    data: { path: '', type: 'image', title: 'Modern Commercial Workspace' },
                  })
                }
                className="btn-brass"
                style={{ padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
              >
                + Add Media to Interior Showcase
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {interiorItems.map((item) => (
                <div key={item.id} style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ height: '180px', position: 'relative', background: '#E2E8F0' }}>
                    {item.type === 'video' || item.path.endsWith('.mp4') ? (
                      <video src={resolveMediaUrl(item.path)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted autoPlay loop />
                    ) : (
                      <img
                        src={resolveMediaUrl(item.path)}
                        alt={item.title}
                        onError={(e) => { e.target.src = '/hero.png'; }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                    <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                      {item.type}
                    </span>
                  </div>

                  <div style={{ padding: '16px' }}>
                    <h4 style={{ margin: '0 0 8px', fontSize: '15px' }}>{item.title}</h4>
                    <p style={{ margin: '0 0 16px', fontSize: '11px', color: 'var(--ink-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.path}
                    </p>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setInteriorModal({ open: true, isEdit: true, data: { ...item } })}
                        style={{ flex: 1, padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--paper)', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteInterior(item.id)}
                        style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEE2E2', color: '#991B1B', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* TAB 3: KNOWLEDGE CENTRE & BLOGS */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {activeTab === 'blogs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '22px', margin: '0 0 4px' }}>Knowledge Centre Advisory Articles</h2>
                <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: '14px' }}>Publish guides, GST updates, and leasing reports displayed on <code>/knowledge</code>.</p>
              </div>
              <button
                onClick={() => {
                  setSelectedCatInModal(categoriesList[0] || 'Leasing');
                  setIsAddingCategory(false);
                  setNewCategoryName('');
                  setBlogModal({
                    open: true,
                    isEdit: false,
                    data: {
                      title: '',
                      cat: categoriesList[0] || 'Leasing',
                      author: '4Walls Team',
                      readTime: '5 min read',
                      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=400&q=80',
                      excerpt: '',
                      content: '',
                    },
                  });
                }}
                className="btn-brass"
                style={{ padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
              >
                + Write New Article
              </button>
            </div>

            {/* Active Categories Strip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', padding: '14px 18px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--line)' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>🏷️ Active Categories ({categoriesList.length}):</span>
              {categoriesList.map((cat) => (
                <span
                  key={cat}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    background: 'rgba(31, 149, 164, 0.1)',
                    color: 'var(--brass)',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {cat}
                  {!['Leasing', 'Legal & GST', 'Market Reports', 'Interior', 'Investment'].includes(cat) && (
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat)}
                      title={`Remove "${cat}"`}
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: 0, fontSize: '13px', fontWeight: 700, lineHeight: 1 }}
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
              <button
                type="button"
                onClick={() => {
                  const name = window.prompt('Enter new category name:');
                  if (name && name.trim()) handleCreateCategory(name.trim());
                }}
                style={{ padding: '5px 14px', borderRadius: '20px', border: '1px dashed var(--brass)', background: 'transparent', color: 'var(--brass)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
              >
                + Add Category
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
              {blogsList.map((blog) => (
                <div key={blog.id} style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '180px', position: 'relative', background: '#E2E8F0' }}>
                    <img src={resolveMediaUrl(blog.img)} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--brass)', color: '#fff', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '4px' }}>
                      {blog.cat}
                    </span>
                  </div>

                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '8px' }}>
                        By {blog.author || '4Walls'} • {blog.date} • {blog.readTime}
                      </div>
                      <h3 style={{ fontSize: '17px', margin: '0 0 10px', lineHeight: 1.3 }}>{blog.title}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.5, margin: '0 0 16px' }}>
                        {blog.excerpt || blog.content?.slice(0, 120) + '...'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                      <button
                        onClick={() => {
                          setSelectedCatInModal(blog.cat || 'Leasing');
                          setIsAddingCategory(false);
                          setNewCategoryName('');
                          setBlogModal({ open: true, isEdit: true, data: { ...blog } });
                        }}
                        style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--paper)', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                      >
                        ✏️ Edit Article
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEE2E2', color: '#991B1B', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* TAB 4: ABOUT US & LEADERSHIP */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {activeTab === 'about' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '22px', margin: '0 0 4px' }}>About Us & Leadership Team</h2>
                <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: '14px' }}>
                  Manage the company vision text and upload custom leadership photos displayed on <code>/about</code>.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={handleAddLeader}
                  style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid var(--brass)', background: 'transparent', color: 'var(--brass)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  + Add Leader Card
                </button>
                <button
                  type="button"
                  onClick={handleSaveAbout}
                  className="btn-brass"
                  style={{ padding: '10px 24px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
                >
                  💾 Save All Changes
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveAbout}>
              {/* Company Story & Vision Card */}
              <div style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', marginBottom: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '17px', margin: '0 0 16px', color: 'var(--ink)' }}>Company Overview Text</h3>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>Main Section Headline</label>
                  <input
                    type="text"
                    value={aboutData.heading || ''}
                    onChange={(e) => setAboutData((prev) => ({ ...prev, heading: e.target.value }))}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--paper)', fontSize: '14px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>Story Paragraph 1</label>
                    <textarea
                      rows="4"
                      value={aboutData.p1 || ''}
                      onChange={(e) => setAboutData((prev) => ({ ...prev, p1: e.target.value }))}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--paper)', fontSize: '13px', lineHeight: 1.5 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>Story Paragraph 2</label>
                    <textarea
                      rows="4"
                      value={aboutData.p2 || ''}
                      onChange={(e) => setAboutData((prev) => ({ ...prev, p2: e.target.value }))}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--paper)', fontSize: '13px', lineHeight: 1.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Leaders Cards Grid */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', margin: '0 0 16px', color: 'var(--ink)' }}>
                  Leadership Profiles & Photos ({aboutData.leaders?.length || 0})
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
                  {(aboutData.leaders || []).map((leader, index) => (
                    <div key={leader.id || index} style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {/* Photo Preview and Upload Controls */}
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                        <div style={{ width: '130px', height: '170px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--line)', background: '#E2E8F0', flexShrink: 0 }}>
                          <img
                            src={resolveMediaUrl(leader.image)}
                            alt={leader.name}
                            onError={(e) => { e.target.src = '/hero.png'; }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--brass)' }}>Leader Photo</span>
                          
                          {/* Device File Upload Button */}
                          <label style={{ display: 'inline-block', padding: '8px 14px', borderRadius: '6px', background: 'var(--ink)', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: uploading ? 'not-allowed' : 'pointer', textAlign: 'center', width: 'fit-content' }}>
                            {uploading ? 'Uploading...' : '📁 Upload New Photo'}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleUploadLeaderPhoto(leader.id, file);
                                e.target.value = '';
                              }}
                              disabled={uploading}
                              style={{ display: 'none' }}
                            />
                          </label>

                          <div>
                            <span style={{ fontSize: '11px', color: 'var(--ink-soft)', display: 'block', marginBottom: '4px' }}>Or Image Path / URL:</span>
                            <input
                              type="text"
                              value={leader.image || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setAboutData((prev) => ({
                                  ...prev,
                                  leaders: prev.leaders.map((l) => (l.id === leader.id ? { ...l, image: val } : l)),
                                }));
                              }}
                              placeholder="/team/nitin.jpg or https://..."
                              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '12px' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Name & Role Inputs */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Full Name</label>
                          <input
                            type="text"
                            value={leader.name || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAboutData((prev) => ({
                                ...prev,
                                leaders: prev.leaders.map((l) => (l.id === leader.id ? { ...l, name: val } : l)),
                              }));
                            }}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '13px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Designation / Title</label>
                          <input
                            type="text"
                            value={leader.role || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAboutData((prev) => ({
                                ...prev,
                                leaders: prev.leaders.map((l) => (l.id === leader.id ? { ...l, role: val } : l)),
                              }));
                            }}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '13px' }}
                          />
                        </div>
                      </div>

                      {/* Bio Input */}
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Bio / Background</label>
                        <textarea
                          rows="4"
                          value={leader.bio || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAboutData((prev) => ({
                              ...prev,
                              leaders: prev.leaders.map((l) => (l.id === leader.id ? { ...l, bio: val } : l)),
                            }));
                          }}
                          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '13px', lineHeight: 1.5 }}
                        />
                      </div>

                      {/* Remove Profile Button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid var(--line)' }}>
                        <button
                          type="button"
                          onClick={() => handleDeleteLeader(leader.id)}
                          style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEE2E2', color: '#991B1B', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                        >
                          🗑 Remove Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="submit"
                  className="btn-brass"
                  style={{ padding: '12px 32px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 600 }}
                >
                  💾 Save All About Us Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* TAB 5: CLIENT INQUIRIES & LEADS */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {activeTab === 'leads' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '22px', margin: '0 0 4px' }}>Inbound Leads & Consultation Requests</h2>
                <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: '14px' }}>Real-time lead capture from consultation modals and contact forms.</p>
              </div>
              <span style={{ background: 'var(--paper)', border: '1px solid var(--line)', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>
                Total: {leadsList.length} Leads
              </span>
            </div>

            {leadsList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--line)' }}>
                <p style={{ color: 'var(--ink-soft)', fontSize: '16px' }}>No client leads received yet. When users submit the consultation modal, they appear here live via WebSocket!</p>
              </div>
            ) : (
              <div style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                    <thead>
                      <tr style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)', color: 'var(--ink-soft)', fontSize: '12px', textTransform: 'uppercase' }}>
                        <th style={{ padding: '14px 20px' }}>Date</th>
                        <th style={{ padding: '14px 20px' }}>Client Name</th>
                        <th style={{ padding: '14px 20px' }}>Email & Phone</th>
                        <th style={{ padding: '14px 20px' }}>Interest</th>
                        <th style={{ padding: '14px 20px' }}>Message</th>
                        <th style={{ padding: '14px 20px' }}>Status</th>
                        <th style={{ padding: '14px 20px' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leadsList.map((lead) => (
                        <tr key={lead.id} style={{ borderBottom: '1px solid var(--line)' }}>
                          <td style={{ padding: '16px 20px', whiteSpace: 'nowrap', fontSize: '12px', color: 'var(--ink-soft)' }}>
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : 'Recent'}
                          </td>
                          <td style={{ padding: '16px 20px', fontWeight: 600 }}>{lead.name || 'Anonymous'}</td>
                          <td style={{ padding: '16px 20px' }}>
                            <div><a href={`mailto:${lead.email}`} style={{ color: 'var(--brass)', textDecoration: 'none' }}>{lead.email}</a></div>
                            <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}><a href={`tel:${lead.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>{lead.phone}</a></div>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <span style={{ background: 'rgba(31, 149, 164, 0.1)', color: 'var(--brass)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                              {lead.interest || 'General'}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px', maxWidth: '280px', color: 'var(--ink-soft)', fontSize: '13px' }}>
                            {lead.message || 'No message provided'}
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <select
                              value={lead.status || 'New'}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                              style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: lead.status === 'Closed' ? '#D1FAE5' : lead.status === 'Contacted' ? '#FEF3C7' : '#EFF6FF', fontSize: '12px', fontWeight: 600 }}
                            >
                              <option value="New">🔵 New</option>
                              <option value="Contacted">🟡 Contacted</option>
                              <option value="Site Visit">🟣 Site Visit</option>
                              <option value="Closed">🟢 Closed</option>
                            </select>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '16px' }}
                              title="Delete Lead"
                            >
                              🗑
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* TAB 5: SYSTEM OVERVIEW & WEBSOCKET MONITOR */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {activeTab === 'stats' && (
          <div>
            <h2 style={{ fontSize: '22px', margin: '0 0 16px' }}>System Architecture & Live WebSocket Status</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '12px', color: 'var(--ink-soft)', textTransform: 'uppercase', marginBottom: '8px' }}>Active Buildings</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--ink)' }}>{propertiesData.buildings?.length || 0}</div>
              </div>
              <div style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '12px', color: 'var(--ink-soft)', textTransform: 'uppercase', marginBottom: '8px' }}>Total Commercial Units</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--brass)' }}>
                  {Object.values(propertiesData.properties || {}).reduce((acc, arr) => acc + (arr?.length || 0), 0)}
                </div>
              </div>
              <div style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '12px', color: 'var(--ink-soft)', textTransform: 'uppercase', marginBottom: '8px' }}>Interior Assets</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--ink)' }}>{interiorItems.length}</div>
              </div>
              <div style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '12px', color: 'var(--ink-soft)', textTransform: 'uppercase', marginBottom: '8px' }}>Knowledge Centre Articles</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--ink)' }}>{blogsList.length}</div>
              </div>
              <div style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '12px', color: 'var(--ink-soft)', textTransform: 'uppercase', marginBottom: '8px' }}>WebSocket Client Status</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: isConnected ? '#10B981' : '#F59E0B', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: isConnected ? '#10B981' : '#F59E0B' }}></span>
                  {isConnected ? 'Connected & Broadcasting' : 'Disconnected'}
                </div>
              </div>
            </div>

            {/* WebSocket Activity Feed */}
            <div style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', margin: '0 0 16px' }}>Real-Time Event Broadcast Log</h3>
              {wsLogs.length === 0 ? (
                <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: 0 }}>No recent broadcast events. Actions taken in the portal will show up here live.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace', fontSize: '13px' }}>
                  {wsLogs.map((log, idx) => (
                    <div key={idx} style={{ padding: '8px 12px', background: 'var(--paper)', borderRadius: '6px', borderLeft: '3px solid var(--brass)' }}>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MODAL: ADD / EDIT PROPERTY */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {propertyModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setPropertyModal({ open: false, isEdit: false, data: null })}>
          <div style={{ background: 'var(--white)', maxWidth: '640px', width: '100%', borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '22px' }}>{propertyModal.isEdit ? 'Edit Property Unit' : `Add Unit to ${selectedBuilding}`}</h3>
              <button onClick={() => setPropertyModal({ open: false, isEdit: false, data: null })} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleSaveProperty} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Property Title</label>
                  <input name="propName" defaultValue={propertyModal.data?.name || 'Office Space'} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Folder / Floor Reference</label>
                  <input name="propFolder" defaultValue={propertyModal.data?.folder || ''} placeholder="e.g. 4th floor office" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Size (sq.ft)</label>
                  <input name="propSize" defaultValue={propertyModal.data?.size || '1200 sq.ft'} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Monthly Rent</label>
                  <input name="propRent" defaultValue={propertyModal.data?.rent || '65 K onwards'} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Workstations</label>
                  <input type="number" name="propWorkstation" defaultValue={propertyModal.data?.workstation || 16} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Cabins</label>
                  <input type="number" name="propCabin" defaultValue={propertyModal.data?.cabin || 2} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Conf. Rooms</label>
                  <input name="propConference" defaultValue={propertyModal.data?.conferenceRoom !== undefined ? propertyModal.data.conferenceRoom : 1} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Reception</label>
                  <input name="propReception" defaultValue={propertyModal.data?.reception || 'Yes'} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Pantry</label>
                  <input name="propPantry" defaultValue={propertyModal.data?.pantry || 'Yes'} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Car Parking</label>
                  <input type="number" name="propParking" defaultValue={propertyModal.data?.carParking || 1} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
              </div>

              {/* Photos & Media Management */}
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px', marginTop: '8px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                  Property Photos / Media ({propertyModal.data?.images?.length || 0})
                </label>

                {/* Upload File Button */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--ink)', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: uploading ? 'not-allowed' : 'pointer' }}>
                    {uploading ? 'Uploading...' : '📁 Upload Image from Device'}
                    <input type="file" accept="image/*,video/*" onChange={handleUploadPropertyImage} disabled={uploading} style={{ display: 'none' }} />
                  </label>
                  <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>or add filename/url:</span>
                  <input
                    id="manualImgInp"
                    placeholder="e.g. 1.jpg or https://..."
                    style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '12px' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddManualImage(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const inp = document.getElementById('manualImgInp');
                      if (inp && inp.value) {
                        handleAddManualImage(inp.value);
                        inp.value = '';
                      }
                    }}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--paper)', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Add
                  </button>
                </div>

                {/* Existing Images Thumbnails */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxHeight: '140px', overflowY: 'auto', padding: '8px', background: 'var(--paper)', borderRadius: '8px' }}>
                  {(propertyModal.data?.images || []).map((img, idx) => (
                    <div key={idx} style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--line)', background: '#fff' }}>
                      <img
                        src={resolveMediaUrl(img.startsWith('/') || img.startsWith('http') ? img : selectedBuilding === 'Ecospace' ? `/ecospace/${propertyModal.data?.folder}/${img}` : `/manicasadona/${propertyModal.data?.folder}/${img}`)}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = '/hero.png'; }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePropertyImage(idx)}
                        style={{ position: 'absolute', top: 2, right: 2, width: '18px', height: '18px', borderRadius: '50%', background: '#EF4444', color: '#fff', border: 'none', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="submit" className="btn-brass" style={{ flex: 1, padding: '12px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  {propertyModal.isEdit ? 'Save Changes' : 'Create Unit'}
                </button>
                <button type="button" onClick={() => setPropertyModal({ open: false, isEdit: false, data: null })} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--paper)', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MODAL: ADD BUILDING */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {buildingModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: 'var(--white)', maxWidth: '400px', width: '100%', borderRadius: '16px', padding: '32px' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '20px' }}>Add New Building</h3>
            <form onSubmit={handleAddBuilding}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Building / IT Park Name</label>
              <input
                type="text"
                required
                value={buildingModal.name}
                onChange={(e) => setBuildingModal((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Godrej Waterside"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', marginBottom: '20px' }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" className="btn-brass" style={{ flex: 1, padding: '10px', border: 'none', cursor: 'pointer' }}>Add Building</button>
                <button type="button" onClick={() => setBuildingModal({ open: false, name: '' })} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--paper)', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MODAL: ADD / EDIT INTERIOR ITEM */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {interiorModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setInteriorModal({ open: false, isEdit: false, data: null })}>
          <div style={{ background: 'var(--white)', maxWidth: '500px', width: '100%', borderRadius: '16px', padding: '32px' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 20px', fontSize: '20px' }}>{interiorModal.isEdit ? 'Edit Interior Item' : 'Add Interior Design Media'}</h3>
            <form onSubmit={handleSaveInterior} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Upload Media File</label>
                <label style={{ display: 'block', padding: '12px', textAlign: 'center', border: '2px dashed var(--line)', borderRadius: '8px', cursor: uploading ? 'not-allowed' : 'pointer', background: 'var(--paper)' }}>
                  {uploading ? 'Uploading to Server...' : '📁 Choose Image or Video File'}
                  <input type="file" accept="image/*,video/*" onChange={handleUploadInteriorFile} disabled={uploading} style={{ display: 'none' }} />
                </label>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Or Path / Direct URL</label>
                <input
                  name="assetPath"
                  defaultValue={interiorModal.data?.path || ''}
                  required
                  placeholder="e.g. /uploads/... or /interior/..."
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Media Type</label>
                <select name="assetType" defaultValue={interiorModal.data?.type || 'image'} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                  <option value="image">Image (Photo)</option>
                  <option value="video">Video Tour (.mp4)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Title / Description</label>
                <input
                  name="assetTitle"
                  defaultValue={interiorModal.data?.title || 'Modern Commercial Office Space'}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-brass" style={{ flex: 1, padding: '12px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Save</button>
                <button type="button" onClick={() => setInteriorModal({ open: false, isEdit: false, data: null })} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--paper)', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MODAL: ADD / EDIT BLOG */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {blogModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setBlogModal({ open: false, isEdit: false, data: null })}>
          <div style={{ background: 'var(--white)', maxWidth: '640px', width: '100%', borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 20px', fontSize: '20px' }}>{blogModal.isEdit ? 'Edit Article' : 'Write Knowledge Centre Article'}</h3>
            <form onSubmit={handleSaveBlog} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Article Title</label>
                <input name="blogTitle" defaultValue={blogModal.data?.title || ''} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, margin: 0 }}>Category</label>
                    {!isAddingCategory ? (
                      <button
                        type="button"
                        onClick={() => setIsAddingCategory(true)}
                        style={{ background: 'none', border: 'none', color: 'var(--brass)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                      >
                        + Add New
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => { setIsAddingCategory(false); setNewCategoryName(''); }}
                        style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '11px', cursor: 'pointer', padding: 0 }}
                      >
                        Select Existing
                      </button>
                    )}
                  </div>

                  {!isAddingCategory ? (
                    <select
                      name="blogCat"
                      value={selectedCatInModal}
                      onChange={(e) => {
                        if (e.target.value === '__NEW__') {
                          setIsAddingCategory(true);
                        } else {
                          setSelectedCatInModal(e.target.value);
                        }
                      }}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)', background: '#fff', fontSize: '13px' }}
                    >
                      {categoriesList.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="__NEW__">➕ + Add New Category...</option>
                    </select>
                  ) : (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="text"
                        placeholder="Type new category..."
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleCreateCategory(newCategoryName);
                          }
                        }}
                        autoFocus
                        style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: '1.5px solid var(--brass)', fontSize: '13px', outline: 'none' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleCreateCategory(newCategoryName)}
                        style={{ background: 'var(--brass)', color: '#fff', border: 'none', borderRadius: '6px', padding: '0 12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Author</label>
                  <input name="blogAuthor" defaultValue={blogModal.data?.author || '4Walls Team'} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Read Time</label>
                  <input name="blogReadTime" defaultValue={blogModal.data?.readTime || '5 min read'} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Cover Image</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <label style={{ padding: '8px 14px', borderRadius: '6px', background: 'var(--ink)', color: '#fff', fontSize: '12px', cursor: uploading ? 'not-allowed' : 'pointer' }}>
                    {uploading ? 'Uploading...' : '📁 Upload Photo'}
                    <input type="file" accept="image/*" onChange={handleUploadBlogCover} disabled={uploading} style={{ display: 'none' }} />
                  </label>
                  <input
                    name="blogImg"
                    value={blogModal.data?.img || ''}
                    onChange={(e) => setBlogModal((prev) => ({ ...prev, data: { ...prev.data, img: e.target.value } }))}
                    placeholder="or paste image URL"
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Short Summary / Excerpt</label>
                <textarea name="blogExcerpt" rows="2" defaultValue={blogModal.data?.excerpt || ''} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }}></textarea>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Full Content / Article Body</label>
                <textarea name="blogContent" rows="6" defaultValue={blogModal.data?.content || ''} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--line)' }}></textarea>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-brass" style={{ flex: 1, padding: '12px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Save Article</button>
                <button type="button" onClick={() => setBlogModal({ open: false, isEdit: false, data: null })} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--paper)', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * SkillHub - Application UI Controller & Common Layout Manager
 */

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  initBackendStatusChecker();
  initDemoUserHelper();
});

/**
 * Universal Navigation Bar
 */
function renderNavbar() {
  const navContainer = document.getElementById('navbar-placeholder');
  if (!navContainer) return;

  const user = getCurrentUser();
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const navLinks = [
    { title: 'Home', path: 'index.html', icon: 'bi-house' },
    { title: 'Campus Catalog', path: 'explore-skills.html', icon: 'bi-grid-3x3-gap' },
    { title: 'Dashboard', path: 'dashboard.html', icon: 'bi-grid-1x2', auth: true },
    { title: 'My Skills', path: 'my-skills.html', icon: 'bi-award', auth: true },
    { title: 'Requests', path: 'requests.html', icon: 'bi-arrow-left-right', auth: true },
    { title: 'Sessions', path: 'sessions.html', icon: 'bi-calendar-check', auth: true },
    { title: 'Reviews', path: 'reviews.html', icon: 'bi-star', auth: true }
  ];

  const visibleLinks = navLinks.filter(l => !l.auth || user);

  navContainer.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-custom sticky-top">
      <div class="container-xl">
        <a class="navbar-brand" href="index.html">
          <span class="brand-icon"><i class="bi bi-mortarboard-fill"></i></span>
          SkillHub
        </a>

        <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-2 gap-md-3">
            ${visibleLinks.map(link => `
              <li class="nav-item">
                <a class="nav-link px-3 ${currentPath === link.path ? 'active' : ''}" href="${link.path}">
                  <i class="bi ${link.icon} me-1"></i>${link.title}
                </a>
              </li>
            `).join('')}
          </ul>

          <div class="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            ${user ? `
              <!-- Logged In User Dropdown -->
              <div class="dropdown">
                <button class="btn btn-outline-secondary btn-sm rounded-pill d-flex align-items-center gap-2 dropdown-toggle px-3 py-1.5" type="button" data-bs-toggle="dropdown">
                  <span class="user-avatar-pill">${getInitials(user.name)}</span>
                  <div class="text-start d-none d-md-block line-clamp-1">
                    <span class="fw-bold text-dark d-block" style="font-size: 0.85rem; line-height: 1.1;">${user.name}</span>
                    <span class="text-muted" style="font-size: 0.725rem;">${user.department || 'Student'} • Year ${user.year || 1}</span>
                  </div>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 py-2" style="border-radius: 12px; min-width: 220px;">
                  <li class="px-3 py-2 border-bottom mb-1">
                    <div class="fw-bold text-dark">${user.name}</div>
                    <div class="small text-muted text-truncate">${user.email}</div>
                  </li>
                  <li><a class="dropdown-item py-2" href="profile.html"><i class="bi bi-person me-2 text-primary"></i>My Profile</a></li>
                  <li><a class="dropdown-item py-2" href="dashboard.html"><i class="bi bi-speedometer2 me-2 text-primary"></i>My Dashboard</a></li>
                  <li><a class="dropdown-item py-2" href="my-skills.html"><i class="bi bi-award me-2 text-primary"></i>Skills I Teach</a></li>
                  <li><a class="dropdown-item py-2" href="requests.html"><i class="bi bi-inbox me-2 text-primary"></i>Requests Hub</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <button class="dropdown-item py-2 text-danger" id="logout-btn">
                      <i class="bi bi-box-arrow-right me-2"></i>Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ` : `
              <!-- Guest Action Buttons -->
              <a href="login.html" class="btn btn-outline-primary btn-sm px-3 py-1.5 rounded-pill">
                <i class="bi bi-box-arrow-in-right me-1"></i>Log In
              </a>
              <a href="register.html" class="btn btn-primary btn-sm px-3 py-1.5 rounded-pill shadow-sm">
                <i class="bi bi-person-plus me-1"></i>Get Started
              </a>
            `}
          </div>
        </div>
      </div>
    </nav>
  `;

  // Attach logout handler
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearCurrentUser();
      showToast('Logged out successfully', 'info');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    });
  }

  // Attach Backend status click handler (for troubleshooting modal)
  const statusPill = document.getElementById('backend-status');
  if (statusPill) {
    statusPill.addEventListener('click', showBackendConfigModal);
  }
}

/**
 * Universal Footer
 */
function renderFooter() {
  const footerContainer = document.getElementById('footer-placeholder');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer>
      <div class="container-xl">
        <div class="row g-4 mb-4">
          <div class="col-lg-4 col-md-6">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="brand-icon"><i class="bi bi-mortarboard-fill"></i></span>
              <span class="fw-bold fs-5 text-dark brand-font">SkillHub</span>
            </div>
            <p class="text-muted small mb-3">
              The collegiate peer-to-peer skill exchange platform empowering undergraduate & graduate students to exchange mastery, collaborate on projects, and build real-world mentorship.
            </p>
            <div class="d-flex gap-2">
              <a href="#" class="btn btn-sm btn-light border rounded-circle text-muted"><i class="bi bi-github"></i></a>
              <a href="#" class="btn btn-sm btn-light border rounded-circle text-muted"><i class="bi bi-linkedin"></i></a>
              <a href="#" class="btn btn-sm btn-light border rounded-circle text-muted"><i class="bi bi-envelope"></i></a>
            </div>
          </div>

          <div class="col-lg-2 col-md-6 col-6">
            <h6 class="text-dark fw-bold mb-3">Platform</h6>
            <ul class="list-unstyled small space-y-2">
              <li class="mb-2"><a href="explore-skills.html" class="text-decoration-none text-muted">Explore Skills</a></li>
              <li class="mb-2"><a href="dashboard.html" class="text-decoration-none text-muted">Dashboard</a></li>
              <li class="mb-2"><a href="requests.html" class="text-decoration-none text-muted">Exchange Requests</a></li>
              <li class="mb-2"><a href="reviews.html" class="text-decoration-none text-muted">Ratings & Reviews</a></li>
            </ul>
          </div>

          <div class="col-lg-2 col-md-6 col-6">
            <h6 class="text-dark fw-bold mb-3">Community</h6>
            <ul class="list-unstyled small">
              <li class="mb-2"><a href="#" class="text-decoration-none text-muted">Peer Guidelines</a></li>
              <li class="mb-2"><a href="#" class="text-decoration-none text-muted">Mentorship Code</a></li>
              <li class="mb-2"><a href="#" class="text-decoration-none text-muted">Campus Chapters</a></li>
              <li class="mb-2"><a href="admin.html" class="text-decoration-none text-muted"><i class="bi bi-shield-lock me-1"></i>Staff &amp; Admin</a></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6">
            <h6 class="text-dark fw-bold mb-3">Academic Excellence &amp; Trust</h6>
            <p class="small text-muted mb-3">
              SkillHub connects university students for peer-driven mentoring and skill mastery. No commercial fees, verified campus profiles, and collaborative peer learning.
            </p>
            <div class="d-flex align-items-center gap-2 small flex-wrap">
              <span class="badge bg-success-subtle text-success border border-success-subtle"><i class="bi bi-patch-check-fill me-1"></i>Peer-to-Peer</span>
              <span class="badge bg-primary-subtle text-primary border border-primary-subtle"><i class="bi bi-mortarboard-fill me-1"></i>Campus Verified</span>
              <span class="badge bg-secondary-subtle text-secondary border border-secondary-subtle"><i class="bi bi-shield-shaded me-1"></i>Secure Platform</span>
            </div>
          </div>
        </div>

        <div class="border-top pt-3 d-flex flex-column flex-sm-row justify-content-between align-items-center text-muted small">
          <div>© SkillHub</div>
          <div class="mt-2 mt-sm-0">
            <span>Privacy • Terms • Security</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Backend Connection Checker
 */
async function initBackendStatusChecker() {
  const statusPill = document.getElementById('backend-status');
  if (!statusPill) return;

  const isHealthy = await api.checkHealth();
  updateStatusPill(statusPill, isHealthy);

  // Poll every 15 seconds
  setInterval(async () => {
    const ok = await api.checkHealth();
    updateStatusPill(statusPill, ok);
  }, 15000);
}

function updateStatusPill(pill, isHealthy) {
  if (isHealthy) {
    pill.className = 'backend-status-pill online ms-2 d-none d-sm-inline-flex';
    pill.innerHTML = `
      <span class="status-dot"></span>
      <span class="status-text">Backend Connected</span>
    `;
    pill.setAttribute('title', `Spring Boot active at ${API_CONFIG.baseUrl || 'http://localhost:8080'}`);
  } else {
    pill.className = 'backend-status-pill offline ms-2 d-none d-sm-inline-flex';
    pill.innerHTML = `
      <span class="status-dot"></span>
      <span class="status-text">Backend Offline</span>
    `;
    pill.setAttribute('title', `Cannot reach Spring Boot at ${API_CONFIG.baseUrl || 'http://localhost:8080'}. Click to configure.`);
  }
}

/**
 * Backend Configuration Modal
 */
function showBackendConfigModal() {
  let modalEl = document.getElementById('backendModal');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'backendModal';
    modalEl.className = 'modal fade';
    modalEl.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-bold">
              <i class="bi bi-hdd-network text-primary me-2"></i>Backend API Configuration
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body py-3">
            <p class="text-muted small">
              SkillHub frontend connects to your Spring Boot REST application. Ensure your Spring Boot backend is running on port 8080.
            </p>
            <div class="mb-3">
              <label class="form-label">Spring Boot API Base URL</label>
              <input type="text" class="form-control" id="api-base-input" value="${API_CONFIG.baseUrl || 'http://localhost:8080'}" placeholder="http://localhost:8080">
              <div class="form-text">Leave blank or default to <code>http://localhost:8080</code>.</div>
            </div>
            <div class="p-3 bg-light rounded-3 mb-2 small text-muted">
              <strong>Quick Checklist:</strong>
              <ul class="mb-0 mt-1 ps-3">
                <li>MySQL service is running (database: <code>skillhub</code>)</li>
                <li>Spring Boot app is running on port 8080 (<code>mvn spring-boot:run</code>)</li>
              </ul>
            </div>
          </div>
          <div class="modal-footer border-0 pt-0">
            <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary btn-sm px-3" id="save-api-btn">Save &amp; Test Connection</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);

    document.getElementById('save-api-btn').addEventListener('click', async () => {
      const inputVal = document.getElementById('api-base-input').value.trim();
      API_CONFIG.baseUrl = inputVal;
      const ok = await api.checkHealth();
      const pill = document.getElementById('backend-status');
      if (pill) updateStatusPill(pill, ok);

      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();

      if (ok) {
        showToast('Successfully connected to Spring Boot backend!', 'success');
      } else {
        showToast('Could not reach backend at ' + (inputVal || 'http://localhost:8080'), 'danger');
      }
    });
  }

  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
}

/**
 * Demo Fast-Switcher Widget
 */
function initDemoUserHelper() {
  // Can be triggered from login page or floating button
}

/**
 * Utility Functions
 */
function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function renderStars(rating, max = 5) {
  let html = '';
  const score = Math.round(rating || 0);
  for (let i = 1; i <= max; i++) {
    if (i <= score) {
      html += '<i class="bi bi-star-fill star-static me-0.5"></i>';
    } else {
      html += '<i class="bi bi-star star-static empty me-0.5"></i>';
    }
  }
  return html;
}

function getLevelBadgeClass(level) {
  const l = (level || '').toLowerCase();
  if (l.includes('adv') || l.includes('exp')) return 'badge-level advanced';
  if (l.includes('inter')) return 'badge-level intermediate';
  return 'badge-level beginner';
}

function getStatusBadgeClass(status) {
  return `badge-status ${status || 'PENDING'}`;
}

function getStatusIcon(status) {
  switch (status) {
    case 'ACCEPTED': return 'bi-check2-circle';
    case 'REJECTED': return 'bi-x-circle';
    case 'COMPLETED': return 'bi-patch-check-fill';
    default: return 'bi-hourglass-split';
  }
}


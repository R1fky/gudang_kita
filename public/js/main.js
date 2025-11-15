document.addEventListener("DOMContentLoaded", function () {
  // Toggle Sidebar untuk Mobile
  const toggleSidebarBtn = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");
  const body = document.body;

  // Create overlay element
  const overlay = document.createElement("div");
  overlay.className = "sidebar-overlay";
  body.appendChild(overlay);

  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener("click", function () {
      sidebar.classList.toggle("show");
      overlay.classList.toggle("show");
    });
  }

  // Close sidebar when clicking overlay
  overlay.addEventListener("click", function () {
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
  });

  // Close sidebar when clicking a link on mobile
  const navLinks = sidebar.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 992) {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
      }
    });
  });

  // Logout Button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Apakah Anda yakin ingin keluar?")) {
        // Handle logout logic here
        alert("Logout berhasil!");
        // window.location.href = '/logout';
      }
    });
  }

  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Add active class animation
  const activeNavLink = document.querySelector(".nav-link.active");
  if (activeNavLink) {
    activeNavLink.style.animation = "slideIn 0.3s ease";
  }
});

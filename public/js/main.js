// Toggle Sidebar untuk Mobile
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

// Close sidebar ketika klik di luar (mobile)
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  }
});

// Logout button
const logoutBtn = document.querySelector(".logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      // Handle logout logic here
      console.log("Logout clicked");
    }
  });
}

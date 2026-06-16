// ============================================================
//  ADMIN PASSWORD
//  Change "swifttrack2026" to whatever password client wants
// ============================================================
const ADMIN_PASSWORD = "swifttrack2026";

// ============================================================
//  SHOW / HIDE PAGES
// ============================================================
function showAdmin() {
  document.getElementById("passwordModal").style.display = "block";
}

function closeModal() {
  document.getElementById("passwordModal").style.display = "none";
  document.getElementById("passwordInput").value = "";
}

function checkPassword() {
  let input = document.getElementById("passwordInput").value;

  if (input === ADMIN_PASSWORD) {
    closeModal();
    document.getElementById("customerPage").style.display = "none";
    document.getElementById("adminPage").style.display = "block";
    loadPackages();
  } else {
    showToast("❌ Wrong password!");
  }
}

function showCustomer() {
  document.getElementById("adminPage").style.display = "none";
  document.getElementById("customerPage").style.display = "block";
}

// ============================================================
//  TRACK PACKAGE
// ============================================================
function trackPackage() {
  let input = document.getElementById("trackingInput")
    .value.trim().toUpperCase();

  if (!input) {
    showToast("Enter a tracking number!");
    return;
  }

  let packages = JSON.parse(
    localStorage.getItem("packages")) || {};

  let pkg = packages[input];

  if (!pkg) {
    document.getElementById("result").style.display = "none";
    document.getElementById("notFound").style.display = "block";
    return;
  }

  document.getElementById("cusName").innerText = pkg.name;
  document.getElementById("pkgDetails").innerText = pkg.details;
  document.getElementById("pkgLocation").innerText = pkg.location;
  document.getElementById("lastUpdate").innerText = pkg.lastUpdate;

  let statusEl = document.getElementById("pkgStatus");
  statusEl.innerText = pkg.status;

  if (pkg.status === "Pending") {
    statusEl.className = "status-pending";
  } else if (pkg.status === "In Transit") {
    statusEl.className = "status-transit";
  } else if (pkg.status === "Delivered") {
    statusEl.className = "status-delivered";
  }

  document.getElementById("result").style.display = "block";
  document.getElementById("notFound").style.display = "none";
}

// enter key to search
document.getElementById("trackingInput")
  .addEventListener("keypress", function(e) {
    if (e.key === "Enter") trackPackage();
  });

// ============================================================
//  ADD PACKAGE
// ============================================================
function addPackage() {
  let trackNum = document.getElementById("trackNum")
    .value.trim().toUpperCase();
  let name = document.getElementById("cusNameInput")
    .value.trim();
  let details = document.getElementById("pkgDetailsInput")
    .value.trim();
  let location = document.getElementById("pkgLocationInput")
    .value.trim();
  let status = document.getElementById("pkgStatusInput").value;

  if (!trackNum || !name || !details || !location) {
    showToast("Fill all fields!");
    return;
  }

  let packages = JSON.parse(
    localStorage.getItem("packages")) || {};

  packages[trackNum] = {
    name: name,
    details: details,
    location: location,
    status: status,
    lastUpdate: new Date().toLocaleString()
  };

  localStorage.setItem("packages", JSON.stringify(packages));

  showToast("✅ Package " + trackNum + " added!");
  clearFields();
  loadPackages();
}

// ============================================================
//  UPDATE PACKAGE
// ============================================================
function updatePackage() {
  let trackNum = document.getElementById("updateTrackNum")
    .value.trim().toUpperCase();
  let newLocation = document.getElementById("newLocation")
    .value.trim();
  let newStatus = document.getElementById("newStatus").value;

  if (!trackNum || !newLocation) {
    showToast("Fill all fields!");
    return;
  }

  let packages = JSON.parse(
    localStorage.getItem("packages")) || {};

  if (!packages[trackNum]) {
    showToast("❌ Tracking number not found!");
    return;
  }

  packages[trackNum].location = newLocation;
  packages[trackNum].status = newStatus;
  packages[trackNum].lastUpdate = new Date().toLocaleString();

  localStorage.setItem("packages", JSON.stringify(packages));

  showToast("📍 Package updated!");
  loadPackages();
}

// ============================================================
//  LOAD ALL PACKAGES
// ============================================================
function loadPackages() {
  let packages = JSON.parse(
    localStorage.getItem("packages")) || {};
  let box = document.getElementById("packageList");
  let keys = Object.keys(packages);

  if (keys.length === 0) {
    box.innerHTML = "<p style='color:#888;'>No packages yet</p>";
    return;
  }

  box.innerHTML = keys.map(key => {
    let p = packages[key];
    return `
      <div style="border:1px solid rgba(255,255,255,0.08);
        border-radius:10px; padding:12px; margin-bottom:10px;">
        <p style="color:#f5a623; font-weight:700;">${key}</p>
        <p style="font-size:13px; color:#888;">👤 ${p.name}</p>
        <p style="font-size:13px; color:#888;">📦 ${p.details}</p>
        <p style="font-size:13px; color:#888;">📍 ${p.location}</p>
        <p style="font-size:13px; color:#888;">📊 ${p.status}</p>
        <button onclick="deletePackage('${key}')"
          style="margin-top:8px; background:#ff4444;
          color:white; border:none; padding:6px 12px;
          border-radius:8px; font-size:12px; cursor:pointer;">
          🗑️ Delete
        </button>
      </div>
    `;
  }).join("");
}

// ============================================================
//  DELETE PACKAGE
// ============================================================
function deletePackage(trackNum) {
  let packages = JSON.parse(
    localStorage.getItem("packages")) || {};
  delete packages[trackNum];
  localStorage.setItem("packages", JSON.stringify(packages));
  showToast("🗑️ Package deleted");
  loadPackages();
}

// ============================================================
//  CLEAR FORM
// ============================================================
function clearFields() {
  document.getElementById("trackNum").value = "";
  document.getElementById("cusNameInput").value = "";
  document.getElementById("pkgDetailsInput").value = "";
  document.getElementById("pkgLocationInput").value = "";
}

// ============================================================
//  TOAST
// ============================================================
function showToast(message) {
  let toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
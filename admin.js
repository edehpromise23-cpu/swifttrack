// ADD NEW PACKAGE
function addPackage() {
  let trackNum = document.getElementById("trackNum").value.trim().toUpperCase();
  let name = document.getElementById("cusName").value.trim();
  let details = document.getElementById("pkgDetails").value.trim();
  let location = document.getElementById("pkgLocation").value.trim();
  let status = document.getElementById("pkgStatus").value;

  // check nothing is empty
  if (!trackNum || !name || !details || !location) {
    alert("Fill all fields!");
    return;
  }

  let packages = JSON.parse(localStorage.getItem("packages")) || {};

  // save package
  packages[trackNum] = {
    name: name,
    details: details,
    location: location,
    status: status,
    lastUpdate: new Date().toLocaleString()
  };

  localStorage.setItem("packages", JSON.stringify(packages));

  alert("Package added! Tracking: " + trackNum);
  loadPackages();
  clearFields();
}

// UPDATE LOCATION
function updatePackage() {
  let trackNum = document.getElementById("updateTrackNum").value.trim().toUpperCase();
  let newLocation = document.getElementById("newLocation").value.trim();
  let newStatus = document.getElementById("newStatus").value;

  if (!trackNum || !newLocation) {
    alert("Enter tracking number and new location!");
    return;
  }

  let packages = JSON.parse(localStorage.getItem("packages")) || {};

  if (!packages[trackNum]) {
    alert("Tracking number not found!");
    return;
  }

  // update location and status
  packages[trackNum].location = newLocation;
  packages[trackNum].status = newStatus;
  packages[trackNum].lastUpdate = new Date().toLocaleString();

  localStorage.setItem("packages", JSON.stringify(packages));

  alert("Package updated!");
  loadPackages();
}

// LOAD ALL PACKAGES
function loadPackages() {
  let packages = JSON.parse(localStorage.getItem("packages")) || {};
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
          border-radius:8px; font-size:12px;">
          🗑️ Delete
        </button>
      </div>
    `;
  }).join("");
}

// DELETE PACKAGE
function deletePackage(trackNum) {
  let packages = JSON.parse(localStorage.getItem("packages")) || {};
  delete packages[trackNum];
  localStorage.setItem("packages", JSON.stringify(packages));
  loadPackages();
}

// CLEAR FORM
function clearFields() {
  document.getElementById("trackNum").value = "";
  document.getElementById("cusName").value = "";
  document.getElementById("pkgDetails").value = "";
  document.getElementById("pkgLocation").value = "";
}

// LOAD ON START
window.onload = () => {
  loadPackages();
};
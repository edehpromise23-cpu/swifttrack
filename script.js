// ============================================================
//  TRACK PACKAGE FUNCTION
//  - Gets tracking number from input
//  - Searches localStorage for matching package
//  - Shows result or error
// ============================================================
function trackPackage() {
  let input = document.getElementById("trackingInput").value.trim();

  if (!input) {
    alert("Please enter a tracking number");
    return;
  }

  // get all packages from storage
  let packages = JSON.parse(localStorage.getItem("packages")) || {};

  // search for tracking number
  let pkg = packages[input.toUpperCase()];

  if (!pkg) {
    // not found
    document.getElementById("result").style.display = "none";
    document.getElementById("notFound").style.display = "block";
    return;
  }

  // found — fill in the details
  document.getElementById("cusName").innerText = pkg.name;
  document.getElementById("pkgDetails").innerText = pkg.details;
  document.getElementById("pkgLocation").innerText = pkg.location;
  document.getElementById("lastUpdate").innerText = pkg.lastUpdate;

  // status with color
  let statusEl = document.getElementById("pkgStatus");
  statusEl.innerText = pkg.status;

  if (pkg.status === "Pending") {
    statusEl.className = "status-pending";
  } else if (pkg.status === "In Transit") {
    statusEl.className = "status-transit";
  } else if (pkg.status === "Delivered") {
    statusEl.className = "status-delivered";
  }

  // show result hide error
  document.getElementById("result").style.display = "block";
  document.getElementById("notFound").style.display = "none";
}

// allow pressing Enter to search
document.getElementById("trackingInput")
  .addEventListener("keypress", function(e) {
    if (e.key === "Enter") trackPackage();
  });
const form = document.getElementById("ticketForm");
const formSection = document.getElementById("formSection");
const ticketSection = document.getElementById("ticketSection");
const dropZone = document.getElementById("dropZone");
const avatarInput = document.getElementById("avatar");
const uploadHint = document.getElementById("uploadHint");

// --- File Upload Handling ---

// Click to upload
dropZone.addEventListener("click", () => avatarInput.click());

// Drag and drop support
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.style.background = "rgba(255, 255, 255, 0.15)";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.background = "";
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.style.background = "";
  
  const file = e.dataTransfer.files[0];
  if (file) {
    handleFile(file);
  }
});

// File input change event
avatarInput.addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    handleFile(file);
  }
});

function handleFile(file) {
  // Validate file type
  const validTypes = ["image/jpeg", "image/png"];
  if (!validTypes.includes(file.type)) {
    alert("Please upload a JPG or PNG image.");
    avatarInput.value = ""; // Clear input
    return;
  }

  // Validate file size (500KB)
  if (file.size > 500 * 1024) {
    alert("File is too large! Please keep it under 500KB.");
    avatarInput.value = ""; // Clear input
    return;
  }

  uploadHint.innerText = file.name;
  // Manually set the file for the input if it came from drag-drop
  if (avatarInput.files[0] !== file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      avatarInput.files = dataTransfer.files;
  }
}


// --- Form Submission ---

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const github = document.getElementById("github").value;

  if (!avatarInput.files.length) {
    alert("Please upload an avatar to continue.");
    return;
  }

  // Populate Ticket Data
  document.getElementById("userName").innerText = name;
  document.getElementById("userEmail").innerText = email;
  document.getElementById("ticketName").innerText = name;
  document.getElementById("ticketGithub").innerText = "@" + github;
  
  // Generate Random 5-digit Ticket ID
  document.getElementById("ticketId").innerText = Math.floor(10000 + Math.random() * 90000);

  // Read and set Avatar image
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("ticketAvatar").src = reader.result;
    
    // Switch Views with a smooth transition effect
    formSection.style.opacity = '0';
    setTimeout(() => {
        formSection.classList.add("hidden");
        ticketSection.classList.remove("hidden");
        // Trigger reflow to ensure the transition happens
        void ticketSection.offsetWidth; 
        ticketSection.style.opacity = '1';
    }, 300);
  };
  reader.readAsDataURL(avatarInput.files[0]);
});

// Add opacity transition for smoother switching
formSection.style.transition = 'opacity 0.3s ease-in-out';
ticketSection.style.transition = 'opacity 0.3s ease-in-out';
ticketSection.style.opacity = '0';
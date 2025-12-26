document.addEventListener("DOMContentLoaded", () => {
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  const uploadForm = document.getElementById("uploadForm");
  const uploadBtn = document.getElementById("uploadBtn");
  const progress = document.getElementById("progress");
  const progressBar = progress.querySelector(".progress-bar");
  const result = document.getElementById("result");

  let selectedFile = null;

  // Drag and drop functionality
  dropZone.addEventListener("click", () => fileInput.click());

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  });

  function handleFileSelect(file) {
    if (!file.type.startsWith("image/")) {
      showResult("Only image files are allowed", "error");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showResult("File size must be less than 10MB", "error");
      return;
    }

    selectedFile = file;
    dropZone.innerHTML = `
      <div class="text-green-600">
        <svg class="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-lg font-medium">${file.name}</p>
        <p class="text-sm text-gray-500">${(file.size / 1024 / 1024).toFixed(
          2
        )} MB</p>
      </div>
    `;
  }

  // Form submission
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      showResult("Please select an image file first", "error");
      return;
    }

    uploadBtn.disabled = true;
    uploadBtn.textContent = "Uploading...";
    progress.classList.remove("hidden");
    result.classList.add("hidden");

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Simulate progress
      let progressValue = 0;
      const progressInterval = setInterval(() => {
        progressValue += Math.random() * 15;
        if (progressValue > 90) progressValue = 90;
        progressBar.style.width = `${progressValue}%`;
      }, 200);

      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      progressBar.style.width = "100%";

      const data = await response.json();

      if (response.ok) {
        showResult(
          `
          <div class="text-green-600 mb-2">Upload successful!</div>
          <a href="${data.url}" target="_blank" class="text-blue-600 underline break-all">${data.url}</a>
          <button onclick="navigator.clipboard.writeText('${data.url}')" class="ml-2 px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">Copy</button>
        `,
          "success"
        );
      } else {
        showResult(data.error || "Upload failed", "error");
      }
    } catch (error) {
      showResult("Network error occurred", "error");
    } finally {
      uploadBtn.disabled = false;
      uploadBtn.textContent = "Upload";
      progress.classList.add("hidden");
      progressBar.style.width = "0%";
    }
  });

  function showResult(message, type) {
    result.className = `mt-4 p-4 rounded-md ${
      type === "success"
        ? "bg-green-50 text-green-800"
        : "bg-red-50 text-red-800"
    }`;
    result.innerHTML = message;
    result.classList.remove("hidden");
  }
});

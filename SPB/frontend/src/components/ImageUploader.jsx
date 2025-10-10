"use client";
import api from "@/utils/api";
import { useState, useRef } from "react";

// Assuming you have an Upload icon component (e.g., using lucide-react or heroic-icons)
// For this example, we'll define a simple SVG icon inline.
const UploadIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

export default function ProfessionalImageUploader({ onUpload, previosImgUrl }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(previosImgUrl);
  
  // Create a ref to link the custom UI element to the hidden file input
  const fileInputRef = useRef(null);

  // Function to manually trigger the hidden file input click
  const openFileBrowser = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional: Show a local preview immediately while uploading
    setPreview(URL.createObjectURL(file));

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data; 
      console.log("data", data);

      setLoading(false);

      if (data.url) {
        // Set the permanent URL from the server response
        setPreview(data.url); 
        if (onUpload) onUpload(data.url);
      } else {
        alert("Upload failed! Server did not return a URL.");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Upload error! Check console for details.");
    }
  };

  const uploadButtonLabel = previosImgUrl ? "Change Image" : "Upload Image";

  // --- UI START ---
  return (
    <div className="flex flex-col items-center space-y-4 p-4 border border-gray-200 rounded-lg shadow-sm w-full max-w-sm mx-auto">
      {/* 1. Preview Area */}
      {preview ? (
        <div className="relative w-36 h-36 rounded-md overflow-hidden  shadow-md">
          <img 
            src={preview} 
            alt="Image Preview" 
            className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-50 blur-sm' : 'opacity-100'}`} 
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-36 h-36 flex items-center justify-center rounded-md bg-gray-100 text-gray-400 border-2 border-dashed border-gray-300">
          <UploadIcon className="w-8 h-8" />
        </div>
      )}

      {/* 2. Hidden File Input (Required for file selection) */}
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        className="hidden" // Hides the default input element
      />

      {/* 3. Custom Button (Triggers the hidden input) */}
      <button 
        onClick={openFileBrowser} 
        disabled={loading}
        className={`
          flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
          ${loading 
            ? 'bg-indigo-300 text-white cursor-not-allowed' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          }
        `}
      >
        <UploadIcon className="w-4 h-4 mr-2" />
        {loading ? "Uploading..." : uploadButtonLabel}
      </button>

      {/* 4. Optional: Status/Hint */}
      {!loading && <p className="text-xs text-gray-500">Max file size 5MB. Accepts PNG, JPG.</p>}
    </div>
  );
}
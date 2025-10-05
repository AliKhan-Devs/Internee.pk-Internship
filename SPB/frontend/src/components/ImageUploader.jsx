"use client";
import api from "@/utils/api";
import { useState } from "react";

export default function ImageUploader({ onUpload, previosImgUrl }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(previosImgUrl);

  const handleUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setLoading(true);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = res.data; // axios puts JSON in .data
    console.log("data", data);

    setLoading(false);

    if (data.url) {
      setPreview(data.url);
      if (onUpload) onUpload(data.url);
    } else {
      alert("Upload failed!");
    }
  } catch (err) {
    console.error(err);
    setLoading(false);
    alert("Upload error!");
  }
};


  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} placeholder={previosImgUrl?'Upload new image':'Upload image'}/>
      {loading && <p>Uploading...</p>}
      {preview && <img src={preview} alt="preview" width={150} />}
    </div>
  );
}

const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  
    const data = await response.json();
    return data.url; // ✅ Returns Cloudinary URL
  };
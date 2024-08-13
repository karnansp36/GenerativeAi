import { useState } from 'react';

export default function ImageAi() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    setError(null); // Clear previous errors
    setImage(null); // Clear previous images
    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || response.statusText);
      }

      const data = await response.json();
      const base64Image = data.image;

      // Validate base64 image format
      if (base64Image && /^data:image\/(png|jpeg|jpg);base64,/i.test(base64Image)) {
        setImage(base64Image);
      } else {
        throw new Error('Invalid image data format');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the image"
      />
      <button onClick={generateImage}>Generate Image</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {image && <img src={image} alt="Generated" />}
    </div>
  );
}

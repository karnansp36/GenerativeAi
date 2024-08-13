// server.js
import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import cors from 'cors'



const app = express();
app.use(cors()); // Enable CORS if your Vite app is served from a different origin
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your Vite app's URL
  }));
app.use(bodyParser.json());

app.post('/api/generate', async (req, res) => {
  try {
    const { description } = req.body;

    // Fetch image from the Hugging Face API
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      { inputs: description },
      {
        headers: {
          Authorization: `Bearer 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`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert array buffer to base64 string
    const base64Image = `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;

    res.json({ image: base64Image });
  } catch (error) {
    console.error('Server Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

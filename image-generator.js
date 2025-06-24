const promptInput = document.getElementById('prompt');
const sizeSelect = document.getElementById('size');
const generateBtn = document.getElementById('generateBtn');
const loadingText = document.getElementById('loading');
const imageCard = document.getElementById('imageCard');
const generatedImage = document.getElementById('generatedImage');
const downloadBtn = document.getElementById('downloadBtn');

const sizeMap = {
  portrait: { width: 512, height: 768 },
  landscape: { width: 768, height: 512 },
  square: { width: 640, height: 640 },
};


function getStyledPrompt(basePrompt, style) {
  const styles = {
    "Cyberpunk": `${basePrompt}, futuristic neon-lit city, cyberpunk theme, glowing lights, cinematic lighting, digital art, trending on ArtStation`,
    "Anime": `anime style artwork of ${basePrompt}, vibrant colors, clean lines, detailed face, glowing eyes, trending on Pixiv and ArtStation`,
    "Old Drawing": `${basePrompt}, medieval ink drawing, parchment background, historical style, antique illustration`,
    "Renaissance Painting": `${basePrompt}, oil painting in renaissance style, dramatic lighting, realistic skin texture, by Michelangelo`,
    "Cartoon": `${basePrompt}, cartoon style illustration, bold outlines, vibrant palette, comic book style`,
    "Cute Creature": `${basePrompt}, ultra cute creature, soft lighting, pastel colors, chibi style, 3D render`,
    "Abstract Painting": `${basePrompt}, abstract art, brush strokes, emotional color play, canvas texture`,
    "Dark": `${basePrompt}, dark theme, moody lighting, horror concept, deep shadows, creepy style`,
    "Fantasy": `${basePrompt}, epic fantasy concept art, magical environment, dragons and castles, cinematic view`,
    "3D Origami": `${basePrompt}, 3D origami render, folded paper sculpture, detailed geometry`,
    "3D Hologram": `${basePrompt}, futuristic 3D hologram display, glowing grid, digital matrix`,
    "Pop Art": `${basePrompt}, pop art style, bold colors, comic style halftones, inspired by Roy Lichtenstein`,
    "Pixel World": `${basePrompt}, retro pixel art, 8-bit video game style, vibrant palette`,
    "Manga": `${basePrompt}, manga illustration, black and white linework, speed lines, expressive characters`,
    "Fantasy World": `${basePrompt}, magical fantasy world, enchanted forest, glowing mushrooms, concept art`,
    "Vintage": `${basePrompt}, vintage poster style, grainy texture, 70s colors, old paper look`,
  };

  return styles[style] || basePrompt;
}


generateBtn.addEventListener('click', async () => {
  const basePrompt = promptInput.value.trim();
  const selectedSize = sizeSelect.value;
  const selectedStyle = document.getElementById('style').value;

  if (!basePrompt) return alert("Please enter a prompt.");

  const finalPrompt = getStyledPrompt(basePrompt, selectedStyle);
  const { width, height } = sizeMap[selectedSize];
  const randomSeed = Math.floor(Math.random() * 100000);

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    finalPrompt
  )}?width=${width}&height=${height}&seed=${randomSeed}&model=flux&nologo=true`;

  loadingText.style.display = 'block';
  imageCard.style.display = 'none';
  generatedImage.src = '';

  try {
    const img = new Image();
    img.onload = () => {
      loadingText.style.display = 'none';
      generatedImage.src = imageUrl;
      downloadBtn.href = imageUrl;
      imageCard.style.display = 'flex';
    };
    img.onerror = () => {
      loadingText.style.display = 'none';
      alert("Failed to generate image. Try again.");
    };
    img.src = imageUrl;
  } catch (err) {
    loadingText.style.display = 'none';
    alert("Error generating image.");
  }
});


function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.querySelector('.theme-toggle').textContent = isDark ? '🌞' : '🌙';
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    document.querySelector('.theme-toggle').textContent = '🌞';
  }
});

// // Credit Liimit Function
// let credit = parseInt(localStorage.getItem('credit')) || 10;
// // const generateBtn = document.getElementById('generateBtn');

// function updateCreditUI() {
//   generateBtn.textContent = `Generate Image (${credit} left)`;
// }

// updateCreditUI();

// generateBtn.addEventListener('click', async () => {
//   if (credit <= 0) {
//     window.location.href = "payment.html";
//     return;
//   }

//   // ... (kode generate seperti sebelumnya)

//   credit -= 1;
//   localStorage.setItem('credit', credit);
//   updateCreditUI();
// });

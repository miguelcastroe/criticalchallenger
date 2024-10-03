const apiKey = 'd1eFNqcaFF9fLJLceZoqMfDx6lNvKOfVXrlkLsUN';  // Inserted Cohere API key

// Function to handle text minimization using Cohere
async function minimizeText() {
  const inputText = document.getElementById('input-text').value;
  const language = document.getElementById('language').value;
  const minimizeButton = document.getElementById('minimize-button');
  const messageBox = document.getElementById('message-box');
  const outputText = document.getElementById('output-text');

  if (!inputText) {
    messageBox.textContent = (language === 'en') ? 'Please enter some text.' : 'Por favor, ingrese un texto.';
    return;
  }

  // Disable button while processing
  minimizeButton.disabled = true;
  minimizeButton.textContent = (language === 'en') ? 'Minimizing...' : 'Minimizando...';

  try {
    const prompt = (language === 'en') 
      ? `Minimize the following text while keeping its key information intact: ${inputText}` 
      : `Minimiza el siguiente texto manteniendo su información clave intacta: ${inputText}`;

    const response = await fetch('https://api.cohere.ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "command-xlarge-nightly",  // You can choose another model if needed
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.5
      })
    });

    const data = await response.json();
    outputText.value = data.generations[0].text.trim();
    messageBox.textContent = '';  // Clear any error messages
  } catch (error) {
    messageBox.textContent = (language === 'en') ? 'Error minimizing text. Please try again.' : 'Error al minimizar el texto. Por favor, inténtelo de nuevo.';
  }

  // Re-enable button
  minimizeButton.disabled = false;
  minimizeButton.textContent = (language === 'en') ? 'Minimize Text' : 'Minimizar Texto';
}

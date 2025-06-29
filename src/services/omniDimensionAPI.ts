const API_KEY = '6jTwVrDj45nfJb9yPgBeu6Guz7PLYh8OSjX0p4HzXVA';
const BASE_URL = 'https://api.omnidimension.xyz';

// Mock implementation for demo purposes
const MOCK_MODE = true; // Set to false when real API is available

export const omniDimensionAPI = {
  async speechToText(audioBlob: Blob): Promise<string> {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return a mock transcription for demo purposes
      const mockTranscriptions = [
        "What is a quadratic equation?",
        "Explain Newton's laws of motion",
        "How does photosynthesis work?",
        "What is the derivative of x squared?",
        "Explain the structure of an atom",
        "How do I solve integration problems?",
        "What is the difference between ionic and covalent bonds?",
        "Explain kinetic and potential energy",
        "How do I prepare for NEET exam?",
        "What are the laws of thermodynamics?",
        "Explain DNA replication process",
        "How to solve trigonometric equations?"
      ];
      
      return mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
    }

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('language', 'en');
      
      const response = await fetch(`${BASE_URL}/speech-to-text`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`STT API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.transcript || data.text || '';
      
    } catch (error) {
      console.error('Speech-to-text error:', error);
      throw new Error('Failed to convert speech to text. Please try again.');
    }
  },

  async textToSpeech(text: string): Promise<string> {
    if (MOCK_MODE) {
      // Use Web Speech API directly for better compatibility
      return this.generateSpeechWithWebAPI(text);
    }

    try {
      const response = await fetch(`${BASE_URL}/text-to-speech`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          language: 'en',
        }),
      });
      
      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status}`);
      }
      
      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
      
    } catch (error) {
      console.error('Text-to-speech error:', error);
      throw new Error('Failed to convert text to speech. Please try again.');
    }
  },

  generateSpeechWithWebAPI(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Create a silent audio file as placeholder since Web Speech API doesn't return audio URLs
      // We'll handle the actual speech in the component
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          reject(new Error('Failed to create audio placeholder'));
        }
      });
    });
  },

  speakText(text: string): void {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Try to use a clear English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => 
        voice.lang.startsWith('en') && (voice.name.includes('Google') || voice.name.includes('Microsoft'))
      ) || voices.find(voice => voice.lang.startsWith('en'));
      
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  },

  async processWithAI(voiceInput: string): Promise<string> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    try {
      // This would integrate with your AI service (OpenAI, etc.)
      // For demo purposes, using intelligent sample responses
      return this.generateIntelligentResponse(voiceInput);
      
    } catch (error) {
      console.error('AI processing error:', error);
      return 'I encountered an issue processing your question. Please try asking again.';
    }
  },

  generateIntelligentResponse(question: string): string {
    const lowerQuestion = question.toLowerCase();
    
    // Mathematics responses
    if (lowerQuestion.includes('quadratic') || lowerQuestion.includes('equation')) {
      return 'A quadratic equation has the form ax squared plus bx plus c equals zero. To solve it, use the quadratic formula: x equals negative b plus or minus the square root of b squared minus 4ac, all divided by 2a. For example, if you have x squared minus 5x plus 6 equals zero, then a equals 1, b equals negative 5, and c equals 6. This gives you x equals 2 or x equals 3.';
    }
    
    if (lowerQuestion.includes('derivative') || lowerQuestion.includes('calculus')) {
      return 'A derivative measures how fast a function changes. For example, the derivative of x squared is 2x. This means if you have a curve y equals x squared, at any point x, the slope of the tangent line is 2x. At x equals 3, the slope would be 6.';
    }
    
    if (lowerQuestion.includes('integration') || lowerQuestion.includes('integral')) {
      return 'Integration is the reverse of differentiation. If the derivative of x squared is 2x, then the integral of 2x is x squared plus a constant. Think of it as finding the area under a curve.';
    }
    
    if (lowerQuestion.includes('trigonometric') || lowerQuestion.includes('trigonometry')) {
      return 'Trigonometry deals with triangles and angles. The basic functions are sine, cosine, and tangent. For a right triangle, sine equals opposite over hypotenuse, cosine equals adjacent over hypotenuse, and tangent equals opposite over adjacent.';
    }
    
    // Physics responses
    if (lowerQuestion.includes('newton') || lowerQuestion.includes('force') || lowerQuestion.includes('motion')) {
      return 'Newton\'s first law states that an object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force. Newton\'s second law is F equals ma, meaning force equals mass times acceleration. For example, if you push a 2 kilogram box with 10 newtons of force, it accelerates at 5 meters per second squared.';
    }
    
    if (lowerQuestion.includes('energy') || lowerQuestion.includes('kinetic') || lowerQuestion.includes('potential')) {
      return 'Kinetic energy is the energy of motion, calculated as half times mass times velocity squared. Potential energy is stored energy, like a ball held up high. When you drop the ball, potential energy converts to kinetic energy.';
    }
    
    if (lowerQuestion.includes('thermodynamics')) {
      return 'The first law of thermodynamics states that energy cannot be created or destroyed, only transferred. The second law states that entropy always increases in an isolated system. The third law states that absolute zero temperature cannot be reached.';
    }
    
    // Chemistry responses
    if (lowerQuestion.includes('atom') || lowerQuestion.includes('electron') || lowerQuestion.includes('proton')) {
      return 'An atom has a nucleus containing protons and neutrons, surrounded by electrons in shells. Protons are positive, electrons are negative, and neutrons are neutral. The number of protons determines the element.';
    }
    
    if (lowerQuestion.includes('bond') || lowerQuestion.includes('ionic') || lowerQuestion.includes('covalent')) {
      return 'Ionic bonds form when electrons transfer from one atom to another, like sodium giving an electron to chlorine to make salt. Covalent bonds form when atoms share electrons, like in water where hydrogen and oxygen share electrons.';
    }
    
    // Biology responses
    if (lowerQuestion.includes('dna') || lowerQuestion.includes('replication')) {
      return 'DNA replication is the process where DNA makes a copy of itself. The double helix unwinds, and each strand serves as a template. DNA polymerase adds complementary nucleotides: A pairs with T, and G pairs with C.';
    }
    
    if (lowerQuestion.includes('photosynthesis')) {
      return 'Photosynthesis is how plants make food using sunlight. The equation is: carbon dioxide plus water plus sunlight makes glucose plus oxygen. This happens in chloroplasts using chlorophyll to capture light energy.';
    }
    
    // Exam preparation
    if (lowerQuestion.includes('neet') || lowerQuestion.includes('exam') || lowerQuestion.includes('preparation')) {
      return 'For NEET preparation, focus on NCERT books first, then solve previous year questions. Create a study schedule covering Physics, Chemistry, and Biology equally. Practice mock tests regularly and review your mistakes. Consistency is key to success.';
    }
    
    // Default response for other questions
    return `Here's the answer to your question about ${question}. This concept is important for understanding the fundamentals. Practice with examples to strengthen your knowledge, and remember that consistent study leads to better results in your exams.`;
  }
};
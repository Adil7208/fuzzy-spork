# Easy Learn Platform 🎓

A modern, AI-powered educational platform that combines voice interaction, video learning, and teacher collaboration to create an immersive learning experience.

## 🌟 Live Demo

**[Try it now!](https://melodious-gelato-824605.netlify.app/)**

## ✨ Features

### 🎤 AI Voice Tutor
- **Voice-to-Text**: Ask questions using your voice and get instant transcriptions
- **AI-Powered Responses**: Get intelligent, educational answers from an AI tutor
- **Text-to-Speech**: Listen to responses with natural speech synthesis
- **Real-time Processing**: See the step-by-step process of your question being processed
- **Regenerate Answers**: Get alternative explanations with a single click

### 📹 Video Learning Hub
- **Expert Teacher Videos**: Access curated educational content from subject matter experts
- **Multiple Subjects**: Mathematics, Physics, Chemistry, Biology, and more
- **Interactive Interface**: Beautiful video cards with play controls and teacher information
- **Duration Tracking**: Know exactly how long each lesson takes

### 👨‍🏫 Teacher Portal
- **Teacher Registration**: Easy sign-up and login system for educators
- **Video Upload**: Upload and manage educational videos
- **Analytics Dashboard**: Track views, likes, and engagement metrics
- **Content Management**: Organize videos by subject and manage your teaching portfolio

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom gradients and animations
- **Build Tool**: Vite for fast development and optimized builds
- **Icons**: Lucide React for beautiful, consistent icons
- **Voice Processing**: Web Speech API for speech synthesis
- **AI Integration**: OmniDimension API for speech-to-text and AI processing
- **Deployment**: Netlify for seamless hosting

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd easy-learn-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📱 How to Use

### For Students
1. **Voice Learning**: Click the microphone button and ask your question
2. **Watch Videos**: Browse the video library and learn from expert teachers
3. **Get Help**: Use the AI tutor for instant answers to your questions

### For Teachers
1. **Sign Up**: Create your teaching account
2. **Upload Content**: Share your educational videos with students
3. **Track Progress**: Monitor your content's performance and student engagement

## 🎯 Key Features in Detail

### Voice Interaction Flow
1. **Recording**: Tap the microphone to start recording your question
2. **Transcription**: Your speech is converted to text in real-time
3. **Echo**: The system repeats your question for confirmation
4. **AI Processing**: Advanced AI generates an educational response
5. **Speech Output**: The answer is spoken back to you naturally

### Video Learning Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Hover Effects**: Interactive elements provide visual feedback
- **Teacher Profiles**: Learn about the educators behind each video
- **Subject Organization**: Easy navigation by academic subject

### Teacher Dashboard
- **Upload Interface**: Drag-and-drop video upload functionality
- **Analytics**: View detailed statistics for your content
- **Content Management**: Edit, delete, and organize your videos
- **Student Engagement**: Track likes, views, and feedback

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_OMNIDIMENSION_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.omnidimension.xyz
```

### API Integration
The platform integrates with the OmniDimension API for:
- Speech-to-text conversion
- AI-powered question answering
- Text-to-speech synthesis

## 🎨 Design System

The platform uses a modern design system with:
- **Color Palette**: Blue to purple gradients for a professional, educational feel
- **Typography**: Clean, readable fonts optimized for learning
- **Animations**: Smooth transitions and micro-interactions
- **Responsive Layout**: Mobile-first design approach

## 📊 Performance

- **Fast Loading**: Optimized with Vite for quick development and builds
- **Voice Processing**: Real-time speech recognition and synthesis
- **Responsive**: Smooth experience across all device sizes
- **Accessibility**: Built with accessibility best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OmniDimension API** for voice processing capabilities
- **Lucide React** for beautiful icons
- **Tailwind CSS** for the styling framework
- **Vite** for the build tool
- **Netlify** for hosting and deployment

## 📞 Support

If you have any questions or need support, please:
- Open an issue on GitHub
- Contact the development team
- Check the live demo for examples

---

**Built with ❤️ for better education**

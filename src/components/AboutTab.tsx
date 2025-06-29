import React from 'react';
import { Brain, Users, Award, BookOpen, Mic, Globe } from 'lucide-react';

const AboutTab: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Meet Exam Whisperer, your intelligent tutor that answers questions in Hinglish for better understanding.'
    },
    {
      icon: Mic,
      title: 'Voice-First Experience',
      description: 'Ask questions naturally using your voice and get spoken responses for an interactive learning experience.'
    },
    {
      icon: BookOpen,
      title: 'Expert Video Lessons',
      description: 'Access comprehensive video lessons created by experienced teachers across various subjects.'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Join thousands of students preparing for competitive exams like GATE, NEET, JEE, and more.'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Our students consistently achieve excellent results in their competitive examinations.'
    },
    {
      icon: Globe,
      title: 'Accessible Anywhere',
      description: 'Learn from anywhere with our responsive platform that works on all devices.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Students' },
    { number: '500+', label: 'Expert Teachers' },
    { number: '10,000+', label: 'Video Lessons' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Brain className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Easy Learn
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Easy Learn revolutionizes education through AI-powered voice interaction and expert video lessons. 
          Our platform combines cutting-edge technology with proven teaching methods to help students excel 
          in competitive examinations.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose Easy Learn?</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            To democratize quality education by making learning accessible, interactive, and effective 
            for students across India. We believe that every student deserves personalized attention 
            and expert guidance, regardless of their location or background.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Through innovative technology and dedicated teachers, we're building a future where 
            educational excellence is within everyone's reach.
          </p>
        </div>
      </div>

      {/* Technology Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-3xl font-bold text-center mb-8">Powered by Advanced Technology</h3>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h4 className="text-2xl font-bold mb-4 text-blue-600">Exam Whisperer AI</h4>
            <p className="text-gray-700 mb-4">
              Our AI tutor understands and responds in Hinglish, making learning more relatable 
              for Indian students. Using advanced speech recognition and natural language processing, 
              it provides instant, accurate answers to your questions.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Natural voice interaction</li>
              <li>• Multilingual support (Hindi + English)</li>
              <li>• Instant question processing</li>
              <li>• Contextual learning responses</li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white">
            <h4 className="text-xl font-bold mb-4">Key Features</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Voice-to-text conversion</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>AI-powered responses</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Text-to-speech synthesis</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>24/7 availability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
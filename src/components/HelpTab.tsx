import React, { useState } from 'react';
import { MessageCircle, Mic, Volume2, BookOpen, Users, Settings, ChevronDown, ChevronRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const HelpTab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: BookOpen },
    { id: 'voice-features', label: 'Voice Features', icon: Mic },
    { id: 'video-lessons', label: 'Video Lessons', icon: Volume2 },
    { id: 'teacher-panel', label: 'Teacher Panel', icon: Users },
    { id: 'technical', label: 'Technical Support', icon: Settings },
  ];

  const faqs: FAQItem[] = [
    {
      question: 'How do I start using Easy Learn?',
      answer: 'Simply click on the "AI Solution" tab and tap the microphone button to ask your first question. You can speak in Hindi, English, or mix both languages.',
      category: 'getting-started'
    },
    {
      question: 'What subjects are covered?',
      answer: 'We cover all major subjects including Mathematics, Physics, Chemistry, Biology, and English. Our content is designed for school, college, and competitive exam preparation.',
      category: 'getting-started'
    },
    {
      question: 'Is Easy Learn free to use?',
      answer: 'Yes! Easy Learn offers free access to basic features including AI tutoring and selected video lessons. Premium features are available with a subscription.',
      category: 'getting-started'
    },
    {
      question: 'How does the voice feature work?',
      answer: 'Click the microphone button, speak your question clearly, and our AI will process your speech, understand your question, and provide a spoken response in Hinglish.',
      category: 'voice-features'
    },
    {
      question: 'Can I speak in Hindi?',
      answer: 'Absolutely! Our AI tutor "Exam Whisperer" is designed to understand and respond in Hinglish (Hindi + English mix) for better comprehension.',
      category: 'voice-features'
    },
    {
      question: 'What if the AI doesn\'t understand my question?',
      answer: 'Try speaking more slowly and clearly. If issues persist, you can rephrase your question or contact our support team for assistance.',
      category: 'voice-features'
    },
    {
      question: 'How do I access video lessons?',
      answer: 'Go to the "Video Lessons" tab to browse our extensive library. You can search by subject, teacher, or topic to find relevant content.',
      category: 'video-lessons'
    },
    {
      question: 'Can I download videos for offline viewing?',
      answer: 'Currently, videos are available for online streaming only. We\'re working on adding offline download capabilities in future updates.',
      category: 'video-lessons'
    },
    {
      question: 'How do I become a teacher on Easy Learn?',
      answer: 'Click on "Teacher" in the header and select "Request Access". Our team will review your qualifications and contact you within 2-3 business days.',
      category: 'teacher-panel'
    },
    {
      question: 'What video formats are supported for upload?',
      answer: 'We support MP4, AVI, and MOV formats. Videos should be high quality (minimum 720p) and have clear audio for the best student experience.',
      category: 'teacher-panel'
    },
    {
      question: 'The microphone is not working. What should I do?',
      answer: 'Check your browser permissions and ensure microphone access is allowed. Try refreshing the page or using a different browser if issues persist.',
      category: 'technical'
    },
    {
      question: 'Which browsers are supported?',
      answer: 'Easy Learn works best on Chrome, Firefox, Safari, and Edge. Make sure your browser is updated to the latest version for optimal performance.',
      category: 'technical'
    },
  ];

  const filteredFAQs = faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <MessageCircle className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Help & Support
        </h2>
        <p className="text-xl text-gray-600">
          Find answers to common questions and learn how to get the most out of Easy Learn
        </p>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-center">Quick Start Guide</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h4 className="font-bold mb-2">Click the Mic</h4>
            <p className="text-gray-600 text-sm">Go to AI Solution tab and tap the microphone button</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-purple-600">2</span>
            </div>
            <h4 className="font-bold mb-2">Ask Your Question</h4>
            <p className="text-gray-600 text-sm">Speak clearly in Hindi, English, or both</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <h4 className="font-bold mb-2">Get Your Answer</h4>
            <p className="text-gray-600 text-sm">Listen to the AI tutor's response and learn</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Category Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <nav className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-6">
              {categories.find(cat => cat.id === activeCategory)?.label} FAQs
            </h3>
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFAQ === index ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? Our support team is here to help you succeed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            Contact Support
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Join Community
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpTab;
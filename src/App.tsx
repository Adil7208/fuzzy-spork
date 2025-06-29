import React, { useState } from 'react';
import Header from './components/Header';
import SolutionTab from './components/SolutionTab';
import VideoTab from './components/VideoTab';
import TeacherTab from './components/TeacherTab';

export type Tab = 'solution' | 'video' | 'teacher';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('solution');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'solution':
        return <SolutionTab />;
      case 'video':
        return <VideoTab />;
      case 'teacher':
        return <TeacherTab />;
      default:
        return <SolutionTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('solution')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'solution'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Solution Tab
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'video'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Video Tab
              </button>
              <button
                onClick={() => setActiveTab('teacher')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'teacher'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Teacher Tab
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
}

export default App;
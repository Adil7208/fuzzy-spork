import React from 'react';
import { MessageSquare, Play, UserCheck, Info, HelpCircle } from 'lucide-react';
import type { Tab } from '../App';

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'solution' as Tab, label: 'AI Solution', icon: MessageSquare },
    { id: 'video' as Tab, label: 'Video Lessons', icon: Play },
    { id: 'teacher' as Tab, label: 'Teacher Panel', icon: UserCheck },
    { id: 'about' as Tab, label: 'About', icon: Info },
    { id: 'help' as Tab, label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105'
                  : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
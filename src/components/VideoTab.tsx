import React from 'react';
import { Play, Clock, User } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  duration: string;
  teacher: string;
  thumbnail: string;
}

const VideoTab: React.FC = () => {
  const videos: Video[] = [
    {
      id: '1',
      title: 'Quadratic Equations - Complete Solution Methods',
      duration: '45:20',
      teacher: 'Dr. Sharma',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Newton\'s Laws of Motion Explained',
      duration: '38:15',
      teacher: 'Prof. Gupta',
      thumbnail: 'https://images.pexels.com/photos/5212663/pexels-photo-5212663.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Organic Chemistry Basics - NEET Preparation',
      duration: '52:30',
      teacher: 'Dr. Patel',
      thumbnail: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      title: 'Cell Structure and Functions',
      duration: '41:10',
      teacher: 'Dr. Singh',
      thumbnail: 'https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Video Lessons
        </h2>
        <p className="text-xl text-gray-600">
          Watch expert teachers explain concepts step by step
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            {/* Thumbnail */}
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white rounded-full p-4 transform hover:scale-110 transition-transform duration-200">
                  <Play className="h-8 w-8 text-blue-600" />
                </button>
              </div>
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{video.duration}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-bold text-xl mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                {video.title}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{video.teacher}</span>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Play</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoTab;
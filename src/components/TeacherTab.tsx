import React, { useState } from 'react';
import { Upload, Video, Eye, Heart, Trash2, BookOpen, User, Plus, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadedVideo {
  id: string;
  title: string;
  subject: string;
  views: number;
  likes: number;
  uploadDate: string;
  thumbnail: string;
}

interface Teacher {
  name: string;
  email: string;
  subject: string;
}

const TeacherTab: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    subject: ''
  });
  
  const [uploadData, setUploadData] = useState({
    title: '',
    subject: '',
    file: null as File | null
  });

  const [teacher, setTeacher] = useState<Teacher>({
    name: 'Dr. Sharma',
    email: 'sharma@example.com',
    subject: 'Mathematics'
  });

  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([
    {
      id: '1',
      title: 'Advanced Calculus - Integration Techniques',
      subject: 'Mathematics',
      views: 2340,
      likes: 187,
      uploadDate: '2024-01-15',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      title: 'Quadratic Equations Masterclass',
      subject: 'Mathematics',
      views: 1890,
      likes: 156,
      uploadDate: '2024-01-10',
      thumbnail: 'https://images.pexels.com/photos/5212338/pexels-photo-5212338.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      title: 'Trigonometry Fundamentals',
      subject: 'Mathematics',
      views: 1456,
      likes: 98,
      uploadDate: '2024-01-05',
      thumbnail: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Simulate login validation
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
      setSuccessMessage(`Welcome back, ${teacher.name}!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setErrorMessage('Please enter valid credentials');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validation
    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    
    if (signUpData.name && signUpData.email && signUpData.password && signUpData.subject) {
      // Update teacher info with sign-up data
      setTeacher({
        name: signUpData.name,
        email: signUpData.email,
        subject: signUpData.subject
      });
      
      setIsLoggedIn(true);
      setSuccessMessage(`Account created successfully! Welcome, ${signUpData.name}!`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Reset form
      setSignUpData({ name: '', email: '', password: '', confirmPassword: '', subject: '' });
      setIsSignUp(false);
    } else {
      setErrorMessage('Please fill in all fields');
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (uploadData.title && uploadData.subject && uploadData.file) {
      // Create new video entry
      const newVideo: UploadedVideo = {
        id: Date.now().toString(),
        title: uploadData.title,
        subject: uploadData.subject,
        views: 0,
        likes: 0,
        uploadDate: new Date().toISOString().split('T')[0],
        thumbnail: 'https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=300'
      };
      
      // Add to uploaded videos list
      setUploadedVideos(prev => [newVideo, ...prev]);
      
      // Show success message
      setSuccessMessage('Video uploaded successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Reset form
      setUploadData({ title: '', subject: '', file: null });
    } else {
      setErrorMessage('Please fill in all fields and select a video file');
    }
  };

  const handleDeleteVideo = (videoId: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      setUploadedVideos(prev => prev.filter(video => video.id !== videoId));
      setSuccessMessage('Video deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadData({ ...uploadData, file });
  };

  const totalViews = uploadedVideos.reduce((sum, video) => sum + video.views, 0);
  const totalLikes = uploadedVideos.reduce((sum, video) => sum + video.likes, 0);

  // Login/Sign-up Form
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isSignUp ? 'Teacher Sign Up' : 'Teacher Login'}
            </h2>
            <p className="text-gray-600">
              {isSignUp ? 'Create your teaching account' : 'Sign in to upload teaching videos'}
            </p>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-700 text-sm">{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-700 text-sm">{errorMessage}</span>
            </div>
          )}

          {isSignUp ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={signUpData.name}
                  onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dr. John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="teacher@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Subject
                </label>
                <select
                  required
                  value={signUpData.subject}
                  onChange={(e) => setSignUpData({ ...signUpData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={signUpData.confirmPassword}
                  onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Create Account
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="teacher@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Sign In
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {isSignUp ? 'Already have an account?' : 'New teacher?'}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className="text-blue-600 hover:underline ml-1 font-medium"
              >
                {isSignUp ? 'Sign in here' : 'Sign up here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Teacher Dashboard
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Teacher Dashboard
          </h2>
          <p className="text-xl text-gray-600">Welcome back, {teacher.name}!</p>
          <p className="text-gray-500">{teacher.subject} • {teacher.email}</p>
        </div>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setLoginData({ email: '', password: '' });
            setSuccessMessage('');
            setErrorMessage('');
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-700">{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-700">{errorMessage}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Videos</p>
              <p className="text-2xl font-bold">{uploadedVideos.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Likes</p>
              <p className="text-2xl font-bold">{totalLikes}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Video Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-lg">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Upload New Video</h3>
          </div>

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Title
              </label>
              <input
                type="text"
                required
                value={uploadData.title}
                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter video title (e.g., Advanced Calculus - Part 1)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                required
                value={uploadData.subject}
                onChange={(e) => setUploadData({ ...uploadData, subject: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">Choose video file to upload</p>
                <p className="text-sm text-gray-500 mb-3">Supported formats: MP4, AVI, MOV (Max: 500MB)</p>
                <input
                  type="file"
                  accept="video/*"
                  required
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {uploadData.file && (
                  <p className="mt-2 text-sm text-green-600 font-medium">
                    ✓ Selected: {uploadData.file.name}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Video</span>
            </button>
          </form>
        </div>

        {/* Uploaded Videos List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Your Videos</h3>
            <span className="text-sm text-gray-500">{uploadedVideos.length} videos</span>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {uploadedVideos.map((video) => (
              <div key={video.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{video.title}</h4>
                  <p className="text-sm text-gray-500">{video.subject}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Eye className="h-3 w-3" />
                      <span>{video.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Heart className="h-3 w-3" />
                      <span>{video.likes}</span>
                    </div>
                    <span className="text-xs text-gray-400">{video.uploadDate}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteVideo(video.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete video"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            {uploadedVideos.length === 0 && (
              <div className="text-center py-8">
                <Video className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No videos uploaded yet</p>
                <p className="text-sm text-gray-400">Upload your first video to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherTab;
/**
 * AetherAI - Social Feed Component
 * File: SocialFeed.jsx
 * Purpose: Share experiments and build a global learning community
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Connect AI students worldwide to inspire and learn from each other.
 */

import React, { useState, useEffect } from 'react';

const SocialFeed = ({ experimentData }) => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('feed');
  const [newPostContent, setNewPostContent] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [trending, setTrending] = useState([]);

  // Mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeed([
        {
          id: 'post_001',
          student: {
            name: 'Kareem Mostafa',
            avatar: '/avatars/kareem.png',
            school: 'El-Abtal Language School',
            country: 'Egypt'
          },
          experiment: {
            model: 'CNN',
            dataset: 'MNIST',
            accuracy: 0.983,
            loss: 0.054,
            training_time: 240
          },
          content: 'Just achieved 98.3% accuracy on MNIST with my custom CNN! The key was using dropout and data augmentation. Can\'t believe I did this from my phone!',
          image: '/experiments/exp_123_preview.png',
          likes: 24,
          comments: 8,
          shares: 3,
          timestamp: '2025-04-15T14:35:00Z',
          tags: ['#CNN', '#MNIST', '#MobileAI']
        },
        {
          id: 'post_002',
          student: {
            name: 'Yusuf Mohammed',
            avatar: '/avatars/yusuf.png',
            school: 'Future City STEM Academy',
            country: 'Egypt'
          },
          experiment: {
            model: 'MLP',
            dataset: 'CIFAR-10',
            accuracy: 0.721,
            loss: 0.854,
            training_time: 360
          },
          content: 'My first attempt at CIFAR-10! Still struggling with overfitting, but proud of my progress. Any suggestions for improvement?',
          image: '/experiments/exp_124_preview.png',
          likes: 18,
          comments: 12,
          shares: 5,
          timestamp: '2025-04-15T14:00:00Z',
          tags: ['#CIFAR10', '#Beginner', '#Overfitting']
        },
        {
          id: 'post_003',
          student: {
            name: 'Lina Chen',
            avatar: '/avatars/lina.png',
            school: 'Beijing International School',
            country: 'China'
          },
          experiment: {
            model: 'ResNet',
            dataset: 'MNIST',
            accuracy: 0.991,
            loss: 0.032,
            training_time: 420
          },
          content: 'Optimized ResNet architecture for MNIST! Used learning rate scheduling and batch normalization. The global leaderboard motivates me to keep improving!',
          image: '/experiments/exp_125_preview.png',
          likes: 31,
          comments: 6,
          shares: 8,
          timestamp: '2025-04-15T12:30:00Z',
          tags: ['#ResNet', '#Optimization', '#Leaderboard']
        }
      ]);

      setTrending([
        {
          title: '98.3% Accuracy on MNIST with Custom CNN',
          student: 'Kareem Mostafa',
          school: 'El-Abtal Language School',
          country: 'Egypt',
          accuracy: 0.983,
          image: '/experiments/exp_123_preview.png'
        },
        {
          title: 'Optimized ResNet for MNIST Classification',
          student: 'Lina Chen',
          school: 'Beijing International School',
          country: 'China',
          accuracy: 0.991,
          image: '/experiments/exp_125_preview.png'
        },
        {
          title: 'First Attempt at CIFAR-10 Classification',
          student: 'Yusuf Mohammed',
          school: 'Future City STEM Academy',
          country: 'Egypt',
          accuracy: 0.721,
          image: '/experiments/exp_124_preview.png'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (postId) => {
    setFeed(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 } 
        : post
    ));
  };

  const handleShare = () => {
    if (!newPostContent.trim()) {
      alert('Please write something about your experiment');
      return;
    }

    const newPost = {
      id: `post_${feed.length + 1}`,
      student: {
        name: 'You',
        avatar: '/avatars/you.png',
        school: 'Your School',
        country: 'Your Country'
      },
      experiment: experimentData || {
        model: 'CNN',
        dataset: 'MNIST',
        accuracy: 0.95,
        loss: 0.1,
        training_time: 180
      },
      content: newPostContent,
      image: '/experiments/your_exp_preview.png',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
      tags: ['#AetherAI', '#StudentResearch']
    };

    setFeed(prev => [newPost, ...prev]);
    setNewPostContent('');
    setShowShareModal(false);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Social Feed 🌍
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Share your AI experiments and connect with students worldwide. Inspire and be inspired!
      </p>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('feed')}
          className={`px-4 py-2 font-medium rounded-lg transition ${
            activeTab === 'feed'
              ? 'bg-cyan-400 text-black'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Feed
        </button>
        <button
          onClick={() => setActiveTab('trending')}
          className={`px-4 py-2 font-medium rounded-lg transition ${
            activeTab === 'trending'
              ? 'bg-cyan-400 text-black'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Trending
        </button>
      </div>

      {/* Share Button */}
      <button
        onClick={() => setShowShareModal(true)}
        className="w-full mb-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-black font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition"
      >
        ✨ Share Your Experiment
      </button>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
        </div>
      ) : null}

      {/* Feed Tab */}
      {activeTab === 'feed' && !loading && (
        <div className="space-y-6">
          {feed.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No experiments shared yet. Be the first to share!
            </div>
          ) : (
            feed.map((post) => (
              <div key={post.id} className="border border-gray-700 rounded-xl p-4 bg-black bg-opacity-30">
                {/* Post Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={post.student.avatar}
                    alt={post.student.name}
                    className="w-10 h-10 rounded-full border border-gray-600"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-white">{post.student.name}</div>
                    <div className="text-xs text-gray-400">
                      {post.student.school} • {post.student.country}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatTimeAgo(post.timestamp)}
                  </div>
                </div>

                {/* Experiment Preview */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs bg-cyan-900 text-cyan-200 px-2 py-1 rounded">
                      {post.experiment.model}
                    </span>
                    <span className="text-xs bg-purple-900 text-purple-200 px-2 py-1 rounded">
                      {post.experiment.dataset}
                    </span>
                    <span className="text-xs bg-green-900 text-green-200 px-2 py-1 rounded">
                      {post.experiment.accuracy.toFixed(3)} acc
                    </span>
                  </div>
                  
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Experiment preview"
                      className="w-full rounded-lg border border-gray-600"
                    />
                  )}
                </div>

                {/* Post Content */}
                <p className="text-gray-200 mb-3 whitespace-pre-line">{post.content}</p>

                {/* Tags */}
                {post.tags && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-cyan-400 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Trending Tab */}
      {activeTab === 'trending' && !loading && (
        <div className="space-y-4">
          {trending.map((exp, i) => (
            <div
              key={i}
              className="flex items-center space-x-4 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 hover:bg-opacity-70 transition"
            >
              <div className="text-2xl font-bold text-cyan-400">{i + 1}</div>
              <img
                src={exp.image}
                alt={exp.title}
                className="w-16 h-16 object-cover rounded-lg border border-gray-600"
              />
              <div className="flex-1">
                <div className="font-medium text-white">{exp.title}</div>
                <div className="text-sm text-gray-400">
                  by {exp.student} • {exp.school}
                </div>
                <div className="text-xs text-green-400 mt-1">
                  {exp.accuracy.toFixed(3)} accuracy
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
            <h4 className="text-xl font-bold mb-4 text-cyan-400">Share Your Experiment</h4>
            
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Tell the community about your experiment... What did you learn? What challenges did you face?"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 mb-4 resize-none"
              rows="4"
            />
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 py-2 bg-gray-700 text-gray-300 font-bold rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleShare}
                className="flex-1 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-bold rounded-lg hover:opacity-90 transition"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">💡 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          Share your AI experiments with students worldwide. Get feedback, encouragement, 
          and connect with the global AI learning community. In the full version, this connects 
          to a real-time social feed API.
        </p>
      </div>
    </div>
  );
};

export default SocialFeed;

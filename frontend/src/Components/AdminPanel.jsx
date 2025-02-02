import React, { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  BarChart3,
  Users,
  Bot,
  ChevronDown,
  Search,
} from 'lucide-react';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const conversations = [
    { id: 1, user: 'John Doe', lastMessage: 'How can I reset my password?', time: '2 mins ago', status: 'active' },
    { id: 2, user: 'Sarah Smith', lastMessage: 'What are your business hours?', time: '15 mins ago', status: 'closed' },
    { id: 3, user: 'Mike Johnson', lastMessage: 'I need help with my order', time: '1 hour ago', status: 'active' },
  ];

  const stats = [
    { label: 'Total Conversations', value: '1,234', icon: MessageSquare },
    { label: 'Active Users', value: '892', icon: Users },
    { label: 'Response Rate', value: '95%', icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-yellow-400 flex">
      <div className="w-64 bg-yellow-400 border-r border-gray-200 hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Bot className="w-8 h-8 text-blue-600" />
            ChatBot Admin
          </h1>
        </div>
        <nav className="mt-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'conversations', label: 'Conversations', icon: MessageSquare },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                activeTab === item.id
                  ? 'text-blue-600 bg-amber-200 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-amber-300'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-lg"
        >
          <ChevronDown className={`w-6 h-6 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40">
          <div className="bg-white w-64 min-h-screen">
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <header className="bg-yellow-400 border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <Search className="w-5 h-5 text-orange-900 absolute left-3 top-2.5" />
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-amber-200 rounded-lg shadow-sm p-6 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                    <stat.icon className="w-12 h-12 text-blue-600" />
                  </div>
                ))}
              </div>

              <div className="bg-amber-200 rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Conversations</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {conversations.map((conversation) => (
                    <div key={conversation.id} className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{conversation.user}</p>
                        <p className="text-sm text-gray-600">{conversation.lastMessage}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{conversation.time}</p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            conversation.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {conversation.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'conversations' && (
            <div className="bg-yellow-400 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">All Conversations</h3>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-amber-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Bot Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bot Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    defaultValue="Customer Support Bot"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Welcome Message</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    defaultValue="Hi! How can I help you today?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Language</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-amber-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Performance Metrics</h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-red-500 rounded-lg">
                  <p className="text-black">Analytics charts will be displayed here</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;

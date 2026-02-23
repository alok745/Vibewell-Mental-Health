import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Mail, Shield, Calendar, Activity, Brain, ClipboardCheck, Sun, Moon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    My Profile
                </h1>
                <p className={`mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Manage your account and preferences
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className={`lg:col-span-1 rounded-2xl p-8 border text-center ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                    }`}>
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#c5a944] to-[#e8d48b] flex items-center justify-center text-4xl font-bold text-gray-900 mb-4">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user?.name || 'User'}
                    </h2>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {user?.email || 'user@example.com'}
                    </p>
                    <span className="inline-block mt-3 px-4 py-1.5 rounded-full text-xs font-bold bg-[#c5a944]/10 text-[#c5a944] border border-[#c5a944]/20 capitalize">
                        {user?.role || 'user'}
                    </span>
                </div>

                {/* Account Details */}
                <div className={`lg:col-span-2 rounded-2xl p-8 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                    }`}>
                    <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Account Information
                    </h3>
                    <div className="space-y-5">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-gray-800 text-[#c5a944]' : 'bg-[#c5a944]/10 text-[#c5a944]'
                                }`}>
                                <User size={20} />
                            </div>
                            <div className="flex-1">
                                <p className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Full Name</p>
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.name || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-50 text-blue-600'
                                }`}>
                                <Mail size={20} />
                            </div>
                            <div className="flex-1">
                                <p className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Email Address</p>
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.email || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-gray-800 text-purple-400' : 'bg-purple-50 text-purple-600'
                                }`}>
                                <Shield size={20} />
                            </div>
                            <div className="flex-1">
                                <p className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Account Role</p>
                                <p className={`font-semibold capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.role || 'user'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className={`rounded-2xl p-8 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                }`}>
                <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`flex items-center gap-4 p-5 rounded-xl border transition-all hover:shadow-md ${darkMode
                                ? 'bg-gray-800 border-gray-700 hover:border-[#c5a944]/30'
                                : 'bg-gray-50 border-gray-200 hover:border-[#c5a944]/30'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-[#c5a944]/10 text-[#c5a944]' : 'bg-[#c5a944]/10 text-[#c5a944]'
                            }`}>
                            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                        </div>
                        <div className="text-left">
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Currently: {darkMode ? 'Dark' : 'Light'} mode
                            </p>
                        </div>
                    </button>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-4 p-5 rounded-xl border transition-all hover:shadow-md ${darkMode
                                ? 'bg-gray-800 border-gray-700 hover:border-red-500/30'
                                : 'bg-gray-50 border-gray-200 hover:border-red-300'
                            }`}
                    >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-500/10 text-red-500">
                            <LogOut size={22} />
                        </div>
                        <div className="text-left">
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Sign Out
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Log out of your account
                            </p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                    }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'
                        }`}>
                        <Brain size={22} />
                    </div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>AI Conversations</p>
                    <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>—</p>
                </div>
                <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                    }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${darkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'
                        }`}>
                        <ClipboardCheck size={22} />
                    </div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Assessments Taken</p>
                    <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>—</p>
                </div>
                <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                    }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${darkMode ? 'bg-[#c5a944]/10 text-[#c5a944]' : 'bg-[#c5a944]/10 text-[#c5a944]'
                        }`}>
                        <Calendar size={22} />
                    </div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Member Since</p>
                    <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Today</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;

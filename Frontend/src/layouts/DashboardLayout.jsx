import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, ClipboardList, History, LogOut, ShieldCheck, Home, Menu, X, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <MessageSquare size={20} />, label: 'AI Chat', path: '/chat' },
    { icon: <ClipboardList size={20} />, label: 'Assessment', path: '/assessment' },
    { icon: <History size={20} />, label: 'History', path: '/history' },
    { icon: <User size={20} />, label: 'Profile', path: '/profile' },
    { icon: <Home size={20} />, label: 'Back to Site', path: '/' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50 h-full w-72 p-5 flex flex-col
          transform transition-all duration-300 ease-in-out border-r
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${darkMode
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
          }
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#c5a944] flex items-center justify-center text-white font-black text-lg">
              V
            </div>
            <div>
              <span className="text-xl font-bold text-[#c5a944]">VibeWell</span>
              <p className={`text-[10px] uppercase tracking-[0.2em] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Dashboard
              </p>
            </div>
          </Link>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          </button>
        </div>

        {/* User Card */}
        <Link
          to="/profile"
          className={`mb-6 p-4 rounded-xl border transition-all hover:shadow-sm ${darkMode
              ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800'
              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c5a944] to-[#e8d48b] flex items-center justify-center font-bold text-sm text-gray-900">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name || 'User'}</p>
              <p className={`text-[11px] truncate ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {user?.email || ''}
              </p>
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          <p className={`text-[10px] uppercase tracking-[0.15em] font-semibold mb-3 px-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'
            }`}>
            Navigation
          </p>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative text-sm font-medium
                  ${isActive
                    ? darkMode
                      ? 'bg-[#c5a944]/10 text-[#c5a944] border border-[#c5a944]/20'
                      : 'bg-[#c5a944]/10 text-[#c5a944] border border-[#c5a944]/20'
                    : darkMode
                      ? 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
                  }
                `}
              >
                <span className={`transition-colors ${isActive ? 'text-[#c5a944]' : ''}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute right-3 w-1.5 h-1.5 bg-[#c5a944] rounded-full" />
                )}
              </Link>
            );
          })}

          {user?.role === 'admin' && (
            <>
              <div className={`my-3 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`} />
              <p className="text-[10px] text-red-400/60 uppercase tracking-[0.15em] font-semibold mb-3 px-3">Admin</p>
              <Link
                to="/admin"
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium
                  ${location.pathname === '/admin'
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                    : 'text-red-400/60 hover:bg-red-500/5 hover:text-red-500 border border-transparent'
                  }
                `}
              >
                <ShieldCheck size={20} />
                <span>Admin Panel</span>
              </Link>
            </>
          )}
        </nav>

        {/* Bottom: Theme + Logout */}
        <div className={`pt-4 border-t space-y-2 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all text-sm font-medium ${darkMode
                ? 'text-gray-400 hover:text-[#c5a944] hover:bg-gray-800'
                : 'text-gray-500 hover:text-[#c5a944] hover:bg-gray-100'
              }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all text-sm font-medium ${darkMode
                ? 'text-gray-500 hover:text-red-400 hover:bg-gray-800'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        {/* Mobile Header */}
        <div className={`md:hidden flex items-center justify-between p-4 border-b sticky top-0 z-30 backdrop-blur-xl ${darkMode ? 'border-gray-800 bg-gray-950/90' : 'border-gray-200 bg-white/90'
          }`}>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
          </button>
          <span className="font-bold text-[#c5a944]">VibeWell</span>
          <Link to="/profile" className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c5a944] to-[#e8d48b] flex items-center justify-center font-bold text-xs text-gray-900">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Link>
        </div>

        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
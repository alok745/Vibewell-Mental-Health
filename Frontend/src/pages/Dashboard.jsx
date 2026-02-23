import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, ClipboardCheck, History, TrendingUp, ArrowRight, Stethoscope, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../api/api';

const Dashboard = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/assessments');
        const list = Array.isArray(data) ? data : data?.data || [];
        setAssessments(list);
      } catch (err) {
        console.error('Failed to fetch assessments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const latest = assessments[0];
  const chartData = [...assessments].reverse().slice(-10).map((a, i) => ({
    name: `#${i + 1}`,
    score: a.score,
    type: a.type,
  }));

  const quickActions = [
    { icon: <Brain size={24} />, title: 'AI Chat', desc: 'Talk with our AI companion', path: '/chat', color: 'purple' },
    { icon: <ClipboardCheck size={24} />, title: 'Assessment', desc: 'Take a PHQ-9 or GAD-7 test', path: '/assessment', color: 'green' },
    { icon: <History size={24} />, title: 'History', desc: 'View past assessments', path: '/history', color: 'blue' },
    { icon: <Stethoscope size={24} />, title: 'Doctors', desc: 'Book an appointment', path: '/doctors', color: 'amber' },
  ];

  const colorMap = {
    purple: darkMode ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-600 border-purple-100',
    green: darkMode ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-600 border-green-100',
    blue: darkMode ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100',
    amber: darkMode ? 'bg-[#c5a944]/10 text-[#c5a944] border-[#c5a944]/20' : 'bg-amber-50 text-amber-600 border-amber-100',
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 size={32} className={`animate-spin mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
        <p className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Greeting */}
      <div>
        <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {getGreeting()}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className={`mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          Here's your mental wellness overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap.green.split(' ').slice(0, 2).join(' ')}`}>
            <ClipboardCheck size={22} />
          </div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Total Assessments</p>
          <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{assessments.length}</p>
        </div>

        <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap.blue.split(' ').slice(0, 2).join(' ')}`}>
            <TrendingUp size={22} />
          </div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Latest Score</p>
          <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {latest ? latest.score : '—'}
          </p>
        </div>

        <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${latest?.severity === 'Severe' || latest?.severity === 'Moderately Severe'
              ? 'bg-red-500/10 text-red-500'
              : colorMap.purple.split(' ').slice(0, 2).join(' ')
            }`}>
            {latest?.severity === 'Severe' ? <AlertTriangle size={22} /> : <Brain size={22} />}
          </div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Severity</p>
          <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {latest ? latest.severity : '—'}
          </p>
        </div>
      </div>

      {/* Chart */}
      {chartData.length > 1 && (
        <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Score Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1f2937' : '#f0f0f0'} />
                <XAxis dataKey="name" fontSize={12} stroke={darkMode ? '#6b7280' : '#9ca3af'} />
                <YAxis fontSize={12} stroke={darkMode ? '#6b7280' : '#9ca3af'} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                    backgroundColor: darkMode ? '#111827' : '#fff',
                    color: darkMode ? '#fff' : '#111',
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#c5a944" strokeWidth={3} dot={{ fill: '#c5a944', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              to={action.path}
              className={`p-5 rounded-2xl border transition-all group hover:shadow-lg ${darkMode
                  ? 'bg-gray-900 border-gray-800 hover:border-[#c5a944]/30'
                  : 'bg-white border-gray-200 hover:border-[#c5a944]/30'
                }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${colorMap[action.color]}`}>
                {action.icon}
              </div>
              <h4 className={`font-bold group-hover:text-[#c5a944] transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {action.title}
              </h4>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{action.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-[#c5a944] font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Open <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
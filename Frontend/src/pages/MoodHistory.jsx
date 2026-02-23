import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { History, TrendingUp, TrendingDown, Minus, Loader2, ClipboardCheck } from 'lucide-react';
import api from '../api/api';

const MoodHistory = () => {
  const { darkMode } = useTheme();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/assessments');
        const list = Array.isArray(data) ? data : data?.data || [];
        setAssessments(list);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const chartData = [...assessments].reverse().slice(-15).map((a, i) => ({
    name: new Date(a.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
    score: a.score,
    type: a.type,
    severity: a.severity,
  }));

  const avgScore = assessments.length > 0
    ? Math.round(assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length)
    : 0;

  const trend = assessments.length >= 2
    ? assessments[0].score < assessments[1].score ? 'improving' : assessments[0].score > assessments[1].score ? 'worsening' : 'stable'
    : 'stable';

  const severityBadge = (severity) => {
    const s = severity?.toLowerCase();
    if (s?.includes('severe')) return 'bg-red-500/10 text-red-500 border-red-500/20';
    if (s?.includes('moderate')) return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    if (s?.includes('mild')) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    return 'bg-green-500/10 text-green-500 border-green-500/20';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 size={32} className={`animate-spin mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
        <p className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>Loading history...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Assessment History</h1>
        <p className={`mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Track your mental health progress over time</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${darkMode ? 'bg-[#c5a944]/10 text-[#c5a944]' : 'bg-[#c5a944]/10 text-[#c5a944]'
            }`}>
            <ClipboardCheck size={22} />
          </div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Total Tests</p>
          <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{assessments.length}</p>
        </div>

        <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
            }`}>
            <History size={22} />
          </div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Average Score</p>
          <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{avgScore}</p>
        </div>

        <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${trend === 'improving'
              ? 'bg-green-500/10 text-green-500'
              : trend === 'worsening'
                ? 'bg-red-500/10 text-red-500'
                : darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'
            }`}>
            {trend === 'improving' ? <TrendingDown size={22} /> : trend === 'worsening' ? <TrendingUp size={22} /> : <Minus size={22} />}
          </div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Trend</p>
          <p className={`text-3xl font-bold mt-1 capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>{trend}</p>
        </div>
      </div>

      {/* Chart */}
      {chartData.length > 1 && (
        <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Score Over Time</h3>
          <div className="h-72">
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

      {/* History List */}
      <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className={`p-6 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>All Assessments</h3>
        </div>

        {assessments.length === 0 ? (
          <div className="p-12 text-center">
            <ClipboardCheck size={48} className={`mx-auto mb-4 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
            <p className={`font-medium ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>No assessments yet</p>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>Take your first test to start tracking.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {assessments.map((a, i) => (
              <div key={a._id || i} className={`p-5 flex items-center justify-between gap-4 ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                } transition-colors`}>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-[#c5a944]/10 text-[#c5a944]' : 'bg-[#c5a944]/10 text-[#c5a944]'
                    }`}>
                    <ClipboardCheck size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{a.type} Assessment</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {new Date(a.createdAt).toLocaleString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{a.score}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${severityBadge(a.severity)}`}>
                    {a.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodHistory;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { SmilePlus, Brain, ClipboardCheck, TrendingUp, Trash2, ArrowRight } from 'lucide-react';

const moods = ['Happy', 'Sad', 'Relaxed', 'Angry', 'Excited', 'Anxious', 'Neutral'];
const moodColors = {
    Happy: '#22c55e',
    Sad: '#ef4444',
    Relaxed: '#eab308',
    Angry: '#f97316',
    Excited: '#06b6d4',
    Anxious: '#a855f7',
    Neutral: '#6b7280',
};

const InteractiveTools = () => {
    const [moodHistory, setMoodHistory] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('vibewell_mood_history') || '[]');
        } catch {
            return [];
        }
    });
    const [selectedMood, setSelectedMood] = useState('');

    useEffect(() => {
        localStorage.setItem('vibewell_mood_history', JSON.stringify(moodHistory));
    }, [moodHistory]);

    const saveMood = () => {
        if (!selectedMood) return;
        const entry = {
            mood: selectedMood,
            timestamp: new Date().toLocaleString(),
            date: new Date().toISOString(),
        };
        setMoodHistory([entry, ...moodHistory]);
        setSelectedMood('');
    };

    const clearHistory = () => {
        setMoodHistory([]);
        localStorage.removeItem('vibewell_mood_history');
    };

    // Prepare chart data
    const moodCounts = moods.reduce((acc, mood) => {
        acc[mood] = moodHistory.filter((e) => e.mood === mood).length;
        return acc;
    }, {});

    const chartData = moods
        .map((mood) => ({
            name: mood,
            count: moodCounts[mood],
            fill: moodColors[mood],
        }))
        .filter((d) => d.count > 0);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gradient-to-br from-gray-900 to-purple-950 text-white py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Interactive Tools</h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Track your mood, take assessments, and gain insights into your mental health patterns.
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Mood Tracker */}
                    <div className="space-y-8">
                        {/* Mood Tracker Card */}
                        <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                                        <SmilePlus size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Mood Tracker</h2>
                                        <p className="text-sm text-gray-500">How are you feeling right now?</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                <label className="block text-sm font-bold text-gray-700">Select your current mood:</label>
                                <select
                                    value={selectedMood}
                                    onChange={(e) => setSelectedMood(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#c5a944] focus:border-[#c5a944] outline-none transition-all"
                                >
                                    <option value="">—Choose Mood—</option>
                                    {moods.map((m) => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={saveMood}
                                    disabled={!selectedMood}
                                    className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Save Mood
                                </button>
                            </div>
                        </div>

                        {/* Mood History */}
                        <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-900">Mood History</h3>
                                {moodHistory.length > 0 && (
                                    <button
                                        onClick={clearHistory}
                                        className="text-red-500 text-sm font-medium hover:text-red-700 flex items-center gap-1"
                                    >
                                        <Trash2 size={14} /> Clear
                                    </button>
                                )}
                            </div>

                            {moodHistory.length === 0 ? (
                                <p className="text-gray-400 text-sm py-6 text-center">No mood entries yet. Start tracking above!</p>
                            ) : (
                                <div className="max-h-60 overflow-y-auto space-y-2 custom-scrollbar">
                                    {moodHistory.slice(0, 20).map((entry, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 border border-gray-100"
                                        >
                                            <span className="text-sm text-gray-500">{entry.timestamp}</span>
                                            <span
                                                className="px-3 py-1 rounded-full text-xs font-bold text-white"
                                                style={{ backgroundColor: moodColors[entry.mood] }}
                                            >
                                                {entry.mood}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Mood Frequency Chart */}
                        <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Mood Frequency</h3>
                                    <p className="text-sm text-gray-500">Visualize your mood patterns</p>
                                </div>
                            </div>

                            {chartData.length > 0 ? (
                                <div className="h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                            <XAxis dataKey="name" fontSize={12} />
                                            <YAxis allowDecimals={false} fontSize={12} />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: '12px',
                                                    border: '1px solid #e5e7eb',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                }}
                                            />
                                            <Legend />
                                            <Bar dataKey="count" name="Mood Frequency" radius={[8, 8, 0, 0]}>
                                                {chartData.map((entry, index) => (
                                                    <Cell key={index} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
                                    Track your mood to see patterns here.
                                </div>
                            )}
                        </div>

                        {/* Quick Links to Assessment & Quiz */}
                        <div className="grid grid-cols-1 gap-4">
                            <Link
                                to="/assessment"
                                className="p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-all group hover:border-[#c5a944]/30 flex items-center gap-5"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <ClipboardCheck size={28} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg text-gray-900 group-hover:text-[#c5a944] transition-colors">Start Your Assessment</h4>
                                    <p className="text-gray-500 text-sm">Take a PHQ-9 or GAD-7 test to evaluate your mental health.</p>
                                </div>
                                <div className="px-5 py-3 bg-red-500 text-white rounded-xl font-bold text-sm group-hover:bg-red-600 transition-all flex-shrink-0">
                                    Start Quiz
                                </div>
                            </Link>

                            <Link
                                to="/chat"
                                className="p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-all group hover:border-[#c5a944]/30 flex items-center gap-5"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <Brain size={28} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg text-gray-900 group-hover:text-[#c5a944] transition-colors">Talk to AI Companion</h4>
                                    <p className="text-gray-500 text-sm">Get 24/7 mental health support from our AI counselor.</p>
                                </div>
                                <ArrowRight className="text-gray-300 group-hover:text-[#c5a944] transition-colors flex-shrink-0" size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InteractiveTools;

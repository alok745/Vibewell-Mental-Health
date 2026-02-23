import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ClipboardCheck, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../api/api';
import toast from 'react-hot-toast';

const phq9Questions = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself — or that you are a failure',
  'Trouble concentrating on things',
  'Moving or speaking slowly, or being fidgety/restless',
  'Thoughts that you would be better off dead or of hurting yourself',
];

const gad7Questions = [
  'Feeling nervous, anxious, or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless that it\'s hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid as if something awful might happen',
];

const options = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
];

const Assessment = () => {
  const { darkMode } = useTheme();
  const [type, setType] = useState(null); // 'PHQ-9' or 'GAD-7'
  const [currentQ, setCurrentQ] = useState(0);
  const [responses, setResponses] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = type === 'PHQ-9' ? phq9Questions : gad7Questions;

  const startTest = (testType) => {
    setType(testType);
    setCurrentQ(0);
    setResponses(new Array(testType === 'PHQ-9' ? 9 : 7).fill(-1));
    setResult(null);
  };

  const selectAnswer = (value) => {
    const updated = [...responses];
    updated[currentQ] = value;
    setResponses(updated);
  };

  const nextQ = () => {
    if (responses[currentQ] === -1) return toast.error('Please select an answer');
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
    else submitAssessment();
  };

  const prevQ = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const submitAssessment = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/assessments', { type, responses });
      const res = data?.data || data;
      setResult(res);
      toast.success('Assessment submitted!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const severityColor = (severity) => {
    const s = severity?.toLowerCase();
    if (s?.includes('severe')) return 'text-red-500 bg-red-500/10 border-red-500/20';
    if (s?.includes('moderate')) return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    if (s?.includes('mild')) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    return 'text-green-500 bg-green-500/10 border-green-500/20';
  };

  const progress = type ? ((currentQ + 1) / questions.length) * 100 : 0;

  // Type selection screen
  if (!type) {
    return (
      <div className="space-y-8 pb-12">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mental Health Assessment</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Choose an assessment to evaluate your mental health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => startTest('PHQ-9')}
            className={`p-8 rounded-2xl border text-left transition-all group hover:shadow-lg ${darkMode ? 'bg-gray-900 border-gray-800 hover:border-[#c5a944]/30' : 'bg-white border-gray-200 hover:border-[#c5a944]/30'
              }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'
              }`}>
              <ClipboardCheck size={28} />
            </div>
            <h3 className={`text-xl font-bold group-hover:text-[#c5a944] transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              PHQ-9 Depression Test
            </h3>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              9 questions to screen and measure the severity of depression. Takes about 3 minutes.
            </p>
            <div className="flex items-center gap-1 mt-4 text-[#c5a944] font-semibold text-sm">
              Start Test <ArrowRight size={14} />
            </div>
          </button>

          <button
            onClick={() => startTest('GAD-7')}
            className={`p-8 rounded-2xl border text-left transition-all group hover:shadow-lg ${darkMode ? 'bg-gray-900 border-gray-800 hover:border-[#c5a944]/30' : 'bg-white border-gray-200 hover:border-[#c5a944]/30'
              }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
              }`}>
              <ClipboardCheck size={28} />
            </div>
            <h3 className={`text-xl font-bold group-hover:text-[#c5a944] transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              GAD-7 Anxiety Test
            </h3>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              7 questions to screen and measure the severity of anxiety. Takes about 2 minutes.
            </p>
            <div className="flex items-center gap-1 mt-4 text-[#c5a944] font-semibold text-sm">
              Start Test <ArrowRight size={14} />
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Result screen
  if (result) {
    return (
      <div className="max-w-xl mx-auto space-y-6 pb-12">
        <div className={`rounded-2xl p-8 border text-center ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <CheckCircle2 size={56} className="text-[#c5a944] mx-auto mb-4" />
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Assessment Complete</h2>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{type} Test Results</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Score</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{result.score}</p>
            </div>
            <div className={`p-4 rounded-xl border ${severityColor(result.severity)}`}>
              <p className={`text-xs opacity-70`}>Severity</p>
              <p className="text-xl font-bold">{result.severity}</p>
            </div>
          </div>

          {(result.severity === 'Severe' || result.severity === 'Moderately Severe') && (
            <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-left flex gap-3">
              <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-red-500 font-bold text-sm">Please Seek Help</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-red-400/70' : 'text-red-600/70'}`}>
                  Your results suggest you may benefit from professional support.
                  Call <a href="tel:9152987821" className="underline font-bold">9152987821</a> (Kiran Helpline).
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3 justify-center">
            <button
              onClick={() => { setType(null); setResult(null); }}
              className={`px-6 py-3 rounded-xl font-bold text-sm ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Take Another Test
            </button>
            <a
              href="/history"
              className="px-6 py-3 bg-[#c5a944] text-gray-900 rounded-xl font-bold text-sm hover:bg-[#d4b84e]"
            >
              View History
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{type} Assessment</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Question {currentQ + 1} of {questions.length}
          </p>
        </div>
        <button
          onClick={() => { setType(null); setResult(null); }}
          className={`text-sm font-medium ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Cancel
        </button>
      </div>

      {/* Progress */}
      <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="h-full bg-[#c5a944] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Question Card */}
      <div className={`rounded-2xl p-8 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <p className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Over the last 2 weeks, how often have you been bothered by:
        </p>
        <p className={`text-xl font-bold mb-8 ${darkMode ? 'text-[#c5a944]' : 'text-[#c5a944]'}`}>
          "{questions[currentQ]}"
        </p>

        <div className="space-y-3">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => selectAnswer(opt.value)}
              className={`w-full p-4 rounded-xl border text-left font-medium text-sm transition-all ${responses[currentQ] === opt.value
                  ? 'bg-[#c5a944]/10 border-[#c5a944] text-[#c5a944]'
                  : darkMode
                    ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
            >
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 ${responses[currentQ] === opt.value
                  ? 'bg-[#c5a944] text-gray-900'
                  : darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-500'
                }`}>
                {opt.value}
              </span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <button
          onClick={prevQ}
          disabled={currentQ === 0}
          className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 disabled:opacity-30 ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          <ArrowLeft size={16} /> Previous
        </button>
        <button
          onClick={nextQ}
          disabled={loading || responses[currentQ] === -1}
          className="px-6 py-3 bg-[#c5a944] text-gray-900 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#d4b84e] disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : null}
          {currentQ === questions.length - 1 ? 'Submit' : 'Next'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Assessment;
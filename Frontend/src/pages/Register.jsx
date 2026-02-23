import { useState } from 'react';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error('Passwords do not match!');
    }
    if (form.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#c5a944]/10 flex items-center justify-center">
                <UserPlus className="text-[#c5a944]" size={28} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Join VibeWell</h1>
              <p className="text-gray-500 mt-2">Start your journey to better mental health</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-300" size={18} />
                  <input
                    id="register-name"
                    type="text"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a944]/30 focus:border-[#c5a944] outline-none transition-all bg-gray-50 text-gray-900"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-300" size={18} />
                  <input
                    id="register-email"
                    type="email"
                    placeholder="Email Address"
                    required
                    value={form.email}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a944]/30 focus:border-[#c5a944] outline-none transition-all bg-gray-50 text-gray-900"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-gray-300" size={18} />
                  <input
                    id="register-password"
                    type="password"
                    placeholder="Password (min 6 chars)"
                    required
                    value={form.password}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a944]/30 focus:border-[#c5a944] outline-none transition-all bg-gray-50 text-gray-900"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-gray-300" size={18} />
                  <input
                    id="register-confirm-password"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={form.confirmPassword}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a944]/30 focus:border-[#c5a944] outline-none transition-all bg-gray-50 text-gray-900"
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              <button
                id="register-submit"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#c5a944] text-gray-900 font-bold rounded-xl hover:bg-[#d4b84e] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  <>
                    Create Account <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Login link */}
            <p className="mt-8 text-center text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#c5a944] font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
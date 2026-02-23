import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Resources Library', path: '/resources' },
        { label: 'Interactive Tools', path: '/tools' },
        { label: 'Professional Service', path: '/doctors' },
        { label: 'Emergency Service', path: '/emergency' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-[#c5a944]/95 backdrop-blur-md shadow-lg'
                    : 'bg-[#c5a944]'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
                            <span className="text-lg">🧠</span>
                        </div>
                        <span className="text-xl font-bold italic text-gray-900 tracking-tight">
                            VibeWell
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${location.pathname === link.path
                                        ? 'text-gray-900 underline underline-offset-4 decoration-2'
                                        : 'text-gray-800 hover:text-gray-900 hover:bg-white/20'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-2">
                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/dashboard"
                                    className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-white/20 text-gray-900 rounded-lg text-sm font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-gray-900 rounded-lg text-sm font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
                                >
                                    <LogIn size={16} /> Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 text-gray-900 hover:bg-white/20 rounded-lg"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="lg:hidden bg-[#c5a944] border-t border-white/20 pb-4">
                    <div className="px-4 space-y-1 pt-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-3 rounded-lg text-sm font-semibold ${location.pathname === link.path
                                        ? 'bg-white/20 text-gray-900'
                                        : 'text-gray-800 hover:bg-white/10'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="border-t border-white/20 pt-3 mt-3 space-y-2">
                            {user ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-3 bg-gray-900 text-white rounded-lg text-sm font-semibold text-center"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => { handleLogout(); setMobileOpen(false); }}
                                        className="block w-full px-4 py-3 bg-white/20 text-gray-900 rounded-lg text-sm font-semibold text-center"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-3 text-gray-900 rounded-lg text-sm font-semibold text-center hover:bg-white/10"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-3 bg-gray-900 text-white rounded-lg text-sm font-semibold text-center"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

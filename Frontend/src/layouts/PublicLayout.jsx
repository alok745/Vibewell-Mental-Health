import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar />
            <main className="pt-16">
                <Outlet />
            </main>
            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl">🧠</span>
                                <span className="text-xl font-bold italic">VibeWell</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Discover a variety of self-care tools designed to guide you toward a more balanced, healthier mind.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-[#c5a944]">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="/resources" className="hover:text-white transition-colors">Resources</a></li>
                                <li><a href="/tools" className="hover:text-white transition-colors">Interactive Tools</a></li>
                                <li><a href="/doctors" className="hover:text-white transition-colors">Professional Service</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-[#c5a944]">Resources</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="/resources" className="hover:text-white transition-colors">Videos</a></li>
                                <li><a href="/resources" className="hover:text-white transition-colors">Podcasts</a></li>
                                <li><a href="/resources" className="hover:text-white transition-colors">Articles</a></li>
                                <li><a href="/emergency" className="hover:text-white transition-colors">Emergency Help</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-[#c5a944]">Emergency Contacts</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>🇮🇳 Kiran Helpline: <strong className="text-white">9152987821</strong></li>
                                <li>🇮🇳 Vandrevala: <strong className="text-white">1860-2662-345</strong></li>
                                <li>🇺🇸 988 Suicide Hotline: <strong className="text-white">988</strong></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
                        © 2026 VibeWell. Built with ❤️ for better mental health.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Brain, BookOpen, Stethoscope, Phone, Play, Heart, Shield, Sparkles, ArrowRight, Users, Video, Headphones } from 'lucide-react';

const heroSlides = [
    {
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80',
        title: 'VibeWell',
        subtitle: '"Discover a variety of self-care tools designed to guide you toward a more balanced, healthier mind. From mood monitors to guided meditations, VibeWell provides everything you need to nurture your mental well-being."',
    },
    {
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80',
        title: 'VibeWell',
        subtitle: '"Empower your mental well-being with VibeWell, where you\'ll find a gateway to trusted resources, expert guidance, and ongoing support. Let us help you take control of your mental health journey with confidence and ease."',
    },
    {
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80',
        title: 'VibeWell',
        subtitle: '"Your mental health matters. Join thousands of students using VibeWell to track their moods, access professional resources, and connect with mental health professionals — all in one platform."',
    },
];

const features = [
    {
        icon: <Brain size={32} />,
        title: 'AI Companion',
        desc: 'Chat with our compassionate AI trained to support your mental wellness 24/7.',
        color: 'bg-purple-100 text-purple-600',
        link: '/chat',
    },
    {
        icon: <BookOpen size={32} />,
        title: 'Resources Library',
        desc: 'Videos, podcasts, articles & theories on anxiety, depression, PTSD, and more.',
        color: 'bg-blue-100 text-blue-600',
        link: '/resources',
    },
    {
        icon: <Stethoscope size={32} />,
        title: 'Professional Service',
        desc: 'Browse verified therapists and psychiatrists. Book appointments instantly.',
        color: 'bg-green-100 text-green-600',
        link: '/doctors',
    },
    {
        icon: <Phone size={32} />,
        title: 'Emergency Service',
        desc: 'Immediate access to crisis helplines and emergency mental health resources.',
        color: 'bg-red-100 text-red-600',
        link: '/emergency',
    },
];

const stats = [
    { value: '10K+', label: 'Students Helped', icon: <Users size={24} /> },
    { value: '50+', label: 'Expert Articles', icon: <BookOpen size={24} /> },
    { value: '100+', label: 'Videos & Podcasts', icon: <Video size={24} /> },
    { value: '24/7', label: 'AI Support', icon: <Headphones size={24} /> },
];

const LandingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

    return (
        <div>
            {/* Hero Slider */}
            <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
                    </div>
                ))}

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
                            {heroSlides[currentSlide].title}
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-8 italic drop-shadow-lg">
                            {heroSlides[currentSlide].subtitle}
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <Link
                                to="/register"
                                className="px-8 py-3.5 bg-[#c5a944] text-gray-900 font-bold rounded-xl hover:bg-[#d4b84e] transition-all shadow-lg text-sm"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                to="/resources"
                                className="px-8 py-3.5 bg-white/15 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/25 transition-all border border-white/30 text-sm"
                            >
                                Explore Resources
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Arrow Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-[#c5a944] py-8">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="flex justify-center text-gray-900/60 mb-2">{stat.icon}</div>
                            <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-900/70 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <span className="text-[#c5a944] font-bold text-sm uppercase tracking-widest">What We Offer</span>
                        <h2 className="text-4xl font-bold mt-3 text-gray-900">Everything You Need for Mental Wellness</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            Comprehensive mental health support — from AI-powered conversations to professional consultations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((f, i) => (
                            <Link
                                key={i}
                                to={f.link}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-[#c5a944]/30"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-[#c5a944] transition-colors">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                                <div className="flex items-center gap-1 mt-4 text-[#c5a944] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    Learn More <ArrowRight size={14} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Videos Preview Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-[#c5a944] font-bold text-sm uppercase tracking-widest">Featured Content</span>
                        <h2 className="text-4xl font-bold mt-3 text-gray-900">Mental Health Videos</h2>
                        <p className="text-gray-500 mt-3">Curated videos to help you understand and manage your mental health.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 group hover:shadow-xl transition-all">
                            <div className="aspect-video bg-gray-900 relative">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/xNY0AAUtQ3g"
                                    title="How to Cope With Anxiety"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-5">
                                <h4 className="font-bold text-gray-900 group-hover:text-[#c5a944] transition-colors">How to Cope With Anxiety</h4>
                                <p className="text-sm text-gray-500 mt-1">A TED-Ed talk about understanding and managing anxiety.</p>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 group hover:shadow-xl transition-all">
                            <div className="aspect-video bg-gray-900">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/XiCrniLQGYc"
                                    title="What Is Depression?"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-5">
                                <h4 className="font-bold text-gray-900 group-hover:text-[#c5a944] transition-colors">What Is Depression?</h4>
                                <p className="text-sm text-gray-500 mt-1">Understanding what depression really is and how it affects the brain.</p>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 group hover:shadow-xl transition-all">
                            <div className="aspect-video bg-gray-900">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/ZQht2yOX9Js"
                                    title="How to Practice Mindfulness"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-5">
                                <h4 className="font-bold text-gray-900 group-hover:text-[#c5a944] transition-colors">How to Practice Mindfulness</h4>
                                <p className="text-sm text-gray-500 mt-1">A guided introduction to mindfulness meditation for stress relief.</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <Link
                            to="/resources"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c5a944] text-gray-900 font-bold rounded-xl hover:bg-[#d4b84e] transition-all shadow-md"
                        >
                            View All Resources <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c5a944] rounded-full blur-[120px]" />
                </div>
                <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                    <Sparkles className="mx-auto mb-6 text-[#c5a944]" size={40} />
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Wellness Journey Today</h2>
                    <p className="text-white/70 text-lg mb-10 leading-relaxed">
                        Join VibeWell and get access to AI-powered mental health support, professional consultations,
                        mood tracking, and a library of curated resources — completely free.
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Link
                            to="/register"
                            className="px-10 py-4 bg-[#c5a944] text-gray-900 font-bold rounded-xl hover:bg-[#d4b84e] transition-all shadow-lg text-lg"
                        >
                            Create Free Account
                        </Link>
                        <Link
                            to="/login"
                            className="px-10 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20 text-lg"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;

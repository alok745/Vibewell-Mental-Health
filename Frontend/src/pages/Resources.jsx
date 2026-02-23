import { useState } from 'react';
import { Video, Headphones, BookOpen, ExternalLink, Play, Filter } from 'lucide-react';

const categories = ['All', 'Anxiety', 'Depression', 'PTSD', 'Mental Health', 'OCD'];

const videos = [
    {
        id: 'xNY0AAUtQ3g',
        title: 'How to Cope With Anxiety',
        desc: 'A TED-Ed talk about understanding and managing anxiety.',
        category: 'Anxiety',
    },
    {
        id: 'XiCrniLQGYc',
        title: 'What Is Depression?',
        desc: 'Understanding what depression really is and how it affects the brain.',
        category: 'Depression',
    },
    {
        id: 'ZQht2yOX9Js',
        title: 'How to Practice Mindfulness',
        desc: 'A guided introduction to mindfulness meditation for stress relief.',
        category: 'Mental Health',
    },
    {
        id: 'b_n9qegR7C4',
        title: 'Understanding PTSD and Trauma',
        desc: 'Learn how trauma affects the body and mind.',
        category: 'PTSD',
    },
    {
        id: 'I9lmOVbSPnE',
        title: 'Living with OCD — My Story',
        desc: 'Personal experiences and insights about OCD recovery.',
        category: 'OCD',
    },
    {
        id: 'MB5IX-np5fE',
        title: 'How Stress Affects Your Body',
        desc: 'TED-Ed explains the long-term effects of stress on your health.',
        category: 'Anxiety',
    },
    {
        id: 'LnJwH_PZXnM',
        title: 'Depression — Let\'s Talk',
        desc: 'WHO campaign to raise awareness about depression globally.',
        category: 'Depression',
    },
    {
        id: 'NQcYZKQrzGo',
        title: 'How Your Brain Works Under Stress',
        desc: 'Understanding the neuroscience of stress and anxiety.',
        category: 'Mental Health',
    },
    {
        id: 'aqu4ezLQEUA',
        title: 'PTSD: What You Need to Know',
        desc: 'A quick overview of PTSD symptoms and treatment options.',
        category: 'PTSD',
    },
];

const podcasts = [
    {
        title: 'The Mental Health Hour',
        host: 'Dr. Sarah Miller',
        desc: 'Weekly conversations about everyday mental health challenges.',
        category: 'Mental Health',
        link: 'https://open.spotify.com/show/mental-health',
        duration: '45 min',
    },
    {
        title: 'Anxiety Warriors',
        host: 'John Peterson',
        desc: 'Stories and strategies from people who overcame anxiety.',
        category: 'Anxiety',
        link: 'https://open.spotify.com/show/anxiety-warriors',
        duration: '30 min',
    },
    {
        title: 'Breaking the Stigma',
        host: 'Mental Health Foundation',
        desc: 'Challenging misconceptions around depression and seeking help.',
        category: 'Depression',
        link: 'https://open.spotify.com/show/breaking-stigma',
        duration: '35 min',
    },
    {
        title: 'Healing from Trauma',
        host: 'Dr. Emily Chen',
        desc: 'Evidence-based approaches to processing and healing from trauma.',
        category: 'PTSD',
        link: 'https://open.spotify.com/show/healing-trauma',
        duration: '50 min',
    },
    {
        title: 'OCD Stories',
        host: 'Stuart Ralph',
        desc: 'Personal stories and expert interviews about OCD recovery.',
        category: 'OCD',
        link: 'https://open.spotify.com/show/ocd-stories',
        duration: '40 min',
    },
    {
        title: 'Mindful Living',
        host: 'Dr. Ravi Kumar',
        desc: 'Mindfulness practices for daily mental wellness and stress relief.',
        category: 'Mental Health',
        link: 'https://open.spotify.com/show/mindful-living',
        duration: '25 min',
    },
];

const articles = [
    {
        title: '10 Evidence-Based Ways to Reduce Anxiety',
        author: 'Dr. Lisa Thompson',
        desc: 'Scientifically proven techniques to manage anxiety symptoms in daily life.',
        category: 'Anxiety',
        readTime: '8 min read',
        link: 'https://www.healthline.com/health/anxiety',
    },
    {
        title: 'Understanding Depression: Causes, Symptoms & Treatment',
        author: 'National Institute of Mental Health',
        desc: 'A comprehensive guide to understanding clinical depression.',
        category: 'Depression',
        readTime: '12 min read',
        link: 'https://www.nimh.nih.gov/health/topics/depression',
    },
    {
        title: 'PTSD Recovery: A Step-by-Step Guide',
        author: 'Dr. James Morrison',
        desc: 'Practical steps for recovering from post-traumatic stress disorder.',
        category: 'PTSD',
        readTime: '10 min read',
        link: 'https://www.ptsd.va.gov/understand/what/ptsd_basics.asp',
    },
    {
        title: 'OCD Treatment: What Works Best?',
        author: 'International OCD Foundation',
        desc: 'Comparing different treatment approaches for OCD.',
        category: 'OCD',
        readTime: '7 min read',
        link: 'https://iocdf.org/about-ocd/treatment/',
    },
    {
        title: 'The Science of Meditation for Mental Health',
        author: 'Dr. Anika Gupta',
        desc: 'How meditation physically changes your brain and reduces stress.',
        category: 'Mental Health',
        readTime: '6 min read',
        link: 'https://www.mindful.org/meditation-health/',
    },
    {
        title: 'How to Build Mental Resilience',
        author: 'American Psychological Association',
        desc: 'Strategies to strengthen your psychological resilience.',
        category: 'Mental Health',
        readTime: '9 min read',
        link: 'https://www.apa.org/topics/resilience',
    },
    {
        title: 'Social Anxiety: More Than Just Shyness',
        author: 'Anxiety and Depression Association',
        desc: 'Understanding social anxiety disorder and its impact.',
        category: 'Anxiety',
        readTime: '5 min read',
        link: 'https://adaa.org/understanding-anxiety/social-anxiety-disorder',
    },
    {
        title: 'Childhood Trauma and Adult Mental Health',
        author: 'Dr. Bessel van der Kolk',
        desc: 'How early experiences shape our mental health as adults.',
        category: 'PTSD',
        readTime: '11 min read',
        link: 'https://www.besselvanderkolk.com/resources',
    },
];

const tabs = [
    { id: 'videos', label: 'Videos', icon: <Video size={18} /> },
    { id: 'podcasts', label: 'Podcasts', icon: <Headphones size={18} /> },
    { id: 'articles', label: 'Articles', icon: <BookOpen size={18} /> },
];

const Resources = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeTab, setActiveTab] = useState('videos');

    const filterItems = (items) =>
        activeCategory === 'All'
            ? items
            : items.filter((item) => item.category === activeCategory);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources Library</h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Explore our curated collection of videos, podcasts, and articles to support your mental health journey.
                    </p>
                </div>
            </section>

            {/* Category Filters */}
            <section className="bg-gray-50 border-b border-gray-200 sticky top-16 z-40">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                    ? 'bg-[#c5a944] text-gray-900 shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#c5a944] hover:text-[#c5a944]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <div className="max-w-6xl mx-auto px-6 py-6">
                <div className="flex items-center justify-center gap-2 border-b border-gray-200 pb-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === tab.id
                                ? 'border-[#c5a944] text-[#c5a944]'
                                : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 pb-20">
                {/* Videos Tab */}
                {activeTab === 'videos' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center border-2 border-gray-900 inline-block px-6 py-2 rounded-lg mx-auto block" style={{ width: 'fit-content', margin: '0 auto 2rem' }}>
                            Videos
                        </h2>
                        {filterItems(videos).length === 0 ? (
                            <div className="text-center py-16 text-gray-400">
                                <Video size={48} className="mx-auto mb-4 opacity-30" />
                                <p>No videos found for "{activeCategory}"</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filterItems(videos).map((video) => (
                                    <div
                                        key={video.id}
                                        className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-white border border-gray-100 group"
                                    >
                                        <div className="aspect-video bg-gray-900">
                                            <iframe
                                                className="w-full h-full"
                                                src={`https://www.youtube.com/embed/${video.id}`}
                                                title={video.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                        <div className="p-5">
                                            <span className="text-xs font-bold text-[#c5a944] uppercase tracking-wider">{video.category}</span>
                                            <h4 className="font-bold text-gray-900 mt-1 group-hover:text-[#c5a944] transition-colors">
                                                {video.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 mt-1">{video.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Podcasts Tab */}
                {activeTab === 'podcasts' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center border-2 border-gray-900 px-6 py-2 rounded-lg" style={{ width: 'fit-content', margin: '0 auto 2rem' }}>
                            Podcasts
                        </h2>
                        {filterItems(podcasts).length === 0 ? (
                            <div className="text-center py-16 text-gray-400">
                                <Headphones size={48} className="mx-auto mb-4 opacity-30" />
                                <p>No podcasts found for "{activeCategory}"</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filterItems(podcasts).map((podcast, i) => (
                                    <div
                                        key={i}
                                        className="p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-all group hover:border-[#c5a944]/30"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                                <Headphones size={24} className="text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-xs font-bold text-[#c5a944] uppercase tracking-wider">{podcast.category}</span>
                                                <h4 className="font-bold text-gray-900 mt-1 group-hover:text-[#c5a944] transition-colors">{podcast.title}</h4>
                                                <p className="text-xs text-gray-400 mt-0.5">by {podcast.host} • {podcast.duration}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-4">{podcast.desc}</p>
                                        <a
                                            href={podcast.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-[#c5a944] hover:underline"
                                        >
                                            <Play size={14} /> Listen Now <ExternalLink size={12} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Articles Tab */}
                {activeTab === 'articles' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center border-2 border-gray-900 px-6 py-2 rounded-lg" style={{ width: 'fit-content', margin: '0 auto 2rem' }}>
                            Articles & Theory
                        </h2>
                        {filterItems(articles).length === 0 ? (
                            <div className="text-center py-16 text-gray-400">
                                <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
                                <p>No articles found for "{activeCategory}"</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filterItems(articles).map((article, i) => (
                                    <a
                                        key={i}
                                        href={article.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-all group hover:border-[#c5a944]/30 block"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <span className="text-xs font-bold text-[#c5a944] uppercase tracking-wider">{article.category}</span>
                                                <h4 className="font-bold text-gray-900 mt-1 group-hover:text-[#c5a944] transition-colors text-lg">{article.title}</h4>
                                                <p className="text-xs text-gray-400 mt-1">by {article.author} • {article.readTime}</p>
                                            </div>
                                            <ExternalLink size={18} className="text-gray-300 group-hover:text-[#c5a944] transition-colors flex-shrink-0 mt-1" />
                                        </div>
                                        <p className="text-sm text-gray-500 mt-3 leading-relaxed">{article.desc}</p>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Resources;

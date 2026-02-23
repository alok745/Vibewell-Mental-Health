import { Phone, Heart, Globe, MapPin, AlertTriangle, Shield, MessageCircle } from 'lucide-react';

const emergencyContacts = [
    {
        country: '🇮🇳 India',
        services: [
            { name: 'Kiran Mental Health Helpline', number: '9152987821', hours: '24/7', desc: 'Government-supported mental health helpline' },
            { name: 'Vandrevala Foundation', number: '1860-2662-345', hours: '24/7', desc: 'Free mental health support in 15 languages' },
            { name: 'iCall', number: '9152987821', hours: 'Mon-Sat 8AM-10PM', desc: 'TISS psychosocial helpline' },
            { name: 'NIMHANS', number: '080-46110007', hours: '24/7', desc: 'National Institute of Mental Health helpline' },
        ],
    },
    {
        country: '🇺🇸 USA',
        services: [
            { name: '988 Suicide & Crisis Lifeline', number: '988', hours: '24/7', desc: 'Call or text for immediate crisis support' },
            { name: 'Crisis Text Line', number: 'Text HOME to 741741', hours: '24/7', desc: 'Free crisis support via text message' },
            { name: 'NAMI Helpline', number: '1-800-950-6264', hours: 'Mon-Fri 10AM-10PM ET', desc: 'National Alliance on Mental Illness' },
        ],
    },
    {
        country: '🇬🇧 UK',
        services: [
            { name: 'Samaritans', number: '116 123', hours: '24/7', desc: 'Free emotional support for anyone in distress' },
            { name: 'SHOUT', number: 'Text SHOUT to 85258', hours: '24/7', desc: 'Free crisis text support' },
        ],
    },
    {
        country: '🌍 International',
        services: [
            { name: 'Befrienders Worldwide', number: 'befrienders.org', hours: '24/7', desc: 'Emotional support in your country' },
            { name: 'International Association for Suicide Prevention', number: 'iasp.info/resources', hours: '24/7', desc: 'Crisis centers worldwide' },
        ],
    },
];

const safetyTips = [
    'If you or someone you know is in immediate danger, call your local emergency number (911, 112, 100).',
    'Remove any means of self-harm from the immediate environment.',
    'Stay with the person until professional help arrives.',
    'Listen without judgment and express that you care.',
    'Encourage them to reach out to a crisis helpline.',
    'Do not leave someone who is in crisis alone.',
];

const EmergencyService = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gradient-to-br from-red-700 to-red-900 text-white py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <AlertTriangle className="mx-auto mb-4" size={48} />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Emergency Services</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        If you or someone you know is in crisis, please reach out immediately.
                        Help is available 24/7.
                    </p>
                    <a href="tel:9152987821" className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                        <Phone className="text-white" size={28} />
                        <div className="text-left">
                            <div className="text-sm text-white/70">India Helpline (24/7)</div>
                            <div className="text-2xl font-black tracking-wider">9152987821</div>
                        </div>
                    </a>
                </div>
            </section>

            {/* Safety Tips */}
            <section className="bg-red-50 border-b border-red-100 py-10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="text-red-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-900">Immediate Safety Tips</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {safetyTips.map((tip, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-red-100"
                            >
                                <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {i + 1}
                                </span>
                                <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emergency Contacts */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Crisis Helplines</h2>
                        <p className="text-gray-500 mt-2">Reach out to these trusted organizations for immediate support.</p>
                    </div>

                    <div className="space-y-8">
                        {emergencyContacts.map((region, i) => (
                            <div key={i}>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    {region.country}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {region.services.map((service, j) => (
                                        <div
                                            key={j}
                                            className="p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-all hover:border-red-200"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{service.name}</h4>
                                                    <p className="text-sm text-gray-500 mt-1">{service.desc}</p>
                                                </div>
                                                <Phone className="text-red-500 flex-shrink-0" size={20} />
                                            </div>
                                            <div className="mt-4 flex items-center justify-between">
                                                {service.number.match(/^[\d\s\-+()]+$/) ? (
                                                    <a href={`tel:${service.number.replace(/[\s\-()]/g, '')}`} className="text-xl font-black text-red-600 tracking-wider hover:underline">
                                                        {service.number}
                                                    </a>
                                                ) : service.number.includes('.') ? (
                                                    <a href={`https://${service.number}`} target="_blank" rel="noopener noreferrer" className="text-xl font-black text-red-600 tracking-wider hover:underline">
                                                        {service.number}
                                                    </a>
                                                ) : (
                                                    <span className="text-xl font-black text-red-600 tracking-wider">{service.number}</span>
                                                )}
                                                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">{service.hours}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Resources */}
            <section className="py-12 bg-gray-50 border-t border-gray-200">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <Heart className="mx-auto mb-4 text-red-500" size={32} />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">You Are Not Alone</h3>
                    <p className="text-gray-500 leading-relaxed mb-8">
                        Mental health challenges are common and treatable. Reaching out for help is a sign of strength,
                        not weakness. If you're struggling, please talk to someone — a friend, family member, or professional.
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <a
                            href="/doctors"
                            className="px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all"
                        >
                            Find a Professional
                        </a>
                        <a
                            href="/chat"
                            className="px-8 py-3.5 bg-[#c5a944] text-gray-900 font-bold rounded-xl hover:bg-[#d4b84e] transition-all flex items-center gap-2"
                        >
                            <MessageCircle size={18} /> Talk to AI
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EmergencyService;

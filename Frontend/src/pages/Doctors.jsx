import { useEffect, useState } from 'react';
import {
    Stethoscope, MapPin, Clock, IndianRupee, Star, Calendar,
    X, CheckCircle2, Loader2, Search
} from 'lucide-react';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [bookingForm, setBookingForm] = useState({ date: '', timeSlot: '', notes: '' });
    const [booking, setBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await api.get('/doctors');
                setDoctors(data);
            } catch (err) {
                console.error('Failed to fetch doctors:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(
        (d) =>
            d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.location?.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBookClick = (doctor) => {
        if (!user) {
            toast.error('Please login to book an appointment');
            navigate('/login');
            return;
        }
        setSelectedDoctor(doctor);
    };

    const handleBook = async (e) => {
        e.preventDefault();
        if (!bookingForm.date || !bookingForm.timeSlot) {
            return toast.error('Please select date and time slot');
        }

        setBooking(true);
        try {
            await api.post('/doctors/book', {
                doctorId: selectedDoctor._id,
                date: bookingForm.date,
                timeSlot: bookingForm.timeSlot,
                notes: bookingForm.notes,
            });
            setBookingSuccess(true);
            toast.success('Appointment booked successfully!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Booking failed');
        } finally {
            setBooking(false);
        }
    };

    const closeModal = () => {
        setSelectedDoctor(null);
        setBookingForm({ date: '', timeSlot: '', notes: '' });
        setBookingSuccess(false);
    };

    const generateTimeSlots = (start, end) => {
        const slots = [];
        let [startHour] = start.split(':').map(Number);
        const [endHour] = end.split(':').map(Number);
        while (startHour < endHour) {
            const hour12 = startHour > 12 ? startHour - 12 : startHour;
            const ampm = startHour >= 12 ? 'PM' : 'AM';
            slots.push(`${hour12}:00 ${ampm}`);
            startHour++;
        }
        return slots;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gradient-to-br from-gray-900 to-green-950 text-white py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <Stethoscope className="mx-auto mb-4" size={48} />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Services</h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Browse verified mental health professionals and book appointments instantly.
                    </p>
                </div>
            </section>

            {/* Search */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        id="doctor-search"
                        type="text"
                        placeholder="Search by name, specialization, or city..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a944]/30 focus:border-[#c5a944] outline-none transition-all bg-gray-50 text-gray-900"
                    />
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="max-w-6xl mx-auto px-6 pb-20">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Loader2 size={32} className="animate-spin mb-4" />
                        <p className="text-sm">Loading doctors...</p>
                    </div>
                ) : filteredDoctors.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <Stethoscope size={48} className="mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium text-gray-500">No doctors found</p>
                        <p className="text-sm text-gray-400 mt-1">Try adjusting your search or check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDoctors.map((doctor) => (
                            <div
                                key={doctor._id}
                                className="rounded-2xl border border-gray-200 p-6 bg-white hover:shadow-xl transition-all group hover:border-[#c5a944]/30"
                            >
                                <div className="flex items-start gap-4 mb-5">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                        {doctor.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#c5a944] transition-colors truncate">
                                            {doctor.name}
                                        </h3>
                                        <p className="text-[#c5a944] text-sm font-medium">{doctor.specialization}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <Star size={16} className="text-yellow-500" />
                                        <span>{doctor.experience} years experience</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <IndianRupee size={16} className="text-green-500" />
                                        <span>₹{doctor.feePerConsultation} per consultation</span>
                                    </div>
                                    {doctor.location && (
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <MapPin size={16} className="text-red-500" />
                                            <span className="truncate">{doctor.location.address}, {doctor.location.city}</span>
                                        </div>
                                    )}
                                    {doctor.availability && (
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <Clock size={16} className="text-blue-500" />
                                            <span>{doctor.availability.days?.join(', ')}</span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleBookClick(doctor)}
                                    className="w-full py-3 bg-[#c5a944] text-gray-900 rounded-xl font-bold hover:bg-[#d4b84e] transition-all text-sm flex items-center justify-center gap-2"
                                >
                                    <Calendar size={16} />
                                    Book Appointment
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            {selectedDoctor && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && closeModal()}
                >
                    <div className="bg-white w-full max-w-lg rounded-2xl p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                            <X size={20} />
                        </button>

                        {bookingSuccess ? (
                            <div className="text-center py-8">
                                <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
                                <h2 className="text-2xl font-bold mb-2 text-gray-900">Appointment Booked!</h2>
                                <p className="text-gray-500 mb-6">
                                    Your appointment with {selectedDoctor.name} has been scheduled.
                                </p>
                                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-left space-y-2 text-gray-700">
                                    <p><span className="text-gray-400">Doctor:</span> {selectedDoctor.name}</p>
                                    <p><span className="text-gray-400">Date:</span> {bookingForm.date}</p>
                                    <p><span className="text-gray-400">Time:</span> {bookingForm.timeSlot}</p>
                                </div>
                                <button onClick={closeModal} className="px-8 py-3 bg-[#c5a944] text-gray-900 rounded-xl font-bold hover:bg-[#d4b84e]">
                                    Done
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                                        {selectedDoctor.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{selectedDoctor.name}</h2>
                                        <p className="text-[#c5a944] text-sm font-medium">{selectedDoctor.specialization}</p>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-500 mb-6 p-3 bg-gray-50 rounded-xl space-y-1">
                                    <p>Fee: ₹{selectedDoctor.feePerConsultation}</p>
                                    <p>Available: {selectedDoctor.availability?.days?.join(', ')}</p>
                                </div>

                                <form onSubmit={handleBook} className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-600 mb-2 block font-medium">Date</label>
                                        <input
                                            id="booking-date"
                                            type="date"
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            value={bookingForm.date}
                                            onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a944]/30 focus:border-[#c5a944] outline-none transition-all bg-white text-gray-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600 mb-2 block font-medium">Time Slot</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {generateTimeSlots(
                                                selectedDoctor.availability?.startTime || '09:00',
                                                selectedDoctor.availability?.endTime || '17:00'
                                            ).map((slot) => (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    onClick={() => setBookingForm({ ...bookingForm, timeSlot: slot })}
                                                    className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all border ${bookingForm.timeSlot === slot
                                                            ? 'bg-[#c5a944] border-[#c5a944] text-gray-900 font-bold'
                                                            : 'bg-gray-50 border-gray-200 hover:border-[#c5a944] text-gray-600'
                                                        }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600 mb-2 block font-medium">Notes (optional)</label>
                                        <textarea
                                            id="booking-notes"
                                            placeholder="Reason for visit..."
                                            value={bookingForm.notes}
                                            onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a944]/30 focus:border-[#c5a944] outline-none transition-all resize-none h-20 bg-white text-gray-900"
                                        />
                                    </div>

                                    <button
                                        disabled={booking || !bookingForm.date || !bookingForm.timeSlot}
                                        type="submit"
                                        className="w-full py-3.5 bg-[#c5a944] text-gray-900 font-bold rounded-xl hover:bg-[#d4b84e] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {booking ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
                                                Booking...
                                            </>
                                        ) : (
                                            <>
                                                <Calendar size={16} /> Confirm Booking
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Doctors;

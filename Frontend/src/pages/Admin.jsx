import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, Activity, ShieldAlert, Database, Loader2, RefreshCw } from 'lucide-react';
import api from '../api/api';
import toast from 'react-hot-toast';

const Admin = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/doctors');
      setDoctors(data);
    } catch (err) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const seedDoctors = async () => {
    setSeeding(true);
    try {
      await api.get('/doctors/seed');
      toast.success('Sample doctors seeded successfully!');
      fetchDoctors();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to seed doctors');
    } finally {
      setSeeding(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-white/30">
        <Loader2 size={32} className="animate-spin mb-4" />
        <p className="text-sm">Loading admin panel...</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Header */}
      <motion.header variants={item} className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">Admin Console</h1>
          <p className="text-white/40 mt-1">Manage platform data and seed initial content.</p>
        </div>
        <div className="px-4 py-2 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm font-medium flex items-center gap-2 self-start">
          <ShieldAlert size={16} /> Restricted Access
        </div>
      </motion.header>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminStatCard
          title="Total Doctors"
          value={doctors.length}
          icon={<Users size={24} />}
          color="primary"
        />
        <AdminStatCard
          title="Specializations"
          value={[...new Set(doctors.map(d => d.specialization))].length}
          icon={<Activity size={24} />}
          color="secondary"
        />
        <AdminStatCard
          title="Platform Status"
          value="Active"
          icon={<Database size={24} />}
          color="accent"
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={seedDoctors}
            disabled={seeding}
            className="p-5 bg-primary/10 border border-primary/20 rounded-2xl text-left hover:bg-primary/15 transition-all disabled:opacity-50 group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Database size={20} className="text-primary" />
              <span className="font-semibold group-hover:text-primary transition-colors">
                {seeding ? 'Seeding...' : 'Seed Sample Doctors'}
              </span>
            </div>
            <p className="text-xs text-white/30">
              Populate the database with sample doctor profiles for testing.
            </p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={fetchDoctors}
            className="p-5 bg-secondary/10 border border-secondary/20 rounded-2xl text-left hover:bg-secondary/15 transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <RefreshCw size={20} className="text-secondary" />
              <span className="font-semibold group-hover:text-secondary transition-colors">
                Refresh Data
              </span>
            </div>
            <p className="text-xs text-white/30">
              Reload all data from the database.
            </p>
          </motion.button>
        </div>
      </motion.div>

      {/* Doctors Table */}
      <motion.div variants={item} className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/[0.06] flex justify-between items-center">
          <h2 className="text-xl font-semibold">Doctors Directory</h2>
          <span className="text-xs text-white/20 bg-white/5 px-3 py-1 rounded-full">
            {doctors.length} entries
          </span>
        </div>

        {doctors.length === 0 ? (
          <div className="p-10 text-center text-white/20">
            <Database size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No doctors in database.</p>
            <p className="text-xs mt-1">Click "Seed Sample Doctors" to add test data.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/[0.03] text-white/30 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Doctor</th>
                  <th className="px-6 py-4 font-medium">Specialization</th>
                  <th className="px-6 py-4 font-medium">Experience</th>
                  <th className="px-6 py-4 font-medium">Fee</th>
                  <th className="px-6 py-4 font-medium">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {doctors.map((doctor) => (
                  <tr key={doctor._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/10">
                          {doctor.name.charAt(0)}
                        </div>
                        <span className="font-medium text-sm">{doctor.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium border border-primary/10">
                        {doctor.specialization}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{doctor.experience} years</td>
                    <td className="px-6 py-4 text-sm text-white/60 font-mono">₹{doctor.feePerConsultation}</td>
                    <td className="px-6 py-4 text-sm text-white/40">
                      {doctor.location?.city || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const AdminStatCard = ({ title, value, icon, color }) => {
  const colorMap = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    secondary: 'text-secondary bg-secondary/10 border-secondary/20',
    danger: 'text-danger bg-danger/10 border-danger/20',
    accent: 'text-accent bg-accent/10 border-accent/20',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card p-6"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${colorMap[color]}`}>
        {icon}
      </div>
      <div className="text-white/40 text-sm font-medium">{title}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
    </motion.div>
  );
};

export default Admin;
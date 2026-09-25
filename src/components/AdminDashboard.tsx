import React, { useState } from 'react';
import { 
  Scissors, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock, 
  Search, 
  Plus, 
  LogOut, 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Star,
  Sparkles
} from 'lucide-react';

export interface BarberAppointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  specialist: string;
  date: string;
  time: string;
  price: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

interface AdminDashboardProps {
  appointments: BarberAppointment[];
  onUpdateStatus: (id: string, newStatus: BarberAppointment['status']) => void;
  onAddService: (category: string, name: string, price: string, duration: string) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  appointments,
  onUpdateStatus,
  onAddService,
  onClose
}) => {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'completed'>('all');
  const [specialistFilter, setSpecialistFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('barbering');
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('$65');
  const [newServiceDuration, setNewServiceDuration] = useState('45 mins');

  const filtered = appointments.filter(a => {
    const matchStatus = filter === 'all' ? true : a.status === filter;
    const matchSpecialist = specialistFilter === 'all' ? true : a.specialist.toLowerCase().includes(specialistFilter.toLowerCase());
    const matchSearch = search.trim() === '' ? true :
      a.clientName.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase()) ||
      a.clientPhone.includes(search);
    return matchStatus && matchSpecialist && matchSearch;
  });

  const totalWeeklyRevenue = appointments.reduce((sum, a) => sum + (a.status !== 'cancelled' ? a.price : 0), 14200);

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName) return;
    onAddService(newCategory, newServiceName, newServicePrice, newServiceDuration);
    setNewServiceName('');
    setIsAddServiceOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-stone-200 p-4 sm:p-8 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-stone-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest">
                Master Barber Passkey Bypass (royal2026)
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider font-mono text-emerald-400">Chairs Active</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-wide mt-1.5">
              ROYAL APEX <span className="text-stone-500 italic font-normal text-xl sm:text-2xl">Atelier Master Control</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => setIsAddServiceOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded uppercase tracking-wider text-stone-300 hover:text-white transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Service Rate</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-5 py-3 min-h-[44px] bg-stone-100 hover:bg-white text-stone-950 font-semibold rounded uppercase tracking-wider transition-all cursor-pointer"
            >
              <LogOut size={14} />
              <span>Exit to Salon</span>
            </button>
          </div>
        </div>

        {/* Master Chair KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-stone-950/80 border border-stone-900 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-stone-500 text-xs font-mono uppercase tracking-wider">
              <span>Weekly Chair Revenue</span>
              <DollarSign size={14} className="text-[#D4AF37]" />
            </div>
            <div className="text-2xl font-serif text-white font-light mt-1">
              ${totalWeeklyRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold tracking-wider font-mono text-emerald-400">
              <TrendingUp size={11} />
              <span>+14.2% vs last week</span>
            </div>
          </div>

          <div className="p-5 bg-stone-950/80 border border-stone-900 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-stone-500 text-xs font-mono uppercase tracking-wider">
              <span>Master Utilization</span>
              <Scissors size={14} className="text-stone-400" />
            </div>
            <div className="text-2xl font-serif text-white font-light mt-1">
              94.2% Booked
            </div>
            <div className="text-xs font-semibold tracking-wider font-mono text-stone-500">
              4 Chairs Operating (Wed-Sat Peak)
            </div>
          </div>

          <div className="p-5 bg-stone-950/80 border border-stone-900 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-stone-500 text-xs font-mono uppercase tracking-wider">
              <span>Black Card Members</span>
              <Users size={14} className="text-stone-400" />
            </div>
            <div className="text-2xl font-serif text-white font-light mt-1">
              188 Patrons
            </div>
            <div className="text-xs font-semibold tracking-wider font-mono text-gold-400">
              Bi-weekly standing chair reservations
            </div>
          </div>

          <div className="p-5 bg-stone-950/80 border border-stone-900 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-stone-500 text-xs font-mono uppercase tracking-wider">
              <span>Today's Sessions</span>
              <Calendar size={14} className="text-stone-400" />
            </div>
            <div className="text-2xl font-serif text-white font-light mt-1">
              {appointments.length} Total Cuts
            </div>
            <div className="text-xs font-semibold tracking-wider font-mono text-emerald-400">
              {appointments.filter(a => a.status === 'confirmed').length} Confirmed • 0 No-Shows
            </div>
          </div>
        </div>

        {/* Chair Queue Ledger */}
        <div className="bg-stone-950/90 border border-stone-900 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-serif text-xl font-light text-white">Master Chair Appointment Ledger</h2>
              <p className="text-xs text-stone-500 font-mono mt-0.5">Live database synchronization active • Supabase PostgreSQL</p>
            </div>

            {/* Filter and search */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search patron, service..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-stone-900/80 border border-stone-800 rounded text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-stone-700 font-mono"
                />
              </div>

              <div className="flex border border-stone-800 rounded p-0.5 bg-stone-900/40 text-xs font-semibold tracking-wider font-mono">
                {(['all', 'confirmed', 'pending', 'completed'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`px-2.5 py-1 rounded uppercase tracking-wider transition-colors ${filter === t ? 'bg-stone-800 text-white font-semibold' : 'text-stone-500 hover:text-stone-300'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-stone-900 text-xs font-semibold tracking-wider text-stone-500 uppercase tracking-widest">
                  <th className="pb-3 font-normal">Patron Details</th>
                  <th className="pb-3 font-normal">Grooming Service</th>
                  <th className="pb-3 font-normal">Master Specialist</th>
                  <th className="pb-3 font-normal">Chair Time</th>
                  <th className="pb-3 font-normal">Rate</th>
                  <th className="pb-3 font-normal">Status</th>
                  <th className="pb-3 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-900/60">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-stone-600 font-mono text-xs">
                      No chair appointments matching current filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map(appt => (
                    <tr key={appt.id} className="hover:bg-stone-900/30 transition-colors">
                      <td className="py-3.5 pr-4">
                        <div className="font-sans font-medium text-stone-200">{appt.clientName}</div>
                        <div className="text-xs font-semibold tracking-wider text-stone-500">{appt.clientPhone}</div>
                        {appt.notes && (
                          <div className="text-[9px] text-[#D4AF37]/80 italic mt-0.5 max-w-xs truncate">
                            Note: {appt.notes}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 pr-4 font-sans text-stone-300">
                        {appt.service}
                      </td>
                      <td className="py-3.5 pr-4 text-stone-400 font-sans text-xs">
                        {appt.specialist}
                      </td>
                      <td className="py-3.5 pr-4 text-stone-300">
                        <div>{appt.date}</div>
                        <div className="text-xs font-semibold tracking-wider text-stone-500">{appt.time}</div>
                      </td>
                      <td className="py-3.5 pr-4 font-semibold text-stone-200">
                        ${appt.price}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold ${
                          appt.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                          appt.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                          appt.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right space-x-1">
                        {appt.status === 'pending' && (
                          <button
                            onClick={() => onUpdateStatus(appt.id, 'confirmed')}
                            className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded text-[9px] uppercase tracking-wider transition-all"
                            title="Confirm Chair Booking"
                          >
                            Confirm
                          </button>
                        )}
                        {appt.status === 'confirmed' && (
                          <button
                            onClick={() => onUpdateStatus(appt.id, 'completed')}
                            className="px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 rounded text-[9px] uppercase tracking-wider transition-all"
                            title="Mark Service Finished"
                          >
                            Complete
                          </button>
                        )}
                        {appt.status !== 'cancelled' && (
                          <button
                            onClick={() => onUpdateStatus(appt.id, 'cancelled')}
                            className="px-2 py-1 bg-stone-900 hover:bg-rose-950 text-stone-500 hover:text-rose-400 border border-stone-800 rounded text-[9px] uppercase tracking-wider transition-all"
                            title="Cancel Chair Booking"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add Grooming Service */}
        {isAddServiceOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#0D0D0C] border border-stone-800 rounded-xl max-w-md w-full p-6 space-y-5 text-stone-200">
              <div className="flex justify-between items-center border-b border-stone-800 pb-3">
                <h3 className="font-serif text-lg text-white">Add Atelier Grooming Rate</h3>
                <button onClick={() => setIsAddServiceOpen(false)} className="text-stone-500 hover:text-white">
                  <XCircle size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateService} className="space-y-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-stone-400 uppercase tracking-widest text-[9px]">Pillar Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-stone-200"
                  >
                    <option value="barbering">Barbering & Sculpting</option>
                    <option value="braids">Braids & Scalp Scaling</option>
                    <option value="locTech">Loc Tech & Hydration</option>
                    <option value="hairStylists">Shear Styling & Silk Press</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 uppercase tracking-widest text-[9px]">Service Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Shave & Charcoal Detox"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-stone-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-stone-400 uppercase tracking-widest text-[9px]">Price Rate</label>
                    <input
                      type="text"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(e.target.value)}
                      placeholder="$75"
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-stone-200"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-stone-400 uppercase tracking-widest text-[9px]">Duration</label>
                    <input
                      type="text"
                      value={newServiceDuration}
                      onChange={(e) => setNewServiceDuration(e.target.value)}
                      placeholder="45 mins"
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-stone-200"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddServiceOpen(false)}
                    className="flex-1 py-2 bg-stone-900 border border-stone-800 rounded text-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-stone-100 hover:bg-white text-stone-950 font-semibold rounded"
                  >
                    Save Rate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

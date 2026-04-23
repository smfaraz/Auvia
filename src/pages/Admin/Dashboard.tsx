import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { 
  Users, Briefcase, MessageSquare, LogOut, 
  Search, Filter, ChevronRight, CheckCircle, 
  ShieldCheck,
  Clock, Archive, Trash2, ExternalLink, Smile,
  ShieldHalf, Plus, X, ListOrdered, MapPin,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Using Design Recipe 1: Technical Dashboard / Data Grid
export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'jobs' | 'faqs' | 'admins' | 'locations'>('leads');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  const [leads, setLeads] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Form States
  const [jobForm, setJobForm] = useState({ title: '', category: '', location: '', type: 'Full-Time', description: '', isActive: true });
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', category: 'General', order: 0 });
  const [locationForm, setLocationForm] = useState({ 
    name: '', address: '', city: '', state: '', zip: '', 
    phone: '', lat: 0, lng: 0, insurance: '', type: 'Center based care', 
    image: 'https://picsum.photos/seed/auvia-center/800/600', isActive: true 
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/admin/login');
    });

    const leadsQuery = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribeLeads = onSnapshot(leadsQuery, 
      (snapshot) => {
        const leadsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLeads(leadsData);
      },
      (error) => console.error("Leads listener permission error:", error)
    );

    const adminsQuery = query(collection(db, 'admins'));
    const unsubscribeAdmins = onSnapshot(adminsQuery, 
      (snapshot) => {
        const adminsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAdmins(adminsData);
      },
      (error) => console.error("Admins listener permission error:", error)
    );

    const jobsQuery = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
    const unsubscribeJobs = onSnapshot(jobsQuery, 
      (snapshot) => {
        const jobsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJobs(jobsData);
      },
      (error) => console.error("Jobs listener permission error:", error)
    );

    const faqsQuery = query(collection(db, 'faqs'), orderBy('order', 'asc'));
    const unsubscribeFaqs = onSnapshot(faqsQuery, 
      (snapshot) => {
        const faqsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFaqs(faqsData);
      },
      (error) => console.error("FAQs listener permission error:", error)
    );

    const locationsQuery = query(collection(db, 'locations'), orderBy('name', 'asc'));
    const unsubscribeLocations = onSnapshot(locationsQuery, 
      (snapshot) => {
        const locationsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLocations(locationsData);
        setLoading(false);
      },
      (error) => {
        console.error("Locations listener permission error:", error);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeLeads();
      unsubscribeAdmins();
      unsubscribeJobs();
      unsubscribeFaqs();
      unsubscribeLocations();
    };
  }, [navigate]);

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDoc(doc(db, 'jobs', editingItem.id), { ...jobForm, updatedAt: serverTimestamp() });
        showToast('Job updated successfully!', 'success');
      } else {
        await addDoc(collection(db, 'jobs'), { ...jobForm, createdAt: serverTimestamp() });
        showToast('Job posted successfully!', 'success');
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setJobForm({ title: '', category: '', location: '', type: 'Full-Time', description: '', isActive: true });
    } catch (error) {
      console.error('Error saving job:', error);
      showToast('Error saving job.', 'error');
    }
  };

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDoc(doc(db, 'faqs', editingItem.id), { ...faqForm });
        showToast('FAQ updated successfully!', 'success');
      } else {
        await addDoc(collection(db, 'faqs'), { ...faqForm });
        showToast('FAQ added successfully!', 'success');
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFaqForm({ question: '', answer: '', category: 'General', order: faqs.length });
    } catch (error) {
      console.error('Error saving FAQ:', error);
      showToast('Error saving FAQ.', 'error');
    }
  };

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDoc(doc(db, 'locations', editingItem.id), { ...locationForm });
        showToast('Location updated successfully!', 'success');
      } else {
        await addDoc(collection(db, 'locations'), { ...locationForm });
        showToast('Location added successfully!', 'success');
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setLocationForm({ 
        name: '', address: '', city: '', state: '', zip: '', 
        phone: '', lat: 0, lng: 0, insurance: '', type: 'Center based care', 
        image: 'https://picsum.photos/seed/auvia-center/800/600', isActive: true 
      });
    } catch (error) {
      console.error('Error saving location:', error);
      showToast('Error saving location.', 'error');
    }
  };

  const handleStatusUpdate = async (leadId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'leads', leadId), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      showToast('Lead status updated!', 'success');
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('Failed to update status.', 'error');
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'leads', id));
      showToast('Lead deleted.', 'success');
    } catch (error) {
      console.error('Error deleting lead:', error);
      showToast('Failed to delete lead.', 'error');
    }
  };

  const handleDelete = async (id: string, collectionName: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      showToast(`${collectionName.slice(0, -1)} deleted successfully!`, 'success');
    } catch (error) {
      console.error(`Error deleting ${collectionName}:`, error);
      showToast(`Error deleting ${collectionName}.`, 'error');
    }
  };

  const handleAdminDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'admins', id));
      showToast('Admin removed successfully!', 'success');
    } catch (error) {
      console.error('Error deleting admin:', error);
      showToast('Error removing admin.', 'error');
    }
  };

  const toggleJobStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'jobs', id), { isActive: !currentStatus });
      showToast(`Job ${!currentStatus ? 'activated' : 'deactivated'}!`, 'success');
    } catch (error) {
      console.error('Error toggling job status:', error);
      showToast('Error updating job status.', 'error');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const filteredLeads = leads.filter(lead => 
    lead.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#E4E3E0] flex font-sans selection:bg-brand-ink selection:text-[#E4E3E0] overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl font-bold border-2 ${
              toast.type === 'success' ? 'bg-[#98FF98] text-[#141414] border-[#141414]' : 'bg-[#FF9898] text-[#141414] border-[#141414]'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-64 bg-[#141414] text-white flex flex-col border-r border-[#141414] z-50 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 pb-12">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-teal rounded-xl flex items-center justify-center text-white">
                <Smile size={20} />
              </div>
              <span className="font-kids font-bold text-lg tracking-tight">Auvia Admin</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'leads', icon: Users, label: 'Lead Entry' },
              { id: 'jobs', icon: Briefcase, label: 'Careers' },
              { id: 'faqs', icon: MessageSquare, label: 'FAQ Data' },
              { id: 'locations', icon: MapPin, label: 'Locations' },
              { id: 'admins', icon: ShieldHalf, label: 'Manage Admins' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === item.id 
                    ? 'bg-brand-teal text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 font-bold text-sm hover:text-red-300 transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-[#141414] flex items-center justify-between px-4 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-brand-ink hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="font-serif italic text-lg lg:text-2xl text-[#141414] truncate max-w-[150px] md:max-w-none">
              {activeTab === 'leads' && 'Leads'}
              {activeTab === 'jobs' && 'Careers'}
              {activeTab === 'faqs' && 'FAQ Base'}
              {activeTab === 'locations' && 'Centers'}
              {activeTab === 'admins' && 'Admins'}
            </h2>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#FCFAF7] border border-[#141414] rounded-full pl-12 pr-6 py-2 text-sm focus:ring-2 focus:ring-brand-teal outline-none w-48 lg:w-64 transition-all" 
              />
            </div>
            <div className="flex items-center gap-3 pl-3 lg:pl-6 border-l border-gray-200">
               <div className="w-8 h-8 rounded-full bg-brand-mint flex items-center justify-center text-brand-teal font-bold text-xs uppercase shrink-0">
                 {auth.currentUser?.email?.[0] || 'A'}
               </div>
               <span className="hidden sm:inline text-[10px] lg:text-xs font-bold text-[#141414] uppercase tracking-widest truncate max-w-[60px]">
                 {auth.currentUser?.email?.split('@')[0]}
               </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-10 relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h3 className="text-2xl lg:text-3xl font-kids font-bold text-brand-ink capitalize">
              {activeTab} Management
            </h3>
            {activeTab !== 'leads' && activeTab !== 'admins' && (
              <button 
                onClick={() => {
                  setEditingItem(null);
                  if (activeTab === 'jobs') setJobForm({ title: '', category: '', location: '', type: 'Full-Time', description: '', isActive: true });
                  if (activeTab === 'faqs') setFaqForm({ question: '', answer: '', category: 'General', order: faqs.length });
                  setIsModalOpen(true);
                }}
                className="w-full sm:w-auto btn-friendly-primary py-3 px-6 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <Plus size={20} /> Add New {activeTab === 'jobs' ? 'Job' : 'FAQ'}
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'leads' && (
              <motion.div
                key="leads"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-[#141414] rounded-none shadow-[4px_4px_0px_#141414] overflow-hidden"
              >
                {/* Header */}
                <div className="hidden lg:grid grid-cols-12 border-b border-[#141414] bg-[#F8F7F4] p-4">
                  <div className="col-span-3 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Parent Contact</div>
                  <div className="col-span-2 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Child & Insurance</div>
                  <div className="col-span-2 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Location / Center</div>
                  <div className="col-span-1 font-serif italic text-[11px] uppercase tracking-wider opacity-50">SMS</div>
                  <div className="col-span-2 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Status</div>
                  <div className="col-span-2 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Actions</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-[#141414]">
                  {loading ? (
                    <div className="p-20 text-center text-gray-400 font-mono text-sm">LOADING_DATA_STREAM...</div>
                  ) : filteredLeads.length === 0 ? (
                    <div className="p-20 text-center text-gray-400 font-mono text-sm">NO_RECORDS_FOUND</div>
                  ) : filteredLeads.map((lead) => (
                    <div 
                      key={lead.id}
                      className="flex flex-col lg:grid lg:grid-cols-12 p-5 lg:p-6 hover:bg-[#141414] hover:text-white transition-all group cursor-default gap-6 lg:gap-0"
                    >
                      {/* Mobile Label / Parent Contact */}
                      <div className="col-span-3">
                        <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Parent Contact</div>
                        <div className="font-bold text-base lg:text-sm mb-1">{lead.firstName} {lead.lastName}</div>
                        <div className="font-mono text-[10px] opacity-70 break-all">{lead.email}</div>
                        <div className="font-mono text-[10px] opacity-70 mt-1">{lead.phone}</div>
                      </div>
                      
                      <div className="col-span-2">
                        <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Child & Insurance</div>
                        {lead.childName ? (
                          <>
                            <div className="text-sm font-medium">{lead.childName}</div>
                            <div className="text-[10px] opacity-60">DOB: {lead.childDob}</div>
                          </>
                        ) : (
                          <div className="text-[10px] opacity-30 italic mb-1">Child not named</div>
                        )}
                        {lead.insuranceProvider && (
                          <div className="mt-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-brand-peach border border-brand-peach/30 px-2 py-0.5 rounded-full w-fit">
                            <ShieldCheck size={10} /> {lead.insuranceProvider}
                          </div>
                        )}
                      </div>

                      <div className="col-span-2">
                        <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Center Location</div>
                        <div className="text-sm font-medium capitalize">{lead.center || 'N/A'}</div>
                        <div className="text-[10px] opacity-60">ZIP: {lead.zipCode || 'N/A'}</div>
                        <div className="text-[10px] uppercase font-bold tracking-tighter mt-1 px-2 py-0.5 inline-block bg-brand-mint text-brand-teal border border-brand-teal/20">
                          {lead.source?.replace('_', ' ')}
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">SMS Consent</div>
                        <div className="flex items-center gap-2">
                          {lead.smsConsent ? (
                            <div className="px-2 py-1 bg-green-500/10 text-green-500 rounded-lg flex items-center gap-1.5 border border-green-500/20 text-[10px] font-bold">
                              <CheckCircle size={12} /> GRANTED
                            </div>
                          ) : (
                            <div className="px-2 py-1 bg-red-500/10 text-red-500 rounded-lg flex items-center gap-1.5 border border-red-500/20 text-[10px] font-bold">
                              <Clock size={12} /> PENDING
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Process Status</div>
                        <select 
                          value={lead.status}
                          onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                          className="w-full lg:w-auto bg-[#F8F7F4] lg:bg-transparent text-brand-ink lg:text-current border border-[#141414] lg:border-current rounded-xl lg:rounded-none px-4 py-2 lg:px-3 lg:py-1 text-xs font-bold uppercase tracking-widest outline-none cursor-pointer focus:bg-brand-teal focus:text-white transition-all"
                        >
                          <option value="new">NEW</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="tour_scheduled">TOUR</option>
                          <option value="enrolled">ENROLLED</option>
                          <option value="archived">ARCHIVED</option>
                        </select>
                      </div>

                      <div className="col-span-2">
                        <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2 mt-2">Actions</div>
                        <div className="flex items-center gap-3">
                          <button className="flex-1 lg:flex-none p-3 lg:p-2 border border-[#141414] lg:border-current rounded-xl lg:rounded-xl hover:bg-white hover:text-brand-ink transition-all flex justify-center items-center">
                            <ExternalLink size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteLead(lead.id)}
                            className="flex-1 lg:flex-none p-3 lg:p-2 border border-red-500/30 text-red-500/70 hover:bg-red-500 hover:text-white transition-all rounded-xl flex justify-center items-center"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'admins' && (
              <motion.div
                key="admins"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#141414] rounded-none shadow-[4px_4px_0px_#141414] overflow-hidden"
              >
                {/* Desktop Headers */}
                <div className="hidden lg:grid grid-cols-12 border-bottom border-[#141414] bg-[#F8F7F4] p-4">
                  <div className="col-span-5 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Admin User</div>
                  <div className="col-span-3 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Role</div>
                  <div className="col-span-2 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Joined</div>
                  <div className="col-span-2 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Actions</div>
                </div>

                <div className="divide-y divide-[#141414]">
                  {admins.map((admin) => (
                    <div key={admin.id} className="flex flex-col lg:grid lg:grid-cols-12 p-5 lg:p-6 hover:bg-[#141414] hover:text-white transition-all group cursor-default gap-3 lg:gap-0">
                      <div className="col-span-5">
                        <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Admin User</div>
                        <div className="font-bold text-base lg:text-sm">{admin.email}</div>
                        <div className="font-mono text-[10px] opacity-70">UID: {admin.id}</div>
                      </div>
                      <div className="col-span-3">
                        <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Role</div>
                        <span className="text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 bg-brand-teal text-white border border-brand-teal">
                          {admin.role}
                        </span>
                      </div>
                      <div className="col-span-2 text-[10px] font-mono opacity-60">
                        <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Joined</div>
                        {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                      <div className="col-span-2">
                        <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2 mt-2">Actions</div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleAdminDelete(admin.id)}
                            disabled={admin.email === auth.currentUser?.email}
                            className="flex-1 lg:flex-none p-3 lg:p-2 border border-red-500/30 text-red-500/70 hover:bg-red-500 hover:text-white transition-all rounded-xl disabled:opacity-20 disabled:cursor-not-allowed flex justify-center items-center"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="p-8 bg-gray-50 border-t border-[#141414]">
                    <p className="text-xs text-brand-sage font-medium italic">
                      Admin whitelisting is currently restricted to verified @auviatherapy.com accounts for production security.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {(activeTab === 'jobs' || activeTab === 'faqs' || activeTab === 'locations') && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#141414] rounded-none shadow-[4px_4px_0px_#141414] overflow-hidden"
              >
                {activeTab === 'jobs' ? (
                  <>
                    <div className="hidden lg:grid grid-cols-12 border-bottom border-[#141414] bg-[#F8F7F4] p-4">
                      <div className="col-span-4 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Title / Category</div>
                      <div className="col-span-3 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Location / Type</div>
                      <div className="col-span-2 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Status</div>
                      <div className="col-span-3 font-serif italic text-[11px] uppercase tracking-wider opacity-50 text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-[#141414]">
                      {jobs.map(job => (
                        <div key={job.id} className="flex flex-col lg:grid lg:grid-cols-12 p-5 lg:p-6 hover:bg-[#141414] hover:text-white group transition-all gap-6 lg:gap-0">
                          <div className="col-span-4">
                            <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Job Details</div>
                            <div className="font-bold text-base lg:text-sm mb-1">{job.title}</div>
                            <div className="text-[10px] opacity-60 uppercase font-bold">{job.category}</div>
                          </div>
                          <div className="col-span-3">
                            <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Location & Type</div>
                            <div className="text-sm font-medium mb-1">{job.location}</div>
                            <div className="text-[10px] opacity-60 font-mono">{job.type}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Status</div>
                            <button 
                              onClick={() => toggleJobStatus(job.id, job.isActive)}
                              className={`w-full lg:w-auto px-4 py-2 lg:px-3 lg:py-1 rounded-xl lg:rounded-full text-[10px] font-bold uppercase tracking-widest border border-current ${job.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
                            >
                              {job.isActive ? 'Active' : 'Draft'}
                            </button>
                          </div>
                          <div className="col-span-3">
                            <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2 mt-2">Actions</div>
                            <div className="flex items-center justify-end gap-3">
                              <button 
                                onClick={() => {
                                  setEditingItem(job);
                                  setJobForm({ title: job.title, category: job.category, location: job.location, type: job.type || 'Full-Time', description: job.description, isActive: job.isActive });
                                  setIsModalOpen(true);
                                }}
                                className="flex-1 lg:flex-none p-3 lg:p-2 border border-[#141414] lg:border-current rounded-xl lg:rounded-xl hover:bg-white hover:text-brand-ink transition-all flex justify-center items-center"
                              >
                                <ExternalLink size={14} />
                              </button>
                              <button 
                                onClick={() => handleDelete(job.id, 'jobs')}
                                className="flex-1 lg:flex-none p-3 lg:p-2 border border-red-500/30 text-red-500/70 hover:bg-red-500 hover:text-white transition-all rounded-xl flex justify-center items-center"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {jobs.length === 0 && (
                        <div className="p-20 text-center text-gray-400 font-mono text-sm uppercase tracking-widest">
                          no_job_postings_detected
                        </div>
                      )}
                    </div>
                  </>
                ) : activeTab === 'faqs' ? (
                  <>
                    <div className="hidden lg:grid grid-cols-12 border-bottom border-[#141414] bg-[#F8F7F4] p-4">
                      <div className="col-span-1 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Order</div>
                      <div className="col-span-4 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Question</div>
                      <div className="col-span-4 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Answer Preview</div>
                      <div className="col-span-3 font-serif italic text-[11px] uppercase tracking-wider opacity-50 text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-[#141414]">
                      {faqs.map(faq => (
                        <div key={faq.id} className="flex flex-col lg:grid lg:grid-cols-12 p-5 lg:p-6 hover:bg-[#141414] hover:text-white group transition-all gap-6 lg:gap-0">
                          <div className="col-span-1">
                            <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Order</div>
                            <div className="font-mono text-sm">{faq.order}</div>
                          </div>
                          <div className="col-span-4">
                            <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Question</div>
                            <div className="font-bold text-base lg:text-sm mb-1 pr-4 lg:line-clamp-2">{faq.question}</div>
                          </div>
                          <div className="col-span-4">
                            <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Answer</div>
                            <div className="text-sm lg:text-[10px] opacity-70 italic lg:line-clamp-2 pr-4">{faq.answer}</div>
                          </div>
                          <div className="col-span-3">
                            <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2 mt-2">Actions</div>
                            <div className="flex items-center justify-end gap-3">
                              <button 
                                onClick={() => {
                                  setEditingItem(faq);
                                  setFaqForm({ question: faq.question, answer: faq.answer, category: faq.category, order: faq.order });
                                  setIsModalOpen(true);
                                }}
                                className="flex-1 lg:flex-none p-3 lg:p-2 border border-[#141414] lg:border-current rounded-xl lg:rounded-xl hover:bg-white hover:text-brand-ink transition-all flex justify-center items-center"
                              >
                                <ExternalLink size={14} />
                              </button>
                              <button 
                                onClick={() => handleDelete(faq.id, 'faqs')}
                                className="flex-1 lg:flex-none p-3 lg:p-2 border border-red-500/30 text-red-500/70 hover:bg-red-500 hover:text-white transition-all rounded-xl flex justify-center items-center"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {faqs.length === 0 && (
                        <div className="p-20 text-center text-gray-400 font-mono text-sm uppercase tracking-widest">
                          faq_database_empty
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hidden lg:grid grid-cols-12 border-bottom border-[#141414] bg-[#F8F7F4] p-4">
                      <div className="col-span-4 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Center Name / City</div>
                      <div className="col-span-5 font-serif italic text-[11px] uppercase tracking-wider opacity-50">Address / Phone</div>
                      <div className="col-span-3 font-serif italic text-[11px] uppercase tracking-wider opacity-50 text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-[#141414]">
                      {locations.map(center => (
                        <div key={center.id} className="flex flex-col lg:grid lg:grid-cols-12 p-5 lg:p-6 hover:bg-[#141414] hover:text-white group transition-all gap-6 lg:gap-0">
                          <div className="col-span-4 pr-4">
                            <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Center Name</div>
                            <div className="font-bold text-base lg:text-sm mb-1">{center.name}</div>
                            <div className="text-[10px] opacity-70 uppercase font-bold">{center.city}, {center.state}</div>
                          </div>
                          <div className="col-span-5 pr-4">
                            <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2">Location Identity</div>
                            <div className="text-sm font-medium mb-1 truncate lg:max-w-[300px]">{center.address}</div>
                            <div className="text-[10px] opacity-70 font-mono">{center.phone}</div>
                          </div>
                          <div className="col-span-3">
                            <div className="lg:hidden text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-2 mt-2">Actions</div>
                            <div className="flex items-center justify-end gap-3">
                              <button 
                                onClick={() => {
                                  setEditingItem(center);
                                  setLocationForm({ 
                                    name: center.name, address: center.address, city: center.city, 
                                    state: center.state, zip: center.zip, phone: center.phone, 
                                    lat: center.lat, lng: center.lng, insurance: center.insurance, 
                                    type: center.type, image: center.image, isActive: center.isActive 
                                  });
                                  setIsModalOpen(true);
                                }}
                                className="flex-1 lg:flex-none p-3 lg:p-2 border border-[#141414] lg:border-current rounded-xl lg:rounded-xl hover:bg-white hover:text-brand-ink transition-all flex justify-center items-center"
                              >
                                <ExternalLink size={14} />
                              </button>
                              <button 
                                onClick={() => handleDelete(center.id, 'locations')}
                                className="flex-1 lg:flex-none p-3 lg:p-2 border border-red-500/30 text-red-500/70 hover:bg-red-500 hover:text-white transition-all rounded-xl flex justify-center items-center"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {locations.length === 0 && (
                        <div className="p-20 text-center text-gray-400 font-mono text-sm uppercase tracking-widest">
                          no_centers_found_in_database
                        </div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal for Jobs / FAQs */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-0">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-brand-ink/90 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl p-6 md:p-10 overflow-hidden"
              >
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-[#141414] hover:bg-[#141414] hover:text-white rounded-full transition-all">
                  <X size={20} />
                </button>
                
                <h4 className="text-3xl font-kids font-bold mb-8">
                  {editingItem ? 'Edit' : 'Create New'} {activeTab === 'jobs' ? 'Job Posting' : activeTab === 'faqs' ? 'FAQ Entry' : 'Care Center'}
                </h4>

                {activeTab === 'jobs' ? (
                  <form onSubmit={handleJobSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Job Title</label>
                        <input type="text" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} required className="w-full px-5 py-4 bg-[#F8F7F4] border border-[#141414] rounded-2xl outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-medium" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Category</label>
                        <input type="text" value={jobForm.category} onChange={e => setJobForm({...jobForm, category: e.target.value})} required placeholder="e.g. Clinical, Admin" className="w-full px-5 py-4 bg-[#F8F7F4] border border-[#141414] rounded-2xl outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-medium" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Location</label>
                        <input type="text" value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} required className="w-full px-5 py-4 bg-[#F8F7F4] border border-[#141414] rounded-2xl outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-medium" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Employment Type</label>
                        <select value={jobForm.type} onChange={e => setJobForm({...jobForm, type: e.target.value})} className="w-full px-5 py-4 bg-[#F8F7F4] border border-[#141414] rounded-2xl outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-medium appearance-none">
                          <option>Full-Time</option>
                          <option>Part-Time</option>
                          <option>Contract</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Short Description</label>
                      <textarea value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} rows={3} className="w-full px-5 py-4 bg-[#F8F7F4] border border-[#141414] rounded-2xl outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-medium resize-none" />
                    </div>
                    <button type="submit" className="w-full py-5 bg-[#141414] text-white rounded-[24px] font-kids font-bold text-xl hover:bg-brand-teal transition-all shadow-xl">
                      {editingItem ? 'Save Changes' : 'Publish Job'}
                    </button>
                  </form>
                ) : activeTab === 'faqs' ? (
                  <form onSubmit={handleFaqSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-3 space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Category</label>
                        <input type="text" value={faqForm.category} onChange={e => setFaqForm({...faqForm, category: e.target.value})} required className="w-full px-5 py-4 bg-[#F8F7F4] border border-[#141414] rounded-2xl outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-medium" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Order</label>
                        <input type="number" value={faqForm.order} onChange={e => setFaqForm({...faqForm, order: parseInt(e.target.value)})} required className="w-full px-5 py-4 bg-[#F8F7F4] border border-[#141414] rounded-2xl outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-medium" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Question</label>
                      <input type="text" value={faqForm.question} onChange={e => setFaqForm({...faqForm, question: e.target.value})} required className="w-full px-5 py-4 bg-[#F8F7F4] border border-[#141414] rounded-2xl outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-medium" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Detailed Answer</label>
                      <textarea value={faqForm.answer} onChange={e => setFaqForm({...faqForm, answer: e.target.value})} rows={6} className="w-full px-5 py-4 bg-[#F8F7F4] border border-[#141414] rounded-2xl outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-medium resize-none" />
                    </div>
                    <button type="submit" className="w-full py-5 bg-[#141414] text-white rounded-[24px] font-kids font-bold text-xl hover:bg-brand-teal transition-all shadow-xl">
                      {editingItem ? 'Save Changes' : 'Add FAQ'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleLocationSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Center Name</label>
                        <input type="text" value={locationForm.name} onChange={e => setLocationForm({...locationForm, name: e.target.value})} required className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#141414] rounded-xl outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Phone</label>
                        <input type="text" value={locationForm.phone} onChange={e => setLocationForm({...locationForm, phone: e.target.value})} required className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#141414] rounded-xl outline-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Full Address</label>
                      <input type="text" value={locationForm.address} onChange={e => setLocationForm({...locationForm, address: e.target.value})} required className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#141414] rounded-xl outline-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">City</label>
                        <input type="text" value={locationForm.city} onChange={e => setLocationForm({...locationForm, city: e.target.value})} required className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#141414] rounded-xl outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">State</label>
                        <input type="text" value={locationForm.state} onChange={e => setLocationForm({...locationForm, state: e.target.value})} required className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#141414] rounded-xl outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Zip</label>
                        <input type="text" value={locationForm.zip} onChange={e => setLocationForm({...locationForm, zip: e.target.value})} required className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#141414] rounded-xl outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Latitude</label>
                        <input type="number" step="any" value={locationForm.lat} onChange={e => setLocationForm({...locationForm, lat: parseFloat(e.target.value)})} required className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#141414] rounded-xl outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Longitude</label>
                        <input type="number" step="any" value={locationForm.lng} onChange={e => setLocationForm({...locationForm, lng: parseFloat(e.target.value)})} required className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#141414] rounded-xl outline-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Insurance (Comma separated)</label>
                      <input type="text" value={locationForm.insurance} onChange={e => setLocationForm({...locationForm, insurance: e.target.value})} placeholder="Aetna, BCBS, Cigna" className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#141414] rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Image URL</label>
                      <input type="text" value={locationForm.image} onChange={e => setLocationForm({...locationForm, image: e.target.value})} className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#141414] rounded-xl outline-none" />
                    </div>
                    <button type="submit" className="w-full py-5 bg-[#141414] text-white rounded-[24px] font-kids font-bold text-xl hover:bg-brand-teal transition-all shadow-xl">
                      {editingItem ? 'Save Changes' : 'Register Center'}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

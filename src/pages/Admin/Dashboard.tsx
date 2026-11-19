import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth, db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { 
  Users, Briefcase, MessageSquare, LogOut, 
  Search, Filter, ChevronRight, CheckCircle, 
  ShieldCheck,
  Clock, Archive, Trash2, ExternalLink, Smile,
  ShieldHalf, Plus, X, ListOrdered, MapPin,
  Menu, BarChart3, Pencil, Eye, FileText, AlertTriangle, Inbox, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type AdminTab = 'leads' | 'jobs' | 'faqs' | 'admins' | 'locations' | 'analytics' | 'applications';
const ADMIN_TABS: AdminTab[] = ['analytics', 'leads', 'applications', 'jobs', 'faqs', 'locations', 'admins'];

const TAB_SUBTITLES: Record<AdminTab, string> = {
  analytics: 'A quick look at enquiries, enrollments and hiring.',
  leads: 'Parent enquiries from the website. Update the status as you follow up.',
  applications: 'Job applications submitted through the careers page.',
  jobs: 'Openings shown on the careers page.',
  faqs: 'Questions and answers shown on the FAQ page.',
  locations: 'Centers shown on the locations page and map.',
  admins: 'People who can sign in to this dashboard.',
};

const LEAD_STATUS_STYLES: Record<string, string> = {
  new: 'bg-[#c8e7ff] text-brand-ink border-brand-ink',
  contacted: 'bg-[#ffe08a] text-brand-ink border-brand-ink',
  tour_scheduled: 'bg-[#ddd6ff] text-brand-ink border-brand-ink',
  enrolled: 'bg-[#c4f1dc] text-brand-ink border-brand-ink',
  archived: 'bg-gray-100 text-gray-500 border-gray-400',
};

const APP_STATUS_STYLES: Record<string, string> = {
  applied: 'bg-[#c8e7ff] text-brand-ink border-brand-ink',
  reviewing: 'bg-[#ffe08a] text-brand-ink border-brand-ink',
  interviewing: 'bg-[#ddd6ff] text-brand-ink border-brand-ink',
  offered: 'bg-[#c4f1dc] text-brand-ink border-brand-ink',
  rejected: 'bg-gray-100 text-gray-500 border-gray-400',
};

// Playful "sticker" style borrowed from the public site: ink outline + chunky drop shadow
const DISPLAY = "font-['Outfit',sans-serif]";
const POP_CARD = 'bg-white border-2 border-brand-ink rounded-[24px] shadow-[0_6px_0_0_#19332f]';
const POP_BTN_BASE = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border-2 border-brand-ink font-bold text-sm transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_0_#19332f] disabled:opacity-60 disabled:cursor-wait disabled:hover:translate-y-0';
const POP_BTN_SUN = `${POP_BTN_BASE} bg-[#ffc93c] text-brand-ink shadow-[0_4px_0_0_#19332f] hover:shadow-[0_6px_0_0_#19332f]`;
const POP_BTN_INK = `${POP_BTN_BASE} bg-brand-ink text-white shadow-[0_4px_0_0_#0b1a17] hover:shadow-[0_6px_0_0_#0b1a17]`;
const POP_BTN_WHITE = `${POP_BTN_BASE} bg-white text-brand-ink shadow-[0_4px_0_0_#19332f] hover:shadow-[0_6px_0_0_#19332f]`;
const POP_BTN_TEAL = `${POP_BTN_BASE} bg-brand-teal text-white shadow-[0_4px_0_0_#19332f] hover:shadow-[0_6px_0_0_#19332f]`;
const CHIP_COLORS = ['bg-[#c8e7ff]', 'bg-[#fff1c2]', 'bg-[#ddd6ff]', 'bg-[#c4f1dc]', 'bg-[#ffe4de]'];
const AVATAR_COLORS = ['bg-[#ffc93c]', 'bg-[#8fd0ff]', 'bg-[#ff9f8a]', 'bg-[#8c7ef2]', 'bg-[#37c594]'];

const Avatar = ({ name, size = 'md', className = '' }: { name: string; size?: 'sm' | 'md'; className?: string }) => {
  const clean = (name || '?').trim();
  const initials = clean.split(/\s+/).map(p => p[0]).join('').slice(0, 2).toUpperCase() || '?';
  let hash = 0;
  for (const ch of clean) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const color = AVATAR_COLORS[hash % AVATAR_COLORS.length];
  const dims = size === 'sm' ? 'w-8 h-8 text-[11px]' : 'w-10 h-10 text-xs';
  return (
    <span aria-hidden="true" className={`${dims} ${color} ${className || 'flex'} shrink-0 rounded-full border-2 border-brand-ink items-center justify-center font-extrabold text-brand-ink`}>
      {initials}
    </span>
  );
};

const STATUS_SELECT_BASE ='w-full lg:w-auto border-2 rounded-full pl-3 pr-2 py-1.5 text-[11px] font-extrabold uppercase tracking-wider outline-none cursor-pointer shadow-[0_2px_0_0_#19332f] focus:ring-4 focus:ring-[#ffc93c]/60 transition-all';

const formatDate = (value: any, withTime = false) => {
  if (!value) return null;
  const d = value?.seconds ? new Date(value.seconds * 1000) : new Date(value);
  if (isNaN(d.getTime())) return null;
  return withTime
    ? d.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
    : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const LoadingState = ({ label }: { label: string }) => (
  <div className="py-20 flex flex-col items-center gap-3 text-brand-sage">
    <Loader2 size={24} className="animate-spin text-brand-teal" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const EmptyState = ({ title, hint }: { title: string; hint?: string }) => (
  <div className="py-20 px-6 flex flex-col items-center gap-3 text-center">
    <div className="w-12 h-12 rounded-2xl bg-[#fff1c2] border-2 border-brand-ink flex items-center justify-center text-brand-ink rotate-[-6deg]">
      <Inbox size={22} />
    </div>
    <p className="text-sm font-bold text-brand-ink">{title}</p>
    {hint && <p className="text-xs text-brand-sage max-w-xs">{hint}</p>}
  </div>
);

export const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as AdminTab | null;
  const activeTab: AdminTab = tabParam && ADMIN_TABS.includes(tabParam) ? tabParam : 'analytics';
  const setActiveTab = (tab: AdminTab) => {
    setSearchParams(tab === 'analytics' ? {} : { tab }, { replace: true });
    setSearchTerm('');
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmState, setConfirmState] = useState<{ title: string; message: string; onConfirm: () => Promise<void> | void } | null>(null);
  const [confirmBusy, setConfirmBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [coverNoteApp, setCoverNoteApp] = useState<any | null>(null);
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const askConfirm = (title: string, message: string, onConfirm: () => Promise<void> | void) => {
    setConfirmState({ title, message, onConfirm });
  };

  const runConfirm = async () => {
    if (!confirmState) return;
    setConfirmBusy(true);
    try {
      await confirmState.onConfirm();
    } finally {
      setConfirmBusy(false);
      setConfirmState(null);
    }
  };
  const [leads, setLeads] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [adminEmailForm, setAdminEmailForm] = useState('');
  const [adminRoleForm, setAdminRoleForm] = useState<'super_admin' | 'center_manager'>('center_manager');
  const [adminCenterForm, setAdminCenterForm] = useState('');
  
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
        setSelectedLead(current => {
          if (!current) return null;
          const updated = leadsData.find(l => l.id === current.id);
          return updated || null;
        });
      },
      (error) => { console.error("Leads listener error:", error); setLoadError(error?.message || String(error)); }
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
      (error) => { console.error("Admins listener error:", error); setLoadError(error?.message || String(error)); }
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
      (error) => { console.error("Jobs listener error:", error); setLoadError(error?.message || String(error)); }
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
      (error) => { console.error("FAQs listener error:", error); setLoadError(error?.message || String(error)); }
    );

    const locationsQuery = query(collection(db, 'locations'), orderBy('name', 'asc'));
    const unsubscribeLocations = onSnapshot(locationsQuery, 
      (snapshot) => {
        const locationsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLocations(locationsData);
      },
      (error) => { console.error("Locations listener error:", error); setLoadError(error?.message || String(error)); }
    );

    const applicationsQuery = query(collection(db, 'job_applications'), orderBy('createdAt', 'desc'));
    const unsubscribeApplications = onSnapshot(applicationsQuery, 
      (snapshot) => {
        const applicationsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setApplications(applicationsData);
        setLoading(false);
      },
      (error) => {
        console.error("Applications listener error:", error);
        setLoadError(error?.message || String(error));
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
      unsubscribeApplications();
    };
  }, [navigate]);

  // Escape closes whichever dialog is on top
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (confirmState) { if (!confirmBusy) setConfirmState(null); return; }
      if (coverNoteApp) { setCoverNoteApp(null); return; }
      if (selectedLead) { setSelectedLead(null); return; }
      if (isAddAdminModalOpen) { setIsAddAdminModalOpen(false); return; }
      if (isModalOpen) { setIsModalOpen(false); return; }
      if (isSidebarOpen) setIsSidebarOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [confirmState, confirmBusy, coverNoteApp, selectedLead, isAddAdminModalOpen, isModalOpen, isSidebarOpen]);

  // Prevents double-submits: the button shows "Saving…" until the write finishes
  const withSaving = (fn: (e: React.FormEvent) => Promise<void>) => async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      await fn(e);
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;

    try {
      const updatedNotes = [
        ...(selectedLead.notes || []),
        {
          text: newNoteText.trim(),
          author: auth.currentUser?.email || 'Admin',
          createdAt: new Date().toISOString()
        }
      ];

      await updateDoc(doc(db, 'leads', selectedLead.id), {
        notes: updatedNotes,
        updatedAt: new Date().toISOString()
      });

      setSelectedLead(prev => ({
        ...prev,
        notes: updatedNotes
      }));
      setNewNoteText('');
      showToast('Note added successfully!', 'success');
    } catch (error) {
      console.error('Error adding note:', error);
      showToast('Failed to add note.', 'error');
    }
  };

  const handleAddAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailLower = adminEmailForm.trim().toLowerCase();
    if (!emailLower) return;

    // Check for duplicates
    const isDuplicate = admins.some(a => a.email?.toLowerCase() === emailLower);
    if (isDuplicate) {
      showToast('This email is already registered as an admin!', 'error');
      return;
    }

    try {
      const { setDoc } = await import('firebase/firestore');
      const adminData: any = {
        email: emailLower,
        role: adminRoleForm,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      if (adminRoleForm === 'center_manager' && adminCenterForm) {
        adminData.center = adminCenterForm;
      }

      await setDoc(doc(db, 'admins', emailLower), adminData);
      setIsAddAdminModalOpen(false);
      setAdminEmailForm('');
      setAdminCenterForm('');
      showToast('Admin email whitelisted successfully!', 'success');
    } catch (error) {
      console.error('Error whitelisting admin:', error);
      showToast('Failed to whitelist admin.', 'error');
    }
  };

  const handleApplicationStatusUpdate = async (appId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'job_applications', appId), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      showToast('Application status updated!', 'success');
    } catch (error) {
      console.error('Error updating application status:', error);
      showToast('Failed to update status.', 'error');
    }
  };

  const handleDeleteApplication = async (appId: string) => {
    try {
      await deleteDoc(doc(db, 'job_applications', appId));
      showToast('Application deleted.', 'success');
    } catch (error) {
      console.error('Error deleting application:', error);
      showToast('Failed to delete application.', 'error');
    }
  };

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
      showToast('Deleted successfully.', 'success');
    } catch (error) {
      console.error(`Error deleting ${collectionName}:`, error);
      showToast('Could not delete. Please try again.', 'error');
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

  const filteredLeads = leads.filter(lead => {
    if (leadStatusFilter !== 'all' && (lead.status || 'new') !== leadStatusFilter) return false;
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return [lead.firstName, lead.lastName, lead.email, lead.phone, lead.childName, lead.center, lead.zipCode, lead.insuranceProvider]
      .some(v => String(v || '').toLowerCase().includes(q));
  });

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaqs = faqs.filter(faq =>
    faq.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLocations = locations.filter(center =>
    center.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdmins = admins.filter(admin =>
    admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications.filter(app =>
    app.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Analytics computations
  const totalLeads = leads.length;
  const enrolledLeads = leads.filter(l => l.status === 'enrolled').length;
  const contactedLeads = leads.filter(l => l.status === 'contacted').length;
  const tourLeads = leads.filter(l => l.status === 'tour_scheduled').length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const archivedLeads = leads.filter(l => l.status === 'archived').length;

  const conversionRate = totalLeads > 0 ? Math.round((enrolledLeads / totalLeads) * 100) : 0;
  const activeJobs = jobs.filter(j => j.isActive).length;
  const totalCenters = locations.length;
  const newApplications = applications.filter(a => a.status === 'applied').length;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const emailName = (auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || 'there').split(/[\s._-]/)[0];
  const firstName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
  const todayLabel = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  // Lead sources breakdown
  const sourcesCount = leads.reduce((acc: any, curr: any) => {
    const src = curr.source || 'unknown';
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {});

  // Leads by center
  const centerLeadsCount = leads.reduce((acc: any, curr: any) => {
    const centerName = curr.center || 'Unassigned';
    acc[centerName] = (acc[centerName] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#fffdf6] flex font-sans text-brand-ink selection:bg-brand-mint selection:text-brand-teal overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            role="status"
            className={`fixed bottom-6 right-6 left-6 sm:left-auto z-[200] px-5 py-3.5 rounded-2xl shadow-[0_6px_0_0_#19332f] text-sm font-bold flex items-center gap-3 border-2 border-brand-ink ${
              toast.type === 'success' ? 'bg-[#c4f1dc] text-brand-ink' : 'bg-[#ffe4de] text-brand-ink'
            }`}
          >
            {toast.type === 'success'
              ? <CheckCircle size={18} className="text-brand-teal shrink-0" />
              : <AlertTriangle size={18} className="text-red-500 shrink-0" />}
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
        fixed lg:static inset-y-0 left-0 w-64 bg-brand-ink text-white flex flex-col z-50 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="px-5 pt-7 pb-6">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ffc93c] rounded-xl border-2 border-[#0b1a17] flex items-center justify-center text-brand-ink shadow-[0_3px_0_0_#0b1a17] -rotate-6">
                <Smile size={20} />
              </div>
              <div className="leading-tight">
                <span className="block font-['Outfit',sans-serif] font-extrabold text-xl tracking-tight">Auvia</span>
                <span className="block text-[11px] font-bold text-[#ffc93c] uppercase tracking-wider">Admin hub</span>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10" aria-label="Close menu">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'analytics', icon: BarChart3, label: 'Analytics', tint: 'text-[#ffc93c]' },
              { id: 'leads', icon: Users, label: 'Leads', badge: newLeads, tint: 'text-[#8fd0ff]' },
              { id: 'applications', icon: FileText, label: 'Applications', badge: newApplications, tint: 'text-[#c3b9ff]' },
              { id: 'jobs', icon: Briefcase, label: 'Careers', tint: 'text-[#ff9f8a]' },
              { id: 'faqs', icon: MessageSquare, label: 'FAQs', tint: 'text-[#6fdcb3]' },
              { id: 'locations', icon: MapPin, label: 'Locations', tint: 'text-[#ffc93c]' },
              { id: 'admins', icon: ShieldHalf, label: 'Admins', tint: 'text-[#8fd0ff]' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as AdminTab);
                  setIsSidebarOpen(false);
                }}
                aria-current={activeTab === item.id ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm border-2 transition-all duration-150 ${
                  activeTab === item.id
                    ? 'bg-[#ffc93c] text-brand-ink border-[#0b1a17] shadow-[0_4px_0_0_#0b1a17] -translate-y-0.5'
                    : 'text-white/75 border-transparent hover:text-white hover:bg-white/10 hover:translate-x-1'
                }`}
              >
                <item.icon size={18} strokeWidth={2.25} className={activeTab === item.id ? 'text-brand-ink' : item.tint} />
                {item.label}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`ml-auto min-w-[22px] text-center text-[11px] font-extrabold px-1.5 py-0.5 rounded-full ${activeTab === item.id ? 'bg-brand-ink text-[#ffc93c]' : 'bg-[#ff9f8a] text-brand-ink'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-5 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 mb-4 min-w-0">
            <Avatar name={auth.currentUser?.email || 'Admin'} size="sm" />
            <span className="text-xs text-white/70 truncate" title={auth.currentUser?.email || ''}>
              {auth.currentUser?.email}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-white/60 font-semibold text-sm hover:text-red-300 hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen min-w-0">
        {/* Header */}
        <header className="bg-[#fffdf6] border-b-2 border-brand-ink shrink-0">
          <div className="h-16 lg:h-20 flex items-center justify-between gap-4 px-4 lg:px-10">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-brand-ink hover:bg-brand-cream rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
              <h2 className="font-['Outfit',sans-serif] font-extrabold text-2xl lg:text-3xl text-brand-ink truncate px-1 bg-[linear-gradient(transparent_62%,#ffc93c_62%,#ffc93c_92%,transparent_92%)]">
                {activeTab === 'analytics' && 'Analytics'}
                {activeTab === 'leads' && 'Leads'}
                {activeTab === 'applications' && 'Applications'}
                {activeTab === 'jobs' && 'Careers'}
                {activeTab === 'faqs' && 'FAQs'}
                {activeTab === 'locations' && 'Locations'}
                {activeTab === 'admins' && 'Admins'}
              </h2>
            </div>

            {activeTab !== 'analytics' && (
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-sage" size={16} />
                <input
                  type="search"
                  placeholder={`Search ${activeTab === 'faqs' ? 'FAQs' : activeTab}…`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border-2 border-brand-ink rounded-full pl-11 pr-5 py-2.5 text-sm font-medium shadow-[0_3px_0_0_#19332f] focus:ring-4 focus:ring-[#ffc93c]/60 outline-none w-56 lg:w-72 transition-all"
                />
              </div>
            )}
          </div>
          {activeTab !== 'analytics' && (
            <div className="md:hidden px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-sage" size={16} />
                <input
                  type="search"
                  placeholder={`Search ${activeTab === 'faqs' ? 'FAQs' : activeTab}…`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border-2 border-brand-ink rounded-full pl-11 pr-5 py-2.5 text-sm font-medium shadow-[0_3px_0_0_#19332f] focus:ring-4 focus:ring-[#ffc93c]/60 outline-none transition-all"
                />
              </div>
            </div>
          )}
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 xl:p-10 relative bg-[radial-gradient(#19332f1a_1.2px,transparent_1.2px)] [background-size:22px_22px]">
          {loadError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
              <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold text-red-700">Some data couldn't be loaded.</p>
                <p className="text-red-600/80 mt-0.5">Lists below may be incomplete. Try refreshing; if it keeps happening, check that your account still has admin access.</p>
                <p className="text-xs text-red-500/70 mt-1 font-mono break-all">{loadError}</p>
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-sm text-brand-ink/70 font-semibold bg-[#fffdf6] pr-2">
              {TAB_SUBTITLES[activeTab]}
            </p>
            {activeTab !== 'leads' && activeTab !== 'admins' && activeTab !== 'analytics' && activeTab !== 'applications' && (
              <button 
                onClick={() => {
                  setEditingItem(null);
                  if (activeTab === 'jobs') setJobForm({ title: '', category: '', location: '', type: 'Full-Time', description: '', isActive: true });
                  if (activeTab === 'faqs') setFaqForm({ question: '', answer: '', category: 'General', order: faqs.length });
                  if (activeTab === 'locations') setLocationForm({ 
                    name: '', address: '', city: '', state: '', zip: '', 
                    phone: '', lat: 0, lng: 0, insurance: '', type: 'Center based care', 
                    image: 'https://picsum.photos/seed/auvia-center/800/600', isActive: true 
                  });
                  setIsModalOpen(true);
                }}
                className={`w-full sm:w-auto shrink-0 ${POP_BTN_SUN}`}
              >
                <Plus size={18} /> Add {activeTab === 'jobs' ? 'job' : activeTab === 'faqs' ? 'FAQ' : 'center'}
              </button>
            )}
            {activeTab === 'admins' && (
              <button 
                onClick={() => setIsAddAdminModalOpen(true)}
                className={`w-full sm:w-auto shrink-0 ${POP_BTN_SUN}`}
              >
                <Plus size={18} /> Add admin
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Welcome banner */}
                <div className="relative overflow-hidden bg-[#ffc93c] border-2 border-brand-ink rounded-[28px] shadow-[0_8px_0_0_#19332f] p-6 lg:p-8">
                  <div aria-hidden="true" className="absolute -right-10 -top-12 w-44 h-44 rounded-full bg-[#ff9f8a] border-2 border-brand-ink" />
                  <div aria-hidden="true" className="absolute right-28 -bottom-10 w-24 h-24 rounded-full bg-[#8fd0ff] border-2 border-brand-ink hidden sm:block" />
                  <div aria-hidden="true" className="absolute right-10 bottom-8 w-10 h-10 rounded-xl rotate-12 bg-[#8c7ef2] border-2 border-brand-ink hidden sm:block" />
                  <div className="relative max-w-xl">
                    <p className="text-sm font-bold text-brand-ink/70 mb-1">{todayLabel}</p>
                    <h3 className={`${DISPLAY} text-3xl lg:text-4xl font-extrabold text-brand-ink leading-tight`}>
                      {greeting}, {firstName}!
                    </h3>
                    <p className="text-base text-brand-ink/80 font-medium mt-2">
                      {newLeads + newApplications === 0
                        ? "You're all caught up. Nice work!"
                        : <>You have <b>{newLeads} new {newLeads === 1 ? 'lead' : 'leads'}</b> and <b>{newApplications} new {newApplications === 1 ? 'application' : 'applications'}</b> waiting.</>}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-5">
                      <button onClick={() => setActiveTab('leads')} className={POP_BTN_INK}>
                        <Users size={16} /> Review leads
                      </button>
                      <button onClick={() => setActiveTab('applications')} className={POP_BTN_WHITE}>
                        <FileText size={16} /> See applications
                      </button>
                    </div>
                  </div>
                </div>

                {/* KPI Metrics row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  {[
                    { label: 'Interest leads', value: totalLeads, icon: Users, bg: 'bg-[#c8e7ff]', dot: 'bg-[#8fd0ff]', foot: <><b>{newLeads}</b> new · <b>{contactedLeads + tourLeads}</b> in progress</> },
                    { label: 'Enrollment rate', value: `${conversionRate}%`, icon: CheckCircle, bg: 'bg-[#c4f1dc]', dot: 'bg-[#37c594]', foot: <><b>{enrolledLeads}</b> of {totalLeads} leads enrolled</> },
                    { label: 'Job applications', value: applications.length, icon: FileText, bg: 'bg-[#ddd6ff]', dot: 'bg-[#8c7ef2]', foot: <><b>{newApplications}</b> new · <b>{applications.filter(a => a.status === 'interviewing').length}</b> interviewing</> },
                    { label: 'Centers', value: totalCenters, icon: MapPin, bg: 'bg-[#ffe4de]', dot: 'bg-[#ff9f8a]', foot: <>{activeJobs} open {activeJobs === 1 ? 'job' : 'jobs'} on the site</> },
                  ].map(card => (
                    <div key={card.label} className={`${card.bg} border-2 border-brand-ink rounded-[24px] shadow-[0_6px_0_0_#19332f] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_0_0_#19332f]`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-brand-ink">{card.label}</span>
                        <span className={`w-10 h-10 rounded-xl ${card.dot} border-2 border-brand-ink flex items-center justify-center text-brand-ink`}>
                          <card.icon size={18} strokeWidth={2.25} />
                        </span>
                      </div>
                      <div className={`${DISPLAY} text-4xl font-extrabold text-brand-ink leading-none`}>{card.value}</div>
                      <p className="text-xs text-brand-ink/70 font-medium mt-3">{card.foot}</p>
                    </div>
                  ))}
                </div>

                {/* Secondary widgets row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Lead Funnel Widget */}
                  <div className={`${POP_CARD} p-6 lg:p-7 space-y-5`}>
                    <div className="flex justify-between items-center">
                      <h4 className={`${DISPLAY} font-bold text-brand-ink text-xl`}>Enrollment funnel</h4>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-ink bg-[#c4f1dc] border-2 border-brand-ink px-2.5 py-0.5 rounded-full"><span className="w-2 h-2 rounded-full bg-[#37c594] animate-pulse" />Live</span>
                    </div>

                    <div className="space-y-4">
                      {[
                        { status: 'new', label: 'New enquiry', count: newLeads, color: 'bg-[#8fd0ff]' },
                        { status: 'contacted', label: 'Contacted', count: contactedLeads, color: 'bg-[#ffc93c]' },
                        { status: 'tour_scheduled', label: 'Tour scheduled', count: tourLeads, color: 'bg-[#8c7ef2]' },
                        { status: 'enrolled', label: 'Enrolled', count: enrolledLeads, color: 'bg-[#37c594]' }
                      ].map((step, idx) => {
                        const pct = totalLeads > 0 ? Math.round((step.count / totalLeads) * 100) : 0;
                        return (
                          <div key={step.status} className="space-y-1.5">
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2 font-bold text-brand-ink">
                                <span className={`w-6 h-6 rounded-lg ${step.color} border-2 border-brand-ink flex items-center justify-center text-[11px] font-extrabold`}>{idx + 1}</span>
                                {step.label}
                              </div>
                              <span className="text-brand-ink font-bold">{step.count} <span className="text-brand-sage font-semibold">· {pct}%</span></span>
                            </div>
                            <div className="w-full h-4 bg-brand-cream border-2 border-brand-ink rounded-full overflow-hidden">
                              <div className={`h-full ${step.color} ${pct > 0 ? 'border-r-2 border-brand-ink' : ''} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lead Sources & Center Distributions */}
                  <div className={`${POP_CARD} p-6 lg:p-7 space-y-5`}>
                    <h4 className={`${DISPLAY} font-bold text-brand-ink text-xl`}>Where leads come from</h4>

                    <div className="space-y-4">
                      {[
                        { key: 'contact_page', label: 'Contact page', color: 'bg-[#ff9f8a]' },
                        { key: 'home_interest_form', label: 'Home page form', color: 'bg-[#8fd0ff]' },
                        { key: 'insurance_inquiry_form', label: 'Insurance form', color: 'bg-[#8c7ef2]' }
                      ].map((src) => {
                        const count = sourcesCount[src.key] || 0;
                        const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                        return (
                          <div key={src.key} className="space-y-1.5">
                            <div className="flex justify-between items-center text-sm">
                              <span className="flex items-center gap-2 font-bold text-brand-ink">
                                <span className={`w-3 h-3 rounded-full ${src.color} border-2 border-brand-ink`} />
                                {src.label}
                              </span>
                              <span className="text-brand-ink font-bold">{count} <span className="text-brand-sage font-semibold">· {pct}%</span></span>
                            </div>
                            <div className="w-full h-4 bg-brand-cream border-2 border-brand-ink rounded-full overflow-hidden">
                              <div className={`h-full ${src.color} ${pct > 0 ? 'border-r-2 border-brand-ink' : ''} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Center distribution list */}
                    <div className="pt-4 border-t-2 border-dashed border-brand-ink/15">
                      <h5 className="font-bold text-brand-ink text-sm mb-3">Leads by preferred center</h5>
                      <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto">
                        {Object.entries(centerLeadsCount).map(([center, count]: [string, any], i) => (
                          <span key={center} className={`inline-flex items-center gap-2 pl-3 pr-1 py-1 ${CHIP_COLORS[i % CHIP_COLORS.length]} border-2 border-brand-ink rounded-full text-sm font-bold text-brand-ink capitalize`}>
                            {center}
                            <span className="min-w-[24px] text-center px-1.5 bg-white border-2 border-brand-ink rounded-full text-xs">{count}</span>
                          </span>
                        ))}
                        {Object.keys(centerLeadsCount).length === 0 && (
                          <span className="text-sm text-brand-sage italic">No leads yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'leads' && (
              <motion.div
                key="leads"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Status filter */}
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {[
                    { id: 'all', label: 'All', count: totalLeads },
                    { id: 'new', label: 'New', count: newLeads },
                    { id: 'contacted', label: 'Contacted', count: contactedLeads },
                    { id: 'tour_scheduled', label: 'Tour', count: tourLeads },
                    { id: 'enrolled', label: 'Enrolled', count: enrolledLeads },
                    { id: 'archived', label: 'Archived', count: archivedLeads },
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setLeadStatusFilter(f.id)}
                      className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${
                        leadStatusFilter === f.id
                          ? 'bg-[#ffc93c] text-brand-ink border-brand-ink shadow-[0_3px_0_0_#19332f]'
                          : 'bg-white text-brand-ink/70 border-brand-ink/25 hover:border-brand-ink hover:text-brand-ink'
                      }`}
                    >
                      {f.label}
                      <span className={`text-[11px] font-bold px-1.5 rounded-full ${leadStatusFilter === f.id ? 'bg-white/80' : 'bg-[#fff1c2]'}`}>{f.count}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-white border-2 border-brand-ink rounded-[24px] shadow-[0_6px_0_0_#19332f] overflow-hidden">
                {/* Header */}
                <div className="hidden lg:grid grid-cols-12 border-b-2 border-brand-ink bg-[#fff1c2] px-6 py-3">
                  <div className="col-span-3 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Parent Contact</div>
                  <div className="col-span-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Child & Insurance</div>
                  <div className="col-span-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Location / Center</div>
                  <div className="col-span-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">SMS</div>
                  <div className="col-span-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Status</div>
                  <div className="col-span-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70 text-right">Actions</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-brand-ink/10">
                  {loading ? (
                    <LoadingState label="Loading leads…" />
                  ) : filteredLeads.length === 0 ? (
                    <EmptyState
                      title={leads.length === 0 ? 'No leads yet' : 'No leads match'}
                      hint={leads.length === 0 ? 'Enquiries from the website forms will appear here.' : 'Try a different search or status filter.'}
                    />
                  ) : filteredLeads.map((lead) => (
                    <div 
                      key={lead.id}
                      className="flex flex-col lg:grid lg:grid-cols-12 p-5 lg:px-6 lg:py-4 text-brand-ink hover:bg-[#fffbea] transition-colors group cursor-default lg:items-center gap-6 lg:gap-0"
                    >
                      {/* Mobile Label / Parent Contact */}
                      <div className="col-span-3 flex gap-3 items-start min-w-0">
                        <Avatar name={`${lead.firstName || ''} ${lead.lastName || ''}`} className="hidden xl:flex" />
                        <div className="min-w-0">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Parent Contact</div>
                        <button onClick={() => setSelectedLead(lead)} className="font-bold text-base lg:text-sm mb-0.5 text-left hover:text-brand-teal transition-colors">
                          {lead.firstName} {lead.lastName}
                        </button>
                        {lead.email && <a href={`mailto:${lead.email}`} title={lead.email} className="block text-xs text-brand-sage hover:text-brand-teal hover:underline truncate pr-2">{lead.email}</a>}
                        {lead.phone && <a href={`tel:${lead.phone}`} className="block text-xs text-brand-sage hover:text-brand-teal hover:underline mt-0.5">{lead.phone}</a>}
                        {formatDate(lead.createdAt) && (
                          <div className="text-[11px] text-brand-sage/70 mt-1">Received {formatDate(lead.createdAt)}</div>
                        )}
                        </div>
                      </div>
                      
                      <div className="col-span-2">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Child & Insurance</div>
                        {lead.childName ? (
                          <>
                            <div className="text-sm font-medium">{lead.childName}</div>
                            <div className="text-xs text-brand-sage">DOB: {lead.childDob}</div>
                          </>
                        ) : (
                          <div className="text-xs text-brand-sage/70 italic mb-1">Child not named</div>
                        )}
                        {lead.insuranceProvider && (
                          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-brand-ink bg-[#ffe4de] border-2 border-brand-ink px-2 py-0.5 rounded-full w-fit">
                            <ShieldCheck size={12} /> {lead.insuranceProvider}
                          </div>
                        )}
                      </div>

                      <div className="col-span-2">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Center Location</div>
                        <div className="text-sm font-medium capitalize">{lead.center || '—'}</div>
                        <div className="text-xs text-brand-sage">ZIP {lead.zipCode || '—'}</div>
                        {lead.source && (
                          <div className="text-[11px] font-bold capitalize mt-1.5 px-2 py-0.5 inline-block rounded-full bg-[#c4f1dc] text-brand-ink border-2 border-brand-ink">
                            {lead.source.replace(/_/g, ' ')}
                          </div>
                        )}
                      </div>

                      <div className="col-span-1 lg:pr-3">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">SMS Consent</div>
                        {lead.smsConsent ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-ink bg-[#c4f1dc] border-2 border-brand-ink px-2 py-0.5 rounded-full">
                            <CheckCircle size={12} /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 bg-gray-50 border-2 border-gray-300 px-2 py-0.5 rounded-full">
                            <Clock size={12} /> No
                          </span>
                        )}
                      </div>

                      <div className="col-span-2">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Process Status</div>
                        <select
                          value={lead.status || 'new'}
                          onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                          aria-label="Lead status"
                          className={`${STATUS_SELECT_BASE} ${LEAD_STATUS_STYLES[lead.status || 'new'] || LEAD_STATUS_STYLES.new}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="tour_scheduled">Tour</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>

                      <div className="col-span-2">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2 mt-2">Actions</div>
                        <div className="flex items-center lg:justify-end gap-2">
                          <button 
                            onClick={() => setSelectedLead(lead)}
                            className="flex-1 lg:flex-none p-3 lg:p-2 border-2 border-brand-ink rounded-xl bg-white text-brand-ink shadow-[0_2px_0_0_#19332f] hover:bg-[#8fd0ff] hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#19332f] transition-all flex justify-center items-center"
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>
                          <button 
                            onClick={() => askConfirm('Delete this lead?', `${lead.firstName || ''} ${lead.lastName || ''}`.trim() + ' and their follow-up notes will be permanently removed.', () => handleDeleteLead(lead.id))}
                            title="Delete lead"
                            className="flex-1 lg:flex-none p-3 lg:p-2 border-2 border-brand-ink bg-white text-[#d6411f] shadow-[0_2px_0_0_#19332f] hover:bg-[#ff9f8a] hover:text-brand-ink hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#19332f] transition-all rounded-xl flex justify-center items-center"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'applications' && (
              <motion.div
                key="applications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border-2 border-brand-ink rounded-[24px] shadow-[0_6px_0_0_#19332f] overflow-hidden"
              >
                {/* Headers */}
                <div className="hidden lg:grid grid-cols-12 border-b-2 border-brand-ink bg-[#fff1c2] px-6 py-3">
                  <div className="col-span-3 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Candidate</div>
                  <div className="col-span-3 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Position</div>
                  <div className="col-span-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Resume</div>
                  <div className="col-span-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Status</div>
                  <div className="col-span-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70 text-right">Actions</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-brand-ink/10">
                  {loading ? (
                    <LoadingState label="Loading applications…" />
                  ) : filteredApplications.length === 0 ? (
                    <EmptyState
                      title={applications.length === 0 ? 'No applications yet' : 'No applications match'}
                      hint={applications.length === 0 ? 'Applications from the careers page will appear here.' : 'Try a different search.'}
                    />
                  ) : filteredApplications.map((app) => (
                    <div 
                      key={app.id}
                      className="flex flex-col lg:grid lg:grid-cols-12 p-5 lg:px-6 lg:py-4 text-brand-ink hover:bg-[#fffbea] transition-colors group lg:items-center gap-4 lg:gap-0"
                    >
                      {/* Contact */}
                      <div className="col-span-3 flex gap-3 items-start min-w-0">
                        <Avatar name={`${app.firstName || ''} ${app.lastName || ''}`} className="hidden xl:flex" />
                        <div className="min-w-0">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Candidate</div>
                        <div className="font-bold text-base lg:text-sm mb-0.5">{app.firstName} {app.lastName}</div>
                        {app.email && <a href={`mailto:${app.email}`} title={app.email} className="block text-xs text-brand-sage hover:text-brand-teal hover:underline truncate pr-2">{app.email}</a>}
                        {app.phone && <a href={`tel:${app.phone}`} className="block text-xs text-brand-sage hover:text-brand-teal hover:underline mt-0.5">{app.phone}</a>}
                        </div>
                      </div>

                      {/* Position details */}
                      <div className="col-span-3">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Position</div>
                        <div className="text-sm font-medium">{app.jobTitle}</div>
                        <div className="text-xs text-brand-sage">Applied {formatDate(app.createdAt) || '—'}</div>
                      </div>

                      {/* Resume */}
                      <div className="col-span-2">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Resume link</div>
                        {app.resumeUrl ? (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#c8e7ff] text-brand-ink border-2 border-brand-ink text-xs font-bold rounded-full shadow-[0_2px_0_0_#19332f] hover:-translate-y-0.5 transition-all"
                          >
                            <ExternalLink size={12} /> Resume
                          </a>
                        ) : (
                          <span className="text-xs text-brand-sage/70 italic">No resume</span>
                        )}
                      </div>

                      {/* Status select */}
                      <div className="col-span-2">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Recruitment Pipeline</div>
                        <select
                          value={app.status || 'applied'}
                          onChange={(e) => handleApplicationStatusUpdate(app.id, e.target.value)}
                          aria-label="Application status"
                          className={`${STATUS_SELECT_BASE} ${APP_STATUS_STYLES[app.status || 'applied'] || APP_STATUS_STYLES.applied}`}
                        >
                          <option value="applied">Applied</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="offered">Offered</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2 mt-2">Actions</div>
                        <div className="flex items-center lg:justify-end gap-2 font-sans">
                          {app.message && (
                            <button
                              onClick={() => setCoverNoteApp(app)}
                              className="flex-1 lg:flex-none p-3 lg:p-2 border-2 border-brand-ink rounded-xl bg-white text-brand-ink shadow-[0_2px_0_0_#19332f] hover:bg-[#8fd0ff] hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#19332f] transition-all flex justify-center items-center"
                              title="View Cover Note"
                            >
                              <MessageSquare size={14} />
                            </button>
                          )}
                          <button 
                            onClick={() => askConfirm('Delete this application?', `The application from ${app.firstName || ''} ${app.lastName || ''} will be permanently removed.`, () => handleDeleteApplication(app.id))}
                            className="flex-1 lg:flex-none p-3 lg:p-2 border-2 border-brand-ink bg-white text-[#d6411f] shadow-[0_2px_0_0_#19332f] hover:bg-[#ff9f8a] hover:text-brand-ink hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#19332f] transition-all rounded-xl flex justify-center items-center"
                            title="Delete Application"
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
                className="bg-white border-2 border-brand-ink rounded-[24px] shadow-[0_6px_0_0_#19332f] overflow-hidden"
              >
                {/* Desktop Headers */}
                <div className="hidden lg:grid grid-cols-12 border-b-2 border-brand-ink bg-[#fff1c2] px-6 py-3">
                  <div className="col-span-5 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Admin User</div>
                  <div className="col-span-3 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Role</div>
                  <div className="col-span-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Joined</div>
                  <div className="col-span-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70 text-right">Actions</div>
                </div>

                <div className="divide-y divide-brand-ink/10">
                  {filteredAdmins.map((admin) => (
                    <div key={admin.id} className="flex flex-col lg:grid lg:grid-cols-12 p-5 lg:px-6 lg:py-4 text-brand-ink hover:bg-[#fffbea] transition-colors group cursor-default lg:items-center gap-3 lg:gap-0">
                      <div className="col-span-5 flex gap-3 items-start">
                        <Avatar name={admin.email || '?'} />
                        <div className="min-w-0">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Admin User</div>
                        <div className="font-bold text-base lg:text-sm break-all">
                          {admin.email}
                          {admin.email?.toLowerCase() === auth.currentUser?.email?.toLowerCase() && (
                            <span className="ml-2 text-[11px] font-semibold text-brand-teal">(you)</span>
                          )}
                        </div>
                        {admin.id !== admin.email && <div className="text-[11px] text-brand-sage/70 font-mono break-all">ID {admin.id}</div>}
                        </div>
                      </div>
                      <div className="col-span-3 flex flex-col gap-1 items-start justify-center">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Role</div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[11px] font-semibold capitalize px-2 py-0.5 rounded-full ${admin.role === 'super_admin' ? 'bg-[#8c7ef2] text-white border-2 border-brand-ink' : 'bg-[#c8e7ff] text-brand-ink border-2 border-brand-ink'}`}>
                            {admin.role?.replace(/_/g, ' ')}
                          </span>
                          {admin.status === 'pending' && (
                            <span className="text-[11px] font-bold px-2 py-0.5 bg-[#ffe08a] text-brand-ink border-2 border-brand-ink rounded-full" title="Hasn't signed in yet">
                              Invited
                            </span>
                          )}
                        </div>
                        {admin.center && (
                          <span className="text-xs text-brand-sage capitalize">
                            {admin.center}
                          </span>
                        )}
                      </div>
                      <div className="col-span-2 text-xs text-brand-sage">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Joined</div>
                        {formatDate(admin.createdAt) || '—'}
                      </div>
                      <div className="col-span-2">
                        <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2 mt-2">Actions</div>
                        <div className="flex items-center lg:justify-end gap-2">
                          <button 
                            onClick={() => askConfirm('Remove this admin?', `${admin.email} will no longer be able to sign in to the dashboard.`, () => handleAdminDelete(admin.id))}
                            title="Remove admin"
                            disabled={admin.email?.toLowerCase() === auth.currentUser?.email?.toLowerCase()}
                            className="flex-1 lg:flex-none p-3 lg:p-2 border-2 border-brand-ink bg-white text-[#d6411f] shadow-[0_2px_0_0_#19332f] hover:bg-[#ff9f8a] hover:text-brand-ink hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#19332f] transition-all rounded-xl disabled:opacity-20 disabled:cursor-not-allowed flex justify-center items-center"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredAdmins.length === 0 && (
                    <EmptyState title={admins.length === 0 ? 'No admins found' : 'No admins match'} hint={admins.length === 0 ? undefined : 'Try a different search.'} />
                  )}
                  <div className="px-6 py-4 bg-[#fff1c2] border-t-2 border-brand-ink">
                    <p className="text-xs text-brand-sage">
                      Invited admins show as <span className="font-semibold">Invited</span> until they first sign in with Google using that email.
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
                className="bg-white border-2 border-brand-ink rounded-[24px] shadow-[0_6px_0_0_#19332f] overflow-hidden"
              >
                {activeTab === 'jobs' ? (
                  <>
                    <div className="hidden lg:grid grid-cols-12 border-b-2 border-brand-ink bg-[#fff1c2] px-6 py-3">
                      <div className="col-span-4 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Title / Category</div>
                      <div className="col-span-3 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Location / Type</div>
                      <div className="col-span-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Status</div>
                      <div className="col-span-3 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70 text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-brand-ink/10">
                      {filteredJobs.map(job => (
                        <div key={job.id} className="flex flex-col lg:grid lg:grid-cols-12 p-5 lg:px-6 lg:py-4 text-brand-ink hover:bg-[#fffbea] transition-colors group lg:items-center gap-6 lg:gap-0">
                          <div className="col-span-4">
                            <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Job Details</div>
                            <div className="font-bold text-base lg:text-sm mb-1">{job.title}</div>
                            <div className="text-xs text-brand-sage">{job.category}</div>
                          </div>
                          <div className="col-span-3">
                            <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Location & Type</div>
                            <div className="text-sm font-medium mb-1">{job.location}</div>
                            <div className="text-xs text-brand-sage">{job.type}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Status</div>
                            <button 
                              onClick={() => toggleJobStatus(job.id, job.isActive)}
                              title={job.isActive ? 'Visible on the careers page. Click to hide.' : 'Hidden from the careers page. Click to publish.'}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold border-2 shadow-[0_2px_0_0_#19332f] transition-colors ${job.isActive ? 'bg-[#c4f1dc] text-brand-ink border-brand-ink hover:bg-[#a9ead0]' : 'bg-gray-100 text-gray-500 border-gray-400 hover:bg-gray-200'}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${job.isActive ? 'bg-[#37c594] animate-pulse' : 'bg-gray-400'}`} />
                              {job.isActive ? 'Live' : 'Hidden'}
                            </button>
                          </div>
                          <div className="col-span-3">
                            <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2 mt-2">Actions</div>
                            <div className="flex items-center lg:justify-end gap-2">
                              <button 
                                onClick={() => {
                                  setEditingItem(job);
                                  setJobForm({ 
                                    title: job.title || '', 
                                    category: job.category || '', 
                                    location: job.location || '', 
                                    type: job.type || 'Full-Time', 
                                    description: job.description || '', 
                                    isActive: job.isActive !== undefined ? job.isActive : true 
                                  });
                                  setIsModalOpen(true);
                                }}
                                className="flex-1 lg:flex-none p-3 lg:p-2 border-2 border-brand-ink rounded-xl bg-white text-brand-ink shadow-[0_2px_0_0_#19332f] hover:bg-[#8fd0ff] hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#19332f] transition-all flex justify-center items-center"
                                title="Edit Job"
                              >
                                <Pencil size={14} />
                              </button>
                              <button 
                                onClick={() => askConfirm('Delete this job?', `"${job.title}" will be removed from the careers page.`, () => handleDelete(job.id, 'jobs'))}
                                title="Delete job"
                                className="flex-1 lg:flex-none p-3 lg:p-2 border-2 border-brand-ink bg-white text-[#d6411f] shadow-[0_2px_0_0_#19332f] hover:bg-[#ff9f8a] hover:text-brand-ink hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#19332f] transition-all rounded-xl flex justify-center items-center"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {filteredJobs.length === 0 && (
                        <EmptyState title={jobs.length === 0 ? 'No job postings yet' : 'No jobs match'} hint={jobs.length === 0 ? 'Use “Add job” to post an opening.' : 'Try a different search.'} />
                      )}
                    </div>
                  </>
                ) : activeTab === 'faqs' ? (
                  <>
                    <div className="hidden lg:grid grid-cols-12 border-b-2 border-brand-ink bg-[#fff1c2] px-6 py-3">
                      <div className="col-span-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Order</div>
                      <div className="col-span-4 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Question</div>
                      <div className="col-span-4 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Answer Preview</div>
                      <div className="col-span-3 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70 text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-brand-ink/10">
                      {filteredFaqs.map(faq => (
                        <div key={faq.id} className="flex flex-col lg:grid lg:grid-cols-12 p-5 lg:px-6 lg:py-4 text-brand-ink hover:bg-[#fffbea] transition-colors group lg:items-center gap-6 lg:gap-0">
                          <div className="col-span-1">
                            <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Order</div>
                            <div className="w-8 h-8 rounded-lg bg-[#ddd6ff] border-2 border-brand-ink flex items-center justify-center text-xs font-extrabold text-brand-ink">{faq.order}</div>
                          </div>
                          <div className="col-span-4">
                            <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Question</div>
                            <div className="font-bold text-base lg:text-sm mb-1 pr-4 lg:line-clamp-2">{faq.question}</div>
                          </div>
                          <div className="col-span-4">
                            <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Answer</div>
                            <div className="text-sm lg:text-xs text-brand-sage lg:line-clamp-2 pr-4">{faq.answer}</div>
                          </div>
                          <div className="col-span-3">
                            <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2 mt-2">Actions</div>
                            <div className="flex items-center lg:justify-end gap-2">
                              <button 
                                onClick={() => {
                                  setEditingItem(faq);
                                  setFaqForm({ 
                                    question: faq.question || '', 
                                    answer: faq.answer || '', 
                                    category: faq.category || 'General', 
                                    order: faq.order !== undefined ? faq.order : 0 
                                  });
                                  setIsModalOpen(true);
                                }}
                                className="flex-1 lg:flex-none p-3 lg:p-2 border-2 border-brand-ink rounded-xl bg-white text-brand-ink shadow-[0_2px_0_0_#19332f] hover:bg-[#8fd0ff] hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#19332f] transition-all flex justify-center items-center"
                                title="Edit FAQ"
                              >
                                <Pencil size={14} />
                              </button>
                              <button 
                                onClick={() => askConfirm('Delete this FAQ?', 'This question will be removed from the FAQ page.', () => handleDelete(faq.id, 'faqs'))}
                                title="Delete FAQ"
                                className="flex-1 lg:flex-none p-3 lg:p-2 border-2 border-brand-ink bg-white text-[#d6411f] shadow-[0_2px_0_0_#19332f] hover:bg-[#ff9f8a] hover:text-brand-ink hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#19332f] transition-all rounded-xl flex justify-center items-center"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {filteredFaqs.length === 0 && (
                        <EmptyState title={faqs.length === 0 ? 'No FAQs yet' : 'No FAQs match'} hint={faqs.length === 0 ? 'Use “Add FAQ” to add a question.' : 'Try a different search.'} />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hidden lg:grid grid-cols-12 border-b-2 border-brand-ink bg-[#fff1c2] px-6 py-3">
                      <div className="col-span-4 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Center Name / City</div>
                      <div className="col-span-5 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Address / Phone</div>
                      <div className="col-span-3 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70 text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-brand-ink/10">
                      {filteredLocations.map(center => (
                        <div key={center.id} className="flex flex-col lg:grid lg:grid-cols-12 p-5 lg:px-6 lg:py-4 text-brand-ink hover:bg-[#fffbea] transition-colors group lg:items-center gap-6 lg:gap-0">
                          <div className="col-span-4 pr-4">
                            <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Center Name</div>
                            <div className="font-bold text-base lg:text-sm mb-1">{center.name}</div>
                            <div className="text-xs text-brand-sage">{[center.city, center.state].filter(Boolean).join(', ')}</div>
                          </div>
                          <div className="col-span-5 pr-4">
                            <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2">Location Identity</div>
                            <div className="text-sm font-medium mb-1 truncate lg:max-w-[300px]">{center.address}</div>
                            {center.phone ? <a href={`tel:${center.phone}`} className="text-xs text-brand-sage hover:text-brand-teal hover:underline">{center.phone}</a> : <span className="text-xs text-brand-sage/70">No phone</span>}
                          </div>
                          <div className="col-span-3">
                            <div className="lg:hidden text-[10px] font-extrabold text-brand-ink/60 uppercase tracking-[0.15em] mb-2 mt-2">Actions</div>
                            <div className="flex items-center lg:justify-end gap-2">
                              <button 
                                onClick={() => {
                                  setEditingItem(center);
                                  setLocationForm({ 
                                    name: center.name || '', 
                                    address: center.address || '', 
                                    city: center.city || '', 
                                    state: center.state || '', 
                                    zip: center.zip || '', 
                                    phone: center.phone || '', 
                                    lat: center.lat || 0, 
                                    lng: center.lng || 0, 
                                    insurance: center.insurance || '', 
                                    type: center.type || 'Center based care', 
                                    image: center.image || 'https://picsum.photos/seed/auvia-center/800/600', 
                                    isActive: center.isActive !== undefined ? center.isActive : true 
                                  });
                                  setIsModalOpen(true);
                                }}
                                className="flex-1 lg:flex-none p-3 lg:p-2 border-2 border-brand-ink rounded-xl bg-white text-brand-ink shadow-[0_2px_0_0_#19332f] hover:bg-[#8fd0ff] hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#19332f] transition-all flex justify-center items-center"
                                title="Edit Center"
                              >
                                <Pencil size={14} />
                              </button>
                              <button 
                                onClick={() => askConfirm('Delete this center?', `"${center.name}" will be removed from the locations page and map.`, () => handleDelete(center.id, 'locations'))}
                                title="Delete center"
                                className="flex-1 lg:flex-none p-3 lg:p-2 border-2 border-brand-ink bg-white text-[#d6411f] shadow-[0_2px_0_0_#19332f] hover:bg-[#ff9f8a] hover:text-brand-ink hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#19332f] transition-all rounded-xl flex justify-center items-center"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {filteredLocations.length === 0 && (
                        <EmptyState title={locations.length === 0 ? 'No centers yet' : 'No centers match'} hint={locations.length === 0 ? 'Use “Add center” to add a location.' : 'Try a different search.'} />
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
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                role="dialog" aria-modal="true"
                className="relative w-full max-w-2xl bg-white rounded-[28px] border-2 border-brand-ink shadow-[0_10px_0_0_#19332f] p-6 md:p-10 max-h-[90vh] overflow-y-auto"
              >
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-brand-sage hover:bg-brand-cream hover:text-brand-ink rounded-full transition-all">
                  <X size={20} />
                </button>
                
                <h4 className="text-2xl font-['Outfit',sans-serif] font-extrabold text-brand-ink mb-6 pr-10">
                  {editingItem ? 'Edit' : 'New'} {activeTab === 'jobs' ? 'job posting' : activeTab === 'faqs' ? 'FAQ' : 'center'}
                </h4>

                {activeTab === 'jobs' ? (
                  <form onSubmit={withSaving(handleJobSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Job Title</label>
                        <input type="text" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all font-medium" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Category</label>
                        <input type="text" value={jobForm.category} onChange={e => setJobForm({...jobForm, category: e.target.value})} required placeholder="e.g. Clinical, Admin" className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all font-medium" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Location</label>
                        <input type="text" value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all font-medium" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Employment Type</label>
                        <select value={jobForm.type} onChange={e => setJobForm({...jobForm, type: e.target.value})} className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all font-medium appearance-none">
                          <option>Full-Time</option>
                          <option>Part-Time</option>
                          <option>Contract</option>
                        </select>
                      </div>
                    </div>
                    <label className="flex items-center justify-between gap-4 p-4 rounded-xl border-2 border-brand-ink bg-[#c4f1dc] cursor-pointer">
                      <span>
                        <span className="block text-sm font-bold text-brand-ink">Show on careers page</span>
                        <span className="block text-xs text-brand-sage">Turn off to keep it as a hidden draft.</span>
                      </span>
                      <input type="checkbox" checked={jobForm.isActive} onChange={e => setJobForm({...jobForm, isActive: e.target.checked})} className="w-5 h-5 accent-[#16665b] cursor-pointer" />
                    </label>
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Short Description</label>
                      <textarea value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} rows={3} className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all font-medium resize-none" />
                    </div>
                    <button type="submit" disabled={saving} className="w-full py-3.5 bg-[#ffc93c] text-brand-ink border-2 border-brand-ink rounded-2xl font-extrabold text-base shadow-[0_4px_0_0_#19332f] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#19332f] active:translate-y-0.5 active:shadow-[0_1px_0_0_#19332f] transition-all disabled:opacity-60 disabled:cursor-wait">
                      {saving ? 'Saving…' : editingItem ? 'Save changes' : 'Publish job'}
                    </button>
                  </form>
                ) : activeTab === 'faqs' ? (
                  <form onSubmit={withSaving(handleFaqSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-3 space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Category</label>
                        <input type="text" value={faqForm.category} onChange={e => setFaqForm({...faqForm, category: e.target.value})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all font-medium" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Order</label>
                        <input type="number" value={faqForm.order} onChange={e => setFaqForm({...faqForm, order: parseInt(e.target.value) || 0})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all font-medium" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Question</label>
                      <input type="text" value={faqForm.question} onChange={e => setFaqForm({...faqForm, question: e.target.value})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all font-medium" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Detailed Answer</label>
                      <textarea value={faqForm.answer} onChange={e => setFaqForm({...faqForm, answer: e.target.value})} rows={6} className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all font-medium resize-none" />
                    </div>
                    <button type="submit" disabled={saving} className="w-full py-3.5 bg-[#ffc93c] text-brand-ink border-2 border-brand-ink rounded-2xl font-extrabold text-base shadow-[0_4px_0_0_#19332f] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#19332f] active:translate-y-0.5 active:shadow-[0_1px_0_0_#19332f] transition-all disabled:opacity-60 disabled:cursor-wait">
                      {saving ? 'Saving…' : editingItem ? 'Save changes' : 'Add FAQ'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={withSaving(handleLocationSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Center Name</label>
                        <input type="text" value={locationForm.name} onChange={e => setLocationForm({...locationForm, name: e.target.value})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Phone</label>
                        <input type="text" value={locationForm.phone} onChange={e => setLocationForm({...locationForm, phone: e.target.value})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Full Address</label>
                      <input type="text" value={locationForm.address} onChange={e => setLocationForm({...locationForm, address: e.target.value})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">City</label>
                        <input type="text" value={locationForm.city} onChange={e => setLocationForm({...locationForm, city: e.target.value})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">State</label>
                        <input type="text" value={locationForm.state} onChange={e => setLocationForm({...locationForm, state: e.target.value})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Zip</label>
                        <input type="text" value={locationForm.zip} onChange={e => setLocationForm({...locationForm, zip: e.target.value})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Latitude</label>
                        <input type="number" step="any" value={locationForm.lat} onChange={e => setLocationForm({...locationForm, lat: parseFloat(e.target.value) || 0})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Longitude</label>
                        <input type="number" step="any" value={locationForm.lng} onChange={e => setLocationForm({...locationForm, lng: parseFloat(e.target.value) || 0})} required className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Insurance (Comma separated)</label>
                      <input type="text" value={locationForm.insurance} onChange={e => setLocationForm({...locationForm, insurance: e.target.value})} placeholder="Aetna, BCBS, Cigna" className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Image URL</label>
                      <input type="text" value={locationForm.image} onChange={e => setLocationForm({...locationForm, image: e.target.value})} className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all" />
                    </div>
                    <button type="submit" disabled={saving} className="w-full py-3.5 bg-[#ffc93c] text-brand-ink border-2 border-brand-ink rounded-2xl font-extrabold text-base shadow-[0_4px_0_0_#19332f] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#19332f] active:translate-y-0.5 active:shadow-[0_1px_0_0_#19332f] transition-all disabled:opacity-60 disabled:cursor-wait">
                      {saving ? 'Saving…' : editingItem ? 'Save changes' : 'Add center'}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Lead Detail Modal */}
        <AnimatePresence>
          {selectedLead && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 lg:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLead(null)}
                className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                role="dialog" aria-modal="true"
                className="relative w-full max-w-4xl bg-white rounded-[28px] border-2 border-brand-ink shadow-[0_10px_0_0_#19332f] p-6 md:p-10 overflow-hidden max-h-[90vh] flex flex-col"
              >
                <button onClick={() => setSelectedLead(null)} className="absolute top-6 right-6 p-2 text-brand-sage hover:bg-brand-cream hover:text-brand-ink rounded-full transition-all">
                  <X size={20} />
                </button>
                
                <h4 className="text-2xl font-['Outfit',sans-serif] font-extrabold mb-6 text-brand-ink pr-10">
                  {selectedLead.firstName} {selectedLead.lastName}
                </h4>

                <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Information panel */}
                    <div className="space-y-4 bg-[#fffbea] border-2 border-brand-ink p-6 rounded-2xl">
                      <h5 className="font-kids font-bold text-sm text-brand-teal border-b border-brand-teal/10 pb-2">Parent & Child Details</h5>
                      <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-3">
                          <span className="text-brand-sage font-bold">Email:</span>
                          <a href={`mailto:${selectedLead.email}`} className="col-span-2 break-all text-brand-teal hover:underline">{selectedLead.email}</a>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-brand-sage font-bold">Phone:</span>
                          <a href={`tel:${selectedLead.phone}`} className="col-span-2 text-brand-teal hover:underline">{selectedLead.phone}</a>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-brand-sage font-bold">Child Name:</span>
                          <span className="col-span-2 text-brand-ink">{selectedLead.childName || 'N/A'}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-brand-sage font-bold">Child DOB:</span>
                          <span className="col-span-2 text-brand-ink">{selectedLead.childDob || 'N/A'}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-brand-sage font-bold">Insurance:</span>
                          <span className="col-span-2 text-brand-ink font-bold">{selectedLead.insuranceProvider || 'N/A'}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-brand-sage font-bold">Center Prefer:</span>
                          <span className="col-span-2 text-brand-ink capitalize">{selectedLead.center || 'N/A'}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-brand-sage font-bold">Zip Code:</span>
                          <span className="col-span-2 text-brand-ink font-mono">{selectedLead.zipCode || selectedLead.zip || 'N/A'}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-brand-sage font-bold">SMS Consent:</span>
                          <span className="col-span-2">
                            {selectedLead.smsConsent ? (
                              <span className="text-green-600 font-bold">Granted</span>
                            ) : (
                              <span className="text-red-500 font-bold">Pending / Declined</span>
                            )}
                          </span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-brand-sage font-bold">Source:</span>
                          <span className="col-span-2 text-brand-ink capitalize">{selectedLead.source ? selectedLead.source.replace(/_/g, ' ') : '—'}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-brand-sage font-bold">Created:</span>
                          <span className="col-span-2 text-brand-ink font-mono">
                            {selectedLead.createdAt ? (
                              formatDate(selectedLead.createdAt, true)
                            ) : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Message panel */}
                    <div className="space-y-4 bg-[#fffbea] border-2 border-brand-ink p-6 rounded-2xl flex flex-col">
                      <h5 className="font-kids font-bold text-sm text-brand-teal border-b border-brand-teal/10 pb-2">Parent Message</h5>
                      <div className="flex-1 text-sm text-brand-ink overflow-y-auto leading-relaxed max-h-[240px] whitespace-pre-wrap">
                        {selectedLead.message || <span className="text-brand-sage italic">No message was included.</span>}
                      </div>
                    </div>
                  </div>

                  {/* Notes CRM section */}
                  <div className="border-2 border-brand-ink p-6 rounded-2xl space-y-6">
                    <h5 className="font-kids font-bold text-sm text-brand-ink flex items-center justify-between border-b border-brand-ink/10 pb-2">
                      <span>Internal Follow-Up Timeline</span>
                      <span className="text-[11px] font-medium text-brand-sage">Only visible to admins</span>
                    </h5>

                    {/* Timeline */}
                    <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1">
                      {selectedLead.notes && selectedLead.notes.length > 0 ? (
                        selectedLead.notes.map((note: any, index: number) => (
                          <div key={index} className="flex gap-4 items-start text-xs border-l-2 border-brand-teal pl-4 relative">
                            <div className="absolute w-2 h-2 rounded-full bg-brand-teal -left-[5px] top-1.5" />
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-brand-sage">
                                <span className="font-bold text-brand-ink">{note.author}</span>
                                <span>•</span>
                                <span>{formatDate(note.createdAt, true)}</span>
                              </div>
                              <p className="text-brand-sage font-medium whitespace-pre-wrap">{note.text}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-brand-sage italic text-center py-6">No timeline notes recorded yet. Use the form below to document follow-up.</p>
                      )}
                    </div>

                    {/* Add note form */}
                    <form onSubmit={withSaving(handleAddNote)} className="flex flex-col sm:flex-row gap-3 sm:items-end pt-2 border-t border-brand-ink/10">
                      <div className="flex-grow space-y-1">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Write New Note</label>
                        <textarea
                          placeholder="e.g. Call parent to schedule center tour for next Wednesday..."
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          rows={2}
                          required
                          className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 text-xs font-medium resize-none"
                        />
                      </div>
                      <button type="submit" disabled={saving} className="px-6 py-3 bg-[#ffc93c] text-brand-ink border-2 border-brand-ink rounded-xl font-extrabold text-sm shadow-[0_3px_0_0_#19332f] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-wait">
                        {saving ? 'Saving…' : 'Add note'}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Whitelist Admin Modal */}
        <AnimatePresence>
          {isAddAdminModalOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 lg:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddAdminModalOpen(false)}
                className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-[28px] border-2 border-brand-ink shadow-[0_10px_0_0_#19332f] p-6 md:p-10 overflow-hidden animate-in fade-in zoom-in duration-300"
              >
                <button onClick={() => setIsAddAdminModalOpen(false)} className="absolute top-6 right-6 p-2 text-brand-sage hover:bg-brand-cream hover:text-brand-ink rounded-full transition-all">
                  <X size={20} />
                </button>
                
                <h4 className="text-2xl font-['Outfit',sans-serif] font-extrabold mb-6 text-brand-ink pr-10">
                  Add an admin
                </h4>

                <form onSubmit={withSaving(handleAddAdminSubmit)} className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. name@auviatherapy.com" 
                      value={adminEmailForm} 
                      onChange={e => setAdminEmailForm(e.target.value)} 
                      className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all font-medium font-mono" 
                    />
                    <p className="text-xs text-brand-sage mt-1">Invited user must sign in using Google Auth with this verified email.</p>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Role</label>
                    <select 
                      value={adminRoleForm} 
                      onChange={e => {
                        setAdminRoleForm(e.target.value as any);
                        if (e.target.value !== 'center_manager') setAdminCenterForm('');
                      }} 
                      className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all font-medium text-xs font-bold"
                    >
                      <option value="center_manager">Center Manager</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </div>

                  {adminRoleForm === 'center_manager' && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70">Assigned Care Center</label>
                      <select 
                        value={adminCenterForm} 
                        onChange={e => setAdminCenterForm(e.target.value)} 
                        required
                        className="w-full px-4 py-3 bg-white border-2 border-brand-ink/25 rounded-xl outline-none focus:border-brand-ink focus:ring-4 focus:ring-[#ffc93c]/50 transition-all font-medium text-xs font-bold capitalize"
                      >
                        <option value="">Select a Center...</option>
                        {locations.map(center => (
                          <option key={center.id} value={center.name}>{center.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button type="submit" disabled={saving} className="w-full py-3.5 bg-[#ffc93c] text-brand-ink border-2 border-brand-ink rounded-2xl font-extrabold text-base shadow-[0_4px_0_0_#19332f] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#19332f] active:translate-y-0.5 active:shadow-[0_1px_0_0_#19332f] transition-all disabled:opacity-60 disabled:cursor-wait">
                    {saving ? 'Saving…' : 'Send invite'}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Cover Note Modal */}
        <AnimatePresence>
          {coverNoteApp && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 lg:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setCoverNoteApp(null)}
                className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 12 }}
                role="dialog" aria-modal="true"
                className="relative w-full max-w-lg bg-white rounded-[28px] border-2 border-brand-ink shadow-[0_10px_0_0_#19332f] p-6 md:p-8 max-h-[85vh] flex flex-col"
              >
                <button onClick={() => setCoverNoteApp(null)} className="absolute top-5 right-5 p-2 text-brand-sage hover:bg-brand-cream hover:text-brand-ink rounded-full transition-all" aria-label="Close">
                  <X size={20} />
                </button>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-brand-ink/70 mb-1">Cover note</p>
                <h4 className="text-xl font-['Outfit',sans-serif] font-extrabold text-brand-ink pr-10">
                  {coverNoteApp.firstName} {coverNoteApp.lastName}
                </h4>
                <p className="text-sm text-brand-sage mb-5">{coverNoteApp.jobTitle}</p>
                <div className="flex-1 overflow-y-auto bg-[#fffbea] border-2 border-brand-ink rounded-2xl p-5 text-sm text-brand-ink leading-relaxed whitespace-pre-wrap">
                  {coverNoteApp.message}
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {coverNoteApp.email && (
                    <a href={`mailto:${coverNoteApp.email}`} className={POP_BTN_SUN}>Email candidate</a>
                  )}
                  {coverNoteApp.resumeUrl && (
                    <a href={coverNoteApp.resumeUrl} target="_blank" rel="noopener noreferrer" className={POP_BTN_WHITE}>
                      <ExternalLink size={14} /> Resume
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Confirm Dialog */}
        <AnimatePresence>
          {confirmState && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !confirmBusy && setConfirmState(null)}
                className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                role="alertdialog" aria-modal="true"
                className="relative w-full max-w-sm bg-white rounded-[28px] border-2 border-brand-ink shadow-[0_10px_0_0_#19332f] p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#ff9f8a] border-2 border-brand-ink text-brand-ink flex items-center justify-center mb-4 rotate-[-6deg]">
                  <Trash2 size={20} />
                </div>
                <h4 className="text-lg font-bold text-brand-ink mb-1">{confirmState.title}</h4>
                <p className="text-sm text-brand-sage mb-6">{confirmState.message} This can't be undone.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmState(null)}
                    disabled={confirmBusy}
                    autoFocus
                    className="flex-1 py-3 rounded-xl border-2 border-brand-ink bg-white text-brand-ink font-bold text-sm shadow-[0_3px_0_0_#19332f] hover:-translate-y-0.5 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={runConfirm}
                    disabled={confirmBusy}
                    className="flex-1 py-3 rounded-xl bg-[#f25a34] border-2 border-brand-ink text-white font-bold text-sm shadow-[0_3px_0_0_#19332f] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-wait inline-flex items-center justify-center gap-2"
                  >
                    {confirmBusy && <Loader2 size={14} className="animate-spin" />}
                    {confirmBusy ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

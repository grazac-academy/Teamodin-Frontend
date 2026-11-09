import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { 
  FileText, UploadCloud, Download, CheckCircle, 
  AlertTriangle, Filter, Search, Plus, Trash2, 
  Send, Users, Eye, X, Check
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

const CompanyDocumentsPage = () => {
  const { documents, addDocument, deleteDocument, acknowledgeDocument } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload Form State
  const [newDoc, setNewDoc] = useState({
    title: '',
    category: 'Policies & Handbooks',
    targetDept: 'All Staff',
    mandatory: true,
    fileName: ''
  });

  const categories = ['All', 'Policies & Handbooks', 'Legal & Tax', 'Benefits', 'Templates'];

  const filteredDocs = useMemo(() => {
    return documents.filter(doc => {
      const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            doc.targetDept.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [documents, activeCategory, searchQuery]);

  const totalAcknowledgements = useMemo(() => {
    const totalPossible = documents.reduce((acc, d) => acc + d.totalCount, 0);
    const totalDone = documents.reduce((acc, d) => acc + d.acknowledgedCount, 0);
    return {
      rate: totalPossible ? Math.round((totalDone / totalPossible) * 100) : 0,
      pending: totalPossible - totalDone
    };
  }, [documents]);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newDoc.title) {
      toast.error('Please enter a document title');
      return;
    }

    const created = {
      id: Date.now(),
      title: newDoc.title,
      category: newDoc.category,
      format: newDoc.fileName.endsWith('.docx') ? 'DOCX' : 'PDF',
      size: '1.2 MB',
      targetDept: newDoc.targetDept,
      uploadedAt: 'Today',
      acknowledgedCount: 0,
      totalCount: 142,
      mandatory: newDoc.mandatory
    };

    addDocument(created);
    toast.success(`"${created.title}" uploaded and notified to team!`);
    setIsUploadModalOpen(false);
    setNewDoc({ title: '', category: 'Policies & Handbooks', targetDept: 'All Staff', mandatory: true, fileName: '' });
  };

  const handleDownload = (title) => {
    toast.success(`Downloading ${title}...`);
  };

  const handleSendReminder = (title) => {
    toast.success(`Reminder emails sent to team for "${title}"!`);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete document "${title}"?`)) {
      deleteDocument(id);
      toast.success('Document deleted.');
    }
  };

  return (
    <AdminLayout title="Documents" subtitle="Distribute company policies, handbooks, and track employee acknowledgements.">
      <style>
        {`
          .doc-container { max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
          @media (max-width: 1024px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 640px) { .metrics-grid { grid-template-columns: 1fr; } }
          .metric-card { background: white; border: 1px solid #f3f4f6; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .filter-pill { padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer; border: 1px solid #e5e7eb; background: white; color: #4b5563; transition: all 0.2s; }
          .filter-pill:hover { background: #f9fafb; color: #111827; }
          .filter-pill.active { background: #534ab7; color: white; border-color: #534ab7; }
          .doc-table-card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; overflow-x: auto; -webkit-overflow-scrolling: touch; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .doc-table { width: 100%; min-width: 650px; border-collapse: collapse; text-align: left; font-size: 14px; }
          .doc-table th { padding: 14px 20px; color: #6b7280; font-weight: 600; border-bottom: 1px solid #e5e7eb; background: #fafafa; white-space: nowrap; }
          .doc-table td { padding: 16px 20px; border-bottom: 1px solid #f9fafb; vertical-align: middle; white-space: nowrap; }
          .doc-table tr:hover td { background: #fafafa; }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 520px; padding: 32px; max-height: 90vh; overflow-y: auto; box-sizing: border-box; }
          @media (max-width: 640px) {
            .modal-box { padding: 20px 16px; }
            .filter-pill { font-size: 12px; padding: 6px 12px; }
          }
          .form-input { width: 100%; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; margin-top: 4px; box-sizing: border-box; }
        `}
      </style>

      <div className="doc-container">
        
        {/* KPI Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Active Documents</p>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: 0 }}>{documents.length}</h3>
            <span style={{ fontSize: '12px', color: '#534ab7', fontWeight: '600' }}>Policies & Handbooks</span>
          </div>
          <div className="metric-card">
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Acknowledgement Rate</p>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: 0 }}>{totalAcknowledgements.rate}%</h3>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Target: &gt; 90%</span>
          </div>
          <div className="metric-card">
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Pending Signatures</p>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: 0 }}>{totalAcknowledgements.pending}</h3>
            <span style={{ fontSize: '12px', color: '#d97706', fontWeight: '600' }}>Staff reminders needed</span>
          </div>
          <div className="metric-card">
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Mandatory Policies</p>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: 0 }}>
              {documents.filter(d => d.mandatory).length}
            </h3>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Compliance required</span>
          </div>
        </div>

        {/* Action & Filter Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button 
                key={cat}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '240px' }}>
              <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '9px 12px 9px 34px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none', background: 'white' }}
              />
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px',
                backgroundColor: '#534ab7', color: 'white', border: 'none', borderRadius: '8px',
                fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap'
              }}
            >
              <UploadCloud size={16} /> Upload Policy
            </button>
          </div>
        </div>

        {/* Documents Table */}
        <div className="doc-table-card">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Category</th>
                <th>Target Audience</th>
                <th>Acknowledgements</th>
                <th>Uploaded</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => {
                const ackPercent = Math.round((doc.acknowledgedCount / doc.totalCount) * 100);
                return (
                  <tr key={doc.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '36px', height: '36px', borderRadius: '8px', 
                          background: doc.format === 'PDF' ? '#fee2e2' : '#e0e7ff', 
                          color: doc.format === 'PDF' ? '#dc2626' : '#4338ca', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '11px' 
                        }}>
                          {doc.format}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '600', color: '#111827' }}>{doc.title}</span>
                            {doc.mandatory && (
                              <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 6px', background: '#fef3c7', color: '#92400e', borderRadius: '4px' }}>
                                Mandatory
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>{doc.size}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span style={{ fontSize: '13px', color: '#4b5563', background: '#f3f4f6', padding: '4px 10px', borderRadius: '6px' }}>
                        {doc.category}
                      </span>
                    </td>

                    <td>
                      <span style={{ fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={14} color="#6b7280" /> {doc.targetDept}
                      </span>
                    </td>

                    <td style={{ minWidth: '180px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: '600', color: '#111827' }}>{doc.acknowledgedCount} / {doc.totalCount} signed</span>
                          <span style={{ color: ackPercent >= 90 ? '#047857' : '#b45309', fontWeight: '700' }}>{ackPercent}%</span>
                        </div>
                        <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${ackPercent}%`, background: ackPercent >= 90 ? '#10b981' : '#f59e0b', borderRadius: '3px' }} />
                        </div>
                      </div>
                    </td>

                    <td style={{ color: '#6b7280', fontSize: '13px' }}>
                      {doc.uploadedAt}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button
                          onClick={() => handleDownload(doc.title)}
                          style={{ padding: '6px 10px', background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', color: '#374151', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                          title="Download document"
                        >
                          <Download size={14} /> Download
                        </button>

                        {ackPercent < 100 && (
                          <button
                            onClick={() => handleSendReminder(doc.title)}
                            style={{ padding: '6px 10px', background: '#f3f0ff', border: '1px solid #e0e7ff', borderRadius: '6px', cursor: 'pointer', color: '#534ab7', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}
                            title="Nudge unacknowledged staff"
                          >
                            <Send size={13} /> Nudge
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(doc.id, doc.title)}
                          style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {isUploadModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Upload Company Document</h2>
                  <button onClick={() => setIsUploadModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Document Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Disciplinary Policy & Whistleblower Charter"
                      value={newDoc.title}
                      onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Category</label>
                      <select 
                        value={newDoc.category}
                        onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                        className="form-input"
                      >
                        <option value="Policies & Handbooks">Policies & Handbooks</option>
                        <option value="Legal & Tax">Legal & Tax</option>
                        <option value="Benefits">Benefits</option>
                        <option value="Templates">Templates</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Target Audience</label>
                      <select 
                        value={newDoc.targetDept}
                        onChange={(e) => setNewDoc({ ...newDoc, targetDept: e.target.value })}
                        className="form-input"
                      >
                        <option value="All Staff">All Staff</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Sales & Revenue">Sales & Revenue</option>
                        <option value="Product & Design">Product & Design</option>
                        <option value="Nigeria (NG)">Nigeria (NG)</option>
                      </select>
                    </div>
                  </div>

                  {/* Drag drop mock box */}
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>File Attachment</label>
                    <div style={{ 
                      border: '2px dashed #d1d5db', borderRadius: '12px', padding: '24px', 
                      textAlign: 'center', marginTop: '6px', background: '#fafafa', cursor: 'pointer' 
                    }}>
                      <UploadCloud size={32} color="#534ab7" style={{ margin: '0 auto 8px auto' }} />
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                        {newDoc.fileName || 'Click to select PDF or Word document'}
                      </p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>Max file size 25MB</p>
                      <input 
                        type="file" 
                        onChange={(e) => setNewDoc({ ...newDoc, fileName: e.target.files[0]?.name || 'policy.pdf' })}
                        style={{ display: 'none' }}
                        id="policy-file-input"
                      />
                      <label htmlFor="policy-file-input" style={{ display: 'inline-block', marginTop: '10px', fontSize: '12px', color: '#534ab7', fontWeight: '600', cursor: 'pointer' }}>
                        Browse Computer
                      </label>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input 
                      type="checkbox" 
                      id="mandatory-check"
                      checked={newDoc.mandatory}
                      onChange={(e) => setNewDoc({ ...newDoc, mandatory: e.target.checked })}
                    />
                    <label htmlFor="mandatory-check" style={{ fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
                      Require all staff in audience to read and acknowledge this document
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px', justifyContent: 'flex-end' }}>
                    <button 
                      type="button" 
                      onClick={() => setIsUploadModalOpen(false)}
                      style={{ padding: '10px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      style={{ padding: '10px 16px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Publish Document
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AdminLayout>
  );
};

export default CompanyDocumentsPage;

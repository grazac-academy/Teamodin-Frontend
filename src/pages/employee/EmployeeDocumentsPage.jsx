import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { FileText, CheckCircle2, Download, AlertCircle, Eye, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const initialDocs = [
  { id: 1, title: 'Company Employee Handbook 2026', category: 'General', required: true, signed: true, signedDate: '18 May 2026', size: '2.4 MB' },
  { id: 2, title: 'Remote Work & Equipment Policy', category: 'IT & Security', required: true, signed: true, signedDate: '18 May 2026', size: '1.1 MB' },
  { id: 3, title: 'Code of Business Conduct & Ethics', category: 'Compliance', required: true, signed: false, signedDate: null, size: '940 KB' },
  { id: 4, title: 'Data Protection & Confidentiality NDA', category: 'Legal', required: true, signed: true, signedDate: '19 May 2026', size: '1.8 MB' },
  { id: 5, title: 'Health Insurance & Benefits Guide', category: 'Benefits', required: false, signed: false, signedDate: null, size: '3.2 MB' },
];

const EmployeeDocumentsPage = () => {
  const [docs, setDocs] = useState(initialDocs);
  const [activeDocForSigning, setActiveDocForSigning] = useState(null);
  const [hasAgreed, setHasAgreed] = useState(false);

  const handleSignDocument = (e) => {
    e.preventDefault();
    if (!hasAgreed) {
      toast.error('Please check the confirmation box to acknowledge this document');
      return;
    }

    setDocs(docs.map(doc => {
      if (doc.id === activeDocForSigning.id) {
        return { ...doc, signed: true, signedDate: 'Just now' };
      }
      return doc;
    }));

    toast.success(`You have successfully signed "${activeDocForSigning.title}"`);
    setActiveDocForSigning(null);
    setHasAgreed(false);
  };

  const handleDownload = (title) => {
    toast.success(`Downloading ${title}...`);
  };

  return (
    <AdminLayout title="Company Documents & Policies" subtitle="Review company guidelines, sign required compliance policies, and download handbook copies.">
      <style>
        {`
          .docs-container { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .doc-item { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border: 1px solid #f3f4f6; border-radius: 12px; margin-bottom: 12px; background: white; transition: all 0.2s; flex-wrap: wrap; gap: 12px; }
          .doc-item:hover { border-color: #cbd5e1; box-shadow: 0 2px 6px rgba(0,0,0,0.03); }
          .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; white-space: nowrap; }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 540px; padding: 28px; max-height: 90vh; overflow-y: auto; }
        `}
      </style>

      <div className="docs-container">
        
        {/* Urgent Sign Banner if any pending */}
        {docs.some(d => d.required && !d.signed) && (
          <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertCircle size={20} color="#b45309" />
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#92400e' }}>Action Required: Pending Policy Signature</h4>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#b45309' }}>Please review and acknowledge the Code of Business Conduct & Ethics.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveDocForSigning(docs.find(d => !d.signed))}
              style={{ padding: '8px 16px', background: '#d97706', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
            >
              Sign Policy Now
            </button>
          </div>
        )}

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>All Company Documents</h3>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>
              {docs.filter(d => d.signed).length} of {docs.length} Signed
            </span>
          </div>

          <div>
            {docs.map((doc) => (
              <div key={doc.id} className="doc-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: doc.signed ? '#f0fdf4' : '#fffbeb', color: doc.signed ? '#16a34a' : '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '700', color: '#111827' }}>{doc.title}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#6b7280' }}>
                      <span>{doc.category}</span>
                      <span>·</span>
                      <span>{doc.size}</span>
                      {doc.signed && (
                        <>
                          <span>·</span>
                          <span style={{ color: '#047857', fontWeight: '600' }}>Signed on {doc.signedDate}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {doc.signed ? (
                    <span className="badge" style={{ background: '#d1fae5', color: '#047857' }}>✓ Acknowledged</span>
                  ) : (
                    <button
                      onClick={() => setActiveDocForSigning(doc)}
                      style={{ padding: '6px 14px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Sign & Acknowledge
                    </button>
                  )}

                  <button
                    onClick={() => handleDownload(doc.title)}
                    style={{ padding: '6px 12px', background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Signature Modal */}
      <AnimatePresence>
        {activeDocForSigning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#111827', margin: 0 }}>Review & Acknowledge</h3>
                <button onClick={() => setActiveDocForSigning(null)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', maxHeight: '200px', overflowY: 'auto', fontSize: '13px', lineHeight: '1.6', color: '#475569', marginBottom: '20px' }}>
                <p style={{ marginTop: 0 }}><strong>{activeDocForSigning.title}</strong></p>
                <p>By signing this document, you confirm that you have read, understood, and agreed to adhere to all terms, operating guidelines, confidentiality rules, and ethical standards set forth in this policy.</p>
                <p>Violation of these policies may result in disciplinary action up to and including termination of employment in accordance with statutory regulations.</p>
              </div>

              <form onSubmit={handleSignDocument}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#374151', cursor: 'pointer', marginBottom: '20px' }}>
                  <input
                    type="checkbox"
                    checked={hasAgreed}
                    onChange={(e) => setHasAgreed(e.target.checked)}
                    style={{ marginTop: '2px' }}
                  />
                  <span>
                    I confirm that I have reviewed <strong>{activeDocForSigning.title}</strong> and agree to all provisions stated herein.
                  </span>
                </label>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setActiveDocForSigning(null)}
                    style={{ padding: '8px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '8px 20px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Confirm & Sign Policy
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default EmployeeDocumentsPage;

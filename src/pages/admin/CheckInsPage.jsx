import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { 
  CheckSquare, Calendar, Users, Send, 
  ArrowRight, Plus, Award, ChevronRight, X, Check 
} from 'lucide-react';
import toast from 'react-hot-toast';

const CheckInsPage = () => {
  const [activeTab, setActiveTab] = useState('cycles'); // cycles or form
  const [rating, setRating] = useState(4);
  const [isSaved, setIsSaved] = useState(false);
  const [isNewCycleModalOpen, setIsNewCycleModalOpen] = useState(false);

  // New cycle form
  const [newCycle, setNewCycle] = useState({
    title: 'Q3 2026 Performance Check-in',
    dueDate: '31 Aug 2026',
    targetDept: 'All Staff'
  });

  const handleSave = () => {
    setIsSaved(true);
    toast.success('Your self-assessment answers have been saved!');
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleLaunchCycle = (e) => {
    e.preventDefault();
    toast.success(`"${newCycle.title}" launched and reviewees notified!`);
    setIsNewCycleModalOpen(false);
  };

  const handleSendNudge = () => {
    toast.success('Reminder sent to 23 employees with pending check-ins!');
  };

  return (
    <AdminLayout title="Check-ins & Performance" subtitle="Quarterly performance reviews, employee self-assessments, and 1-on-1 goals.">
      <style>
        {`
          .checkins-container { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .tab-nav { display: flex; gap: 24px; border-bottom: 1px solid #e5e7eb; overflow-x: auto; }
          .tab-btn { padding: 12px 4px; font-size: 14px; font-weight: 600; color: #6b7280; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
          .tab-btn:hover { color: #111827; }
          .tab-btn.active { color: #534ab7; border-bottom-color: #534ab7; }
          .card { background: white; padding: 32px; border-radius: 16px; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          .card-side { background: white; padding: 24px; border-radius: 16px; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 24px; }
          .badge { display: inline-block; padding: 4px 12px; background: #eef2ff; color: #4338ca; font-size: 12px; font-weight: 600; border-radius: 9999px; border: 1px solid #e0e7ff; margin-bottom: 16px; }
          .form-label { display: block; font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 4px; }
          .form-desc { font-size: 12px; color: #6b7280; margin-bottom: 12px; }
          .form-textarea { width: 100%; padding: 16px; background: #f6f5f3; border: none; border-radius: 12px; font-size: 14px; color: #1f2937; resize: none; outline: none; box-sizing: border-box; font-family: inherit; }
          .form-textarea:focus { box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); }
          .rating-btn { width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; cursor: pointer; border: 1px solid #e5e7eb; background: white; color: #4b5563; transition: all 0.2s; }
          .rating-btn:hover { background: #f9fafb; }
          .rating-btn.active { background: #534ab7; color: white; border-color: #534ab7; }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 480px; padding: 32px; }
        `}
      </style>
      
      <div className="checkins-container">
        
        {/* Navigation Tabs */}
        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 'cycles' ? 'active' : ''}`} onClick={() => setActiveTab('cycles')}>
            Active Review Cycles (Admin Overview)
          </button>
          <button className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`} onClick={() => setActiveTab('form')}>
            My Self-Assessment Form
          </button>
        </div>

        {/* Tab 1: Cycles Overview */}
        {activeTab === 'cycles' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Cycle Header Card */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>Q2 2026 Performance Check-in</h2>
                    <span style={{ background: '#d1fae5', color: '#047857', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                      In Progress
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                    Quarterly review cycle for all engineering, product, and business units. Due May 31, 2026.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={handleSendNudge}
                    style={{ padding: '8px 16px', background: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Send size={14} /> Nudge Pending (23)
                  </button>
                  <button 
                    onClick={() => setIsNewCycleModalOpen(true)}
                    style={{ padding: '8px 16px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus size={16} /> New Review Cycle
                  </button>
                </div>
              </div>

              {/* Progress Overview */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ fontWeight: '600', color: '#111827' }}>Overall Completion Status</span>
                  <span style={{ fontWeight: '700', color: '#534ab7' }}>119 / 142 Submitted (84%)</span>
                </div>
                <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '84%', background: '#534ab7', borderRadius: '5px' }} />
                </div>
              </div>

              {/* Department breakdown */}
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>Department Progress</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {[
                  { dept: 'Engineering', count: '44/48 submitted', percent: 92, color: '#10b981' },
                  { dept: 'Product & Design', count: '20/22 submitted', percent: 91, color: '#10b981' },
                  { dept: 'Sales & Revenue', count: '24/31 submitted', percent: 77, color: '#f59e0b' },
                  { dept: 'Operations & People', count: '19/19 submitted', percent: 100, color: '#10b981' },
                  { dept: 'Finance & Legal', count: '12/12 submitted', percent: 100, color: '#10b981' },
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: '16px', border: '1px solid #f3f4f6', borderRadius: '10px', background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: '#111827' }}>{item.dept}</span>
                      <span style={{ color: '#6b7280' }}>{item.count}</span>
                    </div>
                    <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.percent}%`, background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Review Cycles */}
            <div className="card">
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>Archived Check-in Cycles</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#f9fafb', borderRadius: '8px' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', fontSize: '14px' }}>Q1 2026 Performance Check-in</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6b7280' }}>Completed 28 Feb 2026 · 138/138 participants</p>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#047857', background: '#d1fae5', padding: '4px 8px', borderRadius: '6px' }}>
                    Completed
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#f9fafb', borderRadius: '8px' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', fontSize: '14px' }}>Q4 2025 Annual Review & Salary Benchmarks</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6b7280' }}>Completed 15 Dec 2025 · 120/120 participants</p>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#047857', background: '#d1fae5', padding: '4px 8px', borderRadius: '6px' }}>
                    Completed
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Self-Assessment Form */}
        {activeTab === 'form' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }}>
            
            {/* Main Form Area */}
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
                <div style={{ marginBottom: '24px' }}>
                  <span className="badge">Q2 2026 Check-in · Due May 31</span>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' }}>Self-assessment</h2>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Share how the quarter went from your perspective. Your manager will see this.</p>
                </div>

                {/* Progress Steps */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ height: '6px', flex: 1, background: '#534ab7', borderRadius: '9999px' }}></div>
                    <div style={{ height: '6px', flex: 1, background: '#534ab7', borderRadius: '9999px' }}></div>
                    <div style={{ height: '6px', flex: 1, background: '#534ab7', borderRadius: '9999px' }}></div>
                    <div style={{ height: '6px', flex: 1, background: '#f3f4f6', borderRadius: '9999px' }}></div>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0 }}>Step 3 of 4</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  
                  {/* Q1 */}
                  <div>
                    <label className="form-label">What went well this quarter?</label>
                    <p className="form-desc">Be specific — mention projects, outcomes, or behaviours you're proud of.</p>
                    <textarea 
                      className="form-textarea"
                      rows="3"
                      defaultValue="Shipped the new employee self-service leave approval engine on time. Mentored two junior engineers through code reviews and documentation."
                    />
                  </div>

                  {/* Q2 */}
                  <div>
                    <label className="form-label">What felt difficult or slowed you down?</label>
                    <p className="form-desc">Could be technical debt, process bottlenecks, or cross-team dependencies.</p>
                    <textarea 
                      className="form-textarea"
                      rows="3"
                      placeholder="e.g., Unclear requirements on sprint backlog, waiting on external vendor APIs..."
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="form-label">Overall rating for this quarter</label>
                    <p className="form-desc">How would you score your own impact?</p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          className={`rating-btn ${rating === val ? 'active' : ''}`}
                          onClick={() => setRating(val)}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button 
                      onClick={handleSave}
                      style={{ flex: 1, padding: '12px', background: isSaved ? '#10b981' : '#534ab7', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                    >
                      {isSaved ? 'Answers Saved!' : 'Save & Continue'}
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>

            {/* Sidebar Guidelines */}
            <div>
              <div className="card-side">
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: '0 0 12px 0' }}>Review Guidelines</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                  Self-assessments are designed to facilitate productive, positive 1-on-1 conversations between you and your reporting lead.
                </p>
                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px', fontSize: '12px', color: '#4b5563' }}>
                  <strong>Next Step:</strong> After submitting, your manager will schedule a 45-minute alignment sync.
                </div>
              </div>
            </div>

          </div>
        )}

        {/* New Cycle Modal */}
        <AnimatePresence>
          {isNewCycleModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Start New Check-in Cycle</h2>
                  <button onClick={() => setIsNewCycleModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleLaunchCycle} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Cycle Title</label>
                    <input 
                      type="text" 
                      value={newCycle.title} 
                      onChange={(e) => setNewCycle({ ...newCycle, title: e.target.value })} 
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', marginTop: '4px' }}
                      required 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Due Date</label>
                      <input 
                        type="date" 
                        value={newCycle.dueDate} 
                        onChange={(e) => setNewCycle({ ...newCycle, dueDate: e.target.value })} 
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', marginTop: '4px' }}
                        required 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Target Group</label>
                      <select 
                        value={newCycle.targetDept} 
                        onChange={(e) => setNewCycle({ ...newCycle, targetDept: e.target.value })} 
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', marginTop: '4px' }}
                      >
                        <option value="All Staff">All Staff</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Sales">Sales</option>
                        <option value="Product">Product</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '16px', justifyContent: 'flex-end' }}>
                    <button 
                      type="button" 
                      onClick={() => setIsNewCycleModalOpen(false)}
                      style={{ padding: '8px 14px', background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      style={{ padding: '8px 16px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Launch Cycle
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

export default CheckInsPage;

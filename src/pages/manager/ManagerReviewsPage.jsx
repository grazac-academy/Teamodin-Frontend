import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { CheckSquare, Star, Send, X, MessageSquare, Check, User } from 'lucide-react';
import toast from 'react-hot-toast';

const initialReviews = [
  { id: 1, name: 'Sade Afolabi', initials: 'SA', title: 'Senior Product Designer', status: 'Submitted', selfRating: 4, selfNotes: 'Led mobile responsiveness redesign. Completed Figma systems.', managerRating: 4.5, managerFeedback: 'Exceptional ownership and cross-functional leadership.' },
  { id: 2, name: 'Chidi Nwosu', initials: 'CN', title: 'Full Stack Engineer', status: 'Submitted', selfRating: 4, selfNotes: 'Refactored backend API clients and store actions.', managerRating: 0, managerFeedback: '' },
  { id: 3, name: 'Taiwo Bello', initials: 'TB', title: 'Frontend Engineer', status: 'Pending Employee', selfRating: 0, selfNotes: '', managerRating: 0, managerFeedback: '' },
  { id: 4, name: 'Kunle Obi', initials: 'KO', title: 'DevOps Engineer', status: 'Completed', selfRating: 5, selfNotes: 'Achieved 99.98% uptime and zero-downtime deploy pipeline.', managerRating: 5, managerFeedback: 'Rock solid contributor. Promotion recommended.' }
];

const ManagerReviewsPage = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [activeReview, setActiveReview] = useState(null);
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');

  const handleOpenReview = (rev) => {
    setActiveReview(rev);
    setRating(rev.managerRating || 4);
    setFeedback(rev.managerFeedback || '');
  };

  const handleSaveEvaluation = (e) => {
    e.preventDefault();
    setReviews(reviews.map(r => {
      if (r.id === activeReview.id) {
        return {
          ...r,
          status: 'Completed',
          managerRating: rating,
          managerFeedback: feedback
        };
      }
      return r;
    }));

    toast.success(`Evaluation submitted for ${activeReview.name}!`);
    setActiveReview(null);
  };

  return (
    <AdminLayout title="Team Check-ins & Reviews" subtitle="Review self-assessments from direct reports, provide manager ratings, and share feedback.">
      <style>
        {`
          .mgr-reviews-container { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .review-card { padding: 20px; border: 1px solid #f3f4f6; border-radius: 12px; margin-bottom: 12px; background: white; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
          .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; }
          .rating-btn { width: 42px; height: 42px; border-radius: 8px; border: 1px solid #e5e7eb; background: white; font-weight: 700; cursor: pointer; color: #374151; }
          .rating-btn.active { background: #534ab7; color: white; border-color: #534ab7; }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 560px; padding: 28px; max-height: 90vh; overflow-y: auto; }
        `}
      </style>

      <div className="mgr-reviews-container">
        
        {/* Cycle Summary Card */}
        <div className="card" style={{ borderLeft: '4px solid #534ab7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#534ab7' }}>Active Review Cycle</span>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '4px 0 2px 0' }}>Q2 2026 Engineering Reviews</h2>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>Due May 31, 2026 · Manager evaluations and goal setting.</p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>
                  {reviews.filter(r => r.status === 'Completed').length}/{reviews.length}
                </span>
                <span style={{ display: 'block', fontSize: '11px', color: '#6b7280' }}>Evaluated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members List */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>Direct Reports Status</h3>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {reviews.map((rev) => (
              <div key={rev.id} className="review-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '700', flexShrink: 0 }}>
                    {rev.initials}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827' }}>{rev.name}</h4>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6b7280' }}>{rev.title}</p>
                    {rev.selfRating > 0 && (
                      <span style={{ fontSize: '11px', color: '#534ab7', fontWeight: '600' }}>
                        Self-rating: ★ {rev.selfRating} / 5
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="badge" style={{
                    background: rev.status === 'Completed' ? '#d1fae5' : (rev.status === 'Submitted' ? '#fef3c7' : '#f3f4f6'),
                    color: rev.status === 'Completed' ? '#047857' : (rev.status === 'Submitted' ? '#b45309' : '#4b5563')
                  }}>
                    {rev.status === 'Completed' ? '✓ Evaluated' : (rev.status === 'Submitted' ? 'Awaiting Your Review' : 'Pending Employee')}
                  </span>

                  {rev.status === 'Submitted' && (
                    <button
                      onClick={() => handleOpenReview(rev)}
                      style={{ padding: '8px 16px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Conduct Review
                    </button>
                  )}

                  {rev.status === 'Completed' && (
                    <button
                      onClick={() => handleOpenReview(rev)}
                      style={{ padding: '8px 14px', background: '#f3f0ff', color: '#534ab7', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                    >
                      View / Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {activeReview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Review: {activeReview.name}</h3>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{activeReview.title} · Q2 2026</span>
                </div>
                <button onClick={() => setActiveReview(null)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              {/* Employee's Self Assessment Summary */}
              {activeReview.selfNotes && (
                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', marginBottom: '18px', border: '1px solid #e2e8f0', fontSize: '13px' }}>
                  <span style={{ fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    {activeReview.name}'s Self Assessment:
                  </span>
                  <p style={{ margin: 0, color: '#475569' }}>"{activeReview.selfNotes}"</p>
                  <span style={{ display: 'block', marginTop: '6px', fontSize: '11px', color: '#534ab7', fontWeight: '700' }}>
                    Self-Score: ★ {activeReview.selfRating} / 5
                  </span>
                </div>
              )}

              <form onSubmit={handleSaveEvaluation}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Manager Performance Rating (1 to 5)
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        type="button"
                        key={val}
                        className={`rating-btn ${rating === val ? 'active' : ''}`}
                        onClick={() => setRating(val)}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    Manager Feedback & Development Objectives
                  </label>
                  <textarea
                    rows="4"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide constructive feedback, achievements praise, and key development goals for next quarter..."
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setActiveReview(null)}
                    style={{ padding: '8px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '8px 20px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Save & Submit Evaluation
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

export default ManagerReviewsPage;

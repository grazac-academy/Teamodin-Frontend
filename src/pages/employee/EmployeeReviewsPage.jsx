import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { Award, CheckSquare, MessageSquare, Star, Send, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const EmployeeReviewsPage = () => {
  const [activeCycleTab, setActiveCycleTab] = useState('current');
  const [rating, setRating] = useState(4);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    achievements: 'Led the UI redesign for the mobile responsiveness sprint. Implemented SVG charts and standardized forms.',
    blockers: 'External design tokens sync caused minor delays in staging verification.',
    goals: 'Deliver the manager and employee self-service portals and assist backend team on API schema contracts.'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success('Your Q2 self-assessment was submitted to your manager!');
  };

  return (
    <AdminLayout title="Performance Reviews & Check-ins" subtitle="Fill out your quarterly self-evaluation and view feedback from your team lead.">
      <style>
        {`
          .reviews-container { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .form-label { display: block; font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 4px; }
          .form-desc { font-size: 12px; color: #6b7280; margin-bottom: 10px; }
          .form-textarea { width: 100%; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; box-sizing: border-box; font-family: inherit; resize: none; margin-bottom: 20px; }
          .rating-btn { width: 44px; height: 44px; border-radius: 8px; border: 1px solid #e5e7eb; background: white; font-weight: 700; cursor: pointer; transition: all 0.2s; color: #374151; }
          .rating-btn.active { background: #534ab7; color: white; border-color: #534ab7; }
        `}
      </style>

      <div className="reviews-container">
        
        {/* Active Cycle Status Card */}
        <div className="card" style={{ borderLeft: '4px solid #534ab7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#534ab7', letterSpacing: '0.5px' }}>
                Active Evaluation Cycle
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '4px 0 2px 0' }}>
                Q2 2026 Performance Check-in
              </h2>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
                Reviewer: David Babatunde (Engineering Lead) · Due by 31 May 2026
              </p>
            </div>

            <span style={{ padding: '6px 12px', background: isSubmitted ? '#d1fae5' : '#fef3c7', color: isSubmitted ? '#047857' : '#b45309', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
              {isSubmitted ? '✓ Self-Assessment Submitted' : 'Submission Pending'}
            </span>
          </div>
        </div>

        {/* Self Assessment Form */}
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 20px 0' }}>
            My Self-Assessment Form
          </h3>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label">1. Key Accomplishments & Highlights</label>
              <p className="form-desc">What were your major wins and contributions during this quarter?</p>
              <textarea
                rows="3"
                className="form-textarea"
                value={formData.achievements}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="form-label">2. Challenges & Learning Opportunities</label>
              <p className="form-desc">What obstacles did you face, and how can your manager help support you?</p>
              <textarea
                rows="3"
                className="form-textarea"
                value={formData.blockers}
                onChange={(e) => setFormData({ ...formData, blockers: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="form-label">3. Goals for Next Quarter (Q3)</label>
              <p className="form-desc">What key objectives or skills do you plan to achieve?</p>
              <textarea
                rows="3"
                className="form-textarea"
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label className="form-label">4. Overall Self-Rating (1 to 5)</label>
              <p className="form-desc">How would you score your overall impact this quarter?</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
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

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px',
                  background: isSubmitted ? '#10b981' : '#534ab7', color: 'white', border: 'none',
                  borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer'
                }}
              >
                <Send size={16} />
                {isSubmitted ? 'Answers Saved & Submitted' : 'Submit Self-Assessment'}
              </button>
            </div>
          </form>
        </div>

        {/* Previous Feedback from Manager */}
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>
            Previous Manager Review — Q1 2026
          </h3>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ffedd5', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '12px' }}>DB</div>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>David Babatunde</span>
                  <span style={{ display: 'block', fontSize: '11px', color: '#6b7280' }}>Engineering Lead · Reviewed on 28 Feb 2026</span>
                </div>
              </div>
              <span style={{ padding: '4px 10px', background: '#d1fae5', color: '#047857', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>
                Rating: 4.5 / 5.0 (Exceeds Expectations)
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#334155' }}>
              "Sade had an outstanding Q1. She took ownership of our new design component library and collaborated seamlessly with the frontend engineers. Looking forward to seeing her lead the design systems architecture in Q2."
            </p>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default EmployeeReviewsPage;

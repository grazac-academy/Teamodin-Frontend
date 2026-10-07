import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

const CheckInsPage = () => {
  const [rating, setRating] = useState(4);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <style>
        {`
          .checkins-container { max-width: 1152px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .header-title { font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 24px 0; }
          .grid-layout { display: grid; grid-template-columns: 1fr; gap: 32px; align-items: start; }
          @media (min-width: 1024px) {
            .grid-layout { grid-template-columns: 2fr 1fr; }
          }
          .card { background: white; padding: 32px; border-radius: 16px; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          .card-side { background: white; padding: 24px; border-radius: 16px; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 24px; }
          @media (max-width: 768px) {
            .card { padding: 20px; }
            .card-side { padding: 16px; }
            .header-title { font-size: 20px; margin-bottom: 16px; }
          }
          .badge { display: inline-block; padding: 4px 12px; background: #eef2ff; color: #4338ca; font-size: 12px; font-weight: 600; border-radius: 9999px; border: 1px solid #e0e7ff; margin-bottom: 16px; }
          .form-label { display: block; font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 4px; }
          .form-desc { font-size: 12px; color: #6b7280; margin-bottom: 12px; }
          .form-textarea { width: 100%; padding: 16px; background: #f6f5f3; border: none; border-radius: 12px; font-size: 14px; color: #1f2937; resize: none; outline: none; box-sizing: border-box; font-family: inherit; }
          .form-textarea:focus { box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); }
          .rating-btn { width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; cursor: pointer; border: 1px solid #e5e7eb; background: white; color: #4b5563; transition: all 0.2s; }
          .rating-btn:hover { background: #f9fafb; }
          .rating-btn.active { background: #4f46e5; color: white; border-color: #4f46e5; }
          .btn-back { padding: 12px 24px; background: white; color: #4338ca; border: 1px solid #e5e7eb; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; }
          .btn-back:hover { background: #f9fafb; }
          .btn-save { flex: 1; padding: 12px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
          .btn-save:hover { background: #4338ca; }
          .btn-save.saved { background: #10b981; }
        `}
      </style>
      <div className="checkins-container">
        
        <h1 className="header-title">Check-ins</h1>

        <div className="grid-layout">
          
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
                  <div style={{ height: '6px', flex: 1, background: '#4f46e5', borderRadius: '9999px' }}></div>
                  <div style={{ height: '6px', flex: 1, background: '#4f46e5', borderRadius: '9999px' }}></div>
                  <div style={{ height: '6px', flex: 1, background: '#c7d2fe', borderRadius: '9999px' }}></div>
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
                    defaultValue="Shipped the auth redesign two weeks ahead of schedule. Collaborated closely with design to reduce re-work. Mentored two junior engineers on testing patterns."
                  ></textarea>
                </div>

                {/* Q2 */}
                <div>
                  <label className="form-label" style={{ marginBottom: '12px' }}>Where did you face challenges?</label>
                  <textarea 
                    className="form-textarea"
                    rows="2"
                    defaultValue="Context-switching between the auth project and support tickets slowed me down mid-quarter."
                  ></textarea>
                </div>

                {/* Q3 (Rating) */}
                <div>
                  <label className="form-label" style={{ marginBottom: '12px' }}>How would you rate your overall performance this quarter?</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button 
                          key={num}
                          onClick={() => setRating(num)}
                          className={`rating-btn ${num === rating ? 'active' : ''}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '0px' }}>
                      {rating === 1 ? '1 = Needs improvement' : rating === 2 ? '2 = Below expectations' : rating === 3 ? '3 = Meets expectations' : rating === 4 ? '4 = Strong performance' : '5 = Outstanding'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                  <button className="btn-back">← Back</button>
                  <button className={`btn-save ${isSaved ? 'saved' : ''}`} onClick={handleSave}>
                    {isSaved ? '✓ Saved' : 'Save & continue →'}
                  </button>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Side Panel */}
          <div>
            
            {/* Manager View */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card-side">
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>Manager view</h3>
              
              <div style={{ background: '#faf9f5', border: '1px solid #f3f4f6', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>
                    DB
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>David Bello</h4>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Your manager · Has not submitted yet</p>
                  </div>
                </div>
                <span style={{ padding: '4px 12px', background: '#ffedd5', color: '#c2410c', fontSize: '12px', fontWeight: '600', borderRadius: '8px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Pending
                </span>
              </div>
              
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                Both responses are shared after the cycle closes on May 31.
              </p>
            </motion.div>

            {/* Previous Check-ins */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card-side">
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>Previous check-ins</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'Q1 2026', date: 'Closed Mar 31' },
                  { title: 'Q4 2025', date: 'Closed Dec 20' },
                  { title: 'Q3 2025', date: 'Closed Sep 30' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: idx !== 2 ? '16px' : '0', borderBottom: idx !== 2 ? '1px solid #f3f4f6' : 'none' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>{item.title}</h4>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{item.date}</p>
                    </div>
                    <span style={{ padding: '4px 12px', background: '#d1fae5', color: '#047857', fontSize: '12px', fontWeight: '600', borderRadius: '8px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      Completed
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CheckInsPage;

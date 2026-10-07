import React from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { Lock } from 'lucide-react';

const SurveysPage = () => {
  return (
    <AdminLayout>
      <style>
        {`
          .surveys-container { max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
          .header-title { font-size: 24px; font-weight: 700; color: #111827; margin: 0; }
          .btn-new { padding: 8px 16px; background: white; border: 1px solid #e5e7eb; color: #4f46e5; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; display: flex; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: background 0.2s; }
          .btn-new:hover { background: #eef2ff; }
          .grid-layout { display: grid; grid-template-columns: 1fr; gap: 32px; align-items: start; }
          @media (min-width: 1024px) {
            .grid-layout { grid-template-columns: 1fr 1fr; }
          }
          .card { background: white; padding: 32px; border-radius: 16px; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          .alert-box { background: #f8f7f1; border: 1px solid #e5e3d7; border-radius: 8px; padding: 12px; display: flex; align-items: center; font-size: 12px; color: #4b5563; margin-bottom: 24px; }
          .form-label { display: block; font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 16px; }
          .nps-grid { display: flex; gap: 8px; }
          .nps-btn { flex: 1; aspect-ratio: 1; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
          .nps-detractor { background: #fef2f2; color: #dc2626; border-color: #fee2e2; }
          .nps-passive { background: #fff7ed; color: #ea580c; border-color: #ffedd5; }
          .nps-promoter { background: #f0fdf4; color: #16a34a; border-color: #dcfce7; }
          .nps-selected { background: white; border-color: #4f46e5; color: #4338ca; box-shadow: 0 0 0 1px #4f46e5; }
          .likert-btn { flex: 1; padding: 12px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; text-align: center; cursor: pointer; transition: all 0.2s; border: 1px solid #e5e7eb; background: white; color: #4b5563; }
          .likert-btn:hover { background: #f9fafb; }
          .likert-active { background: #eef2ff; border-color: #c7d2fe; color: #4338ca; }
          .form-textarea { width: 100%; padding: 16px; background: #f6f5f3; border: none; border-radius: 12px; font-size: 14px; color: #1f2937; resize: none; outline: none; box-sizing: border-box; font-family: inherit; }
          .form-textarea:focus { box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); }
          .btn-submit { width: 100%; padding: 14px; background: #4f46e5; color: white; border: none; border-radius: 12px; font-weight: 600; font-size: 14px; cursor: pointer; transition: background 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05); margin-top: 16px; }
          .btn-submit:hover { background: #4338ca; }
          .result-bar { display: flex; height: 12px; width: 100%; border-radius: 9999px; overflow: hidden; margin-bottom: 12px; }
          .bar-emerald { background: #10b981; }
          .bar-gray { background: #e5e3d7; }
          .bar-red { background: #ef4444; }
          .legend-item { display: flex; align-items: center; font-size: 11px; font-weight: 500; }
          .dot { width: 6px; height: 6px; border-radius: 50%; margin-right: 6px; }
          .dot-emerald { background: #10b981; }
          .dot-gray { background: #9ca3af; }
          .dot-red { background: #ef4444; }
          .bar-row { display: flex; align-items: center; margin-bottom: 16px; }
          .bar-label { width: 112px; font-size: 14px; color: #4b5563; font-weight: 500; }
          .bar-track { flex: 1; height: 20px; background: #f6f5f3; border-radius: 4px; display: flex; align-items: center; position: relative; overflow: hidden; }
          .bar-fill { height: 100%; border-radius: 4px; }
          .bar-text { position: absolute; left: 8px; font-size: 12px; font-weight: 600; z-index: 10; }
          .notice-box { background: #fcf5e3; border: 1px solid #f5dfa8; border-radius: 12px; padding: 16px; font-size: 14px; color: #8c6d1f; line-height: 1.5; display: flex; align-items: flex-start; gap: 12px; }
        `}
      </style>

      <div className="surveys-container">
        
        {/* Header */}
        <div className="header-row">
          <h1 className="header-title">Surveys</h1>
          <button className="btn-new">
            + New survey
          </button>
        </div>

        <div className="grid-layout">
          
          {/* Main Form Area */}
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
              
              <div className="alert-box">
                <Lock style={{ width: '14px', height: '14px', marginRight: '8px', color: '#9ca3af' }} />
                Your responses are anonymous. Results only shown after 5+ responses.
              </div>

              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' }}>May pulse survey</h2>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Takes about 2 minutes · Open until May 31</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                
                {/* Q1 */}
                <div>
                  <label className="form-label">How likely are you to recommend working here to a friend?</label>
                  <div className="nps-grid">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                      const isPromoter = num >= 9;
                      const isPassive = num >= 7 && num <= 8;
                      const isSelected = num === 8;
                      
                      let btnClass = 'nps-btn nps-detractor';
                      if (isPassive) btnClass = 'nps-btn nps-passive';
                      if (isPromoter) btnClass = 'nps-btn nps-promoter';
                      if (isSelected) btnClass = 'nps-btn nps-selected';

                      return (
                        <button key={num} className={btnClass}>
                          {num}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
                    <span>Not likely</span>
                    <span>Very likely</span>
                  </div>
                </div>

                {/* Q2 */}
                <div>
                  <label className="form-label">I have the resources I need to do my best work.</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'].map((opt) => (
                      <button 
                        key={opt}
                        className={`likert-btn ${opt === 'Agree' ? 'likert-active' : ''}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q3 */}
                <div>
                  <label className="form-label" style={{ marginBottom: '12px' }}>What's one thing we could do better?</label>
                  <textarea 
                    className="form-textarea"
                    rows="4"
                    placeholder="Your answer is anonymous..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button className="btn-submit">
                  Submit responses
                </button>

              </div>
            </motion.div>
          </div>

          {/* Right Panel - Results */}
          <div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card">
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' }}>Admin — survey results</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>May 2026 · 98 / 142 responses · Closed May 10</p>
              </div>

              {/* eNPS Breakdown */}
              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 12px 0' }}>eNPS breakdown</h4>
                <div className="result-bar">
                  <motion.div initial={{ width: 0 }} animate={{ width: '62%' }} transition={{ duration: 1 }} className="bar-emerald" />
                  <motion.div initial={{ width: 0 }} animate={{ width: '20%' }} transition={{ duration: 1 }} className="bar-gray" />
                  <motion.div initial={{ width: 0 }} animate={{ width: '18%' }} transition={{ duration: 1 }} className="bar-red" />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className="legend-item" style={{ color: '#059669' }}><div className="dot dot-emerald" /> Promoters 62%</div>
                  <div className="legend-item" style={{ color: '#6b7280' }}><div className="dot dot-gray" /> Passive 20%</div>
                  <div className="legend-item" style={{ color: '#ef4444' }}><div className="dot dot-red" /> Detractors 18%</div>
                </div>
              </div>

              {/* Resource Question Results */}
              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>I have the resources I need to do my best work</h4>
                
                <div>
                  {[
                    { label: 'Strongly agree', val: '28%', color: '#059669', textColor: 'white' },
                    { label: 'Agree', val: '44%', color: '#6ee7b7', textColor: '#1f2937' },
                    { label: 'Neutral', val: '18%', color: '#d5d3c5', textColor: '#1f2937' },
                    { label: 'Disagree', val: '10%', color: '#fca5a5', textColor: '#1f2937' },
                  ].map((item, idx) => (
                    <div key={idx} className="bar-row">
                      <div className="bar-label">{item.label}</div>
                      <div className="bar-track">
                        <motion.div initial={{ width: 0 }} animate={{ width: item.val }} transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }} className="bar-fill" style={{ backgroundColor: item.color }} />
                        <span className="bar-text" style={{ color: item.textColor }}>
                          {item.val}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notice Box */}
              <div className="notice-box">
                <Lock style={{ width: '16px', height: '16px', marginTop: '2px', flexShrink: 0 }} />
                <p style={{ margin: 0 }}>
                  <strong style={{ fontWeight: '600' }}>Open-text responses are hidden until 5+ submissions per group.</strong>
                  <br/>
                  Currently 3 responses in Finance — results withheld to protect anonymity.
                </p>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default SurveysPage;

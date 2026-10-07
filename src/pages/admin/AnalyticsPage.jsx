import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { ArrowUpRight, ArrowDownRight, Download, Calendar } from 'lucide-react';

const AnalyticsPage = () => {
  const [eNPSTimeframe, setENPSTimeframe] = useState('Quarterly');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <AdminLayout>
      <style>
        {`
          .analytics-container { max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .header-row { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
          @media (min-width: 768px) {
            .header-row { flex-direction: row; align-items: center; justify-content: space-between; }
          }
          .header-title { font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 4px 0; }
          .header-subtitle { font-size: 14px; color: #6b7280; margin: 0; }
          .header-actions { display: flex; align-items: center; gap: 12px; }
          .date-picker { display: flex; align-items: center; background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 14px; color: #4b5563; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
          .btn-export { display: flex; align-items: center; padding: 8px 16px; background: white; border: 1px solid #e5e7eb; color: #374151; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: background 0.2s; }
          .btn-export:hover { background: #f9fafb; }
          .btn-export.exporting { background: #eef2ff; color: #4338ca; border-color: #c7d2fe; }
          .kpi-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
          @media (min-width: 768px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (min-width: 1024px) { .kpi-grid { grid-template-columns: repeat(4, 1fr); } }
          .card { background: white; padding: 24px; border-radius: 16px; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          .kpi-value { font-size: 30px; font-weight: 700; margin: 0 0 4px 0; }
          .kpi-label { font-size: 14px; color: #6b7280; margin: 0 0 12px 0; }
          .kpi-trend { display: flex; align-items: center; font-size: 12px; font-weight: 500; color: #059669; }
          .kpi-trend-down { display: flex; align-items: center; font-size: 12px; font-weight: 500; color: #059669; }
          .middle-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
          @media (min-width: 1024px) { .middle-grid { grid-template-columns: repeat(2, 1fr); } }
          .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
          .card-title { font-size: 16px; font-weight: 600; color: #111827; margin: 0; }
          .card-subtitle { font-size: 12px; color: #6b7280; margin: 0; }
          .chart-area { height: 192px; position: relative; width: 100%; margin-top: 16px; border-bottom: 1px solid #f3f4f6; }
          .chart-y-axis { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; font-size: 10px; color: #9ca3af; padding-bottom: 24px; }
          .chart-grid { position: absolute; left: 24px; right: 0; bottom: 24px; top: 8px; display: flex; flex-direction: column; justify-content: space-between; }
          .chart-grid-line { border-top: 1px solid #f3f4f6; width: 100%; height: 100%; }
          .chart-svg-area { position: absolute; inset: 0; margin-left: 24px; padding-bottom: 24px; padding-top: 8px; }
          .chart-x-axis { position: absolute; bottom: 0; left: 24px; right: 0; display: flex; justify-content: space-between; font-size: 10px; color: #9ca3af; }
          .chart-legend { display: flex; align-items: center; gap: 16px; margin-top: 16px; }
          .legend-item { display: flex; align-items: center; font-size: 12px; color: #6b7280; }
          .legend-line { width: 12px; height: 2px; background: #4f46e5; margin-right: 8px; }
          .legend-line-dashed { width: 12px; height: 2px; border-top: 2px dashed #a5b4fc; margin-right: 8px; }
          .dept-row { display: flex; align-items: center; font-size: 14px; margin-bottom: 16px; }
          .dept-label { width: 96px; color: #4b5563; font-weight: 500; }
          .dept-bar-track { flex: 1; height: 24px; background: #f9fafb; border-radius: 6px; display: flex; align-items: center; overflow: hidden; position: relative; }
          .dept-bar-fill { height: 100%; background: #eef2ff; border-right: 1px solid #e0e7ff; display: flex; align-items: center; padding: 0 8px; }
          .dept-bar-text { font-size: 12px; font-weight: 600; color: #4338ca; }
          .dept-value { width: 48px; text-align: right; font-size: 12px; font-weight: 600; }
          .lower-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
          @media (min-width: 768px) { .lower-grid { grid-template-columns: repeat(3, 1fr); } }
          .enps-title-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 16px; }
          .enps-score { font-size: 36px; font-weight: 700; color: #4f46e5; margin-left: auto; }
          .enps-bar { height: 12px; width: 100%; display: flex; border-radius: 9999px; overflow: hidden; margin-bottom: 12px; }
          .enps-legend { display: flex; justify-content: space-between; font-size: 10px; font-weight: 500; }
          .enps-legend-item { display: flex; align-items: center; }
          .enps-dot { width: 8px; height: 8px; border-radius: 50%; margin-right: 4px; }
          .info-box { margin-top: 24px; background: #f9fafb; border-radius: 8px; padding: 12px; text-align: center; font-size: 12px; color: #6b7280; }
          .donut-container { position: relative; width: 128px; height: 128px; margin: 0 auto 24px auto; }
          .donut-text { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; color: #4338ca; }
          .leave-stats { display: flex; justify-content: space-between; width: 100%; text-align: center; }
          .leave-stat-val { font-size: 18px; font-weight: 700; }
          .leave-stat-label { font-size: 12px; color: #6b7280; }
          .onboarding-row { margin-bottom: 16px; }
          .onboarding-label-row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 4px; }
          .onboarding-track { height: 6px; width: 100%; background: #f3f4f6; border-radius: 9999px; overflow: hidden; }
          .toggle-group { display: flex; background: #f9fafb; padding: 4px; border-radius: 8px; border: 1px solid #f3f4f6; }
          .toggle-btn-active { padding: 4px 12px; background: white; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-radius: 4px; font-size: 12px; font-weight: 500; color: #4338ca; border: none; cursor: pointer; }
          .toggle-btn { padding: 4px 12px; background: transparent; font-size: 12px; font-weight: 500; color: #6b7280; border: none; cursor: pointer; transition: color 0.2s; }
          .toggle-btn:hover { color: #374151; }
        `}
      </style>

      <div className="analytics-container">
        
        {/* Header Section */}
        <div className="header-row">
          <div>
            <h1 className="header-title">Analytics</h1>
            <p className="header-subtitle">Refreshed nightly · Last updated {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
          <div className="header-actions">
            <div className="date-picker">
              <Calendar style={{ width: '16px', height: '16px', marginRight: '8px', color: '#9ca3af' }} />
              Feb – May 2026
            </div>
            <button className={`btn-export ${isExporting ? 'exporting' : ''}`} onClick={handleExport}>
              <Download style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </button>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="kpi-grid">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
            <h2 className="kpi-value" style={{ color: '#111827' }}>142</h2>
            <p className="kpi-label">Total headcount</p>
            <div className="kpi-trend">
              <ArrowUpRight style={{ width: '12px', height: '12px', marginRight: '4px' }} />
              + 4 this quarter
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
            <h2 className="kpi-value" style={{ color: '#ef4444' }}>6.3%</h2>
            <p className="kpi-label">Attrition rate (90d)</p>
            <div className="kpi-trend-down">
              <ArrowDownRight style={{ width: '12px', height: '12px', marginRight: '4px' }} />
              Down from 8.1%
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
            <h2 className="kpi-value" style={{ color: '#4f46e5' }}>42</h2>
            <p className="kpi-label">eNPS score</p>
            <div className="kpi-trend">
              <ArrowUpRight style={{ width: '12px', height: '12px', marginRight: '4px' }} />
              Up from 36
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
            <h2 className="kpi-value" style={{ color: '#f97316' }}>54%</h2>
            <p className="kpi-label" style={{ marginBottom: '4px' }}>Leave utilisation</p>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Annual avg per employee</p>
          </motion.div>
        </div>

        {/* Middle Charts Grid */}
        <div className="middle-grid">
          {/* Headcount Trend */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
            <div className="card-header">
              <h3 className="card-title">Headcount trend</h3>
              <span className="card-subtitle">Feb – May 2026</span>
            </div>
            
            <div className="chart-area">
              <div className="chart-y-axis">
                <div>142</div>
                <div>138</div>
                <div>134</div>
                <div>130</div>
              </div>
              
              <div className="chart-grid">
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
              </div>

              <div className="chart-svg-area">
                <svg style={{ width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M 0 100 L 33 66 L 66 33 L 100 0" fill="none" stroke="#534ab7" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <circle cx="0" cy="100" r="4" fill="#534ab7" />
                  <circle cx="33" cy="66" r="4" fill="#534ab7" />
                  <circle cx="66" cy="33" r="4" fill="#534ab7" />
                  <circle cx="100" cy="0" r="4" fill="#534ab7" />
                </svg>
              </div>

              <div className="chart-x-axis">
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
              </div>
            </div>

            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-line"></div> Headcount
              </div>
              <div className="legend-item">
                <div className="legend-line-dashed"></div> Hires
              </div>
            </div>
          </motion.div>

          {/* Attrition by Department */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card">
            <div className="card-header">
              <h3 className="card-title">Attrition by department</h3>
              <span className="card-subtitle">Rolling 90 days</span>
            </div>
            
            <div>
              {[
                { name: 'Sales', count: 3, percent: '12.5%', fill: '50%', color: '#ef4444' },
                { name: 'Operations', count: 2, percent: '8.3%', fill: '35%', color: '#f97316' },
                { name: 'Engineering', count: 2, percent: '4.2%', fill: '20%', color: '#eab308' },
                { name: 'Product', count: 1, percent: '2.1%', fill: '10%', color: '#10b981' },
                { name: 'Finance', count: 0, percent: '0%', fill: '0%', color: '#9ca3af' },
              ].map((dept, idx) => (
                <div key={idx} className="dept-row">
                  <div className="dept-label">{dept.name}</div>
                  <div className="dept-bar-track">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: dept.fill }} transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                      className="dept-bar-fill"
                    >
                      {dept.count > 0 && <span className="dept-bar-text">{dept.count}</span>}
                    </motion.div>
                  </div>
                  <div className="dept-value" style={{ color: dept.color }}>{dept.percent}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Lower Middle Grid */}
        <div className="lower-grid">
          
          {/* eNPS Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="enps-title-row">
                <h3 className="card-title">eNPS breakdown</h3>
                <span className="enps-score">42</span>
              </div>
              
              <div style={{ textAlign: 'center', fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>Promoters - Detractors</div>
              
              <div className="enps-bar">
                <motion.div initial={{ width: 0 }} animate={{ width: '62%' }} transition={{ duration: 1 }} style={{ background: '#10b981', height: '100%' }} />
                <motion.div initial={{ width: 0 }} animate={{ width: '20%' }} transition={{ duration: 1 }} style={{ background: '#d1d5db', height: '100%' }} />
                <motion.div initial={{ width: 0 }} animate={{ width: '18%' }} transition={{ duration: 1 }} style={{ background: '#ef4444', height: '100%' }} />
              </div>
              
              <div className="enps-legend">
                <div className="enps-legend-item" style={{ color: '#059669' }}><div className="enps-dot" style={{ background: '#10b981' }} /> Promoters 62%</div>
                <div className="enps-legend-item" style={{ color: '#6b7280' }}><div className="enps-dot" style={{ background: '#d1d5db' }} /> Passive 20%</div>
                <div className="enps-legend-item" style={{ color: '#ef4444' }}><div className="enps-dot" style={{ background: '#ef4444' }} /> Detractors 18%</div>
              </div>
            </div>
            
            <div className="info-box">
              Last survey: May 10 - 98 responses
            </div>
          </motion.div>

          {/* Leave Utilisation Donut */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 className="card-title" style={{ alignSelf: 'flex-start', marginBottom: '16px' }}>Leave utilisation</h3>
            
            <div className="donut-container">
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                <motion.path 
                  initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "54, 100" }} transition={{ duration: 1.5, ease: "easeOut" }}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#534ab7" strokeWidth="4" 
                />
              </svg>
              <div className="donut-text">54%</div>
            </div>
            
            <div className="leave-stats">
              <div>
                <div className="leave-stat-val" style={{ color: '#4f46e5' }}>54%</div>
                <div className="leave-stat-label">Used</div>
              </div>
              <div>
                <div className="leave-stat-val" style={{ color: '#374151' }}>46%</div>
                <div className="leave-stat-label">Remaining</div>
              </div>
              <div>
                <div className="leave-stat-val" style={{ color: '#f97316' }}>8</div>
                <div className="leave-stat-label">Pending</div>
              </div>
            </div>
          </motion.div>

          {/* Onboarding Completion */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h3 className="card-title" style={{ marginBottom: '16px' }}>Onboarding completion</h3>
            
            <div style={{ flex: 1 }}>
              {[
                { label: 'Overall rate', val: '94%', color: '#10b981', textColor: '#059669' },
                { label: 'Week 1 tasks', val: '100%', color: '#4f46e5', textColor: '#4338ca' },
                { label: 'Week 2 tasks', val: '67%', color: '#f97316', textColor: '#ea580c' },
              ].map((item, idx) => (
                <div key={idx} className="onboarding-row">
                  <div className="onboarding-label-row">
                    <span style={{ color: '#4b5563' }}>{item.label}</span>
                    <span style={{ fontWeight: '600', color: item.textColor }}>{item.val}</span>
                  </div>
                  <div className="onboarding-track">
                    <motion.div initial={{ width: 0 }} animate={{ width: item.val }} transition={{ duration: 1 }} style={{ height: '100%', background: item.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="info-box" style={{ marginTop: '16px' }}>
              Active new hires: 3 · Avg days to complete: 11
            </div>
          </motion.div>
        </div>

        {/* eNPS Trend Bottom Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="card">
          <div className="card-header">
            <h3 className="card-title">eNPS trend</h3>
            <div className="toggle-group">
              <button 
                className={eNPSTimeframe === 'Quarterly' ? 'toggle-btn-active' : 'toggle-btn'}
                onClick={() => setENPSTimeframe('Quarterly')}
              >
                Quarterly
              </button>
              <button 
                className={eNPSTimeframe === 'Monthly' ? 'toggle-btn-active' : 'toggle-btn'}
                onClick={() => setENPSTimeframe('Monthly')}
              >
                Monthly
              </button>
            </div>
          </div>
          
          <div className="chart-area" style={{ borderBottom: '1px solid #f3f4f6' }}>
            <div className="chart-y-axis" style={{ paddingBottom: '24px' }}>
              <div>60</div>
              <div>50</div>
              <div>40</div>
              <div>30</div>
              <div>20</div>
              <div>10</div>
            </div>
            
            <div className="chart-grid">
              <div className="chart-grid-line"></div>
              <div className="chart-grid-line"></div>
              <div className="chart-grid-line" style={{ background: 'rgba(249, 250, 251, 0.5)' }}></div>
              <div className="chart-grid-line"></div>
              <div className="chart-grid-line"></div>
            </div>

            <div className="chart-svg-area">
              <svg style={{ width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M 20 60 L 50 50 L 75 45 L 95 30" fill="none" stroke="#534ab7" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <circle cx="20" cy="60" r="4" fill="#534ab7" />
                <circle cx="50" cy="50" r="4" fill="#534ab7" />
                <circle cx="75" cy="45" r="4" fill="#534ab7" />
                <circle cx="95" cy="30" r="4" fill="#534ab7" />
                
                <text x="20" y="55" fontSize="3" fill="#534ab7" fontWeight="bold" textAnchor="middle">28</text>
                <text x="50" y="45" fontSize="3" fill="#534ab7" fontWeight="bold" textAnchor="middle">33</text>
                <text x="75" y="40" fontSize="3" fill="#534ab7" fontWeight="bold" textAnchor="middle">36</text>
                <text x="95" y="25" fontSize="3" fill="#534ab7" fontWeight="bold" textAnchor="middle">42</text>
              </svg>
            </div>

            <div className="chart-x-axis" style={{ padding: '0 48px' }}>
              <span>Q3 2025</span>
              <span>Q4 2025</span>
              <span>Q1 2026</span>
              <span>Q2 2026</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: '#6b7280' }}>Target: <strong style={{ color: '#4338ca' }}>≥ 40</strong></span>
              <span style={{ color: '#059669', fontWeight: '500', display: 'flex', alignItems: 'center' }}>
                <ArrowUpRight style={{ width: '12px', height: '12px', marginRight: '2px' }}/> 
                +6 pts since last quarter
              </span>
            </div>
            <span style={{ color: '#9ca3af' }}>Next survey: Aug 2026</span>
          </div>
        </motion.div>

      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;

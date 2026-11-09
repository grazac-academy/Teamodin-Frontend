import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { ArrowUpRight, ArrowDownRight, Download, Calendar } from 'lucide-react';

// Self-contained responsive SVG line chart component
const ResponsiveLineChart = ({
  data,
  minY,
  maxY,
  yTicks,
  lineColor = '#534ab7',
  areaColor = '#534ab7',
  dashedComparison = false,
  targetValue = null,
  height = 180
}) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };
    updateSize();

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => updateSize());
      ro.observe(containerRef.current);
    }
    window.addEventListener('resize', updateSize);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const paddingLeft = 36;
  const paddingRight = 20;
  const paddingTop = 22;
  const paddingBottom = 26;

  const chartW = Math.max(10, width - paddingLeft - paddingRight);
  const chartH = Math.max(10, height - paddingTop - paddingBottom);

  const getX = (index) => {
    if (data.length <= 1) return paddingLeft;
    return paddingLeft + (index / (data.length - 1)) * chartW;
  };

  const getY = (val) => {
    const range = maxY - minY || 1;
    const normalized = (val - minY) / range;
    return paddingTop + chartH - normalized * chartH;
  };

  const linePath = data.length > 0
    ? data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(d.value).toFixed(1)}`).join(' ')
    : '';

  const areaPath = data.length > 0
    ? `${linePath} L ${getX(data.length - 1).toFixed(1)} ${(paddingTop + chartH).toFixed(1)} L ${getX(0).toFixed(1)} ${(paddingTop + chartH).toFixed(1)} Z`
    : '';

  const gradId = `grad-${lineColor.replace('#', '')}-${minY}-${maxY}`;

  return (
    <div ref={containerRef} style={{ width: '100%', height: `${height}px`, position: 'relative', overflow: 'hidden' }}>
      {width > 0 && (
        <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={areaColor} stopOpacity="0.18" />
              <stop offset="100%" stopColor={areaColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines and Y-axis labels */}
          {yTicks.map((tick, i) => {
            const y = getY(tick);
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#9ca3af"
                  fontSize="10"
                  fontFamily="inherit"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Optional Target line */}
          {targetValue !== null && (
            <line
              x1={paddingLeft}
              y1={getY(targetValue)}
              x2={width - paddingRight}
              y2={getY(targetValue)}
              stroke="#a5b4fc"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          )}

          {/* Secondary dashed comparison line */}
          {dashedComparison && data.length >= 4 && (
            <path
              d={`M ${getX(0)} ${getY(128)} L ${getX(1)} ${getY(131)} L ${getX(2)} ${getY(135)} L ${getX(3)} ${getY(138)}`}
              fill="none"
              stroke="#a5b4fc"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}

          {/* Gradient area under line */}
          {areaPath && (
            <path d={areaPath} fill={`url(#${gradId})`} />
          )}

          {/* Main line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke={lineColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Points, badges, and labels */}
          {data.map((item, i) => {
            const x = getX(i);
            const y = getY(item.value);
            const isHovered = hoveredIndex === i;

            return (
              <g key={i}>
                {/* X-axis label */}
                <text
                  x={x}
                  y={height - 6}
                  textAnchor="middle"
                  fill="#9ca3af"
                  fontSize="11"
                  fontWeight="500"
                  fontFamily="inherit"
                >
                  {item.label}
                </text>

                {/* Crisp value pill badge */}
                <g transform={`translate(${x}, ${y - 12})`}>
                  <rect
                    x="-13"
                    y="-12"
                    width="26"
                    height="16"
                    rx="8"
                    fill={lineColor}
                  />
                  <text
                    x="0"
                    y="-1"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="inherit"
                  >
                    {item.value}
                  </text>
                </g>

                {/* Circular point marker */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 5 : 3.5}
                  fill={lineColor}
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* Hover hit area */}
                <circle
                  cx={x}
                  cy={y}
                  r="18"
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
};

const AnalyticsPage = () => {
  const [eNPSTimeframe, setENPSTimeframe] = useState('Quarterly');
  const [isExporting, setIsExporting] = useState(false);

  const headcountData = [
    { label: 'Feb', value: 130 },
    { label: 'Mar', value: 134 },
    { label: 'Apr', value: 138 },
    { label: 'May', value: 142 }
  ];

  const enpsQuarterlyData = [
    { label: 'Q3 2025', value: 28 },
    { label: 'Q4 2025', value: 33 },
    { label: 'Q1 2026', value: 36 },
    { label: 'Q2 2026', value: 42 }
  ];

  const enpsMonthlyData = [
    { label: 'Feb', value: 34 },
    { label: 'Mar', value: 37 },
    { label: 'Apr', value: 39 },
    { label: 'May', value: 42 }
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <AdminLayout>
      <style>
        {`
          .analytics-container { max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .header-row { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
          @media (min-width: 768px) {
            .header-row { flex-direction: row; align-items: center; justify-content: space-between; }
          }
          .header-title { font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 4px 0; }
          .header-subtitle { font-size: 14px; color: #6b7280; margin: 0; }
          .header-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
          .date-picker { display: flex; align-items: center; background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 14px; color: #4b5563; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
          .btn-export { display: flex; align-items: center; padding: 8px 16px; background: white; border: 1px solid #e5e7eb; color: #374151; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: background 0.2s; }
          .btn-export:hover { background: #f9fafb; }
          .btn-export.exporting { background: #eef2ff; color: #4338ca; border-color: #c7d2fe; }
          .kpi-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
          @media (min-width: 640px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (min-width: 1024px) { .kpi-grid { grid-template-columns: repeat(4, 1fr); } }
          .card { background: white; padding: 24px; border-radius: 16px; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box; }
          @media (max-width: 640px) { .card { padding: 18px 16px; } }
          .kpi-value { font-size: 28px; font-weight: 700; margin: 0 0 4px 0; }
          .kpi-label { font-size: 13px; color: #6b7280; margin: 0 0 12px 0; }
          .kpi-trend { display: flex; align-items: center; font-size: 12px; font-weight: 500; color: #059669; }
          .kpi-trend-down { display: flex; align-items: center; font-size: 12px; font-weight: 500; color: #059669; }
          .middle-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
          @media (min-width: 1024px) { .middle-grid { grid-template-columns: repeat(2, 1fr); } }
          .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 8px; }
          .card-title { font-size: 16px; font-weight: 600; color: #111827; margin: 0; }
          .card-subtitle { font-size: 12px; color: #6b7280; margin: 0; }
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
          .enps-legend { display: flex; justify-content: space-between; font-size: 10px; font-weight: 500; flex-wrap: wrap; gap: 8px; }
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
            
            <ResponsiveLineChart
              data={headcountData}
              minY={126}
              maxY={146}
              yTicks={[142, 138, 134, 130]}
              lineColor="#534ab7"
              areaColor="#534ab7"
              dashedComparison={true}
              height={190}
            />

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
          
          <ResponsiveLineChart
            data={eNPSTimeframe === 'Quarterly' ? enpsQuarterlyData : enpsMonthlyData}
            minY={10}
            maxY={60}
            yTicks={[60, 50, 40, 30, 20, 10]}
            lineColor="#534ab7"
            areaColor="#534ab7"
            targetValue={40}
            height={200}
          />

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

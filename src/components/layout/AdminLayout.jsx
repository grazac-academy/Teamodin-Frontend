import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Calendar, UserPlus, 
  CheckSquare, BarChart2, PieChart, Settings, 
  Menu, X, Bell, Search 
} from 'lucide-react';

const AdminLayout = ({ children, title, subtitle }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsTablet(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Employee Directory', path: '/admin/employees', icon: <Users size={20} /> },
    { name: 'Leave Request', path: '/admin/leave', icon: <Calendar size={20} /> },
    { name: 'Onboarding', path: '/admin/onboarding', icon: <UserPlus size={20} /> },
    { name: 'Check-ins', path: '/admin/check-ins', icon: <CheckSquare size={20} /> },
    { name: 'Surveys', path: '/admin/surveys', icon: <BarChart2 size={20} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <PieChart size={20} /> },
  ];

  const isActive = (path) => {
    // Basic exact match or starts with for nested routes
    if (path === '/admin/dashboard' && location.pathname === '/admin/dashboard') return true;
    if (path !== '/admin/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : (isMobile ? -280 : 0) }}
        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
        style={{
          position: isMobile ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          height: '100vh',
          width: '260px',
          backgroundColor: '#fff',
          borderRight: '1px solid #f3f4f6',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
        }}
      >
        {/* Logo */}
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#534ab7', color: 'white', padding: '6px 8px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>
              HR
            </div>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>HRStack</span>
          </div>
          {isMobile && (
            <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => isMobile && setIsSidebarOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px',
                borderRadius: '8px', textDecoration: 'none',
                backgroundColor: isActive(item.path) ? '#f3f0ff' : 'transparent',
                color: isActive(item.path) ? '#534ab7' : '#4b5563',
                fontWeight: isActive(item.path) ? '600' : '500',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ color: isActive(item.path) ? '#534ab7' : '#9ca3af' }}>{item.icon}</div>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Settings */}
        <div style={{ padding: '16px' }}>
          <Link
            to="/admin/settings"
            onClick={() => isMobile && setIsSidebarOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px',
              borderRadius: '8px', textDecoration: 'none',
              backgroundColor: isActive('/admin/settings') ? '#f3f0ff' : 'transparent',
              color: isActive('/admin/settings') ? '#534ab7' : '#4b5563',
              fontWeight: isActive('/admin/settings') ? '600' : '500',
              fontSize: '14px',
            }}
          >
            <Settings size={20} color={isActive('/admin/settings') ? '#534ab7' : '#9ca3af'} />
            Settings
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Header */}
        <header style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
          padding: isMobile ? '16px 20px' : '24px 32px', backgroundColor: '#f9fafb',
          flexWrap: 'wrap', gap: '16px'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isMobile && (
              <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', display: 'flex', padding: 0 }}>
                <Menu size={24} />
              </button>
            )}
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {title}
              </h1>
              {subtitle && <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{subtitle}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            {/* Search */}
            <div style={{ position: 'relative', display: isTablet ? 'none' : 'block' }}>
              <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Search..." 
                style={{
                  padding: '8px 16px 8px 36px', borderRadius: '20px', border: '1px solid #e5e7eb',
                  backgroundColor: '#f3f4f6', outline: 'none', fontSize: '14px', width: '200px',
                  transition: 'width 0.2s, background-color 0.2s',
                }}
                onFocus={(e) => { e.target.style.width = '240px'; e.target.style.backgroundColor = '#fff'; }}
                onBlur={(e) => { e.target.style.width = '200px'; e.target.style.backgroundColor = '#f3f4f6'; }}
              />
            </div>

            {/* Notifications */}
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #e5e7eb',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563',
                backgroundColor: 'white'
              }}>
                <Bell size={20} />
              </div>
              <div style={{ position: 'absolute', top: '8px', right: '10px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></div>
            </div>

            {/* Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 12px 4px 4px', border: '1px solid #e5e7eb', borderRadius: '24px', backgroundColor: 'white', cursor: 'pointer' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>
                AO
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Amaka O.</span>
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: isMobile ? '0 20px 20px 20px' : '0 32px 32px 32px' }}>
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;


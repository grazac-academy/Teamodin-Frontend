import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Calendar, UserPlus, 
  CheckSquare, BarChart2, PieChart, Settings, 
  Menu, X, Bell, Search, Building2, FileText, UserMinus,
  CreditCard, CheckCircle2, ChevronDown, Shield, User, Briefcase
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = ({ children, title, subtitle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 768);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const roleDropdownRef = useRef(null);
  const { user, currentRole, switchRole } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsTablet(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target)) {
        setIsRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Role-specific navigation items
  const getNavItems = () => {
    if (currentRole === 'employee') {
      return [
        { name: 'My Workspace', path: '/employee/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'My Time Off', path: '/employee/leave', icon: <Calendar size={20} /> },
        { name: 'My Onboarding & Tasks', path: '/employee/tasks', icon: <CheckCircle2 size={20} /> },
        { name: 'My Payslips', path: '/employee/payslips', icon: <CreditCard size={20} /> },
        { name: 'Company Documents', path: '/employee/documents', icon: <FileText size={20} /> },
        { name: 'My Reviews', path: '/employee/reviews', icon: <CheckSquare size={20} /> },
        { name: 'Team Directory', path: '/employee/directory', icon: <Users size={20} /> },
      ];
    }

    if (currentRole === 'manager') {
      return [
        { name: 'Team Dashboard', path: '/manager/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Direct Reports', path: '/manager/team', icon: <Users size={20} /> },
        { name: 'Team Leave Approvals', path: '/manager/leave', icon: <Calendar size={20} /> },
        { name: 'Team Check-ins', path: '/manager/reviews', icon: <CheckSquare size={20} /> },
        { name: 'Team Onboarding', path: '/manager/onboarding', icon: <UserPlus size={20} /> },
        { name: 'Company Directory', path: '/employee/directory', icon: <Building2 size={20} /> },
        { name: 'My Self-Service', path: '/employee/dashboard', icon: <User size={20} /> },
      ];
    }

    // Default: Admin
    return [
      { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
      { name: 'Employee Directory', path: '/admin/employees', icon: <Users size={20} /> },
      { name: 'Departments', path: '/admin/departments', icon: <Building2 size={20} /> },
      { name: 'Leave & Time Off', path: '/admin/leave', icon: <Calendar size={20} /> },
      { name: 'Onboarding', path: '/admin/onboarding', icon: <UserPlus size={20} /> },
      { name: 'Offboarding', path: '/admin/offboarding', icon: <UserMinus size={20} /> },
      { name: 'Company Documents', path: '/admin/documents', icon: <FileText size={20} /> },
      { name: 'Check-ins', path: '/admin/check-ins', icon: <CheckSquare size={20} /> },
      { name: 'Surveys', path: '/admin/surveys', icon: <BarChart2 size={20} /> },
      { name: 'Analytics', path: '/admin/analytics', icon: <PieChart size={20} /> },
      { name: 'Payroll Summary', path: '/admin/payroll', icon: <CreditCard size={20} /> },
    ];
  };

  const navItems = getNavItems();

  const handleRoleSelect = (newRole) => {
    switchRole(newRole);
    setIsRoleDropdownOpen(false);
    if (newRole === 'employee') {
      navigate('/employee/dashboard');
    } else if (newRole === 'manager') {
      navigate('/manager/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  const roleMeta = {
    admin: { label: 'Admin', color: '#534ab7', bg: '#f3f0ff', border: '#e0e7ff', icon: Shield },
    manager: { label: 'Manager', color: '#047857', bg: '#d1fae5', border: '#a7f3d0', icon: Briefcase },
    employee: { label: 'Employee', color: '#b45309', bg: '#fef3c7', border: '#fde68a', icon: User }
  };

  const currentRoleInfo = roleMeta[currentRole] || roleMeta.admin;
  const RoleIcon = currentRoleInfo.icon;

  const isActive = (path) => {
    if (location.pathname === path) return true;
    if (path !== '/admin/dashboard' && path !== '/employee/dashboard' && path !== '/manager/dashboard' && location.pathname.startsWith(path)) return true;
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
            to={currentRole === 'employee' ? '/employee/profile' : '/admin/settings'}
            onClick={() => isMobile && setIsSidebarOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px',
              borderRadius: '8px', textDecoration: 'none',
              backgroundColor: isActive(currentRole === 'employee' ? '/employee/profile' : '/admin/settings') ? '#f3f0ff' : 'transparent',
              color: isActive(currentRole === 'employee' ? '/employee/profile' : '/admin/settings') ? '#534ab7' : '#4b5563',
              fontWeight: isActive(currentRole === 'employee' ? '/employee/profile' : '/admin/settings') ? '600' : '500',
              fontSize: '14px',
            }}
          >
            <Settings size={20} color={isActive(currentRole === 'employee' ? '/employee/profile' : '/admin/settings') ? '#534ab7' : '#9ca3af'} />
            {currentRole === 'employee' ? 'My Profile & Settings' : 'Settings'}
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            
            {/* Role Switcher Pill */}
            <div ref={roleDropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px',
                  background: currentRoleInfo.bg, border: `1px solid ${currentRoleInfo.border}`,
                  borderRadius: '20px', color: currentRoleInfo.color, fontWeight: '600',
                  fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                }}
              >
                <RoleIcon size={14} />
                <span>Role: <strong>{currentRoleInfo.label}</strong></span>
                <ChevronDown size={14} style={{ transform: isRoleDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              <AnimatePresence>
                {isRoleDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    style={{
                      position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '260px',
                      background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                      padding: '8px', zIndex: 60
                    }}
                  >
                    <div style={{ padding: '6px 10px 10px 10px', borderBottom: '1px solid #f3f4f6', marginBottom: '6px' }}>
                      <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Switch Active Workspace Role
                      </p>
                    </div>

                    {[
                      { id: 'admin', label: 'Admin Workspace', desc: 'Full HR ops, hiring, billing & analytics', icon: Shield, color: '#534ab7' },
                      { id: 'manager', label: 'Manager Portal', desc: 'Team approvals, reviews & reports', icon: Briefcase, color: '#047857' },
                      { id: 'employee', label: 'Employee Self-Service', desc: 'My leave, checklist, docs & payslips', icon: User, color: '#b45309' }
                    ].map((r) => {
                      const Icon = r.icon;
                      const isSelected = currentRole === r.id;
                      return (
                        <div
                          key={r.id}
                          onClick={() => handleRoleSelect(r.id)}
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px',
                            borderRadius: '8px', cursor: 'pointer', transition: 'background 0.15s',
                            background: isSelected ? '#f8fafc' : 'transparent',
                            border: isSelected ? '1px solid #e2e8f0' : '1px solid transparent'
                          }}
                          onMouseEnter={(e) => !isSelected && (e.currentTarget.style.background = '#f9fafb')}
                          onMouseLeave={(e) => !isSelected && (e.currentTarget.style.background = 'transparent')}
                        >
                          <div style={{
                            width: '28px', height: '28px', borderRadius: '6px', background: `${r.color}15`,
                            color: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            <Icon size={16} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: '13px', fontWeight: isSelected ? '700' : '600', color: isSelected ? r.color : '#111827' }}>
                                {r.label}
                              </span>
                              {isSelected && <span style={{ fontSize: '10px', fontWeight: '700', color: r.color, background: `${r.color}15`, padding: '1px 6px', borderRadius: '10px' }}>Active</span>}
                            </div>
                            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#6b7280' }}>
                              {r.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 10px 4px 4px', border: '1px solid #e5e7eb', borderRadius: '24px', backgroundColor: 'white', cursor: 'pointer' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>
                {user?.first_name ? user.first_name[0]?.toUpperCase() : (user?.name ? user.name[0]?.toUpperCase() : 'A')}
                {user?.last_name ? user.last_name[0]?.toUpperCase() : (user?.name && user.name.split(' ')[1] ? user.name.split(' ')[1][0]?.toUpperCase() : 'O')}
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151', display: isTablet ? 'none' : 'inline', whiteSpace: 'nowrap' }}>
                {user?.first_name || (user?.name ? user.name.split(' ')[0] : 'Amaka')} {user?.last_name ? user.last_name[0]?.toUpperCase() + '.' : (user?.name && user.name.split(' ')[1] ? user.name.split(' ')[1][0]?.toUpperCase() + '.' : 'O.')}
              </span>
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: isMobile ? '0 16px 24px 16px' : '0 32px 32px 32px', boxSizing: 'border-box', minWidth: 0 }}>
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { Users, Mail, MessageSquare, Plus, FileText, Calendar, X, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const initialTeam = [
  { id: 1, name: 'Sade Afolabi', initials: 'SA', title: 'Senior Product Designer', email: 'sade@acme.com', startDate: '18 May 2026', status: 'Active', rating: '4.8', last1on1: '12 May 2026', notes: 'Discussed design tokens sprint. Sade will lead the Figma workspace reorganization.' },
  { id: 2, name: 'Chidi Nwosu', initials: 'CN', title: 'Full Stack Engineer', email: 'chidi@acme.com', startDate: '12 May 2026', status: 'Active', rating: '4.5', last1on1: '05 May 2026', notes: 'Sprint backlog grooming went well. Moving towards API gateway integration.' },
  { id: 3, name: 'Taiwo Bello', initials: 'TB', title: 'Frontend Engineer', email: 'taiwo@acme.com', startDate: '19 May 2026', status: 'Onboarding', rating: '—', last1on1: 'Yesterday', notes: 'Completed day 1 tools setup. Working on handbook review.' },
  { id: 4, name: 'Kunle Obi', initials: 'KO', title: 'DevOps & Cloud Engineer', email: 'kunle@acme.com', startDate: '10 Jan 2025', status: 'Active', rating: '4.9', last1on1: '28 Apr 2026', notes: 'Terraform modules updated. Zero downtime during CI migration.' },
  { id: 5, name: 'Tolu Fashola', initials: 'TF', title: 'QA Automation Specialist', email: 'tolu@acme.com', startDate: '14 Feb 2025', status: 'Active', rating: '4.6', last1on1: '20 Apr 2026', notes: 'Cypress end-to-end tests now running on pull request branches.' },
];

const ManagerTeamPage = () => {
  const [team, setTeam] = useState(initialTeam);
  const [activeReportForNotes, setActiveReportForNotes] = useState(null);
  const [currentNote, setCurrentNote] = useState('');

  const handleOpenNotes = (report) => {
    setActiveReportForNotes(report);
    setCurrentNote(report.notes);
  };

  const handleSaveNotes = (e) => {
    e.preventDefault();
    setTeam(team.map(m => m.id === activeReportForNotes.id ? { ...m, notes: currentNote } : m));
    toast.success(`1-on-1 notes updated for ${activeReportForNotes.name}`);
    setActiveReportForNotes(null);
  };

  return (
    <AdminLayout title="My Direct Reports" subtitle="Manage your team members, conduct 1-on-1s, and keep track of individual growth.">
      <style>
        {`
          .team-container { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .team-table { width: 100%; min-width: 700px; border-collapse: collapse; text-align: left; }
          .team-table th { padding: 12px 16px; background: #f9fafb; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; border-bottom: 1px solid #f3f4f6; }
          .team-table td { padding: 16px; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; vertical-align: middle; }
          .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; }
          .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
          .modal-box { background: white; border-radius: 16px; width: 100%; max-width: 500px; padding: 28px; }
          .form-textarea { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; box-sizing: border-box; resize: none; }
        `}
      </style>

      <div className="team-container">
        
        {/* Roster Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '600' }}>Engineering Division</span>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
              {team.length} Direct Reports
            </h3>
          </div>

          <button
            onClick={() => toast.success('To add a report, coordinate with HR Admin to invite teammate.')}
            style={{ padding: '8px 16px', background: 'white', color: '#534ab7', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
          >
            + Request New Headcount
          </button>
        </div>

        {/* Team Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-wrapper">
            <table className="team-table">
              <thead>
                <tr>
                  <th>Teammate</th>
                  <th>Role & Title</th>
                  <th>Joined Date</th>
                  <th>Status</th>
                  <th>Perf Rating</th>
                  <th>Last 1-on-1</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {team.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e0e7ff', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700' }}>
                          {member.initials}
                        </div>
                        <div>
                          <span style={{ fontWeight: '700', color: '#111827' }}>{member.name}</span>
                          <span style={{ display: 'block', fontSize: '12px', color: '#6b7280' }}>{member.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{member.title}</td>
                    <td>{member.startDate}</td>
                    <td>
                      <span className="badge" style={{
                        background: member.status === 'Active' ? '#d1fae5' : '#fef3c7',
                        color: member.status === 'Active' ? '#047857' : '#b45309'
                      }}>
                        {member.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: '700', color: '#534ab7' }}>★ {member.rating}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', color: '#4b5563' }}>{member.last1on1}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => handleOpenNotes(member)}
                          style={{ padding: '6px 10px', background: '#f3f0ff', color: '#534ab7', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <FileText size={14} /> 1-on-1 Notes
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 1-on-1 Notes Modal */}
      <AnimatePresence>
        {activeReportForNotes && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>1-on-1 Notes</h3>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Direct Report: {activeReportForNotes.name} ({activeReportForNotes.title})</span>
                </div>
                <button onClick={() => setActiveReportForNotes(null)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveNotes}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    Discussion Points, Blockers & Action Items
                  </label>
                  <textarea
                    rows="6"
                    className="form-textarea"
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Capture discussion points, feedback, career goals, or blockers..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setActiveReportForNotes(null)}
                    style={{ padding: '8px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '8px 20px', background: '#534ab7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Save Notes
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

export default ManagerTeamPage;

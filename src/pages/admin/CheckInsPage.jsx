import React from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

const CheckInsPage = () => {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Check-ins</h1>
            <p className="text-gray-500 mt-1">Manage weekly 1:1s and team updates</p>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm">
            Create Check-in
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Check-ins List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">This Week</h2>
            
            {[
              { name: 'David Bello', role: 'Manager', status: 'Pending your review', time: 'Due tomorrow', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
              { name: 'Kunle Obi', role: 'Direct Report', status: 'Completed', time: 'Submitted yesterday', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
              { name: 'Sade Afolabi', role: 'Direct Report', status: 'Not started', time: 'Due in 3 days', icon: MessageSquare, color: 'text-gray-400', bg: 'bg-gray-50' },
            ].map((checkin, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary-200 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 font-semibold text-lg">
                    {checkin.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{checkin.name}</h3>
                    <p className="text-sm text-gray-500">{checkin.role}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium ${checkin.bg} ${checkin.color}`}>
                    <checkin.icon className="w-3.5 h-3.5" />
                    <span>{checkin.status}</span>
                  </div>
                  <span className="text-xs text-gray-400 mt-2">{checkin.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            <div className="bg-primary-900 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h3 className="text-lg font-semibold relative z-10 mb-2">Weekly Summary</h3>
              <p className="text-primary-100 text-sm relative z-10 mb-6">You have 1 pending check-in to review this week.</p>
              
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                  <span className="text-primary-200">Completion rate</span>
                  <span className="font-semibold">67%</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                  <span className="text-primary-200">Blockers reported</span>
                  <span className="font-semibold">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CheckInsPage;


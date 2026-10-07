import React from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Track workforce metrics, headcount, and engagement</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Headcount', value: '142', change: '+12% YTD', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
            { label: 'Avg Tenure', value: '2.4 yrs', change: '+0.2 yrs', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
            { label: 'Attrition Rate', value: '4.2%', change: '-1.1%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
            { label: 'eNPS Score', value: '48', change: '+5 points', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-100' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
              </div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Placeholder for Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Headcount Growth</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">Chart visualization will be implemented here based on final designs.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Department Breakdown</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">Chart visualization will be implemented here based on final designs.</p>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;


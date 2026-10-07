import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';

const SurveysPage = () => {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Surveys</h1>
          <p className="text-gray-500 mt-1">Gather team feedback and measure engagement</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center"
        >
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <BarChart2 className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Surveys Module Coming Soon</h3>
          <p className="text-sm text-gray-500 mt-2 max-w-md">The specific designs for the surveys page will be implemented here. This is currently a placeholder.</p>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default SurveysPage;


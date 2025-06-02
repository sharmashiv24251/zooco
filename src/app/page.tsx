"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Bell,
  PawPrint,
  Clock,
  Heart,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="h-full text-slate-800 overflow-hidden mb-[72px]">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-screen flex flex-col justify-center"
      >
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.2 }}
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-400"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-amber-300"
          />
        </div>

        <div className="px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-2 tracking-tight">Zooco</h1>
            <p className="text-3xl font-medium text-emerald-600 mb-6">
              Pet care made simple
            </p>
          </motion.div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 text-slate-600"
          >
            Daily reminders for your furry friends
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 text-white px-8 py-4 rounded-full font-medium text-lg flex items-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight size={24} className="rotate-90 text-slate-400" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Never forget a pet task again
        </motion.h2>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Calendar className="text-emerald-600 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Daily Routines</h3>
            </div>
            <p className="text-slate-600 text-lg">
              Create and manage daily care routines for walks, meals, and more.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Bell className="text-amber-600 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Smart Reminders</h3>
            </div>
            <p className="text-slate-600 text-lg">
              Get timely notifications for all your pet care activities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <CheckCircle className="text-purple-600 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Track Progress</h3>
            </div>
            <p className="text-slate-600 text-lg">
              Build streaks and monitor your pet care consistency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-50 to-emerald-50">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-center"
        >
          Your pet's daily schedule
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-center text-slate-600 mb-12"
        >
          Simple, organized, and effective
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl mx-auto max-w-sm overflow-hidden"
        >
          <div className="bg-emerald-500 p-6 text-white">
            <h3 className="text-xl font-medium mb-1">daily reminders</h3>
            <div className="flex items-center gap-2 mb-4">
              <PawPrint size={16} />
              <span className="text-sm opacity-90">your streaks</span>
            </div>

            <div className="bg-emerald-400 rounded-xl p-4">
              <p className="text-sm mb-2">march 2023</p>
              <div className="grid grid-cols-7 gap-2 text-center">
                <div className="text-xs">Mo</div>
                <div className="text-xs">Tu</div>
                <div className="text-xs">We</div>
                <div className="text-xs">Th</div>
                <div className="text-xs">Fr</div>
                <div className="text-xs">Sa</div>
                <div className="text-xs">Su</div>

                <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  26
                </div>
                <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  27
                </div>
                <div className="bg-white/80 text-emerald-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  28
                </div>
                <div className="bg-white/80 text-emerald-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  29
                </div>
                <div className="bg-white/80 text-emerald-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  30
                </div>
                <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  1
                </div>
                <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  2
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">afternoon</span>
              <Clock size={16} className="text-slate-400" />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-slate-200 rounded-xl p-4 mb-3 shadow-sm"
            >
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">Morning Walk</h4>
                <ArrowRight size={16} className="text-slate-400" />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <PawPrint size={12} />
                <span>For Browny</span>
                <Clock size={12} className="ml-2" />
                <span>At 2:00pm</span>
                <Calendar size={12} className="ml-2" />
                <span>Everyday</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">Breakfast</h4>
                <ArrowRight size={16} className="text-slate-400" />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <PawPrint size={12} />
                <span>For Browny</span>
                <Clock size={12} className="ml-2" />
                <span>At 2:00pm</span>
                <Calendar size={12} className="ml-2" />
                <span>Everyday</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-emerald-500 rounded-3xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to care for your pets better?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join thousands of happy pet parents using Zooco
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-emerald-600 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2"
          >
            Get Started <ArrowRight size={20} />
          </motion.button>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-300 flex items-center justify-center text-emerald-700 text-xs">
                JD
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-300 flex items-center justify-center text-emerald-700 text-xs">
                KL
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-300 flex items-center justify-center text-emerald-700 text-xs">
                MN
              </div>
            </div>
            <p className="text-sm">Join 10,000+ pet parents</p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-slate-500">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart size={16} className="text-emerald-500" />
          <p>Made with love for pets</p>
        </div>
        <p className="text-sm">© 2025 Zooco. All rights reserved.</p>
      </footer>

      {/* Floating Action Button */}
    </div>
  );
}

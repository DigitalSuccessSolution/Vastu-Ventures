"use client";

import React, { useState } from "react";
import { CheckCircle2, Save } from "lucide-react";

export default function SettingsPage() {
  const [success, setSuccess] = useState(false);
  const [prefs, setPrefs] = useState({
    courseNotifs: true,
    consultationAlerts: true,
    weeklyDigest: false
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Settings saved:", prefs);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 text-left max-w-2xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy">Account Settings</h2>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          Configure security, system alerts, and notification preferences.
        </p>
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-premium">
        {success && (
          <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl text-xs text-accent font-semibold flex items-center gap-2 animate-fade-in-up">
            <CheckCircle2 className="w-4.5 h-4.5" />
            Account configurations updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="flex flex-col gap-6 text-navy">
          <div>
            <h3 className="font-serif text-base font-bold mb-4">Notification Settings</h3>
            
            <div className="flex flex-col gap-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.courseNotifs}
                  onChange={(e) => setPrefs({ ...prefs, courseNotifs: e.target.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary/40 mt-0.5"
                />
                <div>
                  <span className="text-xs font-semibold">Course Progress Notifications</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-light leading-relaxed">
                    Receive email alerts when completing course sections, scoring exams, or unlocking credentials.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.consultationAlerts}
                  onChange={(e) => setPrefs({ ...prefs, consultationAlerts: e.target.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary/40 mt-0.5"
                />
                <div>
                  <span className="text-xs font-semibold">Session Reminders</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-light leading-relaxed">
                    Receive email reminders 24 hours and 1 hour before scheduled consultation calls.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.weeklyDigest}
                  onChange={(e) => setPrefs({ ...prefs, weeklyDigest: e.target.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary/40 mt-0.5"
                />
                <div>
                  <span className="text-xs font-semibold">Weekly Vedic Insights</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-light leading-relaxed">
                    Receive weekly digest mailers containing Vastu tips, blog highlights, and new courses notifications.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="border-t border-border/60 pt-6">
            <h3 className="font-serif text-base font-bold mb-4">Security Credentials</h3>
            <button
              type="button"
              onClick={() => alert("Change password dialog placeholder...")}
              className="px-4 py-2 border border-border hover:bg-background-alt text-navy-light text-xs font-semibold rounded-lg shadow-premium transition-all"
            >
              Modify Account Password
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gold-gradient text-white text-xs font-semibold rounded-xl shadow-premium hover:shadow-premium-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
          >
            <Save className="w-4 h-4" /> Save Configuration Settings
          </button>
        </form>
      </div>
    </div>
  );
}

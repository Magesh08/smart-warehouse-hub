import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">System configuration</p>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-card">
        <p className="text-sm text-muted-foreground">Settings page — configure warehouse parameters, user roles, and integrations here.</p>
      </motion.div>
    </div>
  );
}

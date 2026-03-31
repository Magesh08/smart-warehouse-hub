import { activityLogs, smartAlerts } from "@/data/monitoring";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Bot, AlertTriangle, Package, LogIn, Wrench, Bell, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const typeIcon: Record<string, React.ReactNode> = {
  move: <ArrowRight className="w-3.5 h-3.5" />,
  pick: <Package className="w-3.5 h-3.5" />,
  inbound: <LogIn className="w-3.5 h-3.5" />,
  robot: <Bot className="w-3.5 h-3.5" />,
  system: <Wrench className="w-3.5 h-3.5" />,
  alert: <AlertTriangle className="w-3.5 h-3.5" />,
};

const typeColor: Record<string, string> = {
  move: 'bg-primary/10 text-primary border-primary/20',
  pick: 'bg-slot-empty/10 text-slot-empty border-slot-empty/20',
  inbound: 'bg-slot-reserved/10 text-slot-reserved border-slot-reserved/20',
  robot: 'bg-primary/10 text-primary border-primary/20',
  system: 'bg-muted text-muted-foreground border-border',
  alert: 'bg-destructive/10 text-destructive border-destructive/20',
};

const severityColor: Record<string, string> = {
  info: 'border-primary/30 bg-primary/5',
  warning: 'border-slot-reserved/30 bg-slot-reserved/5',
  critical: 'border-destructive/30 bg-destructive/5',
};

export default function ActivityTimeline() {
  const [tab, setTab] = useState<'timeline' | 'alerts'>('timeline');

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Activity & Alerts</h1>
          <p className="text-sm text-muted-foreground">Audit trail · Smart notifications</p>
        </div>
        <div className="flex gap-1 bg-secondary/50 rounded-lg p-0.5">
          <Button size="sm" variant={tab === 'timeline' ? 'default' : 'ghost'} onClick={() => setTab('timeline')} className="h-7 text-xs gap-1">
            <Clock className="w-3 h-3" /> Timeline
          </Button>
          <Button size="sm" variant={tab === 'alerts' ? 'default' : 'ghost'} onClick={() => setTab('alerts')} className="h-7 text-xs gap-1 relative">
            <Bell className="w-3 h-3" /> Alerts
            {smartAlerts.filter(a => !a.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] flex items-center justify-center font-bold">
                {smartAlerts.filter(a => !a.read).length}
              </span>
            )}
          </Button>
        </div>
      </div>

      {tab === 'timeline' ? (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border/50" />

          <div className="space-y-1">
            {activityLogs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="relative flex items-start gap-4 pl-10 py-3 rounded-lg hover:bg-secondary/20 transition-colors"
              >
                {/* Dot */}
                <div className={`absolute left-3.5 top-4 w-3 h-3 rounded-full border-2 ${typeColor[log.type]} bg-card`} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${typeColor[log.type]}`}>
                      {typeIcon[log.type]} {log.action}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-xs font-medium text-foreground">{log.target}</p>
                  <p className="text-[11px] text-muted-foreground">{log.details}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5">by {log.user}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {smartAlerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`stat-card border ${severityColor[alert.severity]} ${alert.read ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${alert.severity === 'critical' ? 'bg-destructive/20' : alert.severity === 'warning' ? 'bg-slot-reserved/20' : 'bg-primary/20'}`}>
                    {alert.severity === 'critical' ? <AlertTriangle className="w-4 h-4 text-destructive" /> : alert.severity === 'warning' ? <Bell className="w-4 h-4 text-slot-reserved" /> : <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1 font-mono">{alert.timestamp}</p>
                  </div>
                </div>
                {!alert.read && <span className="w-2 h-2 rounded-full bg-destructive flex-shrink-0 mt-1" />}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

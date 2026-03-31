import { Package, Bot, ShoppingCart, TrendingUp, AlertTriangle, Clock, ArrowUpRight, Activity, Zap, Battery, Wifi, Server, Database, Settings, ShieldCheck } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { robots, orders, inventoryItems } from "@/data/warehouse";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const rackUtilization = [
  { rack: 'A', usage: 75 },
  { rack: 'B', usage: 60 },
  { rack: 'C', usage: 90 },
  { rack: 'D', usage: 45 },
  { rack: 'E', usage: 82 },
  { rack: 'F', usage: 30 },
];

const orderTrend = [
  { hour: '6am', orders: 2 },
  { hour: '8am', orders: 8 },
  { hour: '10am', orders: 15 },
  { hour: '12pm', orders: 12 },
  { hour: '2pm', orders: 18 },
  { hour: '4pm', orders: 9 },
  { hour: '6pm', orders: 5 },
];

const activityLog = [
  { time: '14:32', action: 'AGV-01 picked WDG-001 from A3', type: 'robot' },
  { time: '14:28', action: 'Order ORD-2845 created', type: 'order' },
  { time: '14:15', action: 'Low stock alert: SNS-042 (8 units)', type: 'alert' },
  { time: '14:02', action: 'AMR-02 error: navigation fault', type: 'error' },
  { time: '13:55', action: 'Inbound: 50x BRG-620 to C11', type: 'inbound' },
];

export default function Dashboard() {
  const activeRobots = robots.filter(r => r.status === 'moving').length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalItems = inventoryItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Real-time warehouse overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Items" value={totalItems.toLocaleString()} change="+12%" changeType="positive" icon={Package} />
        <StatCard title="Active Robots" value={`${activeRobots}/${robots.length}`} change="2 moving" changeType="neutral" icon={Bot} />
        <StatCard title="Orders Today" value={orders.length} change={`${pendingOrders} pending`} changeType="neutral" icon={ShoppingCart} />
        <StatCard title="Efficiency" value="94.2%" change="+2.1%" changeType="positive" icon={TrendingUp} iconColor="bg-primary" />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Power Information
          <span className="text-xs font-normal text-muted-foreground ml-auto flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> As of 31 Mar 2026, 3:09 PM
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Voltage" value="1 V" icon={Activity} />
          <StatCard title="Current" value="1 A" icon={Activity} />
          <StatCard title="Power" value="1 kW" icon={Zap} />
          <StatCard title="Energy" value="1 kWh" icon={Battery} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
             <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
               <Bot className="w-5 h-5 mb-2" />
               <span className="text-xs font-medium">Deploy Robot</span>
             </button>
             <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors">
               <AlertTriangle className="w-5 h-5 mb-2" />
               <span className="text-xs font-medium">Emergency Stop</span>
             </button>
             <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-slot-reserved/10 text-slot-reserved hover:bg-slot-reserved hover:text-primary-foreground transition-colors">
               <Package className="w-5 h-5 mb-2" />
               <span className="text-xs font-medium">Restock Request</span>
             </button>
             <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
               <Settings className="w-5 h-5 mb-2" />
               <span className="text-xs font-medium">System Config</span>
             </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">System Health</h3>
          <div className="space-y-4">
             <div className="flex items-center justify-between">
               <span className="text-sm text-muted-foreground flex items-center gap-2"><Wifi className="w-4 h-4 text-primary" /> Wi-Fi Signal</span>
               <span className="text-sm font-semibold text-slot-empty">Excellent (98%)</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-sm text-muted-foreground flex items-center gap-2"><Server className="w-4 h-4 text-primary" /> Backend Latency</span>
               <span className="text-sm font-semibold text-slot-empty">42ms</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-sm text-muted-foreground flex items-center gap-2"><Database className="w-4 h-4 text-primary" /> Database Sync</span>
               <span className="text-sm font-semibold text-slot-inprogress">Syncing...</span>
             </div>
             <div className="flex items-center justify-between pt-2 border-t border-border/50">
               <span className="text-xs text-muted-foreground flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Secure Connection</span>
               <span className="text-xs text-primary cursor-pointer hover:underline">View Logs</span>
             </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Rack Utilization</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={rackUtilization}>
              <XAxis dataKey="rack" tick={{ fill: 'hsl(220,10%,50%)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(220,10%,50%)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(222,22%,9%)', border: '1px solid hsl(222,20%,16%)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
              <Bar dataKey="usage" fill="hsl(190,95%,50%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Orders Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={orderTrend}>
              <defs>
                <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(190,95%,50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(190,95%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" tick={{ fill: 'hsl(220,10%,50%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(222,22%,9%)', border: '1px solid hsl(222,20%,16%)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
              <Area type="monotone" dataKey="orders" stroke="hsl(190,95%,50%)" fill="url(#orderGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Robot Status</h3>
          <div className="space-y-3">
            {robots.map(robot => (
              <div key={robot.id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${robot.status === 'moving' ? 'bg-slot-inprogress animate-pulse' :
                    robot.status === 'idle' ? 'bg-slot-empty' :
                      robot.status === 'charging' ? 'bg-slot-reserved' :
                        'bg-destructive animate-pulse'
                    }`} />
                  <span className="text-sm font-medium text-foreground font-mono">{robot.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground capitalize">{robot.status}</span>
                  <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${robot.battery > 50 ? 'bg-slot-empty' : robot.battery > 20 ? 'bg-slot-reserved' : 'bg-destructive'}`}
                      style={{ width: `${robot.battery}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono w-8">{robot.battery}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Activity Log</h3>
          <div className="space-y-3">
            {activityLog.map((log, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0">
                <span className="text-[11px] text-muted-foreground font-mono w-12 flex-shrink-0 pt-0.5">{log.time}</span>
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${log.type === 'error' ? 'bg-destructive' :
                  log.type === 'alert' ? 'bg-slot-reserved' :
                    log.type === 'robot' ? 'bg-slot-inprogress' :
                      'bg-slot-empty'
                  }`} />
                <p className="text-sm text-foreground/80">{log.action}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

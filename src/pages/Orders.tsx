import { orders, robots } from "@/data/warehouse";
import { motion } from "framer-motion";
import { Bot, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  pending: { icon: Clock, color: 'text-slot-reserved', bg: 'bg-slot-reserved/10' },
  picking: { icon: Loader2, color: 'text-slot-inprogress', bg: 'bg-slot-inprogress/10' },
  completed: { icon: CheckCircle2, color: 'text-slot-empty', bg: 'bg-slot-empty/10' },
};

export default function Orders() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground">{orders.length} orders today</p>
      </div>

      <div className="space-y-3">
        {orders.map((order, i) => {
          const cfg = statusConfig[order.status];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="stat-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cfg.bg}`}>
                    <Icon className={`w-4 h-4 ${cfg.color} ${order.status === 'picking' ? 'animate-spin' : ''}`} />
                  </div>
                  <div>
                    <p className="font-mono font-bold text-foreground text-sm">{order.orderId}</p>
                    <p className="text-xs text-muted-foreground">{order.createdAt}</p>
                  </div>
                </div>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full capitalize ${cfg.bg} ${cfg.color}`}>
                  {order.status}
                </span>
              </div>

              <div className="text-xs text-muted-foreground mb-3">
                {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
              </div>

              {order.status !== 'completed' && (
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${order.progress}%` }} />
                    </div>
                  </div>
                  {order.assignedRobot ? (
                    <span className="text-xs font-mono text-slot-inprogress flex items-center gap-1">
                      <Bot className="w-3 h-3" /> {order.assignedRobot}
                    </span>
                  ) : (
                    <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                      <Bot className="w-3 h-3" /> Assign Robot
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

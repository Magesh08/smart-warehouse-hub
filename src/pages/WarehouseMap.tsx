import { useState } from "react";
import { racks, Slot, robots } from "@/data/warehouse";
import { SlotPanel } from "@/components/warehouse/SlotPanel";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const statusColors: Record<string, string> = {
  empty: 'bg-slot-empty',
  occupied: 'bg-slot-occupied',
  reserved: 'bg-slot-reserved',
  inprogress: 'bg-slot-inprogress',
};

export default function WarehouseMap() {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Warehouse Map</h1>
          <p className="text-sm text-muted-foreground">Interactive digital twin · Real-time view</p>
        </div>
        <div className="flex items-center gap-4">
          {[
            { label: 'Empty', class: 'bg-slot-empty' },
            { label: 'Occupied', class: 'bg-slot-occupied' },
            { label: 'Reserved', class: 'bg-slot-reserved' },
            { label: 'In Progress', class: 'bg-slot-inprogress' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-sm ${l.class}`} />
              <span className="text-xs text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stat-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {racks.map((rack, rackIdx) => (
            <motion.div
              key={rack.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: rackIdx * 0.05 }}
              className="rounded-md border-x-8 border-y-4 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 p-4 shadow-[inset_0_10px_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              {/* Industrial Rack Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-300 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 tracking-wider font-mono drop-shadow">RACK {rack.label}</h3>
                <span className="text-[10px] font-bold text-gray-600 dark:text-gray-500 bg-black/5 dark:bg-black/40 px-2 py-0.5 rounded-sm">
                  {rack.slots.filter(s => s.status === 'empty').length}/{rack.slots.length} free
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 relative z-10">
                {rack.slots.map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    className={`relative flex items-center justify-center h-12 rounded-sm text-[10px] font-bold text-white transition-all duration-300 cursor-pointer 
                    bg-gradient-to-b from-white/40 to-black/10 dark:from-white/20 dark:to-black/40 
                    shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_-4px_8px_rgba(0,0,0,0.2),0_4px_6px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.6),0_4px_6px_rgba(0,0,0,0.5)]
                    border border-black/20 dark:border-black/50 ${statusColors[slot.status]} ${selectedSlot?.id === slot.id ? 'ring-2 ring-primary scale-110 z-20 brightness-110 dark:brightness-125' : 'hover:brightness-110 dark:hover:brightness-125 hover:-translate-y-0.5'}`}
                    title={slot.item ? `${slot.item.name} (${slot.item.sku})` : 'Empty'}
                  >
                    <span className="drop-shadow-md">{slot.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Robots on map */}
        <div className="mt-6 pt-4 border-t border-border/30">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Active Robots</h4>
          <div className="flex flex-wrap gap-3">
            {robots.filter(r => r.status === 'moving').map(robot => (
              <div key={robot.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slot-inprogress/10 border border-slot-inprogress/30">
                <Bot className="w-3.5 h-3.5 text-slot-inprogress animate-robot-move" />
                <span className="text-xs font-mono font-medium text-foreground">{robot.name}</span>
                <span className="text-[10px] text-muted-foreground">→ {robot.position.slot}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SlotPanel slot={selectedSlot} onClose={() => setSelectedSlot(null)} />
    </div>
  );
}

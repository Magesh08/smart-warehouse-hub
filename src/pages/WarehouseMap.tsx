import { useState } from "react";
import { racks, Slot, robots } from "@/data/warehouse";
import { SlotPanel } from "@/components/warehouse/SlotPanel";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const statusColors: Record<string, string> = {
  empty: 'bg-slot-empty hover:bg-slot-empty/80',
  occupied: 'bg-slot-occupied hover:bg-slot-occupied/80',
  reserved: 'bg-slot-reserved hover:bg-slot-reserved/80',
  inprogress: 'bg-slot-inprogress hover:bg-slot-inprogress/80 animate-pulse-glow',
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
              className="rounded-xl border border-border/50 bg-card/50 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-foreground font-mono">RACK {rack.label}</h3>
                <span className="text-[10px] text-muted-foreground">
                  {rack.slots.filter(s => s.status === 'empty').length}/{rack.slots.length} free
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {rack.slots.map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    className={`relative h-10 rounded-md text-[10px] font-bold text-foreground/90 transition-all duration-200 cursor-pointer ${statusColors[slot.status]} ${selectedSlot?.id === slot.id ? 'ring-2 ring-foreground scale-110 z-10' : 'hover:scale-105'}`}
                    title={slot.item ? `${slot.item.name} (${slot.item.sku})` : 'Empty'}
                  >
                    {slot.label}
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

import { inventoryItems } from "@/data/warehouse";
import { motion } from "framer-motion";
import { Plus, Upload, QrCode, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const statusBadge: Record<string, string> = {
  'in-stock': 'bg-slot-empty/10 text-slot-empty',
  'low-stock': 'bg-slot-reserved/10 text-slot-reserved',
  'out-of-stock': 'bg-destructive/10 text-destructive',
};

export default function Inventory() {
  const [filter, setFilter] = useState("");
  const filtered = inventoryItems.filter(i =>
    i.name.toLowerCase().includes(filter.toLowerCase()) ||
    i.sku.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground">{inventoryItems.length} items tracked</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2"><QrCode className="w-4 h-4" /> Scan</Button>
          <Button variant="outline" size="sm" className="gap-2"><Upload className="w-4 h-4" /> CSV Upload</Button>
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground"><Plus className="w-4 h-4" /> Add Item</Button>
        </div>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter by name or SKU..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full h-9 pl-9 pr-4 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                {['SKU', 'Product Name', 'Location', 'Qty', 'Category', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <motion.tr
                  key={item.sku}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/20 hover:bg-secondary/30 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 font-mono text-primary text-xs">{item.sku}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{item.name}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{item.rack}-{item.slot}</td>
                  <td className="px-4 py-3 font-mono">{item.quantity}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{item.category}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusBadge[item.status]}`}>
                      {item.status.replace('-', ' ')}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

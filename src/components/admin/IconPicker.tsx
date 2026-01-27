import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as LucideIcons from "lucide-react";

// Filter out non-component exports if any (though lucide-react exports components)
// We'll pick a subset or try to render dynamically if possible.
// For safety, we'll whitelist common insurance/business icons.

const ICON_NAMES = [
    "Shield", "ShieldCheck", "Home", "User", "Users", "Briefcase", "Building",
    "Car", "Truck", "Bike", "Plane", "Ship", "Anchor", "Heart", "HeartPulse",
    "Stethoscope", "activity", "Flame", "Zap", "Droplets", "Wind", "Umbrella",
    "Key", "Lock", "Unlock", "FileText", "FileSignature", "Phone", "Mail",
    "Globe", "MapPin", "Clock", "Calendar", "DollarSign", "CreditCard",
    "PieChart", "TrendingUp", "Award", "Star", "ThumbsUp", "CheckCircle",
    "AlertTriangle", "Info", "HelpCircle", "Settings", "Tool", "Wrench"
];

interface IconPickerProps {
    value: string;
    onChange: (iconName: string) => void;
}

const IconPicker = ({ value, onChange }: IconPickerProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const SelectedIcon = (LucideIcons as any)[value] || LucideIcons.HelpCircle;

    const filteredIcons = ICON_NAMES.filter(name =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2">
                    <SelectedIcon size={16} />
                    <span className="truncate">{value || "Seleccionar Icono"}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md h-[500px] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Seleccionar Icono</DialogTitle>
                </DialogHeader>
                <Input
                    placeholder="Buscar icono..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-2"
                />
                <ScrollArea className="flex-1">
                    <div className="grid grid-cols-5 gap-2 p-2">
                        {filteredIcons.map(name => {
                            const Icon = (LucideIcons as any)[name];
                            if (!Icon) return null;
                            return (
                                <button
                                    key={name}
                                    className={`p-2 rounded flex flex-col items-center gap-1 hover:bg-slate-100 transition-colors ${value === name ? 'bg-slate-200 ring-2 ring-primary' : ''}`}
                                    onClick={() => { onChange(name); setOpen(false); }}
                                    title={name}
                                >
                                    <Icon size={24} />
                                </button>
                            );
                        })}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default IconPicker;

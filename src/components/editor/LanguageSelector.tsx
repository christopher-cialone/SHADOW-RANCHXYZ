import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-gray-300 font-mono">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-gray-700 border-gray-600">
        <SelectItem value="rust" className="text-gray-300 font-mono">
          Rust (Anchor)
        </SelectItem>
        <SelectItem value="python" className="text-gray-300 font-mono">
          Python (Seahorse)
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

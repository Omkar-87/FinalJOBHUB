import { forwardRef, type InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <label htmlFor={inputId} className={cn('flex items-center gap-2.5 cursor-pointer select-none', className)}>
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
          <input ref={ref} id={inputId} type="checkbox" className="peer sr-only" {...props} />
          <span className="h-4 w-4 rounded-md border border-slate-300 bg-white peer-checked:border-brand-600 peer-checked:bg-brand-600 transition-colors" />
          <Check
            size={12}
            strokeWidth={3}
            className="pointer-events-none absolute text-white opacity-0 peer-checked:opacity-100"
          />
        </span>
        {label && <span className="text-sm text-slate-600">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

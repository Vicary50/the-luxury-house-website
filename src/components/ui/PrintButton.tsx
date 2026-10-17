'use client';

import { PrinterIcon } from '@heroicons/react/24/outline';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-12 items-center gap-2 border-b border-ink pb-1 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-olive hover:text-olive print:hidden"
    >
      <PrinterIcon aria-hidden="true" className="h-4 w-4" />
      Print this page
    </button>
  );
}

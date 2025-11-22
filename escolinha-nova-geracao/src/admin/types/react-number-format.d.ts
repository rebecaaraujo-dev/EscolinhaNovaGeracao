declare module 'react-number-format' {
  import * as React from 'react';

  export interface PatternFormatProps extends React.InputHTMLAttributes<HTMLInputElement> {
    format: string;
    mask?: string;
    value?: string | number;
    onValueChange?: (values: { value: string; formattedValue: string; floatValue?: number }) => void;
  }

  export const PatternFormat: React.FC<PatternFormatProps>;
} 
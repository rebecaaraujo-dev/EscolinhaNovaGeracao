declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }

  export const Pencil: FC<IconProps>;
  export const Trash2: FC<IconProps>;
  export const ClipboardList: FC<IconProps>;
  export const Users: FC<IconProps>;
  export const Database: FC<IconProps>;
  export const Package: FC<IconProps>;
  // Adicione outros ícones conforme necessário
} 
declare module 'react-simple-maps' {
  import type { ReactNode } from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
    };
    style?: React.CSSProperties;
    width?: number;
    height?: number;
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (args: {
      geographies: {
        rsmKey: string;
        geometry: object;
        properties: { name: string; id: string; [key: string]: unknown };
      }[];
    }) => ReactNode;
  }

  export interface GeographyProps {
    geography: object;
    onClick?: (geo: { properties: { name: string; id: string } }) => void;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
  }

  export interface ZoomableGroupProps {
    zoom?: number;
    center?: [number, number];
    children?: ReactNode;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
  export const ZoomableGroup: React.FC<ZoomableGroupProps>;
}
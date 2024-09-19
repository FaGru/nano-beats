export type TPadColor = 'yellow' | 'red' | 'purple' | 'green' | 'blue' | 'orange';

export type TPadConfig = {
  id: string;
  color: TPadColor;
  sample: string;
  keyDown?: string;
};

export enum PreferenceTypeSection {
  SVGO_PLUGINS = 'svgoPlugins',
  USER_INFO = 'userInfo',
}

export type PreferenceInputs = {
  name: string;
  value: number | string | boolean | { [key: string]: never };
  type: 'boolean' | 'string' | 'number';
  description: string;
};

export type PreferenceItemProps = SvgoPlugin & {
  onUpdate: (updatedPreference: PreferenceInputs) => void;
};

export type SvgoPlugin = {
  description: string;
  active: boolean;
  name: string;
};

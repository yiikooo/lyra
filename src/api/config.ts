// const isDevelopment = import.meta.env.DEV;
import { useSettingsStore } from '@/stores/settings.ts';
import { config } from '../../config.ts';

export const apiSettings = {
  get neteaseApiBase() {
    const s = useSettingsStore();
    return s.settings.api.netease;
  },
  realIP: config.realIP,
};

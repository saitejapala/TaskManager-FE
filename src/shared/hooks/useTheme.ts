import { useThemeContext } from '@app/providers/ThemeProvider';

export const useTheme = () => {
  return useThemeContext();
};

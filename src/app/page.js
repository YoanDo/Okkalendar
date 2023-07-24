/* eslint-disable import/no-unresolved */

'use client';

import { ThemeProvider } from 'styled-components';
import Calendar from '@/components/Calendar';
import theme from '@/assets/theme';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Calendar />
      </main>
    </ThemeProvider>
  );
}

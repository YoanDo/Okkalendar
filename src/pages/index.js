import { ThemeProvider } from 'styled-components';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import theme from '../assets/theme';
import 'react-toastify/dist/ReactToastify.css';

// Dynamically import the Calendar component with CSR
const DynamicCalendar = dynamic(() => import('../containers/Calendar'), {
  ssr: false, // Disable SSR for this component
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <DynamicCalendar />
      </main>
      <ToastContainer />
    </ThemeProvider>
  );
}

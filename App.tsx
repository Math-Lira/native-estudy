import { ThemeProvider } from 'styled-components';
import theme from './src/theme'
import { Loading } from './src/components/Loading';

import { Routes } from './src/routes';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { StatusBar } from 'react-native';

export default function App() {
  const [ fontsLoader ] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      { fontsLoader ? <Routes/> : <Loading/> }
    </ThemeProvider>
  );
}
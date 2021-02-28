import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import LoadingScreen from './screens/loading/screen';
import RootDrawer from './routes/rootDrawer';
import { CustomThemeProvider } from "./ThemeContext";

const App = () => {
  const [displayLoading, setDisplayLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const MyTheme = {
    ...DefaultTheme, 
    colors: {
      ...DefaultTheme.colors, 
      background: "#F5ECD5"
    }
  };

  // replace with actual data fetching function
  function getData() {
    console.log("fetching data...");
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
      // }, 0);
    });
  }

  useEffect(() => {
    // consider adding a button in the loading screen component for error manual reloads
    // eg: pass setDisplayLoading in as a prop and set to false when "reload" button clicked
    if (displayLoading) {
      getData().then(() => {
        // setDisplayLoading(true);
        setDisplayLoading(false);
        setLoadingError(false);
      }).catch(() => {
        setLoadingError(true);
      });
    }
  }, []);

  return (
    <CustomThemeProvider>
      <NavigationContainer theme={MyTheme}>
        { (displayLoading) 
          ? <LoadingScreen loadingError={loadingError} />
          : <RootDrawer />
        }
      </NavigationContainer>
    </CustomThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

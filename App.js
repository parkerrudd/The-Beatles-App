import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';

import BeatlesAlbums from './screens/BeatlesAlbums';
import AlbumData from './screens/AlbumData';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Beatles Albums'
            component={BeatlesAlbums}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Album Data'
            component={AlbumData}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

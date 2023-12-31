import { Provider as StoreProvider } from 'react-redux'
import { PaperProvider } from 'react-native-paper'
import { store } from '@store/root'
import { NavigationContainer } from '@react-navigation/native'
import Home from '@screens/Home'
import Preview from '@screens/Preview'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { StatusBar } from 'expo-status-bar'
import { colors } from '@styles/theme'
import Result from '@screens/Result'

const Tab = createMaterialTopTabNavigator()

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <StatusBar hidden />
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
              tabBarItemStyle: { width: 90 },
              tabBarActiveTintColor: colors.purpleDark,
              tabBarInactiveTintColor: colors.black,
              tabBarIndicatorStyle: {
                backgroundColor: colors.purpleDark,
                borderRadius: 10,
              },
              tabBarGap: 5,
            }}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                title: '설문지생성',
              }}
            />
            <Tab.Screen
              name="Preview"
              component={Preview}
              options={{
                title: '미리보기',
              }}
            />
            <Tab.Screen
              name="Result"
              component={Result}
              options={{
                title: '응답보기',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  )
}

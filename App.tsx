import { Provider } from 'react-redux'
import { store } from '@store/root'
import { NavigationContainer } from '@react-navigation/native'
import Home from '@screens/Home'
import Preview from '@screens/Preview'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { StatusBar } from 'expo-status-bar'
import { colors } from '@styles/theme'

const Tab = createMaterialTopTabNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar hidden />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
            tabBarItemStyle: { width: 80 },
            tabBarActiveTintColor: colors.purpleDark,
            tabBarInactiveTintColor: colors.black,
            tabBarIndicatorStyle: {
              backgroundColor: colors.purpleDark,
              borderRadius: 10,
            },
            tabBarGap: 10,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: '질문',
            }}
          />
          <Tab.Screen
            name="Preview"
            component={Preview}
            options={{
              title: '미리보기',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

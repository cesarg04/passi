import { Stack } from 'expo-router'
import React from 'react'

function TabLayout() {
  return (
    <Stack initialRouteName='login' screenOptions={{
        headerShown: false,
        header: () => null, // Hide the header for all screens in this stack
    }} >
        <Stack.Screen name="register" />
        <Stack.Screen name="login" />
    </Stack>
  )
}

export default TabLayout
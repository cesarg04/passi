import { Stack } from 'expo-router'
import React from 'react'

function MainLayout() {
  return (
    <Stack initialRouteName='home' screenOptions={{
        headerShown: false,
        // header: () => null, // Hide the header for all screens in this stack
    }} >
        <Stack.Screen name="home" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="settings" />
    </Stack>
  )
}

export default MainLayout

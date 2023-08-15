import { Text, TextInput } from '@react-native-material/core'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from '@styles/theme'

export default function CardWrapper({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<'read' | 'edit'>('read')

  const handlePress = () => {
    setMode('edit')
  }

  return (
    <>
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handlePress}>
        <View style={styles.topHighlighting} />
        <View style={styles.leftHighlighting} />
        {children}
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '95%',
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  text: {
    color: colors.black,
    height: 150,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  topHighlighting: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 10,
    backgroundColor: colors.purpleDark,
    zIndex: 1,
  },
  leftHighlighting: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 6,
    height: '100%',
    backgroundColor: colors.blue,
  },
})

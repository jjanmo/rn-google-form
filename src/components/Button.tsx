import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

export type ButtonCustomStyles = {
  button?: StyleProp<ViewStyle>
  buttonText?: StyleProp<TextStyle>
}
interface Props {
  buttonText: string
  renderIcon: () => React.ReactNode
  onPress: () => void
  styles?: ButtonCustomStyles
}

export default function Button({ renderIcon, onPress, styles, buttonText }: Props) {
  return (
    <TouchableOpacity
      style={[baseStyles.button, styles?.button]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={[baseStyles.buttonText, styles?.buttonText]}>{buttonText}</Text>
      {renderIcon()}
    </TouchableOpacity>
  )
}

const baseStyles = StyleSheet.create({
  button: {
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginRight: 5,
  },
})

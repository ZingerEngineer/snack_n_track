import { Device } from '@capacitor/device'

export const getDeviceLocale = async () => {
  const locale = await Device.getLanguageCode()
  return locale.value
}

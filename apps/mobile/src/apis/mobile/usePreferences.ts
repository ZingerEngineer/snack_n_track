import { Preferences } from '@capacitor/preferences'

class PreferencesService {
  static async setItem(key: string, value: string): Promise<void> {
    await Preferences.set({
      key: key,
      value: value,
    })
  }

  static async getItem(key: string): Promise<{ value: string | null }> {
    return await Preferences.get({ key: key })
  }

  static async removeItem(key: string): Promise<void> {
    await Preferences.remove({ key: key })
  }
}

export default PreferencesService

import type { HybridObject } from 'react-native-nitro-modules'

export interface Math extends HybridObject<{ ios: 'swift' }> {
  add(a: number, b: number): number
}

import { createClientOnlyFn, createIsomorphicFn } from '@tanstack/react-start'
import * as z from 'zod'

export const themeModeSchema = z.enum(['light', 'dark', 'auto'])
export const resolvedThemeSchema = z.enum(['light', 'dark'])

export type ThemeMode = z.infer<typeof themeModeSchema>
export type ResolvedTheme = z.infer<typeof resolvedThemeSchema>

const THEME_KEY = 'theme'

export const getStoredThemeMode = createIsomorphicFn()
  .server((): ThemeMode => 'auto')
  .client((): ThemeMode => {
    try {
      const storedTheme = localStorage.getItem(THEME_KEY)
      return themeModeSchema.parse(storedTheme)
    } catch {
      return 'auto'
    }
  })

export const setStoredThemeMode = createClientOnlyFn((theme: ThemeMode) => {
  try {
    const parsedTheme = themeModeSchema.parse(theme)
    localStorage.setItem(THEME_KEY, parsedTheme)
  } catch {}
})

export const getSystemTheme = createIsomorphicFn()
  .server((): ResolvedTheme => 'light')
  .client((): ResolvedTheme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

export const updateThemeClass = createClientOnlyFn((themeMode: ThemeMode) => {
  const root = document.documentElement

  // Remove all theme-related classes
  root.classList.remove('light', 'dark', 'auto')

  // Determine the actual theme to apply
  const resolvedTheme =
    themeMode === 'auto'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : themeMode

  // Add the resolved theme class
  root.classList.add(resolvedTheme)

  // If mode is auto, also add the 'auto' class
  if (themeMode === 'auto') {
    root.classList.add('auto')
  }
})

export const setupPreferredListener = createClientOnlyFn(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = () => updateThemeClass('auto')
  mediaQuery.addEventListener('change', handler)
  return () => mediaQuery.removeEventListener('change', handler)
})

export const getNextTheme = createClientOnlyFn(
  (current: ThemeMode): ThemeMode => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    const themes: Array<ThemeMode> =
      systemTheme === 'dark'
        ? ['auto', 'light', 'dark']
        : ['auto', 'dark', 'light']
    return themes[(themes.indexOf(current) + 1) % themes.length]
  },
)

export const themeDetectorScript = (function () {
  function themeFn() {
    try {
      const storedTheme = localStorage.getItem('theme') || 'auto'
      const validTheme = ['light', 'dark', 'auto'].includes(storedTheme)
        ? storedTheme
        : 'auto'

      if (validTheme === 'auto') {
        const autoTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light'
        document.documentElement.classList.add(autoTheme, 'auto')
      } else {
        document.documentElement.classList.add(validTheme)
      }
    } catch (e) {
      const autoTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      document.documentElement.classList.add(autoTheme, 'auto')
    }
  }
  return `(${themeFn.toString()})();`
})()

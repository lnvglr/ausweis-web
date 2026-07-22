/** Base path for the interactive prototype (landing lives at `/`). */
export const DEMO = '/demo' as const

export const routes = {
  home: DEMO,
  identify: `${DEMO}/identify`,
  personalData: `${DEMO}/personal-data`,
  privacy: `${DEMO}/privacy`,
  companion: `${DEMO}/companion`,
  settings: `${DEMO}/settings`,
  changePin: `${DEMO}/settings/change-pin`,
  language: `${DEMO}/settings/language`,
  appearance: `${DEMO}/settings/appearance`,
  readingMode: `${DEMO}/settings/reading-mode`,
  deviceCheck: `${DEMO}/settings/device-check`,
  deviceName: `${DEMO}/settings/device-name`,
  pairings: `${DEMO}/settings/pairings`,
  help: `${DEMO}/settings/help`,
  helpGeneral: `${DEMO}/settings/help/general`,
  helpData: `${DEMO}/settings/help/data`,
  helpInformation: `${DEMO}/settings/help/information`,
  helpLicense: `${DEMO}/settings/help/license`,
  helpReleaseNotes: `${DEMO}/settings/help/release-notes`,
} as const

/** Strip `/demo` prefix for shell chrome decisions. */
export function demoRelativePath(pathname: string): string {
  if (pathname === DEMO || pathname === `${DEMO}/`) return '/'
  if (pathname.startsWith(`${DEMO}/`)) return pathname.slice(DEMO.length)
  return pathname
}

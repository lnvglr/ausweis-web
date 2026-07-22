import type { TranslationKey } from '@/i18n/translations'

export type AuthRequestKind = 'weinkeller-mobile' | 'elster-desktop'

export type AuthRequestSource = 'phone' | 'computer'

export type AuthRequestDefinition = {
  kind: AuthRequestKind
  source: AuthRequestSource
  providerName: TranslationKey
  purpose: TranslationKey
  homeTitle: TranslationKey
  homeDesc: TranslationKey
  sourceLabel: TranslationKey
  data: TranslationKey[]
}

/**
 * Demo relying-party profiles.
 * - Weinkeller: phone browser checkout asking name + 18+ attribute
 * - ELSTER: desktop tax portal asking for fuller identity
 */
export const AUTH_REQUESTS: Record<AuthRequestKind, AuthRequestDefinition> = {
  'weinkeller-mobile': {
    kind: 'weinkeller-mobile',
    source: 'phone',
    providerName: 'reqWineProvider',
    purpose: 'reqWinePurpose',
    homeTitle: 'reqWineHomeTitle',
    homeDesc: 'reqWineHomeDesc',
    sourceLabel: 'reqSourcePhone',
    data: [
      'identifyDataGivenNames',
      'identifyDataFamilyNames',
      'identifyDataAgeOver18',
    ],
  },
  'elster-desktop': {
    kind: 'elster-desktop',
    source: 'computer',
    providerName: 'reqElsterProvider',
    purpose: 'reqElsterPurpose',
    homeTitle: 'reqElsterHomeTitle',
    homeDesc: 'reqElsterHomeDesc',
    sourceLabel: 'reqSourceComputer',
    data: [
      'identifyDataGivenNames',
      'identifyDataFamilyNames',
      'identifyDataBirthDate',
      'identifyDataAddress',
      'identifyDataNationality',
      'identifyDataDocumentType',
    ],
  },
}

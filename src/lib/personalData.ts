import type { TranslationKey } from '@/i18n/translations'

/** Fields available when the user reads their own ID in-app. */
export const PERSONAL_DATA_FIELDS: TranslationKey[] = [
  'identifyDataGivenNames',
  'identifyDataFamilyNames',
  'identifyDataBirthDate',
  'identifyDataBirthPlace',
  'identifyDataAddress',
  'identifyDataNationality',
  'identifyDataDocumentType',
  'identifyDataAgeOver18',
  'personalDataDocumentNumber',
  'personalDataValidUntil',
]

/** Plausible German demo ID values shown after a successful self-scan. */
export const PERSONAL_DATA_DEMO_VALUES: Partial<
  Record<(typeof PERSONAL_DATA_FIELDS)[number], string>
> = {
  identifyDataGivenNames: 'Erika',
  identifyDataFamilyNames: 'Mustermann',
  identifyDataBirthDate: '12.08.1964',
  identifyDataBirthPlace: 'Berlin',
  identifyDataAddress: 'Heidestraße 17, 51147 Köln',
  identifyDataNationality: 'DEU',
  identifyDataDocumentType: 'ID',
  personalDataDocumentNumber: 'T22000129',
  personalDataValidUntil: '01.01.2030',
}

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/ios/AppShell'
import { PairingsProvider } from '@/context/PairingsContext'
import { SettingsProvider } from '@/context/SettingsContext'
import { I18nProvider } from '@/i18n/I18nContext'
import { CompanionPage } from '@/pages/CompanionPage'
import { HomePage } from '@/pages/HomePage'
import { IdentifyPage } from '@/pages/IdentifyPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { AppearanceSettingsPage } from '@/pages/settings/AppearanceSettingsPage'
import { ChangePinSettingsPage } from '@/pages/settings/ChangePinSettingsPage'
import { DeviceCheckSettingsPage } from '@/pages/settings/DeviceCheckSettingsPage'
import { DeviceNameSettingsPage } from '@/pages/settings/DeviceNameSettingsPage'
import { HelpSettingsPage } from '@/pages/settings/HelpSettingsPage'
import { HelpGeneralPage } from '@/pages/settings/HelpGeneralPage'
import { HelpDataPage } from '@/pages/settings/HelpDataPage'
import { HelpInformationPage } from '@/pages/settings/HelpInformationPage'
import { HelpLicensePage } from '@/pages/settings/HelpLicensePage'
import { HelpReleaseNotesPage } from '@/pages/settings/HelpReleaseNotesPage'
import { LanguageSettingsPage } from '@/pages/settings/LanguageSettingsPage'
import { PairingsSettingsPage } from '@/pages/settings/PairingsSettingsPage'
import { ReadingModeSettingsPage } from '@/pages/settings/ReadingModeSettingsPage'

export default function App() {
  return (
    <I18nProvider>
      <SettingsProvider>
        <PairingsProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppShell />}>
                <Route index element={<HomePage />} />
                <Route path="identify" element={<IdentifyPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="companion" element={<CompanionPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route
                  path="settings/change-pin"
                  element={<ChangePinSettingsPage />}
                />
                <Route
                  path="settings/language"
                  element={<LanguageSettingsPage />}
                />
                <Route
                  path="settings/appearance"
                  element={<AppearanceSettingsPage />}
                />
                <Route
                  path="settings/reading-mode"
                  element={<ReadingModeSettingsPage />}
                />
                <Route
                  path="settings/device-check"
                  element={<DeviceCheckSettingsPage />}
                />
                <Route
                  path="settings/device-name"
                  element={<DeviceNameSettingsPage />}
                />
                <Route
                  path="settings/pairings"
                  element={<PairingsSettingsPage />}
                />
                <Route path="settings/help" element={<HelpSettingsPage />} />
                <Route
                  path="settings/help/general"
                  element={<HelpGeneralPage />}
                />
                <Route path="settings/help/data" element={<HelpDataPage />} />
                <Route
                  path="settings/help/information"
                  element={<HelpInformationPage />}
                />
                <Route
                  path="settings/help/license"
                  element={<HelpLicensePage />}
                />
                <Route
                  path="settings/help/release-notes"
                  element={<HelpReleaseNotesPage />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PairingsProvider>
      </SettingsProvider>
    </I18nProvider>
  )
}

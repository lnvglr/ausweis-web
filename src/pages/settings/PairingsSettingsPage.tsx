import { useNavigate } from 'react-router-dom'
import { GroupedList, ListRow } from '@/components/ios/GroupedList'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { usePairings } from '@/context/PairingsContext'
import { useI18n } from '@/i18n/I18nContext'
import { routes } from '@/lib/routes'

export function PairingsSettingsPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { devices, removeDevice } = usePairings()

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('settingsManagePairings')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(-1)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto py-8">
        {devices.length > 0 ? (
          <GroupedList
            header={t('settingsPairedDevices')}
            footer={t('settingsManagePairingsFooter')}
          >
            {devices.map((p) => (
              <ListRow
                key={p.id}
                title={p.name}
                subtitle={p.platform}
                trailing={
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeDevice(p.id)
                    }}
                    className="rounded-full px-2 py-1 text-[15px] font-normal text-ios-red active:opacity-60"
                  >
                    {t('settingsRemovePairing')}
                  </button>
                }
              />
            ))}
          </GroupedList>
        ) : (
          <GroupedList footer={t('settingsManagePairingsFooter')}>
            <p className="px-4 py-3.5 text-[15px] leading-[20px] text-ios-secondary-label">
              {t('settingsNoPairings')}
            </p>
          </GroupedList>
        )}

        <GroupedList className="mt-8">
          <ListRow
            title={t('settingsAddPairing')}
            chevron
            onClick={() =>
              navigate(routes.companion, {
                state: {
                  mode: 'pair',
                  returnTo: routes.pairings,
                },
              })
            }
          />
        </GroupedList>
      </div>
    </div>
  )
}

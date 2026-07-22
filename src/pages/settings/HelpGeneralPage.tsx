import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GroupedList, ListRow } from '@/components/ios/GroupedList'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { SFChevronDown } from '@/components/ios/SF'
import { useI18n } from '@/i18n/I18nContext'
import { cn } from '@/lib/cn'

const faqs = [
  ['helpHowIdentify', 'helpHowIdentifyA'],
  ['helpHowCompanion', 'helpHowCompanionA'],
  ['helpNfc', 'helpNfcA'],
  ['helpDemo', 'helpDemoA'],
] as const

const EXTERNAL = {
  faq: 'https://www.ausweisapp.bund.de/online-ausweisen/haeufige-fragen',
  contact: 'https://www.ausweisapp.bund.de/hilfe-und-support',
  providers: 'https://www.ausweisapp.bund.de/online-ausweisen/anbieter',
}

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function HelpGeneralPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0][0])
  const [setupDone, setSetupDone] = useState(false)

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('helpSectionGeneral')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(-1)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto pb-8 pt-4">
        <GroupedList header={t('helpSetup')} footer={t('helpSetupFooter')}>
          <ListRow
            title={t('helpSetup')}
            detail={setupDone ? t('helpSetupDone') : undefined}
            trailing={
              <button
                type="button"
                onClick={() => setSetupDone(true)}
                className="rounded-full bg-ios-primary px-3.5 py-1.5 text-[15px] font-medium text-white active:bg-ios-primary-pressed"
              >
                {setupDone ? t('commonOk') : t('helpSetupCta')}
              </button>
            }
          />
        </GroupedList>

        <GroupedList header={t('helpFaq')} className="mt-8">
          {faqs.map(([q, a]) => {
            const isOpen = openFaq === q
            return (
              <div key={q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-4 py-[11px] text-left active:bg-ios-fill/50"
                  onClick={() => setOpenFaq(isOpen ? null : q)}
                >
                  <span className="text-[17px] leading-[22px] tracking-[-0.2px] text-ios-label">
                    {t(q)}
                  </span>
                  <SFChevronDown
                    size={12}
                    className={cn(
                      'shrink-0 text-ios-gray3 transition-transform',
                      isOpen && 'rotate-180',
                    )}
                    aria-hidden
                  />
                </button>
                {isOpen ? (
                  <p className="border-t border-ios-separator px-4 py-3 text-[15px] leading-[20px] tracking-[-0.24px] text-ios-secondary-label">
                    {t(a)}
                  </p>
                ) : null}
              </div>
            )
          })}
          <ListRow
            title={t('helpFaqWebsite')}
            onClick={() => openExternal(EXTERNAL.faq)}
            trailing={<ExternalChip label={t('helpOpenWebsite')} />}
          />
        </GroupedList>

        <GroupedList header={t('helpContact')} className="mt-8">
          <p className="px-4 py-3.5 text-[15px] leading-[20px] tracking-[-0.24px] text-ios-secondary-label">
            {t('helpContactBody')}
          </p>
          <ListRow
            title={t('helpContact')}
            onClick={() => openExternal(EXTERNAL.contact)}
            trailing={<ExternalChip label={t('helpOpenWebsite')} />}
          />
        </GroupedList>

        <GroupedList header={t('helpProviders')} className="mt-8">
          <ListRow
            title={t('helpProviders')}
            subtitle={t('helpProvidersBody')}
            align="top"
            onClick={() => openExternal(EXTERNAL.providers)}
            trailing={<ExternalChip label={t('helpOpenWebsite')} />}
          />
        </GroupedList>
      </div>
    </div>
  )
}

function ExternalChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-ios-primary px-3 py-1.5 text-[13px] font-medium text-white">
      {label}
    </span>
  )
}

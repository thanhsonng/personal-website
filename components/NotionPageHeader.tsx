import * as React from 'react'
import { AnimatePresence, motion } from "framer-motion";

import * as types from 'notion-types'
import { RiSunFoggyLine as SunIcon } from '@react-icons/all-files/ri/RiSunFoggyLine'
import { RiMoonClearLine as MoonIcon } from '@react-icons/all-files/ri/RiMoonClearLine'
import cs from 'classnames'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'
import soundManager from '@/lib/sound'

import styles from './styles.module.css'

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const switchOnAudioRef = React.useRef<HTMLAudioElement | null>(null)
  const switchOffAudioRef = React.useRef<HTMLAudioElement | null>(null)

  React.useEffect(() => {
    setHasMounted(true)
    // Sound logic has to be put inside an effect hook
    // because it cannot run on the server
    switchOnAudioRef.current = soundManager.createSound('/sounds/switch-on.mp3');
    switchOffAudioRef.current = soundManager.createSound('/sounds/switch-off.mp3');
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
    if (isDarkMode) {
      soundManager.play(switchOnAudioRef.current);
    } else {
      soundManager.play(switchOffAudioRef.current);
    }
  }, [toggleDarkMode, isDarkMode]);

  return (
    <button
      className={cs('breadcrumb', styles.iconButton, !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && (
        <AnimatePresence mode='wait'>
          {isDarkMode ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="dark-theme"
              className={styles.iconContainer}
            >
              <MoonIcon />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="light-theme"
              className={styles.iconContainer}
            >
              <SunIcon />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </button>
  )
}

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { components, mapPageUrl } = useNotionContext()

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <Breadcrumbs block={block} rootOnly={true} />

        <div className='notion-nav-header-rhs breadcrumbs'>
          {navigationLinks
            ?.map((link, index) => {
              if (!link.pageId && !link.url) {
                return null
              }

              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              } else {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.Link>
                )
              }
            })
            .filter(Boolean)}

          <ToggleThemeButton />

          {isSearchEnabled && <Search block={block} title={null} />}
        </div>
      </div>
    </header>
  )
}

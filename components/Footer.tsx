import * as React from 'react'
import {
  Sun as SunIcon,
  Moon as MoonIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  Linkedin as LinkedInIcon,
  Youtube as YouTubeIcon,
} from 'react-feather';
import { AnimatePresence, motion } from "framer-motion";

import soundManager from '@/lib/sound'
import * as config from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

// TODO: merge the data and icons from PageSocial with the social links in Footer

export const FooterImpl: React.FC = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const switchOnAudioRef = React.useRef<HTMLAudioElement | null>(null)
  const switchOffAudioRef = React.useRef<HTMLAudioElement | null>(null)

  const onToggleTheme = React.useCallback(
    (e) => {
      e.preventDefault()
      toggleDarkMode()
      if (isDarkMode) {
        soundManager.play(switchOnAudioRef.current);
      } else {
        soundManager.play(switchOffAudioRef.current);
      }
    },
    [toggleDarkMode, isDarkMode]
  )

  React.useEffect(() => {
    setHasMounted(true)
    // Sound logic has to be put inside an effect hook
    // because it cannot run on the server
    switchOnAudioRef.current = soundManager.createSound('/sounds/switch-on.mp3');
    switchOffAudioRef.current = soundManager.createSound('/sounds/switch-off.mp3');
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>{`${new Date().getFullYear()} • ${config.author}`}</div>

      <div className={styles.settings}>
        {hasMounted && (
          <button
            className="w-10 h-10 flex justify-center items-center transition-colors rounded hover:bg-bg0"
            onClick={onToggleTheme}
          >
            <AnimatePresence mode='wait'>
              {isDarkMode ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key="dark-theme"
                  className={styles.iconContainer}
                >
                  <MoonIcon size={16} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key="light-theme"
                  className={styles.iconContainer}
                >
                  <SunIcon size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>

      <div className={styles.social}>
        {config.twitter && (
          <a
            className="w-10 h-10 flex justify-center items-center transition-colors rounded hover:bg-bg0"
            href={`https://twitter.com/${config.twitter}`}
            title={`Twitter @${config.twitter}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <TwitterIcon size={16} />
          </a>
        )}

        {config.github && (
          <a
            className="w-10 h-10 flex justify-center items-center transition-colors rounded hover:bg-bg0"
            href={`https://github.com/${config.github}`}
            title={`GitHub @${config.github}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <GitHubIcon size={16} />
          </a>
        )}

        {config.linkedin && (
          <a
            className="w-10 h-10 flex justify-center items-center transition-colors rounded hover:bg-bg0"
            href={`https://www.linkedin.com/in/${config.linkedin}`}
            title={`LinkedIn ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkedInIcon size={16} />
          </a>
        )}

        {config.youtube && (
          <a
            className="w-10 h-10 flex justify-center items-center transition-colors rounded hover:bg-bg0"
            href={`https://www.youtube.com/${config.youtube}`}
            title={`YouTube ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <YouTubeIcon size={16} />
          </a>
        )}
      </div>
    </footer>
  )
}

export const Footer = React.memo(FooterImpl)

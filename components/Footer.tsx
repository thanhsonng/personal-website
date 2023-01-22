import * as React from 'react'
import { RiTwitterLine as TwitterIcon } from '@react-icons/all-files/ri/RiTwitterLine'
import { RiGithubLine as GithubIcon } from '@react-icons/all-files/ri/RiGithubLine'
import { RiLinkedinLine as LinkedInIcon } from '@react-icons/all-files/ri/RiLinkedinLine'
import { RiYoutubeLine as YouTubeIcon } from '@react-icons/all-files/ri/RiYoutubeLine'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'

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

  const onToggleDarkMode = React.useCallback(
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
          <a
            className={isDarkMode ? styles.toggleLightMode : styles.toggleDarkMode}
            href='#'
            role='button'
            onClick={onToggleDarkMode}
            title='Toggle dark mode'
          >
            {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
          </a>
        )}
      </div>

      <div className={styles.social}>
        {config.twitter && (
          <a
            className={styles.twitter}
            href={`https://twitter.com/${config.twitter}`}
            title={`Twitter @${config.twitter}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <TwitterIcon />
          </a>
        )}

        {config.github && (
          <a
            className={isDarkMode ? styles.githubDarkMode : styles.github}
            href={`https://github.com/${config.github}`}
            title={`GitHub @${config.github}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <GithubIcon />
          </a>
        )}

        {config.linkedin && (
          <a
            className={styles.linkedin}
            href={`https://www.linkedin.com/in/${config.linkedin}`}
            title={`LinkedIn ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkedInIcon />
          </a>
        )}

        {config.youtube && (
          <a
            className={styles.youtube}
            href={`https://www.youtube.com/${config.youtube}`}
            title={`YouTube ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <YouTubeIcon />
          </a>
        )}
      </div>
    </footer>
  )
}

export const Footer = React.memo(FooterImpl)

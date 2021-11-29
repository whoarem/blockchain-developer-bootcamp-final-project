import { Dispatch, SetStateAction } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

type DarkButtonProps = {
  isDarkMode: boolean
  setDarkMode: Dispatch<SetStateAction<boolean>>
}

function DarkModeButton({ isDarkMode, setDarkMode }: DarkButtonProps) {
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked)
  }

  return (
    <DarkModeSwitch
      style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 9999 }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={30}
    />
  )
}

export default DarkModeButton

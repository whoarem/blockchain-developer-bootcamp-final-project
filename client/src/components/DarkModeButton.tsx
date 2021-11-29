import { Dispatch, SetStateAction } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

type DarkButtonProps = {
  isDarkmode: boolean
  setDarkmode: Dispatch<SetStateAction<boolean>>
}

function DarkmodeButton({ isDarkmode, setDarkmode }: DarkButtonProps) {
  const toggleDarkmode = (checked: boolean) => {
    setDarkmode(checked)
  }

  return (
    <DarkModeSwitch
      style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 9999 }}
      checked={isDarkmode}
      onChange={toggleDarkmode}
      size={30}
    />
  )
}

export default DarkmodeButton

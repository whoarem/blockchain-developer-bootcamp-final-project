import { Button } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'

type ToolButtonProps = {
  isDarkMode: boolean
}

export const DrawLine = ({ isDarkMode }: ToolButtonProps) => {
  return (
    <div
      style={{
        fontSize: 50,
        zIndex: 8000,
        position: 'absolute',
        bottom: 30,
        left: 50,
      }}
    >
      <Button variant="contained" color={isDarkMode ? 'inherit' : 'primary'}>
        <CreateIcon />
      </Button>
    </div>
  )
}

export const useDrawLine = () => {}

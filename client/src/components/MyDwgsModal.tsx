import * as React from 'react'
import { Box, Modal, List } from '@material-ui/core'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#d3d3d3',
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
}

export default function MyDwgsModal(props: any) {
  const [open, setOpen] = React.useState(false)
  const { isModalOn, setIsModalOn } = props.modalState
  const handleOpen = () => {
    setOpen(true)
    setIsModalOn(true)
  }
  const handleClose = () => {
    setOpen(false)
    setIsModalOn(false)
  }

  React.useEffect(() => {
    if (!isModalOn) {
      handleClose()
    }
  }, [isModalOn])

  return (
    <div>
      <div onClick={handleOpen}>{props.children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List>{props.myDrawingsList}</List>
        </Box>
      </Modal>
    </div>
  )
}

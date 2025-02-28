import { Dialog ,DialogTitle, DialogActions , DialogContent ,DialogContentText,Button} from '@mui/material'
import React from 'react'

const ConfirmDeleteDailog = ({open , handleClose , deleteHandler}) => {
    return (
        <Dialog open={open}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this chat?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No
                </Button>
                <Button onClick={deleteHandler} color="error">
                    Yes
                </Button>
            </DialogActions>
      </Dialog>
  )
}

export default ConfirmDeleteDailog
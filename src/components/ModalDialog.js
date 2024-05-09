import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import moment from "moment";

import classes from "./ModalDialog.module.css";

class ModalDialog extends Component {
  handleOpenLink = () => {
    if (this.props.selectedRowData && this.props.selectedRowData.url) {
      window.open(this.props.selectedRowData.url, "_blank");
    }
  };

  render() {
    const { open, onClose, selectedRowData } = this.props;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Selected Row Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedRowData?.title && (
              <>
                <strong>Title:</strong> {selectedRowData?.title}
                <br />
              </>
            )}
            {selectedRowData?.url && (
              <>
                <strong>URL:</strong>{" "}
                <span
                  className={classes.styledUrl}
                  onClick={this.handleOpenLink}
                >
                  {selectedRowData.url}
                </span>
                <br />
              </>
            )}
            {selectedRowData?.created_at && (
              <>
                <strong>Created_at:</strong>{" "}
                {moment(selectedRowData?.created_at).format(
                  "DD-MM-YYYY hh:mm:ss a"
                )}
                <br />
              </>
            )}
            {selectedRowData?.author && (
              <>
                <strong>Author:</strong> {selectedRowData?.author}
                <br />
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ModalDialog;

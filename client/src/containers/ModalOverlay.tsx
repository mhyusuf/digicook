import React, { FunctionComponent } from 'react';

interface ModalOverlayProps {
  show: boolean;
}

const ModalOverlay: FunctionComponent<ModalOverlayProps> = (props) => {
  const { show, children } = props;
  return show ? (
    <div className="Modal">
      <div className="Modal__overlay">{children}</div>
    </div>
  ) : null;
}

export default ModalOverlay;

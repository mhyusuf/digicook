import React from 'react';

function ModalOverlay({ show, children }) {
  return show ? (
    <div className="Modal">
      <div className="Modal__overlay">{children}</div>
    </div>
  ) : null;
}

export default ModalOverlay;

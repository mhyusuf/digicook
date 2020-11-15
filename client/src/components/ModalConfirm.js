import React from 'react';

function ModalConfirm({ headerText, children, onCancel, onConfirm }) {
  return (
    <div className="ui modal" style={{ display: 'block' }}>
      <div className="header">{headerText}</div>
      <div className="content">{children}</div>
      <div className="actions">
        <button className="ui button" onClick={onCancel}>
          Cancel
        </button>
        <button className="ui primary button" onClick={onConfirm}>
          OK
        </button>
      </div>
    </div>
  );
}

export default ModalConfirm;

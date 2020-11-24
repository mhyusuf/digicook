import React, { FunctionComponent } from 'react';

interface ModalConfirmProps {
  headerText: string;
  children: JSX.Element | JSX.Element[];
  onCancel: () => void;
  onConfirm: () => void;
}

const ModalConfirm: FunctionComponent<ModalConfirmProps> = (props) => {
  const { headerText, children, onCancel, onConfirm } = props;
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

import { History } from 'history';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ActionCreator } from 'redux';

interface ModalConfirmProps extends RouteComponentProps {
  headerText: string;
  children: JSX.Element | JSX.Element[];
  onCancel: () => void;
  onConfirm: () => ActionCreator<any>;
  history: History<any>;
  location: any;
  match: any;
}

function ModalConfirm({ headerText, children, onCancel, onConfirm }: any) {
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

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface ModalOverlayProps extends RouteComponentProps {
  show: boolean;
  children: JSX.Element | JSX.Element[];
  location: any;
  match: any;
}

function ModalOverlay({ show, children }: any) {
  return show ? (
    <div className="Modal">
      <div className="Modal__overlay">{children}</div>
    </div>
  ) : null;
}

export default ModalOverlay;

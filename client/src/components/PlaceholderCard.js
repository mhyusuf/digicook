import React from 'react';

function PlaceholderCard() {
  return (
    <div className="ui card PlaceholderCard">
      <div className="image">
        <div className="ui placeholder">
          <div className="square image"></div>
        </div>
        <div className="content PlaceholderCard__content">
          <div className=" ui placeholder">
            <div className="header">
              <div className="medium line"></div>
              <div className="short line"></div>
            </div>
            <div className="paragraph">
              <div className="very long line"></div>
              <div className="long line"></div>
            </div>
          </div>
        </div>
        <div className="ui bottom attached menu">
          <div className="item" style={{ width: '40%' }}>
            <button className="ui disabled button" style={{ width: '100%' }}>
              <i className="add icon"></i>
            </button>
          </div>
          <div className="item" style={{ width: '30%' }}>
            <button className="ui disabled button" style={{ width: '100%' }}>
              <i className="pencil alternate icon"></i>
            </button>
          </div>
          <div className="item" style={{ width: '30%' }}>
            <button className="ui disabled button" style={{ width: '100%' }}>
              <i className="trash alternate icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceholderCard;

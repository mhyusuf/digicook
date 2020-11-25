import React, { FunctionComponent } from 'react';

interface StatusRadioProps {
  value: boolean;
  onStatusChange: (status: boolean) => void;
}

const StatusRadio: FunctionComponent<StatusRadioProps> = (props) => {
  const { value, onStatusChange } = props;
  return (
    <div className="inline fields">
      <label>Collection status:</label>
      <div className="field">
        <div className="ui radio checkbox">
          <input
            type="radio"
            checked={!value}
            onChange={() => onStatusChange(false)}
          />
          <label>Public</label>
        </div>
      </div>
      <div className="field">
        <div className="ui radio checkbox">
          <input
            type="radio"
            checked={value}
            onChange={() => onStatusChange(true)}
          />
          <label>Private</label>
        </div>
      </div>
    </div>
  );
};

export default StatusRadio;

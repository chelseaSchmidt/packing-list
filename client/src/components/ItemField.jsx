import React from 'react';

const ItemField = ({
  label,
  id,
  value,
  setter,
}) => {
  return (
    <label htmlFor={id}>
      {`${label}:`}
      <input
        type="text"
        value={value}
        id={id}
        onChange={(e) => setter(e.target.value)}
      />
    </label>
  );
};

export default ItemField;

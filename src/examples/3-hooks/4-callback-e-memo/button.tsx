import React, { FunctionComponent } from "react";

export const Button: FunctionComponent<{
  onClick: () => void | Promise<void>;
  disabled?: boolean;
}> = ({ onClick, disabled = false, children }) => (
  <button type="button" onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

import React, { KeyboardEvent } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, value, onChange, onKeyDown }, ref) => {
    return (
      <div style={{ margin: 10, marginBottom: 20 }}>
        <label style={{ display: "block" }} htmlFor={label}>
          {label}:
        </label>
        <input
          style={{ display: "block" }}
          aria-label={label}
          type="text"
          placeholder={`type a ${label}`}
          ref={ref}
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  }
);

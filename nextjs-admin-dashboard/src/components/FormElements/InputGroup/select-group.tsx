import React from "react";
import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectGroupProps = {
  className?: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  height?: "sm" | "default";
  required?: boolean;
  disabled?: boolean;
  value?: string;
  name?: string;
  handleChange?: React.ChangeEventHandler<HTMLSelectElement>;
} & Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "className" | "name" | "value" | "onChange"
>;

const SelectGroup: React.FC<SelectGroupProps> = ({
  className,
  label,
  placeholder,
  options,
  icon,
  iconPosition = "left",
  height = "default",
  required,
  disabled,
  value,
  name,
  handleChange,
  ...props
}) => {
  const id = React.useId();

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
        {required && (
          <span className="ml-1 select-none text-red">*</span>
        )}
      </label>

      <div
        className={cn(
          "relative mt-3",
          icon &&
            "[&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2",
          icon &&
            (iconPosition === "left"
              ? "[&_svg]:left-4.5"
              : "[&_svg]:right-4.5"),
          disabled && "cursor-not-allowed",
        )}
      >
        <select
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          className={cn(
            "w-full appearance-none rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:disabled:bg-dark",
            height === "sm" && "py-2.5",
            icon && iconPosition === "left" && "pl-12.5",
            icon && iconPosition === "right" && "pr-12.5",
            // space for custom arrow
            "pr-10",
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {icon}

        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
        >
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L8 8.5L15 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectGroup;
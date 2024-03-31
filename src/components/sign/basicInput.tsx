import React, { ChangeEvent, FocusEvent } from 'react';

interface BasicInputProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    errorMessage?: string;
    validMessage?: string;
    value: string;
    onBlur: (event: FocusEvent<HTMLInputElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const BasicInput: React.FC<BasicInputProps> = ({
    id,
    label,
    type,
    placeholder,
    errorMessage = '',
    validMessage = '',
    value,
    onBlur,
    onChange,
}) => {
    const messageClass = errorMessage ? 'text-red-500' : 'text-green-500';

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={id} className="text-gray-700">{label}</label>
            <input
                id={id}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            <p className={`${messageClass} text-sm`}>
                {errorMessage || validMessage}
            </p>
        </div>
    );
};

export default BasicInput;

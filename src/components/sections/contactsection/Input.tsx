"use client"

import type { CountrySelectProps, InputProps } from '@/src/types';
import PhoneInput  from "react-phone-number-input"
import 'react-phone-number-input/style.css'





const CountrySelectNoFlag = ({ value, onChange, options }: CountrySelectProps) => (
    <select
        value={ value }
        onChange={ (e) => onChange(e.target.value || undefined) }
    >
        {
            options
                .filter(({ value: country }) => country)
                .map(({ value: country, label }) => (
                <option
                    key={ country } value={ country }
                >
                    { country || label }
                </option>
            ))
        }
    </select>
)

export const Input = ({ value, onChange }: InputProps) => {
    return (
        <PhoneInput
            id="telefone"
            placeholder="(00) 00000-0000"
            value={ value }
            onChange={ onChange }
            defaultCountry="BR"
            countrySelectComponent={ CountrySelectNoFlag }
            required
            countrySelectProps={{
                className: "font-bold bg-transparent focus:outline-none border-r-[0.15625rem] border-N6"
            }}
            numberInputProps={{
                className: "pl-4 outline-none bg-transparent placeholder:font-Montserrat placeholder:text-sm placeholder:text-N4 md:text-lg md:placeholder:text-lg"
            }}
            className="px-6 py-4 border-[0.15625rem] border-N6 rounded-lg bg-N1 placeholder:font-Montserrat placeholder:text-sm placeholder:text-N4 md:text-lg transition-colors ease-in-out focus-within:border-R5 focus:outline-none md:placeholder:text-lg"
        />
    )
}
export type formatTypes =
  | 'phone'
  | 'org'
  | 'ban'
  | 'nin'
  | 'percent'
  | 'currency';
export type formatCurrencyPosition = 'before' | 'after';
export interface formatReturnValue {
  /** The given number */
  value: number;

  /** Cleans a number from unnecessary parts */
  cleanedValue: string;

  /** The formatted display number */
  number: string;

  /** A screen reader optimized number */
  aria: string;

  /** Language code, like en-US */
  locale: string;

  /** The given type */
  type: formatTypes | string;
}
export type formatValue = string | number;
export type formatReturnType = formatReturnValue | formatValue;
export interface formatOptionParams {
  /** can be "auto" */
  locale?: string;

  /** Should the number be cleaned */
  clean?: boolean;

  /** shortens any number or currency including an abbreviation. You can combine `compact` with `currency`. It gives you zero decimal by default `decimals={0}`. Use either a boolean, or a string with "short" or "long" */
  compact?: boolean | 'short' | 'long';

  /** How many decimals */
  decimals?: number;

  /** Do not round the retuned number */
  omit_rounding?: boolean;

  /** phone type */
  phone?: boolean;
  /** org type */
  org?: boolean;
  /** ban type */
  ban?: boolean;
  /** nin type */
  nin?: boolean;
  /** percent type */
  percent?: boolean;
  /** Currency code (ISO 4217) or `true` to use the default, `NOK`. */
  currency?: string | boolean;

  /** Intl.NumberFormat currency option – you can use false or empty string to hide the sign/name. Defaults to narrowSymbol when the locale is no else we default to code. */
  currency_display?:
    | boolean
    | ''
    | 'code'
    | 'name'
    | 'symbol'
    | 'narrowSymbol';
  /** currency option */
  currency_position?: formatCurrencyPosition;
  /** hides the currency sign */
  omit_currency_sign?: boolean;
  /** will remove all extra signs, like a currency sign or percent sign for the cleanedValue return when returnAria is true */
  clean_copy_value?: boolean;

  /** Intl.NumberFormat options (NumberFormatOptions) */
  options?: object;

  /** If an object should be returned, including the "aria" property */
  returnAria?: boolean;
}
export const format: (
  value: formatValue,
  options?: formatOptionParams
) => formatReturnType;

type cleanNumberOptions = {
  decimalSeparator?: string;
  thousandsSeparator?: string;
  prefix?: string; // to help the cleaning process
  suffix?: string; // to help the cleaning process
};

export const cleanNumber: (
  num: number | string,
  options?: cleanNumberOptions
) => number | string;

export const copyWithEffect: (
  value: number | string,
  label?: string,
  positionElement?: HTMLElement
) => boolean;

export const getFallbackCurrencyDisplay: (
  locale?: string,
  currency_display?: string
) => string;

export const getDecimalSeparator: (locale?: string) => string;

export const getThousandsSeparator: (locale?: string) => string;

export const getCurrencySymbol: (
  locale?: string,
  currency?: string,
  currencyDisplay?: string
) => string;

export const countDecimals: (
  value: number | string,
  currency_display?: string
) => number;

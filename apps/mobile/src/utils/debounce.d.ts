declare const debounce: (func: (...args: unknown[]) => unknown, milliseconds: number) => (...args: unknown[]) => void;
export default debounce;

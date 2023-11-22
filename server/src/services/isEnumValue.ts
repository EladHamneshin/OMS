
export default function isEnumValue(value: string, enumObject: Record<string, string>): boolean {
    return Object.values(enumObject).includes(value);
}
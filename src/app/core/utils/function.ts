interface IFindValueNameSource {
    name: string;
    value: string | number;
    [key: string]: any;
}

export function findValueName(source: IFindValueNameSource[], value: string) {
    const target = source.find(item => String(item.value) === value);
    return target && target.name || null;
}
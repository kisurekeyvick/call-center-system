export interface ISalesman {
    name: string;
    role: string;
    [key: string]: any;
}

export const salesmanlistValue = (): ISalesman[] => {
    return Array.apply(null, Array(20)).map((item, index: number) => {
        return {
            name: `王小丽${index}`,
            role: `113${Math.random()}`,
            value: `123${index}`
        };
    });
};

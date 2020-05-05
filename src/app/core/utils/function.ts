interface IFindValueNameSource {
    name: string;
    value: string | number;
    [key: string]: any;
}

export function findValueName(source: IFindValueNameSource[], value: string) {
    const target = source.find(item => String(item.value) === value);
    return target && target.name || null;
}

/**
 * @func
 * @desc 验证手机号
 * @param value 
 */
export function validPhoneValue(value: string): boolean {
    if (!(/^1[3456789]\d{9}$/.test(value))) { 
        return false; 
    }

    return true;
}

/**
 * @func
 * @desc 验证身份证
 * @param value 
 */
export function validIDCardValue(value: string): boolean {
    const reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
    if (!reg.test(value)) {
        
        return false;
    }

    return true;
}

/**
 * @func
 * @desc 验证车牌号
 * @param value 
 */
export function validCarNoValue(value: string): boolean {
    const reg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
    if (!reg.test(value)) {
        
        return false;
    }

    return true;
}

/**
 * @func
 * @desc format价格
 * @param value 
 */
export function priceFormat(value: string | number): string {
    let result = String(value);

    if (result.indexOf('万')) {
        result = result.replace('万', '0000');
    }

    if (result.indexOf('元')) {
        result = result.replace('元', '');
    }

    return result;
}

/**
 * @func
 * @desc format价格 显示中文
 * @param value 
 */
export function reversePriceFormat(value: string | number): string {
    let result = String(value);

    if (result.length > 4) {
        result = Number(result) / 10000 + '万';
    }

    if (result.length < 4) {
        result += '元';
    }

    return result;
}

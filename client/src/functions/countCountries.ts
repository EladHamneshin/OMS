import { isoCountriesCodes } from "../data/mockData";
import OrderInterface from "../types/orderType";

export interface CountByIsoCountryCode {
    id: string;
    value: number
}

export const countCountriesInOrders = (orders: OrderInterface[])
    : CountByIsoCountryCode[] => {
    const countryCount: Record<string, number> = {};

    orders.forEach(order => {
        const country = getCountryIsoCode(order.shippingDetails.address.country);

        if (countryCount[country!]) {
            countryCount[country!]++;
        } else {
            countryCount[country!] = 1;
        }
    });

    const result: CountByIsoCountryCode[] = Object.entries(countryCount).map(([id, value]) => ({
        id,
        value,
    }));

    return result;
}

export const getCountryIsoCode = (countryName: string): string | undefined => {

    const country = isoCountriesCodes.find((c) => capitalizeWords(c.name) === capitalizeWords(countryName))
    return country ? country.code : undefined
}

const capitalizeWords = (sentence: string): string => {
    const words: string[] = sentence.split(' ');
    const capitalizedWords: string[] = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    const result: string = capitalizedWords.join(' ');
    return result;
}
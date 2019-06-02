import { configService } from "./configuration.service";
import { Country, CountryState } from "../types/dto";

let countryList: Country[] = [];

export const countryService = {
    getCountryList,
    getStateList,
    getCountryName,
    getStateName
}

function getCountryList(): Country[] {

    if (countryList.length == 0) {
        var parsedCountries: Country[] = [];
        try {
            parsedCountries = JSON.parse(configService.getConfigurationValue('COUNTRY_LIST'));
        }
        catch (e) {
            console.log('Error in country list configuration.');
        }

        for (const country of parsedCountries) {
            countryList.push(country);
        }
    }
    return countryList;
}

function getStateList(countryValue: string): CountryState[] {
    const country = countryList.find(c => c.value == countryValue);
    return country ? country.children : [];
}

function getCountryName(countryValue: string) {
    const country = countryList.find(c => c.value == countryValue);
    return country ? country.text : '';
}

function getStateName(countryValue: string, stateValue: string) {
    const country = countryList.find(c => c.value == countryValue);
    if (country && country.children) {
        const countryState = country.children.find(s => s.value == stateValue);
        return countryState ? countryState.text : '';
    }
    return '';
}

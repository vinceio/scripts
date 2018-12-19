var country = "CA";

let hubspotInfo = {};
let org = inputData.organization.replace(/[^a-zA-Z0-9]/g, '');


hubspotInfo.id = org;
hubspotInfo.label = org;

hubspotInfo.hubspot_deal_id = inputData.hubspot_deal_id;
hubspotInfo.hubspot_id = inputData.hubspot_id;

const firstLevelOptionals = ['email', 'fax', 'phone'];

for (var i = firstLevelOptionals.length - 1; i >= 0; i--) {
    if (inputData.hasOwnProperty(firstLevelOptionals[i])) {
        hubspotInfo[firstLevelOptionals[i]] = inputData[firstLevelOptionals[i]];
    }
}
const addressOptions = ['langcode', 'given_name', 'family_name', 'organization', 'address_line1', 'locality', 'administrative_area', 'postal_code'];

let address = {};



for (var i = addressOptions.length - 1; i >= 0; i--) {
    if (inputData.hasOwnProperty(addressOptions[i])) {
        address[addressOptions[i]] = inputData[addressOptions[i]];
    }
}

let countryCode = '';
if (inputData.hasOwnProperty('country')) {
    switch (inputData.country) {
        case 'Canada':
            countryCode = 'CA';
        default:
            countryCode = 'US';
    }
}

if (countryCode.length) {
    address.country_code = countryCode;
}

hubspotInfo.address = address;

const exportJson = JSON.stringify(hubspotInfo);


return {
    string: 'https://lucaccounts.force1.awdev.ca/site-creation?i='
            +encodeURIComponent(
                Buffer.from(exportJson).toString('base64')
            )
    };



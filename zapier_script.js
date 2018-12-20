/******************************************************************* 
	Script to format Site builder data sent from Hubspot via Zapier
	
	inputData.example_field is Zapier's data variable 
	for specified data mapping.  

*******************************************************************/


//Lookup Values for States and Provinces (aka. Administrative Area)
const states = {"- Select -":"","Alabama":"AL","Alaska":"AK","American Samoa":"AS","Arizona":"AZ","Arkansas":"AR","Armed Forces (AA)":"AA","Armed Forces (AE)":"AE","Armed Forces (AP)":"AP","California":"CA","Colorado":"CO","Connecticut":"CT","Delaware":"DE","District of Columbia":"DC","Florida":"FL","Georgia":"GA","Guam":"GU","Hawaii":"HI","Idaho":"ID","Illinois":"IL","Indiana":"IN","Iowa":"IA","Kansas":"KS","Kentucky":"KY","Louisiana":"LA","Maine":"ME","Marshall Islands":"MH","Maryland":"MD","Massachusetts":"MA","Michigan":"MI","Micronesia":"FM","Minnesota":"MN","Mississippi":"MS","Missouri":"MO","Montana":"MT","Nebraska":"NE","Nevada":"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","New York":"NY","North Carolina":"NC","North Dakota":"ND","Northern Mariana Islands":"MP","Ohio":"OH","Oklahoma":"OK","Oregon":"OR","Palau":"PW","Pennsylvania":"PA","Puerto Rico":"PR","Rhode Island":"RI","South Carolina":"SC","South Dakota":"SD","Tennessee":"TN","Texas":"TX","Utah":"UT","Vermont":"VT","Virgin Islands":"VI","Virginia":"VA","Washington":"WA","West Virginia":"WV","Wisconsin":"WI","Wyoming":"WY"};

const provinces = {"- Select -":"","Alberta":"AB","British Columbia":"BC","Manitoba":"MB","New Brunswick":"NB","Newfoundland and Labrador":"NL","Northwest Territories":"NT","Nova Scotia":"NS","Nunavut":"NU","Ontario":"ON","Prince Edward Island":"PE","Quebec":"QC","Saskatchewan":"SK","Yukon":"YT"};


let adminareaCode = '';


if (states.hasOwnProperty(inputData.administrative_area)){
		adminareaCode = states[inputData.administrative_area];
}

if (provinces.hasOwnProperty(inputData.administrative_area)){
		adminareaCode = province[inputData.administrative_area];
}

let hubspotInfo = {};

//removes special characters then lower cases organization string
let org = inputData.organization.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

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
const addressOptions = ['langcode', 'given_name', 'family_name', 'organization', 'address_line1', 'locality', 'postal_code'];

let address = {};

for (var i = addressOptions.length - 1; i >= 0; i--) {
    if (inputData.hasOwnProperty(addressOptions[i])) {
        address[addressOptions[i]] = inputData[addressOptions[i]];
    }
}


//Checks for Country Code
if (inputData.hasOwnProperty('country') && ((inputData.country == 'CA') || (inputData.country == 'US'))) {
		      address.country_code = inputData.country;
}

if (adminareaCode.length){
		address.administrative_area = adminareaCode;
}

hubspotInfo.address = address;

//Convert hubspotInfo into JSON formatted string
const exportJson = JSON.stringify(hubspotInfo);

//Create Base64 encoded string then encoded as Uniform Resource Identifier(URI)
return {
    string: 'https://lucaccounts.force1.awdev.ca/site-creation?i='
            +encodeURIComponent(
                Buffer.from(exportJson).toString('base64')
            )
    };



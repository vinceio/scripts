var country = inputData.Company;

if (country == "Canada"){

		country = "Canada";

} else if (country == "USA"){
		country ="US";
}



return { 
	string: 'https://lucaccounts.force1.awdev.ca/site-creation?i='
			+encodeURIComponent( 
				Buffer.from(
					
					//inputData object is string data from zapier integration
		`{
                            "id": "${inputData.company}",
                            "label": "${inputData.company}",
                            "hubspot_deal_id": "${inputData.hubspot_deal_id}",
                            "hubspot_id": "${inputData.hubspot_id}",
                            "address": [
                                {"country_code": "${country}"},
                                {"langcode": ""},
                                {"given_name": "${inputData.given_name}"},
                                {"family_name": "${inputData.family_name}"},
                                {"organization": "${inputData.company}"},
                                {"address_line1": "${inputData.street_address}"},
                                {"address_line2": ""},
                                {"locality": "${inputData.city}"},
                                {"administrative_area": "${inputData.state_region}"},
                                {"postal_code": "${inputData.postal_zip}"}
                                ],
                            "email": "${inputData.email}",
                            "fax": "${inputData.fax}",
                            "phone": "${inputData.phone}"
          }`		
				).toString('base64')
			)
	};

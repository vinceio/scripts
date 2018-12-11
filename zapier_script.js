return { 
	string: 'https://lucaccounts.force1.awdev.ca/site-creation?i='
			+encodeURIComponent( 
				Buffer.from(
					
					//inputData object is string data from zapier integration
					
					+'{'
					+	'"email": "'          + inputData.email           + '", '
				    +	'"hubspot_deal_id": "'+ inputData.hupspot_deal_id + '", '
				    +	'"hupspot_id": "'     + inputData.hubspot_id      + '"  ' // removed comma for last element
				
				 
					+ '"address": ['   
					+   '{'	
					+		   '"country_code": "'+ inputData.country+ '",'
                    +          '"langcode": "'    + /*TODO*/ +         '",'
                    +          '"given_name": "'  + /*TODO*/ +         '",'
                    +          '"family_name": "' + /*TODO*/ +         '",'
                    +          '"organization": "' +/*TODO*/ +         '",'
                    +          '"address_line1": "'+/*TODO*/ +         '",'
                    +          '"address_line2": "'+/*TODO*/ +         '",'
                    +          '"locality": "'     +/*TODO*/ +         '",'
                    +          '"admistrative_area": "' + /*TODO*/ +   '",'
                    +          '"postal_code": "' + /*TODO*/ +         '",'
					+		   '"street": "' + inputData.street + '",'
					+		   '"postal": "' + inputData.postal + '",'


					+    '}'
					+  ']'
					
//					
					
					+ '}'
					
				).toString('base64')
			)
	};

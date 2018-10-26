return {
	string: 'https://lucaccounts.force1.awdev.ca/site-creation?i='
			+encodeURIComponent( 
				Buffer.from(
					
					//inputData object is string data from zapier integration
					
					+'{'
					+	'"email": "'          + inputData.email           + '", '
				    +	'"hubspot_deal_id": "'+ inputData.hupspot_deal_id + '", '
				    +	'"hupspot_id": "'     + inputData.hubspot_id      + '"  ' // removed comma for last element
				
					/********Address********
				 
					+ '"address": ['   
					+   '{'		//If Country is US
					+		   '"country": "'+ inputData.country+ '",' 
					+          '"street": "' + inputData.street + '",' 
					+          '"zip": "'    + inputData.zip    + '",'
					+   '},'
					+   '{'		//If Country is CA
					+		   '"country": "'+ inputData.country+ '",'
					+		   '"street": "' + inputData.street + '",'
					+		   '"postal": "' + inputData.postal + '",'


					+    '}'
					+  ']'
					**********************/
					
					
					
					+ '}'
					
				).toString('base64')
			)
	};

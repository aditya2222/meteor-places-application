import { Meteor } from 'meteor/meteor';
import { PlacesInfo } from '../lib/collections.js'
import { HTTP } from 'meteor/http'

Meteor.startup(() => {
  // code to run on server at startup


});


Meteor.methods({

	callApi(getEventValue){
	HTTP.call('GET',"https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
	
		{params: {input: getEventValue, inputtype:'textquery', key:'AIzaSyBkyEUj9wmx-_oiXpWgqy47Fsn-cvGcgHE'}}
		, (error, result)=>{
	
			//Places.insert({placeId:JSON.parse(result.content)["candidates"][0].place_id})  
			HTTP.call('GET','https://maps.googleapis.com/maps/api/place/details/json',
				{params:{key:'AIzaSyBkyEUj9wmx-_oiXpWgqy47Fsn-cvGcgHE',placeid:JSON.parse(result.content)["candidates"][0].place_id.toString()}},
				(error,result)=>{
				
					PlacesInfo.insert({lat1:JSON.parse(result.content)["result"]["geometry"]["viewport"]['northeast'].lat,
						lng1:JSON.parse(result.content)["result"]["geometry"]["viewport"]['northeast'].lng,
						lat2:JSON.parse(result.content)["result"]["geometry"]["viewport"]['southwest'].lat,
						lng2:JSON.parse(result.content)["result"]["geometry"]["viewport"]['southwest'].lng,
					country:JSON.parse(result.content)["result"]["formatted_address"].split(',')[1].toString()})
					//console.log(JSON.parse(result.content)["result"]["geometry"]["viewport"]['northeast'].lat)

					//console.log(JSON.parse(result.content)["result"]["formatted_address"].split(',')[1])
					
				}
			
			)
	})
}
 })

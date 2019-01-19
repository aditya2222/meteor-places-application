import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import {PlacesInfo} from '../lib/collections.js' 

import './main.html';


Template.body.helpers({



	placesinfo(){
	
		return PlacesInfo.find()
	
	}


})

Template.places.events({

	'submit .add-form': () => {
	
		event.preventDefault()
		Meteor.call('callApi', event.target.text.value)
	
	} 

})


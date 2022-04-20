import * as firebase from 'firebase';

class Firebase {
    client  = null;
    database= null;

	configure = (configuration) => {
		if (firebase.apps.length > 0) {
			firebase.app().delete().then(() => {
				this.configureDatabase(configuration);
			});
		} else {
			this.configureDatabase(configuration);
		}
	};

	configureDatabase = (configuration) => {
		let { jwdToken } = configuration;
		this.client = firebase.initializeApp(configuration);
		this.client.auth().signInWithCustomToken(jwdToken).catch(error => { console.log('could not authenticate!', error) });
		this.database = this.client.database().ref('chat');
	};

	deleteCurrentConfiguration = () => {
		if (firebase.apps.length > 0) {
			firebase.app().delete();
		}
	};

	isConfigured = () => {
		return this.database ? true : false;
	};

    markAsRead = async (resortId, channel, messages) => {
        let chan = this.database.child(`${ resortId }:${ channel }/messages`);

        let toUpdate = {};

        messages.forEach((message) => {
            toUpdate[message.messageId + '/readAt'] = new Date(); // it remaints with new Date instead of moment()
        });

        return chan.update(toUpdate);
    };

    setTypingIndicator = async(resortId, channel, indicator) => {
        let chan   = this.database.child(`${ resortId }:${ channel }/typingIndicator`);
        let update = {};

        update[indicator.userName] = indicator.status;
        chan.update(update);
    };

    sendMessage = async (resortId, channel, message) => {
        let chan = this.database.child(`${ resortId }:${ channel }`);
		await chan.child("messages").child(chan.push().key).update(message);
		await chan.update({ isHidden: false });
    };

	subscribeChannel = async(resortId, channel, callback) => {
		let chan = this.database.child(`${ resortId }:${ channel }/messages`);

		return chan.on('value', snapshot => {
			let data = [];

			snapshot.forEach((item) => {
				data.push({
					messageId: item.key,
					...item.val()
				});
			});

			callback(data);
		});
	};

    unsubscribeChannel = (resortId, channel) => {
        return this.database.child(`${ resortId }:${ channel }/messages`).off();
    };

    subscribeChannelTyping = (resortId, channel, callback) => {
        let chan = this.database.child(`${ resortId }:${ channel }/typingIndicator`);

		return chan.on('value', snapshot => {
			let data = [];

			snapshot.forEach((item) => {
				data.push({
					userName: item.key,
					status:   item.val()
				});
			});

			callback(data);
		});
    };

    unsubscribeChannelTyping = (resortId, channel) => {
        return this.database.child(`${ resortId }:${ channel }/typingIndicator`).off();
    };

	setCustomerDataOnFirstMessage = async(payload) => {
		let channelReference = this.database.child(`${ payload.resortId }:${ payload.channel }`);
		let uniqueKey = channelReference.push().key;
		let customerDataWithFirstMessage = {
			customerData: {
				agencyId:  		payload.customerData.agencyId,
				agencyName:		payload.customerData.agencyName,
				resortId: 		payload.customerData.resortId,
				resortName: 	payload.customerData.resortName,
				departureDate:	payload.customerData.departureDate,
				arrivalData:	payload.customerData.arrivalData,
				checkoutDate: 	payload.customerData.checkoutDate,
				bookingId: 		payload.customerData.bookingId,
				bookingNo: 		payload.customerData.bookingNo,
				adultsNo: 		payload.customerData.adultsNo,
				childsNo: 		payload.customerData.childrenNo,
				fullName:  		payload.customerData.fullName,
				hotelName:		payload.customerData.hotelName
			},
			messages: {
				[uniqueKey]: {
					createdAt: new Date(), // it remaints with new Date instead of moment()
					message:   payload.message,
					image:     payload.imageUrl ? payload.imageUrl : null,
					from:      payload.username,
					readAt:    ''
				}
			}
		};

        await channelReference.update(customerDataWithFirstMessage);
        
	};
}

const Client = new Firebase();

export default Client;

const functions = require('firebase-functions');

exports.makeOrderAndChangeBookQuantity = functions.database
	.ref('/orders/{pushId}')
	.onWrite(event => {

		if(event.data.val() != null) {

			const listOfBooks = event.data.val().list
			const root = event.data.ref.root

			for(let i = 0; i < listOfBooks.length; i++){
				
				const path = '/books/' + listOfBooks[i].book.key

				root.child(path).once('value').then(snap => {
					const quantity = snap.val().quantity
					const newQuantity = quantity - listOfBooks[i].quantity
					if(newQuantity < 0) {
  						throw new Error('Quantity error.');
					}
					snap.ref.update({quantity: newQuantity})
				})			

				// const book = { bookKey: listOfBooks[i].book.key, quantity: listOfBooks[i].quantity}
				// listOfBooks[i] = book
			}

			// const result = {
			// 	orderDate: event.data.val().orderDate,
			// 	status: event.data.val().status,
			// 	totalPrice: event.data.val().totalPrice,
			// 	userId: event.data.val().userId,
			// 	list: listOfBooks
			// }

			// return event.data.ref.set(result)
			return event.data.ref.set(event.data.val())
		}
		return null;
	})

exports.deleteOrderAndChangeBookQuantity = functions.database
	.ref('/orders/{pushId}')
	.onDelete(event => {

		// console.log(event.data);
		// console.log(event.data.list);

		if(event.data.previous.val() != null) {

			const listOfBooks = event.data.previous.val().list
			const root = event.data.ref.root

			for (let i = 0; i < listOfBooks.length; i++) {
				
				const path = '/books/' + listOfBooks[i].book.key

				root.child(path).once('value').then(snap => {
					const quantity = snap.val().quantity
					const newQuantity = quantity + listOfBooks[i].quantity
					console.log('q: ' + quantity + ' nq: ' +newQuantity)
					snap.ref.update({quantity: newQuantity})
				})			
			}
		}
		return null;
	})
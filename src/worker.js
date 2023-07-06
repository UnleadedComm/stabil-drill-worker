/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export default {
	// async fetch(request, env, ctx) {
	// 	return new Response('Hello World!');
	// },

	async fetch(request, env, ctx) {
		// Your web app's Firebase configuration
		const firebaseConfig = {
			apiKey: 'AIzaSyBeTgVffJnRmDU2BchZQqXnhB4v13M0-HE',
			authDomain: 'stabil-drill-services.firebaseapp.com',
			databaseURL: 'https://stabil-drill-services.firebaseio.com',
			projectId: 'stabil-drill-services',
			storageBucket: 'stabil-drill-services.appspot.com',
			messagingSenderId: '521270126199',
			appId: '1:521270126199:web:f21367eecc040f31014872',
		};

		// Initialize Firebase
		const app = initializeApp(firebaseConfig);

		const db = getFirestore(app);

		const docRef = await addDoc(collection(db, 'contact-form'), {
			firstName: 'David',
			lastName: 'Garcia',
			email: 'dgarcia@ulcomm.com',
		});

		console.log(result);

		return docRef.id;
	},
};

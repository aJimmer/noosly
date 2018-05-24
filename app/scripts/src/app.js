import socket from './ws-client';
// FYI: The 'named import' for SearchForm (wrapped in curly braces) declares a local variable named SearchForm 
// and binds it to the value from the dom module of the same name
import {SearchForm, SearchList} from './dom';


const FORM_SELECTOR = '[data-search="search-form"]';
const INPUT_SELECTOR = '[data-search="search-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

class NooslyApp {
	constructor() {
		this.searchForm = new SearchForm(FORM_SELECTOR, INPUT_SELECTOR);
		this.searchList = new SearchList(LIST_SELECTOR);

		console.log('Welcome to Noosly!');

		socket.init('ws://localhost:3001');
		socket.registerOpenHandler(() => {
			this.searchForm.init((data) => {
				let message = data;
				socket.sendMessage(data);
			});
		});
		socket.registerMessageHandler((data) => {
			console.log(data);
		});
	}
}

class Keyword {
	constructor({ message: m}) {
		this.message = m;
	}
	serialize(){
		return {
			message: this.message
		};
	}	
}

class NewsArticle {
	// ES6 gives a more compact way to assign the parameter values to instance properties using default arguments
	constructor({ title: t, description: d, link: l, url: u, created: c, media: m}) {
		this.title = t;
		this.description = d;
		this.link = l; 
		this.url = u;
		this.created = c;
		this.media = m;
	}

	// Not needed but may be useful in the future for sending a NewsArticle using websockets
	serialize() {
		return { 
			title: this.title, 
			description: this.description, 
			link: this.link, 
			url: this.url, 
			created: this.created, 
			media: this.media
		};
	}
}
// Noosly is the default value available from the app module. 
// When you only need to export a single value, it is best to use export default
export default NooslyApp;
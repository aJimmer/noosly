import $ from 'jquery';

/*  
 * SearchForm class will be used to manage the form element in the DOM.
 * 
 * FYI: Creating a ChatForm instance and initializing its event handlers will 
 * occur in two separate steps, because a constructor’s job should only be to 
 * set the properties of an instance. Other work (like attaching event listeners) 
 * should be done in other methods.
 *
 */

// FYI "named exports' allows you to export multiple named values instead of a single default value.
export class SearchForm {

	constructor(formSel, inputSel) {
		this.$form = $(formSel);
		this.$input = $(inputSel);
	}

	init(submitCallback) {
		this.$form.submit((event) => {
			/*
			 * preventDefault() method tells the user agent that if the event does not 
			 * get explicitly handled, its default action should not be taken as it 
			 * normally would be.
			 * 
			 * See examples section in https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
			 */
			event.preventDefault();

			// Retrieve value from input field i.e. users keyword
			let val = this.$input.val();

			// pass the val to submitCallback()
			submitCallback(val);

			// Reset the input field i.e. search field
			this.$input.val('');
		});

		// Added a click handler that causes the form to fire its submit event to make sure the form submits when the button is clicked.
		// FYI: The single-expression version of the arrow function allows you to omit the curly braces
		this.$form.find('button').on('click', () => this.$form.submit());
	}
}

export class SearchList {

	constructor(listSel) {
		this.$list = $(listSel);
	}

	drawArticle({ title: t, description: d, link: l, url: u, created: c, media: m}) {

		let $articleRow = $('<li>', {
      		'class': 'article-row'
    	});
    	
    	let $article = $('<div>', {
    		'class': 'row'
    	});

    	let $image = $('<div>', {
    		'class': 'col-md-3'
    	});

    	let $title_desc = $('<div>', {
    		'class': 'col-md-7'
    	});

    	$image.append($('<img>', {
    		'src': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Noto_Emoji_KitKat_263a.svg/200px-Noto_Emoji_KitKat_263a.svg.png'
    	}));

    	$title_desc.append($('<h3>', {
      		'class': 'article-title',
      		text: t
		}));
    	
    	$title_desc.append($('<p>', {
      		'class': 'article-desc',
      		text: d
		}));

    	$title_desc.append($('<a>', {
      		'class': 'btn btn-primary btn-sm',
      		'href': u,
      		'target': "_blank",
      		text: 'Read Article',	
		}));

    	$article.append($image);
    	$article.append($title_desc);
    	$articleRow.append($article);
    	$("#search-list").append($articleRow);
    	$articleRow.get(0).scrollIntoView();
	}
}
















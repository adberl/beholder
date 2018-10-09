document.getElementById("select_button").addEventListener("click", hoverOver);

function hoverOver() {

	browser.tabs.getCurrent().then( () => { // get the current tab
		// add: if CSS already inserted, dont insert anymore;
		browser.tabs.insertCSS( // insert the beholder class
			{ code:
				`.beholded{
					  border: red solid 5px;
					  border-sizing: border-box;
					  background-color: rgba(250,5,250,0.2);
					}
				`
			}).catch( (err) => { console.log(err) });

			browser.tabs.executeScript ( {file: '../js/hoverOver.js'});

	});

//	window.close(); -> doesnt insert the js/css anymore???
}

HTMLDivElement.prototype.LoadTemplate = function (templatePath) {

	// GetTemplate() returns a promise.

	GetTemplate(templatePath)

		.then((templateHTML) => {

			this.innerHTML = templateHTML;

			let DOMDoc = new DOMParser().parseFromString(templateHTML, 'text/html');

			let __this = this;

			// because scripts that are injected in the page via set innerHTML are DOA:

			DOMDoc.querySelectorAll('script')

				.forEach(function (oldScript) {

					let newScript = document.createElement('script');
					newScript.innerHTML = oldScript.innerHTML;
					__this.appendChild(newScript);

				});

			console.log((this.parentNode.id || "Document") + " loaded " + templatePath + " into " + this.id);
		})

		.catch((errMsg) => {
			this.innerHTML = errMsg;
		})
}

// *******************************************************************************************************************

function GetTemplate(templatePath) {

	return new Promise((resolve, reject) => {

		let xhr = new XMLHttpRequest();
		xhr.open("GET", templatePath, true);

		xhr.send();

		xhr.onload = ((x) => {
			resolve(x.target.response);
		})

		xhr.onerror = ((x) => {
			reject(x.target.responseText);
		})

	});
}

// *******************************************************************************************************************
// Element() is just a shorthand expression I use to avoid having to say "document.getElementById('myId')" everywhere 
// in the code that I want to reference an element.  This shortens it to just "element('myId')".  This adds a tiny bit
// of overhead, but not enough to notice.  I would not use this in any code that has to be highly optimised.  So, for 
// instance inside a loop processing thousands of rows of data, I would use the native getElementById().
//

function element(id) {
	return document.getElementById(id);
}


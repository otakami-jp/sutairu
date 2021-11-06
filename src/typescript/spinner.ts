class Spinner {
	element: HTMLElement;
	contents: string[];
	constructor(element: HTMLElement) {
		this.element = element;
		this.contents = [];
	};

	/**
	 * Add a new content to the spinner
	 * @param {string[]} arr - Array of strings to be displayed
	 * @return {this}
	 */
	addContentList(arr) {
		this.contents.concat(arr);

		return this;
	}
};
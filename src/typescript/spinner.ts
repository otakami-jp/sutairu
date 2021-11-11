interface SpinnerOptions {
  changeContent: boolean;
  changeContentTime: number;
  changeContentLoop: boolean;
}

const spinnerOptionsBase = {
  changeContent: true,
  changeContentTime: 1000,
  changeContentLoop: true,
}

/**
 * Initialize a spinner.
 */
class Spinner {
  element: HTMLElement;
  contents: string[];
  mode: 'order' | 'random';
  spinnerContent: HTMLDivElement;
  childPercent?: HTMLDivElement;
  percent: number;
  options: SpinnerOptions;
  index: number;
  interval?: number;
  spin: HTMLDivElement;
  /**
   * Refers to the current content of the spinner
   * @param {HTMLElement} element - The element to be displayed
   */
  constructor(element: HTMLElement, options: SpinnerOptions) {
    this.element = element;

    this.options = utils.mergeDefault(spinnerOptionsBase, options) as SpinnerOptions;

    this.contents = [];

    this.mode = 'order';

    this.percent = 0;

    this.spinnerContent = document.createElement('div');
    this.spinnerContent.classList.add(utils.classNames('ota__spinner-content'));
    
    this.childPercent;

    this.index = 0;

    this.interval;

    this.spin = document.createElement('div');
    this.spin.classList.add(utils.classNames('ota__spin'));

    this.spinnerContent.appendChild(this.spin);
    this.element.appendChild(this.spinnerContent);
  };

  /**
   * Add a new content to the spinner
   * @param {string[]} arr - Array of strings to be displayed
   * @return {this}
   */
  addContentList(arr: string[]): this {
    this.contents.concat(arr);

    return this;
  };

  /**
   * Change mode of the spinner
   * @param {'order' | 'random'} mode - The mode to be used
   * @return {this}
   */
  setMode(mode: 'order' | 'random'): this {
    if (['order', 'random'].indexOf(mode) === -1) {
      throw new Error('Invalid mode');
    };

    this.mode = mode;

    return this;
  };

  /**
   * Change the percentage of the spinner
   * @param {number} amount - The percentage to be displayed
   * @return {this}
   */
  incrementPercent(amount: number): this {
    this.percent += amount;

    if (this.percent > 0 && !this.childPercent) {
      this.childPercent = document.createElement('div');
      this.childPercent.classList.add('spinner-percent');
      this.spinnerContent.appendChild(this.childPercent);
    };

    if (this.percent > 100) {
      this.percent = 100;
    };

    if (this.percent < 0) {
      this.percent = 0;
    };

    if (this.childPercent) {
      this.childPercent.innerText = `${this.percent}%`;
    };

    return this;
  };

  getIndex(): number {
    if (this.mode === 'order') {
      const actualIndex = this.index;
      if (this.contents.length - 1 < actualIndex) {
        this.index = 0;
      } else {
        this.index++;
      }

      return actualIndex;
    } else {
      return this.index = Math.floor(Math.random() * this.contents.length);  
    }
  };

  changeContent(content: string): this {
    this.spin.innerText = content;

    return this;
  };

  start(): this {
    let content = this.contents[this.getIndex()];

    if (this.options.changeContent) {
      this.interval = setInterval(() => {
        content = this.contents[this.getIndex()];
        this.changeContent(content);
      }, this.options.changeContentTime);
    } else {
      this.changeContent(content);
    }

    return this;
  };

  destroy(): this {
    clearInterval(this.interval);

    return this;
  };
};
import DataroomElement from 'dataroom-js'

class EasyInput extends DataroomElement {
  async initialize(){
    console.log(this.attrs);
    if(this.attrs?.name?.length < 1){
      this.innerHTML = "Name Required";
      return
    }

    const label_content = this.attrs.label ? this.attrs.label : this.attrs.name;

    switch(this.attrs.type){
      case "submit":
        this.submit = this.create('input', { class: 'easy-input submit', type:'submit', name:this.attrs.name});
        break;
      case "textarea":
        this.label = this.create('label', { class: 'easy-label', for: this.attrs.name, content: label_content});
        this.input = this.create('textarea', { class: 'easy-input', name: this.attrs.name});
        break;
      default: 
        this.label = this.create('label', { class: 'easy-label', for:this.attrs.name, content: label_content});
        this.input = this.create('input', { class: 'easy-input', name:this.attrs.name, type: this.attrs.type});

    }

    if(this.attrs.required || this.getAttribute('required') !== null){
      this.input.setAttribute("required", true);
      this.classList.add('required');
    }

    if(this.input){
      this.input.addEventListener('input', () => {
        this.validateInput();
      });
      this.input.addEventListener('blur', () => {
        this.validateInput();
      });
    }

  }

  /**
   * Validates the input based on its type and updates the invalid-input class
   * @returns {boolean} - Whether the input is valid
   */
  validateInput(){
    if(!this.input){
      return true;
    }

    const value = this.input.value;
    const hasValue = value && value.trim() !== '';

    if(!hasValue){
      this.classList.remove('invalid-input');
      return true;
    }

    let isValid = true;

    switch(this.attrs.type){
      case "email":
        isValid = this.validateEmail(value);
        break;
      case "url":
        isValid = this.validateUrl(value);
        break;
      case "number":
        isValid = this.validateNumber(value);
        break;
      case "tel":
        isValid = this.validateTel(value);
        break;
      default:
        isValid = true;
    }

    if(isValid){
      this.classList.remove('invalid-input');
    } else {
      this.classList.add('invalid-input');
    }

    return isValid;
  }

  /**
   * Validates email format
   * @param {string} value - The email to validate
   * @returns {boolean} - Whether the email is valid
   */
  validateEmail(value){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  /**
   * Validates URL format
   * @param {string} value - The URL to validate
   * @returns {boolean} - Whether the URL is valid
   */
  validateUrl(value){
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validates number format
   * @param {string} value - The number to validate
   * @returns {boolean} - Whether the number is valid
   */
  validateNumber(value){
    return !isNaN(value) && value.trim() !== '';
  }

  /**
   * Validates telephone format (basic validation)
   * @param {string} value - The telephone to validate
   * @returns {boolean} - Whether the telephone is valid
   */
  validateTel(value){
    const telRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return telRegex.test(value);
  }
}

customElements.define('easy-input', EasyInput)

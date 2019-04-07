import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `dmp-group-selector-wrap`
 * 
 * This component is a item selector group wrapper. It needs have ChildNodes with value and selected attribute
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DmpGroupSelectorWrap extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <input type='hidden' value='[[value]]' required={{required}} id='inputValue' />
      <slot id='elements'></slot>
    `;
  }
  static get properties() {
    return {

      /** ChildNode selected value */
      value: {
        type: String,
        observer: '_valueChanged'
      },

      /** ChildNode selected */
      nodeSelected:{
        type: HTMLElement
      },

      /** Array of childNodes */
      _childNodes : {
        type: Array,
        computed: '_generateArChilds()'
      },

      /** Flag to allow empty selection */
      allowEmptySelection: {
        type: Boolean,
        value: false
      },

      /** Flag validation */
      required: Boolean
      
    };
  }
  
  ready(){
    window.temp1 = this;
    super.ready();
    this.initListeners();
    let selected = this.findSelected(this._childNodes);
    this.value = selected ? selected.getAttribute('value') : '';
  }
  
  /**
   * Init Listeners for elements are inside slot
   */
  initListeners(){
    console.log("listeners")
    this._childNodes.forEach((node) => {
      node.addEventListener("click", (e) => {this._onClick(e)});
    })
  }

  /**
   * Search in *Array nodes item with selected attribute
   * @param {*} childNodes 
   */
  findSelected(childNodes = []){
    return childNodes.find(item => this._isSelected(item));
  }

  /**
   * remove selected Attribute from all childNodes
   * @param {*} childrenNodeList 
   */
  removeSelectedAtrib(childrenNodeList = []){
    childrenNodeList.forEach(item => {
      if ( this._isSelected(item) ) { item.removeAttribute("selected")}
    })
  }

  validate(){
    return this.$.inputValue.checkValidity();
  }

  _isSelected(item){
    return item.getAttribute("selected") !== null
  }

  // OBSERVERS

  /** Add selected attribute if value match with childNode value and remove selected attribute if childNode has selected attribute but not match with value
   * 
   * @param {*} value 
   */
  _valueChanged(value){
    this._childNodes.forEach( (node) =>{
      let nodeValue = node.getAttribute('value');
      let selected = this._isSelected(node);
      if ( selected && value !== nodeValue ) node.removeAttribute('selected');
      if ( value === nodeValue ) node.setAttribute('selected', 'true');
    })
  }

  // HANDLERS

  /** Set value from childNode clicked */
  _onClick(e){
    this.nodeSelected = e.currentTarget;
    if ( this.allowEmptySelection && this._isSelected(this.nodeSelected)){
      this.value = '';
    }else{
      this.value = this.nodeSelected.getAttribute('value');
    }
  }

  // COMPUTED

  /** Get childNodes nodelist and return a new chilNodes Array */
  _generateArChilds(){
    return [].slice.bind(this.children)();
  }

}

window.customElements.define('dmp-group-selector-wrap', DmpGroupSelectorWrap);

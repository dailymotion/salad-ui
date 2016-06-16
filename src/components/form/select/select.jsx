import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {merge, filter} from 'lodash'
import Icon from '../../icon/icon'
import styles from './_stylesheet'
import glob from '../../../lib/glob'

export default class Select extends Component {
  state = {
    currentOption: null,
    open: false,
  }

  static defaultProps = {
    noBorder: false,
  }

  componentWillMount() {
    let obj = {}

    if(this.props.value !== undefined && this.props.value !== null){
      let value = this.props.value
      obj = filter(this.props.options, function(o){ return o.value === value })[0]
    }

    else if(this.props.children){
      obj = {
        name: this.props.children,
        value: null
      }
    }
    else {
      obj = this.props.options[0]
    }

    this.setState({
      currentOption: obj
    })
  }

  componentDidMount(){
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    document.addEventListener('click', this.handleOutsideClick)
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick(e){
    if(ReactDOM.findDOMNode(this).contains(e.target))
      return
    else {
      this.setState({
        open: false
      })
    }
  }

  selectClick(e){
    this.setState({
      open: true
    })
  }

  itemMouseEnter(option) {
    this.setState({
      currentOption: option
    })
  }

  itemClick(){
    this.setState({
      open: false
    })

    if(this.props.onChange)
      this.props.onChange(this.state.currentOption)
  }

  renderOptions() {
    let selectedItemStyle = merge({}, styles.dropdownItem, styles.selected)
    let options = []

    if(this.props.children){
      options = options.concat(
        <li
          key={'option.default'}
          style={(this.state.currentOption.value === null) ? selectedItemStyle : styles.dropdownItem}
          value={null}
          onMouseEnter={() => this.itemMouseEnter({name: this.props.children, value: null})}
          onClick={() => this.itemClick()}>
          {this.props.children}
        </li>
      )
    }

    options = options.concat(this.props.options.map((item, index) => {
      return <li
        key = {'option.' + index}
        style={(item.value === this.state.currentOption.value) ? selectedItemStyle : styles.dropdownItem}
        value={item.value}
        onMouseEnter={() => this.itemMouseEnter(item)}
        onClick={() => this.itemClick()}>
        {item.name}
      </li>
    }));

    const dropdownStyles = Object.assign({}, styles.dropdown, !this.state.open ? styles.dropdownHidden : null)
    return (
      <div style={dropdownStyles} className={`transition ${this.state.open?'fade-in':'fade-out'}`}>
        <ul>
          { options }
        </ul>
      </div>
    )
  }

  render() {
    const selectBoxStyles = Object.assign({}, styles.selectBox, this.props.noBorder?styles.noBorder:null)
    return (
      <div style={{position: 'relative'}}>
        <div style={selectBoxStyles} onClick={(e) => this.selectClick(e)}>
          <Icon type="arrow-left" width={10} height={10} style={styles.dropdownIcon} />
          <div>
            {this.state.currentOption.name}
          </div>
        </div>
        {this.renderOptions()}
      </div>
    )
  }
}

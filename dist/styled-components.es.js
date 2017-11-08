import isPlainObject from 'is-plain-object'
import Stylis from 'stylis'
import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import isFunction from 'is-function'
import hoistStatics from 'hoist-non-react-statics'

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

const _uppercasePattern = /([A-Z])/g

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate$2(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase()
}

const hyphenate_1 = hyphenate$2

const hyphenate = hyphenate_1

const msPattern = /^ms-/

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-')
}

const hyphenateStyleName_1 = hyphenateStyleName

//
const objToCss = function objToCss(obj, prevKey) {
  const css = Object.keys(obj).filter((key) => {
    const chunk = obj[key]
    return chunk !== undefined && chunk !== null && chunk !== false && chunk !== ''
  }).map((key) => {
    if (isPlainObject(obj[key])) return objToCss(obj[key], key)
    return `${hyphenateStyleName_1(key)}: ${obj[key]};`
  }).join(' ')
  return prevKey ? `${prevKey} {\n  ${css}\n}` : css
}

const flatten = function flatten(chunks, executionContext) {
  return chunks.reduce((ruleSet, chunk) => {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') return ruleSet
    /* Flatten ruleSet */
    if (Array.isArray(chunk)) return [].concat(ruleSet, flatten(chunk, executionContext))

    /* Handle other components */
    // $FlowFixMe not sure how to make this pass
    if (chunk.hasOwnProperty('styledComponentId')) return [].concat(ruleSet, [`.${chunk.styledComponentId}`])

    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext ? ruleSet.concat(...flatten([chunk(executionContext)], executionContext)) : ruleSet.concat(chunk)
    }

    /* Handle objects */
    // $FlowFixMe have to add %checks somehow to isPlainObject
    return ruleSet.concat(isPlainObject(chunk) ? objToCss(chunk) : chunk.toString())
  }, [])
}

//
const stylis = new Stylis({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: true,
})

const stringifyRules = function stringifyRules(rules, selector, prefix) {
  const flatCSS = rules.join('').replace(/^\s*\/\/.*$/gm, '') // replace JS comments

  const cssStr = selector && prefix ? `${prefix} ${selector} { ${flatCSS} }` : flatCSS

  return stylis(prefix || !selector ? '' : selector, cssStr)
}

//
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const charsLength = chars.length

/* Some high number, usually 9-digit base-10. Map it to base-😎 */
const generateAlphabeticName = function generateAlphabeticName(code) {
  let name = ''
  let x = void 0

  for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
    name = chars[x % charsLength] + name
  }

  return chars[x % charsLength] + name
}

//


const interleave = (function (strings, interpolations) {
  return interpolations.reduce((array, interp, i) => array.concat(interp, strings[i + 1]), [strings[0]])
})

//
const css = (function (strings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key]
  }

  return flatten(interleave(strings, interpolations))
})

//
const SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s+(\S+)\s+\*\//mg

const extractCompsFromCSS = (function (maybeCSS) {
  const css = `${maybeCSS || ''}` // Definitely a string, and a clone
  const existingComponents = []
  css.replace(SC_COMPONENT_ID, (match, componentId, matchIndex) => {
    existingComponents.push({ componentId, matchIndex })
    return match
  })
  return existingComponents.map((_ref, i) => {
    let componentId = _ref.componentId,
      matchIndex = _ref.matchIndex

    const nextComp = existingComponents[i + 1]
    const cssFromDOM = nextComp ? css.slice(matchIndex, nextComp.matchIndex) : css.slice(matchIndex)
    return { componentId, cssFromDOM }
  })
})

//
/* eslint-disable camelcase, no-undef */

const getNonce = (function () {
  return typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : null
})

const classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

const createClass = (function () {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
}())


const _extends = Object.assign || function (target) {
  for (let i = 1; i < arguments.length; i++) {
    const source = arguments[i]

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }

  return target
}


const inherits = function (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`)
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass
}


const objectWithoutProperties = function (obj, keys) {
  const target = {}

  for (const i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }

  return target
}

const possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }

  return call && (typeof call === 'object' || typeof call === 'function') ? call : self
}

//
/* eslint-disable no-underscore-dangle */
/*
 * Browser Style Sheet with Rehydration
 *
 * <style data-styled-components="x y z"
 *        data-styled-components-is-local="true">
 *   /· sc-component-id: a ·/
 *   .sc-a { ... }
 *   .x { ... }
 *   /· sc-component-id: b ·/
 *   .sc-b { ... }
 *   .y { ... }
 *   .z { ... }
 * </style>
 *
 * Note: replace · with * in the above snippet.
 * */
const COMPONENTS_PER_TAG = 40

const BrowserTag = (function () {
  function BrowserTag(el, isLocal) {
    const existingSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ''
    classCallCheck(this, BrowserTag)

    this.el = el
    this.isLocal = isLocal
    this.ready = false

    const extractedComps = extractCompsFromCSS(existingSource)

    this.size = extractedComps.length
    this.components = extractedComps.reduce((acc, obj) => {
      acc[obj.componentId] = obj // eslint-disable-line no-param-reassign
      return acc
    }, {})
  }

  BrowserTag.prototype.isFull = function isFull() {
    return this.size >= COMPONENTS_PER_TAG
  }

  BrowserTag.prototype.addComponent = function addComponent(componentId) {
    if (!this.ready) this.replaceElement()
    if (this.components[componentId]) throw new Error(`Trying to add Component '${componentId}' twice!`)

    const comp = { componentId, textNode: document.createTextNode('') }
    this.el.appendChild(comp.textNode)

    this.size += 1
    this.components[componentId] = comp
  }

  BrowserTag.prototype.inject = function inject(componentId, css, name) {
    if (!this.ready) this.replaceElement()
    const comp = this.components[componentId]

    if (!comp) throw new Error('Must add a new component before you can inject css into it')
    if (comp.textNode.data === '') comp.textNode.appendData(`\n/* sc-component-id: ${componentId} */\n`)

    comp.textNode.appendData(css)
    if (name) {
      const existingNames = this.el.getAttribute(SC_ATTR)
      this.el.setAttribute(SC_ATTR, existingNames ? `${existingNames} ${name}` : name)
    }

    const nonce = getNonce()

    if (nonce) {
      this.el.setAttribute('nonce', nonce)
    }
  }

  BrowserTag.prototype.toHTML = function toHTML() {
    return this.el.outerHTML
  }

  BrowserTag.prototype.toReactElement = function toReactElement() {
    throw new Error('BrowserTag doesn\'t implement toReactElement!')
  }

  BrowserTag.prototype.clone = function clone() {
    throw new Error('BrowserTag cannot be cloned!')
  }

  /* Because we care about source order, before we can inject anything we need to
   * create a text node for each component and replace the existing CSS. */


  BrowserTag.prototype.replaceElement = function replaceElement() {
    const _this = this

    this.ready = true
    // We have nothing to inject. Use the current el.
    if (this.size === 0) return

    // Build up our replacement style tag
    const newEl = this.el.cloneNode()
    newEl.appendChild(document.createTextNode('\n'))

    Object.keys(this.components).forEach((key) => {
      const comp = _this.components[key]

      // eslint-disable-next-line no-param-reassign
      comp.textNode = document.createTextNode(comp.cssFromDOM)
      newEl.appendChild(comp.textNode)
    })

    if (!this.el.parentNode) throw new Error("Trying to replace an element that wasn't mounted!")

    // The ol' switcheroo
    this.el.parentNode.replaceChild(newEl, this.el)
    this.el = newEl
  }

  return BrowserTag
}())

/* Factory function to separate DOM operations from logical ones*/


const BrowserStyleSheet = {
  create: function create() {
    const tags = []
    const names = {}

    /* Construct existing state from DOM */
    const nodes = document.querySelectorAll(`[${SC_ATTR}]`)
    const nodesLength = nodes.length

    for (let i = 0; i < nodesLength; i += 1) {
      const el = nodes[i]

      tags.push(new BrowserTag(el, el.getAttribute(LOCAL_ATTR) === 'true', el.innerHTML))

      const attr = el.getAttribute(SC_ATTR)
      if (attr) {
        attr.trim().split(/\s+/).forEach((name) => {
          names[name] = true
        })
      }
    }

    /* Factory for making more tags */
    const tagConstructor = function tagConstructor(isLocal) {
      const el = document.createElement('style')
      el.type = 'text/css'
      el.setAttribute(SC_ATTR, '')
      el.setAttribute(LOCAL_ATTR, isLocal ? 'true' : 'false')
      if (!document.head) throw new Error('Missing document <head>')
      document.head.appendChild(el)
      return new BrowserTag(el, isLocal)
    }

    return new StyleSheet(tagConstructor, tags, names)
  },
}

//
var SC_ATTR = 'data-styled-components'
var LOCAL_ATTR = 'data-styled-components-is-local'
const CONTEXT_KEY = '__styled-components-stylesheet__'

let instance = null
// eslint-disable-next-line no-use-before-define
const clones = []

var StyleSheet = (function () {
  function StyleSheet(tagConstructor) {
    const tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
    const names = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
    classCallCheck(this, StyleSheet)
    this.hashes = {}
    this.deferredInjections = {}
    this.stylesCacheable = typeof document !== 'undefined'

    this.tagConstructor = tagConstructor
    this.tags = tags
    this.names = names
    this.constructComponentTagMap()
  }

  // helper for `ComponentStyle` to know when it cache static styles.
  // staticly styled-component can not safely cache styles on the server
  // without all `ComponentStyle` instances saving a reference to the
  // the styleSheet instance they last rendered with,
  // or listening to creation / reset events. otherwise you might create
  // a component with one stylesheet and render it another api response
  // with another, losing styles on from your server-side render.


  StyleSheet.prototype.constructComponentTagMap = function constructComponentTagMap() {
    const _this = this

    this.componentTags = {}

    this.tags.forEach((tag) => {
      Object.keys(tag.components).forEach((componentId) => {
        _this.componentTags[componentId] = tag
      })
    })
  }

  /* Best level of caching—get the name from the hash straight away. */


  StyleSheet.prototype.getName = function getName(hash) {
    return this.hashes[hash.toString()]
  }

  /* Second level of caching—if the name is already in the dom, don't
   * inject anything and record the hash for getName next time. */


  StyleSheet.prototype.alreadyInjected = function alreadyInjected(hash, name) {
    if (!this.names[name]) return false

    this.hashes[hash.toString()] = name
    return true
  }

  /* Third type of caching—don't inject components' componentId twice. */


  StyleSheet.prototype.hasInjectedComponent = function hasInjectedComponent(componentId) {
    return !!this.componentTags[componentId]
  }

  StyleSheet.prototype.deferredInject = function deferredInject(componentId, isLocal, css) {
    if (this === instance) {
      clones.forEach((clone) => {
        clone.deferredInject(componentId, isLocal, css)
      })
    }

    this.getOrCreateTag(componentId, isLocal)
    this.deferredInjections[componentId] = css
  }

  StyleSheet.prototype.inject = function inject(componentId, isLocal, css, hash, name) {
    if (this === instance) {
      clones.forEach((clone) => {
        clone.inject(componentId, isLocal, css)
      })
    }

    const tag = this.getOrCreateTag(componentId, isLocal)

    const deferredInjection = this.deferredInjections[componentId]
    if (deferredInjection) {
      tag.inject(componentId, deferredInjection)
      delete this.deferredInjections[componentId]
    }

    tag.inject(componentId, css, name)

    if (hash && name) {
      this.hashes[hash.toString()] = name
    }
  }

  StyleSheet.prototype.toHTML = function toHTML() {
    return this.tags.map((tag) => tag.toHTML()).join('')
  }

  StyleSheet.prototype.toReactElements = function toReactElements() {
    return this.tags.map((tag, i) => tag.toReactElement(`sc-${i}`))
  }

  StyleSheet.prototype.getOrCreateTag = function getOrCreateTag(componentId, isLocal) {
    const existingTag = this.componentTags[componentId]
    if (existingTag) {
      return existingTag
    }

    const lastTag = this.tags[this.tags.length - 1]
    const componentTag = !lastTag || lastTag.isFull() || lastTag.isLocal !== isLocal ? this.createNewTag(isLocal) : lastTag
    this.componentTags[componentId] = componentTag
    componentTag.addComponent(componentId)
    return componentTag
  }

  StyleSheet.prototype.createNewTag = function createNewTag(isLocal) {
    const newTag = this.tagConstructor(isLocal)
    this.tags.push(newTag)
    return newTag
  }

  StyleSheet.reset = function reset(isServer) {
    instance = StyleSheet.create(isServer)
  }

  /* We can make isServer totally implicit once Jest 20 drops and we
   * can change environment on a per-test basis. */


  StyleSheet.create = function create() {
    const isServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : typeof document === 'undefined'

    return (isServer ? ServerStyleSheet : BrowserStyleSheet).create()
  }

  StyleSheet.clone = function clone(oldSheet) {
    const newSheet = new StyleSheet(oldSheet.tagConstructor, oldSheet.tags.map((tag) => tag.clone()), _extends({}, oldSheet.names))

    newSheet.hashes = _extends({}, oldSheet.hashes)
    newSheet.deferredInjections = _extends({}, oldSheet.deferredInjections)
    clones.push(newSheet)

    return newSheet
  }

  createClass(StyleSheet, null, [{
    key: 'instance',
    get: function get$$1() {
      return instance || (instance = StyleSheet.create())
    },
  }])
  return StyleSheet
}())

let _StyleSheetManager$ch

//
const StyleSheetManager = (function (_Component) {
  inherits(StyleSheetManager, _Component)

  function StyleSheetManager() {
    classCallCheck(this, StyleSheetManager)
    return possibleConstructorReturn(this, _Component.apply(this, arguments))
  }

  StyleSheetManager.prototype.getChildContext = function getChildContext() {
    let _ref

    return _ref = {}, _ref[CONTEXT_KEY] = this.props.sheet, _ref
  }

  StyleSheetManager.prototype.render = function render() {
    /* eslint-disable react/prop-types */
    // Flow v0.43.1 will report an error accessing the `children` property,
    // but v0.47.0 will not. It is necessary to use a type cast instead of
    // a "fixme" comment to satisfy both Flow versions.
    return React.Children.only(this.props.children)
  }

  return StyleSheetManager
}(Component))

StyleSheetManager.childContextTypes = (_StyleSheetManager$ch = {}, _StyleSheetManager$ch[CONTEXT_KEY] = PropTypes.oneOfType([PropTypes.instanceOf(StyleSheet), PropTypes.instanceOf(ServerStyleSheet)]).isRequired, _StyleSheetManager$ch)

StyleSheetManager.propTypes = {
  sheet: PropTypes.oneOfType([PropTypes.instanceOf(StyleSheet), PropTypes.instanceOf(ServerStyleSheet)]).isRequired,
}

//
/* eslint-disable no-underscore-dangle */
const ServerTag = (function () {
  function ServerTag(isLocal) {
    classCallCheck(this, ServerTag)

    this.isLocal = isLocal
    this.components = {}
    this.size = 0
    this.names = []
  }

  ServerTag.prototype.isFull = function isFull() {
    return false
  }

  ServerTag.prototype.addComponent = function addComponent(componentId) {
    if (this.components[componentId]) throw new Error(`Trying to add Component '${componentId}' twice!`)
    this.components[componentId] = { componentId, css: '' }
    this.size += 1
  }

  ServerTag.prototype.concatenateCSS = function concatenateCSS() {
    const _this = this

    return Object.keys(this.components).reduce((styles, k) => styles + _this.components[k].css, '')
  }

  ServerTag.prototype.inject = function inject(componentId, css, name) {
    const comp = this.components[componentId]

    if (!comp) throw new Error('Must add a new component before you can inject css into it')
    if (comp.css === '') comp.css = `/* sc-component-id: ${componentId} */\n`

    comp.css += css.replace(/\n*$/, '\n')

    if (name) this.names.push(name)
  }

  ServerTag.prototype.toHTML = function toHTML() {
    const attrs = ['type="text/css"', `${SC_ATTR}="${this.names.join(' ')}"`, `${LOCAL_ATTR}="${this.isLocal ? 'true' : 'false'}"`]

    const nonce = getNonce()

    if (nonce) {
      attrs.push(`nonce="${nonce}"`)
    }

    return `<style ${attrs.join(' ')}>${this.concatenateCSS()}</style>`
  }

  ServerTag.prototype.toReactElement = function toReactElement(key) {
    let _attrs

    const attrs = (_attrs = {}, _attrs[SC_ATTR] = this.names.join(' '), _attrs[LOCAL_ATTR] = this.isLocal.toString(), _attrs)

    const nonce = getNonce()

    if (nonce) {
      attrs.nonce = nonce
    }

    return React.createElement('style', _extends({
      key, type: 'text/css' }, attrs, {
        dangerouslySetInnerHTML: { __html: this.concatenateCSS() },
      }))
  }

  ServerTag.prototype.clone = function clone() {
    const _this2 = this

    const copy = new ServerTag(this.isLocal)
    copy.names = [].concat(this.names)
    copy.size = this.size
    copy.components = Object.keys(this.components).reduce((acc, key) => {
      acc[key] = _extends({}, _this2.components[key]) // eslint-disable-line no-param-reassign
      return acc
    }, {})

    return copy
  }

  return ServerTag
}())

var ServerStyleSheet = (function () {
  function ServerStyleSheet() {
    classCallCheck(this, ServerStyleSheet)

    this.instance = StyleSheet.clone(StyleSheet.instance)
  }

  ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
    if (this.closed) throw new Error("Can't collect styles once you've called getStyleTags!")
    return React.createElement(
      StyleSheetManager,
      { sheet: this.instance },
      children,
    )
  }

  ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
    if (!this.closed) {
      clones.splice(clones.indexOf(this.instance), 1)
      this.closed = true
    }

    return this.instance.toHTML()
  }

  ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
    if (!this.closed) {
      clones.splice(clones.indexOf(this.instance), 1)
      this.closed = true
    }

    return this.instance.toReactElements()
  }

  ServerStyleSheet.create = function create() {
    return new StyleSheet((isLocal) => new ServerTag(isLocal))
  }

  return ServerStyleSheet
}())

//

const LIMIT = 200

const createWarnTooManyClasses = (function (displayName) {
  let generatedClasses = {}
  let warningSeen = false

  return function (className) {
    if (!warningSeen) {
      generatedClasses[className] = true
      if (Object.keys(generatedClasses).length >= LIMIT) {
        // Unable to find latestRule in test environment.
        /* eslint-disable no-console, prefer-template */
        console.warn('Over ' + LIMIT + ' classes were generated for component ' + displayName + '. \n' + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs({\n' + '    style: ({ background }) => ({\n' + '      background,\n' + '    }),\n' + '  })`width: 100%;`\n\n' + '  <Component />')
        warningSeen = true
        generatedClasses = {}
      }
    }
  }
})

//
/* Trying to avoid the unknown-prop errors on styled components
 by filtering by React's attribute whitelist.
 */

/* Logic copied from ReactDOMUnknownPropertyHook */
const reactProps = {
  children: true,
  dangerouslySetInnerHTML: true,
  key: true,
  ref: true,
  autoFocus: true,
  defaultValue: true,
  valueLink: true,
  defaultChecked: true,
  checkedLink: true,
  innerHTML: true,
  suppressContentEditableWarning: true,
  onFocusIn: true,
  onFocusOut: true,
  className: true,

  /* List copied from https://facebook.github.io/react/docs/events.html */
  onCopy: true,
  onCut: true,
  onPaste: true,
  onCompositionEnd: true,
  onCompositionStart: true,
  onCompositionUpdate: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
  onFocus: true,
  onBlur: true,
  onChange: true,
  onInput: true,
  onSubmit: true,
  onReset: true,
  onClick: true,
  onContextMenu: true,
  onDoubleClick: true,
  onDrag: true,
  onDragEnd: true,
  onDragEnter: true,
  onDragExit: true,
  onDragLeave: true,
  onDragOver: true,
  onDragStart: true,
  onDrop: true,
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseMove: true,
  onMouseOut: true,
  onMouseOver: true,
  onMouseUp: true,
  onSelect: true,
  onTouchCancel: true,
  onTouchEnd: true,
  onTouchMove: true,
  onTouchStart: true,
  onScroll: true,
  onWheel: true,
  onAbort: true,
  onCanPlay: true,
  onCanPlayThrough: true,
  onDurationChange: true,
  onEmptied: true,
  onEncrypted: true,
  onEnded: true,
  onError: true,
  onLoadedData: true,
  onLoadedMetadata: true,
  onLoadStart: true,
  onPause: true,
  onPlay: true,
  onPlaying: true,
  onProgress: true,
  onRateChange: true,
  onSeeked: true,
  onSeeking: true,
  onStalled: true,
  onSuspend: true,
  onTimeUpdate: true,
  onVolumeChange: true,
  onWaiting: true,
  onLoad: true,
  onAnimationStart: true,
  onAnimationEnd: true,
  onAnimationIteration: true,
  onTransitionEnd: true,

  onCopyCapture: true,
  onCutCapture: true,
  onPasteCapture: true,
  onCompositionEndCapture: true,
  onCompositionStartCapture: true,
  onCompositionUpdateCapture: true,
  onKeyDownCapture: true,
  onKeyPressCapture: true,
  onKeyUpCapture: true,
  onFocusCapture: true,
  onBlurCapture: true,
  onChangeCapture: true,
  onInputCapture: true,
  onSubmitCapture: true,
  onResetCapture: true,
  onClickCapture: true,
  onContextMenuCapture: true,
  onDoubleClickCapture: true,
  onDragCapture: true,
  onDragEndCapture: true,
  onDragEnterCapture: true,
  onDragExitCapture: true,
  onDragLeaveCapture: true,
  onDragOverCapture: true,
  onDragStartCapture: true,
  onDropCapture: true,
  onMouseDownCapture: true,
  onMouseEnterCapture: true,
  onMouseLeaveCapture: true,
  onMouseMoveCapture: true,
  onMouseOutCapture: true,
  onMouseOverCapture: true,
  onMouseUpCapture: true,
  onSelectCapture: true,
  onTouchCancelCapture: true,
  onTouchEndCapture: true,
  onTouchMoveCapture: true,
  onTouchStartCapture: true,
  onScrollCapture: true,
  onWheelCapture: true,
  onAbortCapture: true,
  onCanPlayCapture: true,
  onCanPlayThroughCapture: true,
  onDurationChangeCapture: true,
  onEmptiedCapture: true,
  onEncryptedCapture: true,
  onEndedCapture: true,
  onErrorCapture: true,
  onLoadedDataCapture: true,
  onLoadedMetadataCapture: true,
  onLoadStartCapture: true,
  onPauseCapture: true,
  onPlayCapture: true,
  onPlayingCapture: true,
  onProgressCapture: true,
  onRateChangeCapture: true,
  onSeekedCapture: true,
  onSeekingCapture: true,
  onStalledCapture: true,
  onSuspendCapture: true,
  onTimeUpdateCapture: true,
  onVolumeChangeCapture: true,
  onWaitingCapture: true,
  onLoadCapture: true,
  onAnimationStartCapture: true,
  onAnimationEndCapture: true,
  onAnimationIterationCapture: true,
  onTransitionEndCapture: true,

  /* From HTMLDOMPropertyConfig */
}; const htmlProps = {
  /**
   * Standard Properties
   */
  accept: true,
  acceptCharset: true,
  accessKey: true,
  action: true,
  allowFullScreen: true,
  allowTransparency: true,
  alt: true,
  // specifies target context for links with `preload` type
  as: true,
  async: true,
  autoComplete: true,
  // autoFocus is polyfilled/normalized by AutoFocusUtils
  // autoFocus: true,
  autoPlay: true,
  capture: true,
  cellPadding: true,
  cellSpacing: true,
  charSet: true,
  challenge: true,
  checked: true,
  cite: true,
  classID: true,
  className: true,
  cols: true,
  colSpan: true,
  content: true,
  contentEditable: true,
  contextMenu: true,
  controls: true,
  coords: true,
  crossOrigin: true,
  data: true, // For `<object />` acts as `src`.
  dateTime: true,
  default: true,
  defer: true,
  dir: true,
  disabled: true,
  download: true,
  draggable: true,
  encType: true,
  form: true,
  formAction: true,
  formEncType: true,
  formMethod: true,
  formNoValidate: true,
  formTarget: true,
  frameBorder: true,
  headers: true,
  height: true,
  hidden: true,
  high: true,
  href: true,
  hrefLang: true,
  htmlFor: true,
  httpEquiv: true,
  icon: true,
  id: true,
  inputMode: true,
  integrity: true,
  is: true,
  keyParams: true,
  keyType: true,
  kind: true,
  label: true,
  lang: true,
  list: true,
  loop: true,
  low: true,
  manifest: true,
  marginHeight: true,
  marginWidth: true,
  max: true,
  maxLength: true,
  media: true,
  mediaGroup: true,
  method: true,
  min: true,
  minLength: true,
  // Caution; `option.selected` is not updated if `select.multiple` is
  // disabled with `removeAttribute`.
  multiple: true,
  muted: true,
  name: true,
  nonce: true,
  noValidate: true,
  open: true,
  optimum: true,
  pattern: true,
  placeholder: true,
  playsInline: true,
  poster: true,
  preload: true,
  profile: true,
  radioGroup: true,
  readOnly: true,
  referrerPolicy: true,
  rel: true,
  required: true,
  reversed: true,
  role: true,
  rows: true,
  rowSpan: true,
  sandbox: true,
  scope: true,
  scoped: true,
  scrolling: true,
  seamless: true,
  selected: true,
  shape: true,
  size: true,
  sizes: true,
  span: true,
  spellCheck: true,
  src: true,
  srcDoc: true,
  srcLang: true,
  srcSet: true,
  start: true,
  step: true,
  style: true,
  summary: true,
  tabIndex: true,
  target: true,
  title: true,
  // Setting .type throws on non-<input> tags
  type: true,
  useMap: true,
  value: true,
  width: true,
  wmode: true,
  wrap: true,

  /**
   * RDFa Properties
   */
  about: true,
  datatype: true,
  inlist: true,
  prefix: true,
  // property is also supported for OpenGraph in meta tags.
  property: true,
  resource: true,
  typeof: true,
  vocab: true,

  /**
   * Non-standard Properties
   */
  // autoCapitalize and autoCorrect are supported in Mobile Safari for
  // keyboard hints.
  autoCapitalize: true,
  autoCorrect: true,
  // autoSave allows WebKit/Blink to persist values of input fields on page reloads
  autoSave: true,
  // color is for Safari mask-icon link
  color: true,
  // itemProp, itemScope, itemType are for
  // Microdata support. See http://schema.org/docs/gs.html
  itemProp: true,
  itemScope: true,
  itemType: true,
  // itemID and itemRef are for Microdata support as well but
  // only specified in the WHATWG spec document. See
  // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
  itemID: true,
  itemRef: true,
  // results show looking glass icon and recent searches on input
  // search fields in WebKit/Blink
  results: true,
  // IE-only attribute that specifies security restrictions on an iframe
  // as an alternative to the sandbox attribute on IE<10
  security: true,
  // IE-only attribute that controls focus behavior
  unselectable: 0,
}

const svgProps = {
  accentHeight: true,
  accumulate: true,
  additive: true,
  alignmentBaseline: true,
  allowReorder: true,
  alphabetic: true,
  amplitude: true,
  arabicForm: true,
  ascent: true,
  attributeName: true,
  attributeType: true,
  autoReverse: true,
  azimuth: true,
  baseFrequency: true,
  baseProfile: true,
  baselineShift: true,
  bbox: true,
  begin: true,
  bias: true,
  by: true,
  calcMode: true,
  capHeight: true,
  clip: true,
  clipPath: true,
  clipRule: true,
  clipPathUnits: true,
  colorInterpolation: true,
  colorInterpolationFilters: true,
  colorProfile: true,
  colorRendering: true,
  contentScriptType: true,
  contentStyleType: true,
  cursor: true,
  cx: true,
  cy: true,
  d: true,
  decelerate: true,
  descent: true,
  diffuseConstant: true,
  direction: true,
  display: true,
  divisor: true,
  dominantBaseline: true,
  dur: true,
  dx: true,
  dy: true,
  edgeMode: true,
  elevation: true,
  enableBackground: true,
  end: true,
  exponent: true,
  externalResourcesRequired: true,
  fill: true,
  fillOpacity: true,
  fillRule: true,
  filter: true,
  filterRes: true,
  filterUnits: true,
  floodColor: true,
  floodOpacity: true,
  focusable: true,
  fontFamily: true,
  fontSize: true,
  fontSizeAdjust: true,
  fontStretch: true,
  fontStyle: true,
  fontVariant: true,
  fontWeight: true,
  format: true,
  from: true,
  fx: true,
  fy: true,
  g1: true,
  g2: true,
  glyphName: true,
  glyphOrientationHorizontal: true,
  glyphOrientationVertical: true,
  glyphRef: true,
  gradientTransform: true,
  gradientUnits: true,
  hanging: true,
  horizAdvX: true,
  horizOriginX: true,
  ideographic: true,
  imageRendering: true,
  in: true,
  in2: true,
  intercept: true,
  k: true,
  k1: true,
  k2: true,
  k3: true,
  k4: true,
  kernelMatrix: true,
  kernelUnitLength: true,
  kerning: true,
  keyPoints: true,
  keySplines: true,
  keyTimes: true,
  lengthAdjust: true,
  letterSpacing: true,
  lightingColor: true,
  limitingConeAngle: true,
  local: true,
  markerEnd: true,
  markerMid: true,
  markerStart: true,
  markerHeight: true,
  markerUnits: true,
  markerWidth: true,
  mask: true,
  maskContentUnits: true,
  maskUnits: true,
  mathematical: true,
  mode: true,
  numOctaves: true,
  offset: true,
  opacity: true,
  operator: true,
  order: true,
  orient: true,
  orientation: true,
  origin: true,
  overflow: true,
  overlinePosition: true,
  overlineThickness: true,
  paintOrder: true,
  panose1: true,
  pathLength: true,
  patternContentUnits: true,
  patternTransform: true,
  patternUnits: true,
  pointerEvents: true,
  points: true,
  pointsAtX: true,
  pointsAtY: true,
  pointsAtZ: true,
  preserveAlpha: true,
  preserveAspectRatio: true,
  primitiveUnits: true,
  r: true,
  radius: true,
  refX: true,
  refY: true,
  renderingIntent: true,
  repeatCount: true,
  repeatDur: true,
  requiredExtensions: true,
  requiredFeatures: true,
  restart: true,
  result: true,
  rotate: true,
  rx: true,
  ry: true,
  scale: true,
  seed: true,
  shapeRendering: true,
  slope: true,
  spacing: true,
  specularConstant: true,
  specularExponent: true,
  speed: true,
  spreadMethod: true,
  startOffset: true,
  stdDeviation: true,
  stemh: true,
  stemv: true,
  stitchTiles: true,
  stopColor: true,
  stopOpacity: true,
  strikethroughPosition: true,
  strikethroughThickness: true,
  string: true,
  stroke: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeLinecap: true,
  strokeLinejoin: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
  surfaceScale: true,
  systemLanguage: true,
  tableValues: true,
  targetX: true,
  targetY: true,
  textAnchor: true,
  textDecoration: true,
  textRendering: true,
  textLength: true,
  to: true,
  transform: true,
  u1: true,
  u2: true,
  underlinePosition: true,
  underlineThickness: true,
  unicode: true,
  unicodeBidi: true,
  unicodeRange: true,
  unitsPerEm: true,
  vAlphabetic: true,
  vHanging: true,
  vIdeographic: true,
  vMathematical: true,
  values: true,
  vectorEffect: true,
  version: true,
  vertAdvY: true,
  vertOriginX: true,
  vertOriginY: true,
  viewBox: true,
  viewTarget: true,
  visibility: true,
  widths: true,
  wordSpacing: true,
  writingMode: true,
  x: true,
  xHeight: true,
  x1: true,
  x2: true,
  xChannelSelector: true,
  xlinkActuate: true,
  xlinkArcrole: true,
  xlinkHref: true,
  xlinkRole: true,
  xlinkShow: true,
  xlinkTitle: true,
  xlinkType: true,
  xmlBase: true,
  xmlns: true,
  xmlnsXlink: true,
  xmlLang: true,
  xmlSpace: true,
  y: true,
  y1: true,
  y2: true,
  yChannelSelector: true,
  z: true,
  zoomAndPan: true,

  /* From DOMProperty */
}; const ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD'
const ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040'
const isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'))

const hasOwnProperty = {}.hasOwnProperty
const validAttr = (function (name) {
  return hasOwnProperty.call(htmlProps, name) || hasOwnProperty.call(svgProps, name) || isCustomAttribute(name.toLowerCase()) || hasOwnProperty.call(reactProps, name)
})

//


function isTag(target) /* : %checks */{
  return typeof target === 'string'
}

//


function isStyledComponent(target) /* : %checks */{
  return typeof target === 'function' && typeof target.styledComponentId === 'string'
}

//

/* eslint-disable no-undef */
function getComponentName(target) {
  return target.displayName || target.name || 'Component'
}

//


const determineTheme = (function (props, fallbackTheme, defaultProps) {
  // Props should take precedence over ThemeProvider, which should take precedence over
  // defaultProps, but React automatically puts defaultProps on props.

  /* eslint-disable react/prop-types */
  const isDefaultTheme = defaultProps && props.theme === defaultProps.theme
  const theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme
  /* eslint-enable */

  return theme
})

//
/**
 * Creates a broadcast that can be listened to, i.e. simple event emitter
 *
 * @see https://github.com/ReactTraining/react-broadcast
 */

const createBroadcast = function createBroadcast(initialState) {
  const listeners = {}
  let id = 0
  let state = initialState

  function publish(nextState) {
    state = nextState

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in listeners) {
      const listener = listeners[key]
      if (listener === undefined) {
        // eslint-disable-next-line no-continue
        continue
      }

      listener(state)
    }
  }

  function subscribe(listener) {
    const currentId = id
    listeners[currentId] = listener
    id += 1
    listener(state)
    return currentId
  }

  function unsubscribe(unsubID) {
    listeners[unsubID] = undefined
  }

  return { publish, subscribe, unsubscribe }
}

//
// Helper to call a given function, only once
const once = (function (cb) {
  let called = false

  return function () {
    if (!called) {
      called = true
      cb()
    }
  }
})

let _ThemeProvider$childC
let _ThemeProvider$contex

//
/* globals React$Element */
// NOTE: DO NOT CHANGE, changing this is a semver major change!
const CHANNEL = '__styled-components__'
const CHANNEL_NEXT = CHANNEL + 'next__'

const CONTEXT_CHANNEL_SHAPE = PropTypes.shape({
  getTheme: PropTypes.func,
  subscribe: PropTypes.func,
  unsubscribe: PropTypes.func,
})

const warnChannelDeprecated = once(() => {
  // eslint-disable-next-line no-console
  console.error('Warning: Usage of `context.' + CHANNEL + '` as a function is deprecated. It will be replaced with the object on `.context.' + CHANNEL_NEXT + '` in a future version.')
})
/**
 * Provide a theme to an entire react component tree via context and event listeners (have to do
 * both context and event emitter as pure components block context updates)
 */

const ThemeProvider = (function (_Component) {
  inherits(ThemeProvider, _Component)

  function ThemeProvider() {
    classCallCheck(this, ThemeProvider)

    const _this = possibleConstructorReturn(this, _Component.call(this))

    _this.unsubscribeToOuterId = -1

    _this.getTheme = _this.getTheme.bind(_this)
    return _this
  }

  ThemeProvider.prototype.componentWillMount = function componentWillMount() {
    const _this2 = this

    // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
    // with the outer theme
    const outerContext = this.context[CHANNEL_NEXT]
    if (outerContext !== undefined) {
      this.unsubscribeToOuterId = outerContext.subscribe((theme) => {
        _this2.outerTheme = theme
      })
    }
    this.broadcast = createBroadcast(this.getTheme())
  }

  ThemeProvider.prototype.getChildContext = function getChildContext() {
    let _this3 = this,
      _babelHelpers$extends

    return _extends({}, this.context, (_babelHelpers$extends = {}, _babelHelpers$extends[CHANNEL_NEXT] = {
      getTheme: this.getTheme,
      subscribe: this.broadcast.subscribe,
      unsubscribe: this.broadcast.unsubscribe,
    }, _babelHelpers$extends[CHANNEL] = function (subscriber) {
      warnChannelDeprecated()

      // Patch the old `subscribe` provide via `CHANNEL` for older clients.
      const unsubscribeId = _this3.broadcast.subscribe(subscriber)
      return function () {
        return _this3.broadcast.unsubscribe(unsubscribeId)
      }
    }, _babelHelpers$extends))
  }

  ThemeProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) this.broadcast.publish(this.getTheme(nextProps.theme))
  }

  ThemeProvider.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribeToOuterId !== -1) {
      this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeToOuterId)
    }
  }

  // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation


  ThemeProvider.prototype.getTheme = function getTheme(passedTheme) {
    const theme = passedTheme || this.props.theme
    if (isFunction(theme)) {
      const mergedTheme = theme(this.outerTheme)
      if (!isPlainObject(mergedTheme)) {
        throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!')
      }
      return mergedTheme
    }
    if (!isPlainObject(theme)) {
      throw new Error('[ThemeProvider] Please make your theme prop a plain object')
    }
    return _extends({}, this.outerTheme, theme)
  }

  ThemeProvider.prototype.render = function render() {
    if (!this.props.children) {
      return null
    }
    return React.Children.only(this.props.children)
  }

  return ThemeProvider
}(Component))

ThemeProvider.childContextTypes = (_ThemeProvider$childC = {}, _ThemeProvider$childC[CHANNEL] = PropTypes.func, _ThemeProvider$childC[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$childC)
ThemeProvider.contextTypes = (_ThemeProvider$contex = {}, _ThemeProvider$contex[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$contex)

//

const escapeRegex = /[[\].#*$><+~=|^:(),"'`]/g
const multiDashRegex = /--+/g

// HACK for generating all static styles without needing to allocate
// an empty execution context every single time...
const STATIC_EXECUTION_CONTEXT = {}

const _StyledComponent = (function (ComponentStyle, constructWithOptions) {
  /* We depend on components having unique IDs */
  const identifiers = {}
  const generateId = function generateId(_displayName, parentComponentId) {
    const displayName = typeof _displayName !== 'string' ? 'sc' : _displayName.replace(escapeRegex, '-') // Replace all possible CSS selectors
    .replace(multiDashRegex, '-') // Replace multiple -- with single -

    const nr = (identifiers[displayName] || 0) + 1
    identifiers[displayName] = nr

    const hash = ComponentStyle.generateName(displayName + nr)
    const componentId = displayName + '-' + hash
    return parentComponentId !== undefined ? parentComponentId + '-' + componentId : componentId
  }

  const BaseStyledComponent = (function (_Component) {
    inherits(BaseStyledComponent, _Component)

    function BaseStyledComponent() {
      let _temp,
        _this,
        _ret

      classCallCheck(this, BaseStyledComponent)

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key]
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call(...[this].concat(args))), _this), _this.attrs = {}, _this.state = {
        theme: null,
        generatedClassName: '',
      }, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret)
    }

    BaseStyledComponent.prototype.unsubscribeFromContext = function unsubscribeFromContext() {
      if (this.unsubscribeId !== -1) {
        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId)
      }
    }

    BaseStyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props) {
      const attrs = this.constructor.attrs

      const context = _extends({}, props, { theme })
      if (attrs === undefined) {
        return context
      }

      this.attrs = Object.keys(attrs).reduce((acc, key) => {
        const attr = attrs[key]
        // eslint-disable-next-line no-param-reassign
        acc[key] = typeof attr === 'function' ? attr(context) : attr
        return acc
      }, {})

      return _extends({}, context, this.attrs)
    }

    BaseStyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
      let _constructor = this.constructor,
        attrs = _constructor.attrs,
        componentStyle = _constructor.componentStyle,
        warnTooManyClasses = _constructor.warnTooManyClasses

      const styleSheet = this.context[CONTEXT_KEY] || StyleSheet.instance

      // staticaly styled-components don't need to build an execution context object,
      // and shouldn't be increasing the number of class names
      if (componentStyle.isStatic && attrs === undefined) {
        return componentStyle.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, styleSheet)
      } else {
        const executionContext = this.buildExecutionContext(theme, props)
        const className = componentStyle.generateAndInjectStyles(executionContext, styleSheet)

        if (warnTooManyClasses !== undefined) warnTooManyClasses(className)

        return className
      }
    }

    BaseStyledComponent.prototype.componentWillMount = function componentWillMount() {
      const _this2 = this

      const componentStyle = this.constructor.componentStyle

      const styledContext = this.context[CHANNEL_NEXT]

      // If this is a staticaly-styled component, we don't need to the theme
      // to generate or build styles.
      if (componentStyle.isStatic) {
        const generatedClassName = this.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, this.props)
        this.setState({ generatedClassName })
        // If there is a theme in the context, subscribe to the event emitter. This
        // is necessary due to pure components blocking context updates, this circumvents
        // that by updating when an event is emitted
      } else if (styledContext !== undefined) {
        const subscribe = styledContext.subscribe

        this.unsubscribeId = subscribe((nextTheme) => {
          // This will be called once immediately
          const theme = determineTheme(_this2.props, nextTheme, _this2.constructor.defaultProps)
          const generatedClassName = _this2.generateAndInjectStyles(theme, _this2.props)

          _this2.setState({ theme, generatedClassName })
        })
      } else {
        // eslint-disable-next-line react/prop-types
        const theme = this.props.theme || {}
        const _generatedClassName = this.generateAndInjectStyles(theme, this.props)
        this.setState({ theme, generatedClassName: _generatedClassName })
      }
    }

    BaseStyledComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      const _this3 = this

      // If this is a staticaly-styled component, we don't need to listen to
      // props changes to update styles
      const componentStyle = this.constructor.componentStyle

      if (componentStyle.isStatic) {
        return
      }

      this.setState((oldState) => {
        const theme = determineTheme(nextProps, oldState.theme, _this3.constructor.defaultProps)
        const generatedClassName = _this3.generateAndInjectStyles(theme, nextProps)

        return { theme, generatedClassName }
      })
    }

    BaseStyledComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      this.unsubscribeFromContext()
    }

    BaseStyledComponent.prototype.render = function render() {
      const _this4 = this

      // eslint-disable-next-line react/prop-types
      const innerRef = this.props.innerRef
      const generatedClassName = this.state.generatedClassName
      let _constructor2 = this.constructor,
        styledComponentId = _constructor2.styledComponentId,
        target = _constructor2.target


      const isTargetTag = isTag(target)

      const className = [
      // eslint-disable-next-line react/prop-types
        this.props.className, styledComponentId, this.attrs.className, generatedClassName].filter(Boolean).join(' ')

      const baseProps = _extends({}, this.attrs, {
        className,
      })

      if (isStyledComponent(target)) {
        baseProps.innerRef = innerRef
      } else {
        baseProps.ref = innerRef
      }

      const propsForElement = Object.keys(this.props).reduce((acc, propName) => {
        // Don't pass through non HTML tags through to HTML elements
        // always omit innerRef
        if (propName !== 'innerRef' && propName !== 'className' && (!isTargetTag || validAttr(propName))) {
          // eslint-disable-next-line no-param-reassign
          acc[propName] = _this4.props[propName]
        }

        return acc
      }, baseProps)

      return createElement(target, propsForElement)
    }

    return BaseStyledComponent
  }(Component))

  const createStyledComponent = function createStyledComponent(target, options, rules) {
    let _StyledComponent$cont

    let _options$displayName = options.displayName,
      displayName = _options$displayName === undefined ? isTag(target) ? 'styled.' + target : 'Styled(' + getComponentName(target) + ')' : _options$displayName,
      _options$componentId = options.componentId,
      componentId = _options$componentId === undefined ? generateId(options.displayName, options.parentComponentId) : _options$componentId,
      _options$ParentCompon = options.ParentComponent,
      ParentComponent = _options$ParentCompon === undefined ? BaseStyledComponent : _options$ParentCompon,
      extendingRules = options.rules,
      attrs = options.attrs


    const styledComponentId = options.displayName && options.componentId ? options.displayName + '-' + options.componentId : componentId

    let warnTooManyClasses = void 0
    if (process.env.NODE_ENV !== 'production') {
      warnTooManyClasses = createWarnTooManyClasses(displayName)
    }

    const componentStyle = new ComponentStyle(extendingRules === undefined ? rules : extendingRules.concat(rules), attrs, styledComponentId)

    const StyledComponent = (function (_ParentComponent) {
      inherits(StyledComponent, _ParentComponent)

      function StyledComponent() {
        classCallCheck(this, StyledComponent)
        return possibleConstructorReturn(this, _ParentComponent.apply(this, arguments))
      }

      StyledComponent.withComponent = function withComponent(tag) {
        let previousComponentId = options.componentId,
          optionsToCopy = objectWithoutProperties(options, ['componentId'])


        const newComponentId = previousComponentId && previousComponentId + '-' + (isTag(tag) ? tag : getComponentName(tag))

        const newOptions = _extends({}, optionsToCopy, {
          componentId: newComponentId,
          ParentComponent: StyledComponent,
        })

        return createStyledComponent(tag, newOptions, rules)
      }

      createClass(StyledComponent, null, [{
        key: 'extend',
        get: function get$$1() {
          let rulesFromOptions = options.rules,
            parentComponentId = options.componentId,
            optionsToCopy = objectWithoutProperties(options, ['rules', 'componentId'])


          const newRules = rulesFromOptions === undefined ? rules : rulesFromOptions.concat(rules)

          const newOptions = _extends({}, optionsToCopy, {
            rules: newRules,
            parentComponentId,
            ParentComponent: StyledComponent,
          })

          return constructWithOptions(createStyledComponent, target, newOptions)
        },
      }])
      return StyledComponent
    }(ParentComponent))

    StyledComponent.contextTypes = (_StyledComponent$cont = {}, _StyledComponent$cont[CHANNEL] = PropTypes.func, _StyledComponent$cont[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _StyledComponent$cont[CONTEXT_KEY] = PropTypes.oneOfType([PropTypes.instanceOf(StyleSheet), PropTypes.instanceOf(ServerStyleSheet)]), _StyledComponent$cont)
    StyledComponent.displayName = displayName
    StyledComponent.styledComponentId = styledComponentId
    StyledComponent.attrs = attrs
    StyledComponent.componentStyle = componentStyle
    StyledComponent.warnTooManyClasses = warnTooManyClasses
    StyledComponent.target = target


    return StyledComponent
  }

  return createStyledComponent
})

// murmurhash2 via https://gist.github.com/raycmorgan/588423

function doHash(str, seed) {
  const m = 0x5bd1e995
  const r = 24
  let h = seed ^ str.length
  let length = str.length
  let currentIndex = 0

  while (length >= 4) {
    let k = UInt32(str, currentIndex)

    k = Umul32(k, m)
    k ^= k >>> r
    k = Umul32(k, m)

    h = Umul32(h, m)
    h ^= k

    currentIndex += 4
    length -= 4
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex)
      h ^= str.charCodeAt(currentIndex + 2) << 16
      h = Umul32(h, m)
      break

    case 2:
      h ^= UInt16(str, currentIndex)
      h = Umul32(h, m)
      break

    case 1:
      h ^= str.charCodeAt(currentIndex)
      h = Umul32(h, m)
      break
  }

  h ^= h >>> 13
  h = Umul32(h, m)
  h ^= h >>> 15

  return h >>> 0
}

function UInt32(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24)
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8)
}

function Umul32(n, m) {
  n |= 0
  m |= 0
  const nlo = n & 0xffff
  const nhi = n >>> 16
  const res = nlo * m + ((nhi * m & 0xffff) << 16) | 0
  return res
}

//
const isStaticRules = function isStaticRules(rules, attrs) {
  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i]

    // recursive case
    if (Array.isArray(rule) && !isStaticRules(rule)) {
      return false
    } else if (typeof rule === 'function' && !isStyledComponent(rule)) {
      // functions are allowed to be static if they're just being
      // used to get the classname of a nested styled copmonent
      return false
    }
  }

  if (attrs !== undefined) {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in attrs) {
      const value = attrs[key]
      if (typeof value === 'function') {
        return false
      }
    }
  }

  return true
}

/*
 ComponentStyle is all the CSS-specific stuff, not
 the React-specific stuff.
 */
const _ComponentStyle = (function (nameGenerator, flatten, stringifyRules) {
  const ComponentStyle = (function () {
    function ComponentStyle(rules, attrs, componentId) {
      classCallCheck(this, ComponentStyle)

      this.rules = rules
      this.isStatic = isStaticRules(rules, attrs)
      this.componentId = componentId
      if (!StyleSheet.instance.hasInjectedComponent(this.componentId)) {
        const placeholder = process.env.NODE_ENV !== 'production' ? '.' + componentId + ' {}' : ''
        StyleSheet.instance.deferredInject(componentId, true, placeholder)
      }
    }

    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a .hash1234 {}
     * Returns the hash to be injected on render()
     * */


    ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
      let isStatic = this.isStatic,
        lastClassName = this.lastClassName

      if (isStatic && lastClassName !== undefined) {
        return lastClassName
      }

      const flatCSS = flatten(this.rules, executionContext)
      const hash = doHash(this.componentId + flatCSS.join(''))

      const existingName = styleSheet.getName(hash)
      if (existingName !== undefined) {
        if (styleSheet.stylesCacheable) {
          this.lastClassName = existingName
        }
        return existingName
      }

      const name = nameGenerator(hash)
      if (styleSheet.stylesCacheable) {
        this.lastClassName = existingName
      }
      if (styleSheet.alreadyInjected(hash, name)) {
        return name
      }

      const css = '\n' + stringifyRules(flatCSS, '.' + name)
      // NOTE: this can only be set when we inject the class-name.
      // For some reason, presumably due to how css is stringifyRules behaves in
      // differently between client and server, styles break.
      styleSheet.inject(this.componentId, true, css, hash, name)
      return name
    }

    ComponentStyle.generateName = function generateName(str) {
      return nameGenerator(doHash(str))
    }

    return ComponentStyle
  }())

  return ComponentStyle
})

//
// Thanks to ReactDOMFactories for this handy list!

const domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

// SVG
  'circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan']

//

const _styled = (function (styledComponent, constructWithOptions) {
  const styled = function styled(tag) {
    return constructWithOptions(styledComponent, tag)
  }

  // Shorthands for all valid HTML Elements
  domElements.forEach((domElement) => {
    styled[domElement] = styled(domElement)
  })

  return styled
})

//
const replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '')
}

const _keyframes = (function (nameGenerator, stringifyRules, css) {
  return function (strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key]
    }

    const rules = css(...[strings].concat(interpolations))
    const hash = doHash(replaceWhitespace(JSON.stringify(rules)))

    const existingName = StyleSheet.instance.getName(hash)
    if (existingName) return existingName

    const name = nameGenerator(hash)
    if (StyleSheet.instance.alreadyInjected(hash, name)) return name

    const generatedCSS = stringifyRules(rules, name, '@keyframes')
    StyleSheet.instance.inject('sc-keyframes-' + name, true, generatedCSS, hash, name)
    return name
  }
})

//
const _injectGlobal = (function (stringifyRules, css) {
  const injectGlobal = function injectGlobal(strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key]
    }

    const rules = css(...[strings].concat(interpolations))
    const hash = doHash(JSON.stringify(rules))

    const componentId = 'sc-global-' + hash
    if (StyleSheet.instance.hasInjectedComponent(componentId)) return

    StyleSheet.instance.inject(componentId, false, stringifyRules(rules))
  }

  return injectGlobal
})

//


const _constructWithOptions = (function (css) {
  const constructWithOptions = function constructWithOptions(componentConstructor, tag) {
    const options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}

    if (typeof tag !== 'string' && typeof tag !== 'function') {
      // $FlowInvalidInputTest
      throw new Error('Cannot create styled-component for component: ' + tag)
    }

    /* This is callable directly as a template function */
    const templateFunction = function templateFunction(strings) {
      for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key]
      }

      return componentConstructor(tag, options, css(...[strings].concat(interpolations)))
    }

    /* If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = function (config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, config))
    }
    templateFunction.attrs = function (attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: _extends({}, options.attrs || {}, attrs) }))
    }

    return templateFunction
  }

  return constructWithOptions
})

//
/* globals ReactClass */

const wrapWithTheme = function wrapWithTheme(Component$$1) {
  let _WithTheme$contextTyp

  const componentName = Component$$1.displayName || Component$$1.name || 'Component'

  const isStyledComponent$$1 = isStyledComponent(Component$$1)

  const WithTheme = (function (_React$Component) {
    inherits(WithTheme, _React$Component)

    function WithTheme() {
      let _temp,
        _this,
        _ret

      classCallCheck(this, WithTheme)

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key]
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call(...[this].concat(args))), _this), _this.state = {}, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret)
    }

    // NOTE: This is so that isStyledComponent passes for the innerRef unwrapping


    WithTheme.prototype.componentWillMount = function componentWillMount() {
      const _this2 = this

      const defaultProps = this.constructor.defaultProps

      const styledContext = this.context[CHANNEL_NEXT]
      const themeProp = determineTheme(this.props, undefined, defaultProps)
      if (styledContext === undefined && themeProp === undefined && process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps')
      } else if (styledContext === undefined && themeProp !== undefined) {
        this.setState({ theme: themeProp })
      } else {
        const subscribe = styledContext.subscribe

        this.unsubscribeId = subscribe((nextTheme) => {
          const theme = determineTheme(_this2.props, nextTheme, defaultProps)
          _this2.setState({ theme })
        })
      }
    }

    WithTheme.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      const defaultProps = this.constructor.defaultProps

      this.setState((oldState) => {
        const theme = determineTheme(nextProps, oldState.theme, defaultProps)

        return { theme }
      })
    }

    WithTheme.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this.unsubscribeId !== -1) {
        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId)
      }
    }

    WithTheme.prototype.render = function render() {
      // eslint-disable-next-line react/prop-types
      const innerRef = this.props.innerRef
      const theme = this.state.theme


      return React.createElement(Component$$1, _extends({
        theme,
      }, this.props, {
        innerRef: isStyledComponent$$1 ? innerRef : undefined,
        ref: isStyledComponent$$1 ? undefined : innerRef,
      }))
    }

    return WithTheme
  }(React.Component))

  WithTheme.displayName = 'WithTheme(' + componentName + ')'
  WithTheme.styledComponentId = 'withTheme'
  WithTheme.contextTypes = (_WithTheme$contextTyp = {}, _WithTheme$contextTyp[CHANNEL] = PropTypes.func, _WithTheme$contextTyp[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _WithTheme$contextTyp)


  return hoistStatics(WithTheme, Component$$1)
}

//

/* Import singletons */
/* Import singleton constructors */
/* Import components */
/* Import Higher Order Components */
/* Instantiate singletons */
const ComponentStyle = _ComponentStyle(generateAlphabeticName, flatten, stringifyRules)
const constructWithOptions = _constructWithOptions(css)
const StyledComponent = _StyledComponent(ComponentStyle, constructWithOptions)

/* Instantiate exported singletons */
const keyframes = _keyframes(generateAlphabeticName, stringifyRules, css)
const injectGlobal = _injectGlobal(stringifyRules, css)
const styled = _styled(StyledComponent, constructWithOptions)

export { css, keyframes, injectGlobal, ThemeProvider, wrapWithTheme as withTheme, ServerStyleSheet, StyleSheetManager }; export default styled

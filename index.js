// Copyright 2017, Venkat Peri.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// noinspection ES6UnusedImports
import bootstrap from 'bootstrap';


import ClipboardJS from 'clipboard'

import {dec2Roman, roman2Dec} from 'dec2roman';
// noinspection ES6UnusedImports
import fs from 'fs';
// noinspection ES6UnusedImports
import $ from 'jquery';
// noinspection ES6UnusedImports
import popper from 'popper.js';

import toastr from 'toastr';

import './scss/main.scss'

const skull = '\u2620';

const decimal = $( '#decimal' )
const roman = $( '#roman' )
const romanMessage = $( '#roman-message' )
const decimalMessage = $( '#decimal-message' )

let opts = {
  d2r: { mode: 'ibar' },
  r2d: { strict: true },
}

function showRoman( str ) {
  roman.val( str )
}

function showDecimal( str ) {
  decimal.val( str )
}

decimal.keyup( () => {
  const dec = decimal.val()
  let val = ''
  decimalError()
  romanError()
  if ( dec.length > 0 ) {
    try {
      val = dec2Roman( dec, opts.d2r )
      if ( val.length === 0 ) val = ''
    } catch ( e ) {
      console.log( e )
      decimalError(e)
    }
  }
  showRoman( val )
} )

let decimalError = ( e ) => {
  if ( !e ) {
    decimal.removeClass( 'error-border' )
    decimalMessage.html( '&nbsp;' )
  }
  else {
    decimal.addClass( 'error-border' )
    decimalMessage.text( e.message )
  }
}

let romanError = ( e ) => {
  if ( !e ) {
    roman.removeClass( 'error-border' )
    romanMessage.html( '&nbsp;' )
  }
  else {
    roman.addClass( 'error-border' )
    romanMessage.text( e.message )
  }
}

roman.keyup( () => {
  let val = ''
  let r = roman.val()
  romanError()
  decimalError()
  if ( r.length > 0 )
    try {
      r = r.toUpperCase().replace( '\'', '̅' )
      showRoman( r )
      val = roman2Dec( r, opts.r2d )
      if ( val.length === 0 ) val = ''
    } catch ( e ) {
      console.log( e )
      romanError(e)
    }
  showDecimal( val )
} )

let clipboard = new ClipboardJS( '#clippy' )
toastr.options.positionClass = 'toast-bottom-center'
// toastr.options.timeOut = 1000
clipboard.on( 'success', () => {
  toastr.success( 'Copied to clipboard' );
} )

decimal.focus()

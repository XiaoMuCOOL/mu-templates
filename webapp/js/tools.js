'use strict'
class TOOLS {
  constructor () {
    this.visions = '0.0.1'
    this.avoidConsole()
  }
  avoidConsole () {
    /* eslint-disable */
    // Avoid `console` errors in browsers that lack a console.
    var method
    var noop = function () {}
    var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ]
    var length = methods.length
    var console = (console = console || {})

    while (length--) {
      method = methods[length]
      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = noop
      }
    }
    /* eslint-enable */
  }
}
/* eslint-disable */
const Tools = new TOOLS()
/* eslint-enable */

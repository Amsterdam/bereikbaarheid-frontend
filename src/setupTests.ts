// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

import { server } from './../test/server'

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }

let createElementNSOrig = global.document.createElementNS

// @ts-ignore
global.document.createElementNS = function (
  namespaceURI: string,
  qualifiedName: string
) {
  if (
    namespaceURI === 'http://www.w3.org/2000/svg' &&
    qualifiedName === 'svg'
  ) {
    let element = createElementNSOrig.apply(this, [namespaceURI, qualifiedName])
    // @ts-ignore
    element.createSVGRect = function () {}
    return element
  }

  return createElementNSOrig.apply(this, [namespaceURI, qualifiedName])
}

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({
    onUnhandledRequest(req) {
      console.error(
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href
      )
    },
  })
})

afterEach(() => {
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  server.resetHandlers()
})

// Clean up after the tests are finished.
afterAll(() => server.close())

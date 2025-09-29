import '@testing-library/jest-dom'

import { beforeAll, afterEach, afterAll, vi } from 'vitest'
import { server } from './../test/server'

let createElementNSOrig = global.document.createElementNS

// @ts-ignore
global.document.createElementNS = function (namespaceURI: string, qualifiedName: string) {
  if (namespaceURI === 'http://www.w3.org/2000/svg' && qualifiedName === 'svg') {
    let element = createElementNSOrig.apply(this, [namespaceURI, qualifiedName])
    // @ts-ignore
    element.createSVGRect = function () {}
    return element
  }

  return createElementNSOrig.apply(this, [namespaceURI, qualifiedName])
}

// Ensure matchMedia is available
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
});

beforeAll(() => {
  // Establish API mocking before all tests.
  server.listen({
    onUnhandledRequest(req) {
      console.error('Found an unhandled %s request to %s', req.method, req.url.href)
    },
  })

  // Resize functionality
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'))
  }
})

afterEach(() => {
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  server.resetHandlers()
})

// Clean up after the tests are finished.
afterAll(() => server.close())

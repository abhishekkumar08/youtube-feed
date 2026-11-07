import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// jsdom lacks matchMedia and IntersectionObserver — stub them for the app under test.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

class IntersectionObserverStub {
  constructor(cb) {
    this.cb = cb;
    IntersectionObserverStub.instances.push(this);
  }
  observe(el) {
    this.el = el;
  }
  unobserve() {}
  disconnect() {
    const i = IntersectionObserverStub.instances.indexOf(this);
    if (i > -1) IntersectionObserverStub.instances.splice(i, 1);
  }
  // Test helper: simulate the sentinel scrolling into view.
  trigger(isIntersecting = true) {
    this.cb([{ isIntersecting, target: this.el }]);
  }
}
IntersectionObserverStub.instances = [];
window.IntersectionObserver = IntersectionObserverStub;
global.IntersectionObserver = IntersectionObserverStub;

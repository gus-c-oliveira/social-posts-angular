import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  getAllElementsByDataTest,
  getAllElementsTextContentByDataTest,
  getElementByDataTest,
  getElementTextContentByDataTest,
} from './testing';

@Component({
  selector: 'gus-test-host',
  template: `
    <button [attr.data-test]="'button'">Click Me!</button>
    <span [attr.data-test]="'test-span'">I'm a test component</span>
    <span [attr.data-test]="'test-span'">and this is a test span</span>
  `,
})
class TestHostComponent {}

describe('Testing Utils', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  describe('getElementByDataTest', () => {
    it(`should return the element given
      a fixture and corresponding data-test`, () => {
      const buttonElement = getElementByDataTest(fixture, 'button');
      expect(buttonElement).toBeTruthy();
    });
  });

  describe('getAllElementsByDataTest', () => {
    it(`should return all elements given
      a fixture and corresponding data-test`, () => {
      const allSpans = getAllElementsByDataTest(fixture, 'test-span');
      expect(allSpans).toBeTruthy();
      expect(allSpans.length).toEqual(2);
    });
  });

  describe('getElementTextContentByDataTest', () => {
    it(`should return the text content of an element
      given a fixture and corresponding data-test`, () => {
      const text = getElementTextContentByDataTest(fixture, 'button');
      expect(text).toEqual('Click Me!');
    });
  });

  describe('getAllElementsTextContentByDataTest', () => {
    it(`should return the text content of an element
    given a fixture and corresponding data-test`, () => {
      const allTexts = getAllElementsTextContentByDataTest(
        fixture,
        'test-span'
      );
      expect(allTexts).toBeTruthy();
      expect(allTexts.length).toEqual(2);
      expect(allTexts[0]).toEqual(`I'm a test component`);
      expect(allTexts[1]).toEqual('and this is a test span');
    });
  });
});

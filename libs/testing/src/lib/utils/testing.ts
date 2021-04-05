import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const getElementByDataTest = (
  fixture: ComponentFixture<any>,
  dataTest: string
) => {
  return fixture.debugElement.query(By.css(`[data-test="${dataTest}"]`))
    .nativeElement;
};

export const getAllElementsByDataTest = (
  fixture: ComponentFixture<any>,
  dataTest: string
) => {
  return fixture.debugElement
    .queryAll(By.css(`[data-test="${dataTest}"]`))
    .map((item) => item.nativeElement);
};

export const getElementTextContentByDataTest = (
  fixture: ComponentFixture<any>,
  dataTest: string
) => {
  return getElementByDataTest(fixture, dataTest).textContent.trim();
};

export const getAllElementsTextContentByDataTest = (
  fixture: ComponentFixture<any>,
  dataTest: string
) => {
  return getAllElementsByDataTest(fixture, dataTest).map((item) =>
    item.textContent.trim()
  );
};

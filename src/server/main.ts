import { ExampleData } from '@/types/example';
import { APP_TITLE } from './constants';

export const doGet = (e: GoogleAppsScript.Events.DoGet) => {
  const html = HtmlService.createTemplateFromFile('index');
  return html
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle(APP_TITLE);
  // .setFaviconUrl('HELLO');
};

export const include = (filename: string) => {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

export const getUser = () => {
  const result: ExampleData = {
    name: `server ${APP_TITLE}`,
    age: 0,
    gender: undefined,
  };
  return JSON.stringify(result);
};

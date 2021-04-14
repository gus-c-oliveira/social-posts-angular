export type RequestDataState = 'empty' | 'loading' | 'loaded' | 'error';

export interface RequestData {
  state: RequestDataState;
  data: any[];
}

export const emptyRequestData: RequestData = {
  state: 'empty',
  data: [],
};

export const loadingRequestData: RequestData = {
  state: 'loading',
  data: [],
};

export const errorRequestData: RequestData = {
  state: 'error',
  data: [],
};

import mockedMethods, { MockedData } from './index';

class Runner {
  public failureHander!: (value: any, object?: any) => void;
  public successHandler!: (value: any, object?: any) => void;
  public userObject!: unknown;

  mockedMethods: Map<string, MockedData>;

  constructor(mockedMethods: Map<string, MockedData>) {
    this.mockedMethods = mockedMethods;
    return new Proxy(this, {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (typeof target.__mockedMethod__ === 'function') {
          return function (...args) {
            return target.__mockedMethod__.call(target, key, args);
          };
        }
      },
    });
  }

  withFailureHandler(callback: (value: any, object?: any) => void) {
    this.failureHander = callback;
    return this;
  }
  withSuccessHandler(callback: (value: any, object?: any) => void) {
    this.successHandler = callback;
    return this;
  }
  withUserObject(object: unknown) {
    this.userObject = object;
    return this;
  }

  __mockedMethod__(methodName): void {
    if (this.mockedMethods.has(methodName)) {
      const mockedResponse = this.mockedMethods.get(methodName);

      console.info(
        `Calling mocked server side method "${methodName}" with ${
          mockedResponse.isSuccess ? 'successHandler' : 'failureHander'
        } and ${mockedResponse.delay}ms delay.`
      );

      if (mockedResponse.isSuccess) {
        setTimeout(() => {
          this.successHandler(mockedResponse.returnValue);
        }, mockedResponse.delay);
      } else {
        setTimeout(() => {
          this.failureHander(mockedResponse.returnValue);
        }, mockedResponse.delay);
      }
    } else {
      console.warn(
        `Would have called server side method "${methodName}" which is not mocked. Returning empty object.`
      );
      if (this.successHandler) {
        setTimeout(() => {
          this.successHandler({});
        }, 0);
      }
    }
  }
}

class Google {
  mockedMethods: Map<string, MockedData>;

  constructor(mockedMethods: Record<string, MockedData>) {
    const mapper = new Map();
    for (const methodName of Object.keys(mockedMethods)) {
      const data = mockedMethods[methodName];
      mapper.set(methodName, {
        isSuccess: data.isSuccess,
        returnValue: data.returnValue,
        delay: data.delay || 0,
      });
    }
    this.mockedMethods = mapper;
  }
  get script() {
    return {
      run: new Runner(this.mockedMethods),
      url: {
        getLocation(fn) {
          const location = document.location;
          const parameters = new URLSearchParams(location.search);
          const parameter = new URLSearchParams(location.search);
          const hash = location.hash.replace(/^#/, '');
          fn({ hash, parameter, parameters });
        },
      },
      history: {
        push: (stateObject, params, hash) => {
          const searchParams = new URLSearchParams(params);
          console.info(
            `In production the url would have been set to: ${searchParams.toString()}#${hash}`
          );
        },
      },
    };
  }
}

export default new Google(mockedMethods);

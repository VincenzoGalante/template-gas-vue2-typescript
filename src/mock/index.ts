import { ExampleData } from '@/types/example';

export interface MockedData {
  isSuccess: boolean;
  returnValue: string;
  delay?: number;
}

const mockedMethods: Record<string, MockedData> = {
  getUser: {
    isSuccess: true,
    returnValue: JSON.stringify({ name: 'John', age: 36 } as ExampleData),
    delay: 100,
  },
};

export default mockedMethods;

import { createContext } from "react";

interface IContextState {
  [key: string]: any;
  registerDependency<T>(key: string, dep: T): void;
  get<T>(key: string): T;
}

export class ContextState implements IContextState {
  [key: string]: any;
  registerDependency<T>(key: string, dep: T): void {
    throw new Error("DependencyProvider must be ancestor of current widget");
  }
  get<T>(key: string): T {
    throw new Error("DependencyProvider must be ancestor of current widget");
  }
}

const contextState = new ContextState();
const axiosContext = createContext<ContextState>(contextState);

export default axiosContext;

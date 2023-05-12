/**
 * This file exports a React component called `DependencyProvider` that is responsible for managing dependencies.
 * It provides a context that allows other components to register and access dependencies.
 */

import React, { useContext, useRef } from "react";
import DependencyContext, { ContextState } from "../store";

interface DependencyArray {
  [key: string]: any;
}

/**
 * This interface represents the props that are passed to the `DependencyProvider` component.
 */
export interface DependencyProviderProps extends React.PropsWithChildren {}

/**
 * This React component is responsible for managing dependencies.
 * It provides a context that allows other components to register and access dependencies.
 *
 * @param props - The props passed to the component.
 * @returns The `DependencyProvider` component.
 */
function DependencyProvider(props: DependencyProviderProps) {
  // This state variable holds the dependencies.
  const dependencies = useRef<DependencyArray>({});
  /**
   * This function is used to register a new dependency.
   *
   * @param dependencyKey - The key under which to register the dependency.
   * @param dependency - The dependency to be registered.
   */
  function registerDependency<T>(dependencyKey: string, dependency: T): void {
    // This function sets the state of the `dependencies` variable.
    dependencies.current[dependencyKey] = dependency;
  }

  /**
   * This function is used to get a registered dependency.
   *
   * @param dependencyKey - The key under which the dependency was registered.
   * @returns The dependency.
   */
  function get<T>(dependencyKey: string): T {
    const dep = dependencies.current[dependencyKey];
    if (!!!dep) {
      throw Error("Dependency not registered");
    }
    return dep;
  }

  const contextState = useContext(DependencyContext);
  ContextState.prototype.registerDependency = registerDependency;
  ContextState.prototype.get = get;

  return (
    // This component provides the `DependencyContext` context, which holds the `registerDependency` and `get` functions.
    <DependencyContext.Provider value={contextState}>
      {props.children}
    </DependencyContext.Provider>
  );
}

export default DependencyProvider;

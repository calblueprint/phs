'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';

interface WindowWidthContextProps {
  isWeb: boolean;
}

const WindowWidthContext = createContext<WindowWidthContextProps | undefined>(
  undefined,
);
/**
 *
 * @param root0 - Provider that checks window width and calculates if this is a web or mobile screen
 * @param root0.children - Provider will give context to its children components.
 * @returns The WindowWidthProvider component, should be wrapped across the whole project for
 * responsive design, per the Progressive Web Application functionality.
 * This provider is used in the root layout of the project such that we have global access to the window width
 * and can conditionally render accordingly.
 */
export function WindowWidthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isWeb, setIsWeb] = useState(false);
  const handleResize = useCallback(() => {
    setIsWeb(window.innerWidth >= 1024);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const windowWidthValue = useMemo(() => ({ isWeb }), [isWeb]);

  return (
    <WindowWidthContext.Provider value={windowWidthValue}>
      {children}
    </WindowWidthContext.Provider>
  );
}

export const useWebDeviceDetection = () => {
  const context = useContext(WindowWidthContext);
  if (context === undefined) {
    throw new Error('useIsWeb must be used within a WindowWidthProvider');
  }

  return context.isWeb;
};

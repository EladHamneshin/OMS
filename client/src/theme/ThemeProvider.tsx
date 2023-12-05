import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ColorModeContextProps {
  colorMode: string;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextProps | undefined>(undefined);

interface ColorModeProviderProps {
  children: ReactNode;
}

const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children }) => {

  const [colorMode, setColorMode] = useState<string>("dark");

  const toggleColorMode = () => {
    // Your logic to toggle color mode
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

const useColorMode = (): ColorModeContextProps => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};

export { ColorModeProvider, useColorMode };

import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { DrawerCustomer } from './Drawer';

interface AppWrapProps {
  children: ReactNode;
}

function AppWrap({ children }: AppWrapProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerCustomer />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

export { AppWrap };

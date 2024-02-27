import {HuddleClient, HuddleProvider} from '@huddle01/react';
import React from 'react';

import AppContainer from './AppContainer';

const huddleClient = new HuddleClient({
  projectId: '<YOUR_PROJECT_ID>',
  options: {
    activeSpeakers: {
      size: 8,
    },
    logging: true,
  },
});

const App = () => {
  return (
    <HuddleProvider key="huddle01-provider" client={huddleClient}>
      <AppContainer />
    </HuddleProvider>
  );
};

export default App;

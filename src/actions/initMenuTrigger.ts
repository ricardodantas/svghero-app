import { ipcRenderer } from 'electron';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppConfig from '../config';

const MenuTrigger = () => {
  const history = useHistory();
  // const [goTo, setGoTo] = useState('/');
  const handleIpcResponse = (event, data) => {
    // console.log('===> ', event, data);
    // setGoTo(data);
    if (history.location !== data) history.push(data);
  };

  useEffect((): any => {
    ipcRenderer.on(AppConfig.ipcChannels.reactRouterGoTo, handleIpcResponse);
    return () =>
      ipcRenderer.off(AppConfig.ipcChannels.reactRouterGoTo, handleIpcResponse);
  }, []);
};

export default MenuTrigger;

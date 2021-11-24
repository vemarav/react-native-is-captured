import React from 'react';
import { NativeModules, Platform, NativeEventEmitter } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-is-captured' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const IsCaptured = NativeModules.IsCaptured
  ? NativeModules.IsCaptured
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

type IsCapturedType = {
  getIsCaptured(): Promise<boolean>;
}

const emitter = new NativeEventEmitter(IsCaptured);

export const useIsCaptured = () => {
  const [isCaptured, setIsCaptured] = React.useState(false);

  React.useEffect(() => {
    (async function() {
      const isScreenCaptured = await IsCaptured.getIsCaptured();
      setIsCaptured(isScreenCaptured);
    })();

    const subscription = emitter.addListener('isCaptured', (data) => {
      setIsCaptured(data);
    });

    return () => {
      subscription.remove();
    };
  }, []);


  return isCaptured;
}

export default IsCaptured as IsCapturedType;

import { ForwardedRef } from 'react';
import { Platform } from 'react-native';

const mergeRefs = <T>(...refs: ForwardedRef<T>[]) => {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    });
  };
};

const isAndroid = Platform.OS === 'android';

export { isAndroid, mergeRefs };

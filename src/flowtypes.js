/* @flow */
export type NativeScrollEvent = {
  nativeEvent: {
    contentOffset: {
      x: string,
      y: number
    }
  };
}

import { ForwardedRef } from "react";

const mergeRefs = <T>(...refs: ForwardedRef<T>[]) => {
    return (node: T) => {
        refs.forEach(ref => {
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref != null) {
                ref.current = node;
            }
        });
    }
}

export { mergeRefs };

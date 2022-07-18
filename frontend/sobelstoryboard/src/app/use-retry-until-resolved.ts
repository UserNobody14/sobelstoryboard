import React from "react";
import {useInterval} from "./use-interval";


function useRetryUntilResolved(callback: () => Promise<boolean>, interval = 100) {
    const [hasResolved, setHasResolved] = React.useState(false);
    useInterval(
        async () => {
            const result = await callback();
            if (result) {
                setHasResolved(true);
            }
        },
        hasResolved ? null : interval
    );
    return hasResolved;
}
export default useRetryUntilResolved;
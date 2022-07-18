import * as React from 'react';
import {Button, Spinner} from "reactstrap";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {produceZipUrl, reset as resetDS} from "./DownloadStoryboard.reducer";
import {ProduceZipInput} from "./DownloadStoryboardAPI";
import {useEffect} from "react";
import useRetryUntilResolved from "../app/use-retry-until-resolved";
import {reset as resetPS} from "../process/ProcessStoryboard.reducer";

const quickDownloadFile = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

interface DownloadStoryboardProps {
    toZipUrl: ProduceZipInput;
}

export const DownloadStoryboard = (props: DownloadStoryboardProps) => {
    const dispatch = useAppDispatch();
    const isSelectable = useAppSelector(state => state.downloadStoryboard.status !== 'loading');
    const urlDownload = useAppSelector(state => state.downloadStoryboard.url);
    useEffect(() => {
        if (urlDownload) {
            quickDownloadFile(urlDownload);
            dispatch(resetDS());
            dispatch(resetPS());
        }
    }, [urlDownload, dispatch]);

    useRetryUntilResolved(
        () => {
            const b = dispatch(produceZipUrl(props.toZipUrl));
            return b.then(
                bb => {
                    const st = bb.meta.requestStatus;
                    if (st === 'fulfilled') {
                        const paydirt = (bb.payload as any);
                        console.log(paydirt);
                        if ('currently_has' in paydirt) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                }
            )
        }, 1000 * props.toZipUrl.expected)
    return (
        <div>

            {/*<Spinner type="grow" color="warning" children={false} />*/}

            {/*<Button*/}
            {/*    disabled={!isSelectable}*/}
            {/*    onClick={() => dispatch(produceZipUrl(props.toZipUrl))}*/}
            {/*>*/}
            {/*    Download Storyboard as Zip*/}
            {/*</Button>*/}
        </div>
    );
};
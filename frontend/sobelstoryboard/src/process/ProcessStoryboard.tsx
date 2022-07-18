import * as React from 'react';
import {Button} from "reactstrap";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {pushFountainUrl} from "./ProcessStoryboard.reducer";
import { PushFountainReturn } from "./ProcessStoryboardAPI";
import { useEffect} from "react";
import {beginDownload} from "../download/DownloadStoryboard.reducer";

// const quickDownloadFile = (url: string) => {
//     const link = document.createElement('a');
//     link.href = url;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }

interface ProcessStoryboardProps {
    fText: string;
    uponOutput: (o: PushFountainReturn) => void;
}

export const ProcessStoryboard = (props: ProcessStoryboardProps) => {
    const dispatch = useAppDispatch();
    // const isSelectable = useAppSelector(state => state.downloadStoryboard.status != 'loading');
    // const updateSuccess = useAppSelector(state => state.pushFountain.updateSuccess);
    // const numExpected = useAppSelector(state => state.pushFountain.numExpected);
    // const uniqueNumber = useAppSelector(state => state.pushFountain.uniqueNumber);
    // useEffect(() => {
    //     if (updateSuccess && uniqueNumber) {
    //         props.uponOutput({
    //             number_of_lines: numExpected,
    //             last_scene: 0,
    //             unique_number: uniqueNumber
    //         })
    //     }
    // }, [updateSuccess, numExpected, uniqueNumber, props]);
    const clickFn = () => {
        console.time('start_download_phase');
        dispatch(beginDownload());
        dispatch(pushFountainUrl(props.fText));
    }
    return (
        <div>
            <Button
                onClick={clickFn}
            >
                Process Fountain
            </Button>
        </div>
    );
};
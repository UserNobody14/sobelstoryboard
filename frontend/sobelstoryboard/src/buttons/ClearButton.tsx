import {Button} from "reactstrap";
import * as React from "react";

interface ClearButtonProps {
    fText: string;
    uponOutput: (o: string) => void;
}

export const ClearButton = (props: ClearButtonProps) => {
    return (
        <div>
            <Button
                onClick={() => props.uponOutput('')}
            >
                Clear
            </Button>
        </div>
    );
};
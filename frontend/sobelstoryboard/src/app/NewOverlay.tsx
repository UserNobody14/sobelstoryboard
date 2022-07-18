/** @jsxRuntime classic */
/** @jsx jsx */
import {Button, Spinner} from "reactstrap";
import * as React from "react";
import {LoadingOverlayWrapper, LoadingOverlayWrapperProps} from "./LoadingOverlay";
import {jsx, css, ClassNamesArg} from '@emotion/react'
import {CSSTransition} from "react-transition-group";
import {ArrayClassNamesArg} from "@emotion/css";

const cx2 = (
    names: string | (string | false)[],
    classNamePrefix: string | undefined,
    cxIn: {
        (...args: ClassNamesArg[]): string;
        (...args: ClassNamesArg[]): string;
        (...args: ClassNamesArg[]): string;
        (arg0: string, arg1: string | boolean |
            { [className: string]: boolean | null | undefined; }
            | ArrayClassNamesArg | null | undefined): any;
    }, ...args: ClassNamesArg[]) => {
    const arr = Array.isArray(names) ? names : [names]
    return cxIn(
        ...arr.map(name => name ? `${classNamePrefix}${name}` : ''),
        ...args
    )
}

interface NewOverlayProps {
    children: any;
    marginTop: any;
    active: any;
    fadeSpeed: number;
    onClick: any;
    state: any;
    classNamePrefix?: string;
}

export const NewOverlay = (props: NewOverlayProps) => {
    // @ts-ignore
    return (<div className="wrapper" css={css`
overflow: hidden;
overflowX: hidden;
overflowY: hidden;
position: absolute;
z-index: ${props.active ? 3000 : 0};
                  height: 100%;
                  width: 100%;
                  top: 0px;
                  left: 0px;`}>
            <CSSTransition
                in={props.active}
                classNames='_loading-overlay-transition'
                timeout={props.fadeSpeed}
                unmountOnExit
            >
                {/*
            // @ts-ignore  */}
                {state => (<div className="overlay" css={css`  position: absolute;
                  height: 100%;
                  width: 100%;
                  top: 0px;
                  left: 0px;
                  display: flex;
                  textAlign: center;
                  fontSize: 1.2em;
                  color: #FFF;
                  margin-top: ${props.marginTop};
                  background: rgba(0, 0, 0, 0.7);
                  zIndex: 800;
                  transition: opacity ${props.fadeSpeed}ms ease-in;
                  opacity: ${(state === 'entering' || state === 'entered') ? 1 : 0}`
                    }>
                        {/*
            // @ts-ignore  */}
                        <div className="content" css={css`margin: auto`}>
                            <Spinner type="grow" color="warning" children="false" />
                            {props.children}
                        </div>
                    </div>
                )}
            </CSSTransition>
        </div>
    );
};

export const Overlay = (props: NewOverlayProps) => (
    <LoadingOverlayWrapper
        {...props}
        spinner={(<Spinner type="grow" color="warning" children={false} />)}
        styles={{
            overlay: (base: any) => ({
                ...base,
                background: "rgba(255, 255, 255, 0.7)"
            }),
            content: (base: any) => ({
                ...base,
                marginTop: props.marginTop
            }),
            spinner: null,
            wrapper: null,
        }}
    >
        {props.children}
    </LoadingOverlayWrapper>
);
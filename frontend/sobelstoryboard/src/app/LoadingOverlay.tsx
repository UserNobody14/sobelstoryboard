import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import STYLES from './styles'
import { cx, css, ArrayClassNamesArg} from "@emotion/css";
import {ClassNames, ClassNamesArg} from "@emotion/react";


/**
 * Convenience cx wrapper to add prefix classes to each of the child
 * elements for styling purposes.
 */
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


export interface LoadingOverlayWrapperProps {
    active: boolean;
    fadeSpeed: number;
    onClick: any;
    className?: string;
    classNamePrefix?: string;
    spinner?: any,
    text?: any,
    children?: any;
    styles: {
        content?: any,
        overlay?: any,
        spinner?: any,
        wrapper?: any
    };
}


export class LoadingOverlayWrapper extends Component<LoadingOverlayWrapperProps, any> {
    private wrapper: React.RefObject<HTMLDivElement>;

    getWrapperCurrent = (): Element => {
        const wr = this.wrapper;
        return wr.current as Element;
    }

    constructor(props: LoadingOverlayWrapperProps) {
        super(props)
        this.wrapper = React.createRef()
        this.state = {overflowCSS: {}}
    }

    componentDidMount() {
        const wrapperStyle = window.getComputedStyle(this.getWrapperCurrent())
        const overflowCSS = ['overflow', 'overflowX', 'overflowY'].reduce((m, i) => {
            // @ts-ignore
            if (wrapperStyle[i] !== 'visible') { // @ts-ignore
                m[i] = 'hidden'
            }
            return m
        }, {})
        this.setState({overflowCSS})
    }

    componentDidUpdate(prevProps: Readonly<LoadingOverlayWrapperProps>) {
        const {active} = this.props
        if (active) this.getWrapperCurrent().scrollTop = 0
    }

    /**
     * Return an emotion css object for a given element key
     * If a custom style was provided via props, run it with
     * the base css obj.
     */
    getStyles = (key: string, providedState: string | null = null) => {

        // @ts-ignore
        const base = STYLES[key](providedState, this.props)
        // @ts-ignore
        const custom = this.props.styles[key]
        if (!custom) return base
        return typeof custom === 'function'
            ? custom(base, this.props)
            : custom
    }

    render () {
        const { overflowCSS } = this.state
        const {
            children,
            className,
            onClick,
            active,
            fadeSpeed,
            spinner,
            text
        } = this.props

        return (
            <ClassNames>
                {({ css, cx }) => (
                    <div
                        data-testid='wrapper'
                        ref={this.wrapper}
                        className={
                            cx2(
                                ['wrapper', active && 'wrapper--active'],
                                this.props.classNamePrefix,
                                cx,
                                css(this.getStyles('wrapper', active ? overflowCSS : {})),
                                className
                            )
                        }
                    >
                        <CSSTransition
                            in={active}
                            classNames='_loading-overlay-transition'
                            timeout={fadeSpeed}
                            unmountOnExit
                        >
                            {state => (
                                <div
                                    data-testid='overlay'
                                    className={cx2(
                                        'overlay',
                                        this.props.classNamePrefix,
                                        cx,
                                        css(this.getStyles('overlay', state)))}
                                    onClick={onClick}
                                >
                                    <div className={cx2(
                                        'content',
                                        this.props.classNamePrefix,
                                        cx,
                                        css(this.getStyles('content')))}>
                                        {/*{spinner && (*/}
                                        {/*    typeof spinner === 'boolean'*/}
                                        {/*        ? <Spinner cx={this.cx} getStyles={this.getStyles} />*/}
                                        {/*        : spinner*/}
                                        {/*)}*/}
                                        {spinner}
                                        {text}
                                    </div>
                                </div>
                            )}
                        </CSSTransition>
                        {children}
                    </div>
                )}
            </ClassNames>

        )
    }
}
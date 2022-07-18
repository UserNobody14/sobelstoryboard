

export default {
    wrapper: (state: any) => ({
        position: 'relative',
        ...state
    }),
    overlay: (state: any, props: any) => ({
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: '0px',
        left: '0px',
        display: 'flex',
        textAlign: 'center',
        fontSize: '1.2em',
        color: '#FFF',
        background: 'rgba(0, 0, 0, 0.7)',
        zIndex: 800,
        transition: `opacity ${props.fadeSpeed}ms ease-in`,
        opacity: (state === 'entering' || state === 'entered') ? 1 : 0
    }),
    content: () => ({
        margin: 'auto'
    }),
    spinner: (state: any) => ({
        position: 'relative',
        margin: '0px auto 10px auto',
        width: '50px',
        maxHeight: '100%',
        '&:before': {
            content: '""',
            display: 'block',
            paddingTop: '100%'
        },
        '& svg': {

            height: '100%',
            transformOrigin: 'center center',
            width: '100%',
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            margin: 'auto',
            '& circle': {

                strokeDasharray: '1,200',
                strokeDashoffset: 0,
                strokeLinecap: 'round',
                stroke: '#FFF'
            }
        }
    })
}
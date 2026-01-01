export const customStyles = {
    option: provided => {
        return {
            ...provided,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '18px',
            fontWeight: '400',
            color: 'var(--text-rgba)',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'var(--bg-form)',
                color: 'var(--red-color)',
                fontWeight: '400',
            },
            textAlign: 'left',
        };
    },
    control: styles => ({
        ...styles,

        color: 'var(--white, #FBFBFB)',
        fontFamily: 'Poppins',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: ' normal',
        borderRadius: '8px',
        boxShadow: 'none',
        backgroundColor: 'rgba(74, 86, 226, 0.10)',
        border: "none",
        background: 'transparent',
        display: 'flex',
        flexWrap: 'nowrap',
        borderColor: 'transparent',
        outline: 'transparent',
        padding: '0px',
    }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {
            ...provided,
            opacity,
            transition,
            right: 5,
            color: 'var(--text-color)',
            padding: '0',

            '@media screen and (max-width: 767.98px)': {
                paddingLeft: '9px',
            },
        };
    },

    menu: (provided) => {
        return {
            ...provided,
            background: 'linear-gradient(0deg,rgba(83, 61, 186, 1) 0%,rgba(80, 48, 154, 1) 36%,rgba(106, 70, 165, 1) 61%,rgba(133, 93, 175, 1) 100%)',
            borderRadius: '8px',
            blur: '5px',
            scrollBar: 'none',
            '::-webkit-scrollbar': {
                width: '0px',
                height: '0px',
            },
        };
    },
    menuList: base => ({
        ...base,

        '::-webkit-scrollbar': {
            display: 'none',
        },
        scrollbarWidth: 'none',
        paddingTop: '0px',
    }),

    indicatorSeparator: () => ({}),

    indicators: () => {
        return {
            cursor: 'pointer',
        };
    },

    input: provided => {
        return {
            ...provided,
            margin: '0px',
            color: 'var(--text-color)',
            minWidth: '100%',
            caretColor: 'transparent',
        };
    },
};
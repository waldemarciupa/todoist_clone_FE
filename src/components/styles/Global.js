import { createGlobalStyle } from 'styled-components';

const GloalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
        font-size: 14px;   
        background: #fff;
        color: #202020;
        margin: 0;
        padding: 0;
    }
    
    ul {
        margin: 0;
        padding: 0;
    }

    #root {
        height: 100vh;
        overflow: hidden
    }
`;

export default GloalStyles;

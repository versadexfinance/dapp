import {createStitches} from '@stitches/react';


export type {
    ComponentProps,
    VariantProps,
    PropertyValue,
    ScaleValue,
} from "@stitches/react";


import defaultTheme from "./theme";
import media from './media';
import utils from './utils';


export const {
    styled,
    theme,
    createTheme,
    css,
    config,
    getCssText,
    globalCss,
    keyframes,
    prefix,
    reset
} = createStitches({
    theme: defaultTheme,
    utils,
    media
});
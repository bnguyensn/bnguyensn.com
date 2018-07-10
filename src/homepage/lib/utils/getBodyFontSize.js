// @flow

/**
 * @return {number} - The body font size in px
 * */
export default function getBodyFontSize() {
    return parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
}

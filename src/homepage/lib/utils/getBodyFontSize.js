// @flow

export default function getBodyFontSize() {
    return parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
}

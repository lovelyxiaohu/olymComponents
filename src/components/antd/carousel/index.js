import React from 'react';
import debounce from 'lodash.debounce';
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = (mediaQuery) => {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {
            },
            removeListener() {
            },
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
}
// Use require over import (will be lifted up)
// make sure matchMedia polyfill run before require('react-slick')
// Fix https://github.com/ant-design/ant-design/issues/6560
// Fix https://github.com/ant-design/ant-design/issues/3308
const SlickCarousel = require('react-slick').default;
export default class Carousel extends React.Component {
    constructor() {
        super();
        this.onWindowResized = () => {
            // Fix https://github.com/ant-design/ant-design/issues/2550
            const { slick } = this.refs;
            const { autoplay } = this.props;
            if (autoplay && slick && slick.innerSlider && slick.innerSlider.autoPlay) {
                slick.innerSlider.autoPlay();
            }
        };
        this.onWindowResized = debounce(this.onWindowResized, 500, {
            leading: false,
        });
    }
    componentDidMount() {
        const { autoplay } = this.props;
        if (autoplay) {
            window.addEventListener('resize', this.onWindowResized);
        }
        const { slick } = this.refs;
        // https://github.com/ant-design/ant-design/issues/7191
        this.innerSlider = slick && slick.innerSlider;
    }
    componentWillUnmount() {
        const { autoplay } = this.props;
        if (autoplay) {
            window.removeEventListener('resize', this.onWindowResized);
            this.onWindowResized.cancel();
        }
    }
    render() {
        let props = Object.assign({}, this.props);
        if (props.effect === 'fade') {
            props.fade = true;
        }
        let className = props.prefixCls;
        if (props.vertical) {
            className = `${className} ${className}-vertical`;
        }
        return (React.createElement("div", { className: className },
            React.createElement(SlickCarousel, Object.assign({ ref: "slick" }, props))));
    }
}
Carousel.defaultProps = {
    dots: true,
    arrows: false,
    prefixCls: 'ant-carousel',
    draggable: false,
};

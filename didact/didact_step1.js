const Didact = {
    createElement,
    render,
};
function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [],
        },
    };
}
function createElement(type, props, ...children) {
    return {
        type,
        props: Object.assign(Object.assign({}, props), { children: children.map((child) => (typeof child === 'object' ? child : createTextElement(child))) }),
    };
}
function render(element, container) {
    const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);
    const isProperty = (key) => key !== 'children';
    Object.keys(element.props)
        .filter((propName) => isProperty(propName))
        .forEach((propName) => (dom[propName] = element.props[propName]));
    element.type !== 'TEXT_ELEMENT' && element.props.children.forEach((child) => render(child, dom));
    container.appendChild(dom);
}
const element = {
    type: 'div',
    props: {
        id: 'foo',
        children: [
            {
                type: 'a',
                props: {
                    children: [
                        {
                            type: 'TEXT_ELEMENT',
                            props: {
                                nodeValue: 'bar',
                                children: [],
                            },
                        },
                    ],
                },
            },
            {
                type: 'b',
                props: {
                    children: [],
                },
            },
        ],
    },
};
const container = document.getElementById('root');
Didact.render(element, container);
export {};

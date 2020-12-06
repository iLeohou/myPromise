// 创建

export function create(template: string) {
    const container = document.createElement('template');
    container.innerHTML = template.trim();
    return container.content.firstChild
}

export function after(newNode: Node, node: Node) {
    node.parentNode.insertBefore(newNode, node.nextSibling)
}

export function before(newNode: Node, node: Node) {
    node.parentNode.insertBefore(newNode, node)
}

export function append(parent: Node, node: Node) {
    parent.appendChild(node)
}

// 新增父节点
export function wrap(child: Node, newParent:Node) {
    before(newParent, child);
    append(newParent, child);
}


// 删除
export function remove(node: Node) {
    node.parentNode.removeChild(node);
    return node
}

export function empty(parent: Node) {
    const array = [];
    while(parent.firstChild) {
        array.push(remove(parent.firstChild));
    }
    return array;
}

// 修改
export function attr(node: HTMLElement, name: string, value?: string) {
    if(arguments.length === 3) {
        node.setAttribute(name, value);
    } else if(arguments.length === 2) {
        return node.getAttribute(name);
    }
} 

export function text(node: HTMLElement, string?: string) {
    if(arguments.length === 2) {
        if(node.innerText) {
            node.innerText = string
        } else {
            node.textContent = string
        }
    }

    if(arguments.length === 1) {
        return node.innerText ? node.innerText : node.textContent;
    }
}

export function html(node: HTMLElement, string?: string) {
    if(arguments.length === 2) {
        node.innerHTML = string;
    }

    if(arguments.length === 1) {
        return node.innerHTML;
    }
}

export function style(node: HTMLElement, name: string | object, value: string) {
    if(arguments.length === 3) {
        node.style[name as string] = value;
    } else if(arguments.length === 2) {
        return node.style[name as string];
    }

    if(name instanceof Object) {
        let obj = name as object;
        Object.keys(obj).forEach((key) => {
            node.style[key] = obj[key]
        })
    }
}

export const classList =  {
    add(node: HTMLElement, name: string) {
        node.classList.add(name)
    },
    remove(node: HTMLElement, name: string) {
        node.classList.remove(name)
    },
    has(node: HTMLElement, name: string) {
        return node.classList.contains(name);
    }
}

export function on(node: HTMLElement, event: string, fn: EventListenerOrEventListenerObject) {
    node.addEventListener(event, fn)
}

export function off(node: HTMLElement, event: string, fn: EventListenerOrEventListenerObject) {
    node.removeEventListener(event, fn)
}

export function find(selector: string, scope: HTMLElement) {
    return (scope || document).querySelectorAll(selector)
}

export function siblings(node: HTMLElement) {
    return Array.from(node.parentNode.children).filter(item => item !== node);
}

export function next(node: HTMLElement) {
    if(node.nextElementSibling) {
        return node.nextElementSibling;
    } else {
        let x = node.nextSibling;
        while(x && x.nodeType !== 1) {
            x = x.nextSibling;
        }
        
        return x
    }
}

export function prev(node: HTMLElement) {
    if(node.previousElementSibling) {
        return node.previousElementSibling;
    } else {
        let x = node.previousSibling;
        while(x && x !== 1) {
            x = x.previousSibling;
        }

        return x;
    }
}

export function each(node: HTMLElement, fn: Function) {
    const nodeArr = Array.from(node.children)
    for(let i = 0; i < nodeArr.length; i++) {
        fn.call(null, nodeArr[i])
    }
}

export function index(node: HTMLElement) {
    const parent = node.parentNode;
    let chilArr = Array.from(parent.children);
    for(let i = 0; i < chilArr.length; i++) {
        if(chilArr[i] === node) {
            return i
        }
    }
}

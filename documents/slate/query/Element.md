# Editor
## usage
```js
import {Element} from 'slate';
```
## Interface
```js
export interface Element {
  children: Node[]
  [key: string]: any
}

```

即任何拥有children(Node[])的都作为Element
## api

### isElement
```js
(value: any): value is Element
```
是否为Element

### isElementList
```js
(value: any): value is Element[]
```
是否为Element数组

### matches
```js
(
  element: Element,
  props: Partial<Element>
  )=>boolean
```

函数行为：使用`===`判断element是否满足一组属性

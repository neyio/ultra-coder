# Editor
## usage
```js
import {Range} from 'slate';
```

## interface
```js
export interface Range {
  anchor: Point,
  focus: Point,
  [key: string]: any
};

export type PointEntry = [Point, 'anchor' | 'focus'];
```

## api

### edges
```js
(
  range: Range,
  options:{
    reverse?: boolean,
  }
  )=>[Point,Point]
```
|    Arguments    | Required | Default Value |
|:---------------:|:--------:|:-------------:|
|      range      |   true   |       -       |
| options.reverse |  false   |     false     |

函数行为：返回\[startPoint,endPoint\]

### end
```js
(
  range: Range
  )=>Point
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   range   |   true   |       -       |

函数行为: 返回endPoint

### equal
```js
(
  range: Range,
  another: Range
  )=>boolean
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   range   |   true   |       -       |
|  anoterh  |   true   |       -       |

函数行为：比较两个选取的是否相等

### includes
```js
(
  range: Range,
  target: Path | Point | Range
  )=>boolean
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   range   |   true   |       -       |
|  target   |   true   |       -       |

函数行为：target是否落在range范围内

### intersection
```js
(
  range: Range,
  another: Range
  )=>boolean
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   range   |   true   |       -       |
|  anoterh  |   true   |       -       |

函数行为：获得两个区间的相交区间


### is\[method\]
```js
(
  range: Range,
  another: Range
  )=>boolean
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   range    |   true   |       -       |
|  anoterh  |   true   |       -       |

这是一组函数，具体行为为:

  - isBackward: anchor > focus
  - isCollapsed:anchor = focus
  - isExpanded: anchor != focus
  - isForward: anchor < focus

### points
```js
*(
  range: Range
  )=>Iterable<[Point,'anchor'|'focus']>
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   range    |   true   |       -       |

函数行为: 逐步返回区间两个端点

### start
```js
(
  range: Range
  )=>Point
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   range   |   true   |       -       |

函数行为: 返回startPoint

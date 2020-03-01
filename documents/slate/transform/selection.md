# Editor
## usage
```js
import {Transform} from 'slate';
```

## api

### collapse
```js
(   
  editor: Editor,
  options: {
    edge?: 'anchor' | 'focus' | 'start' | 'end'
  }
  )=>void
```
|  Arguments   | Required | Default Value |
|:------------:|:--------:|:-------------:|
|    editor    |   true   |       -       |
| options.edge |  false   |   'anchor'    |

函数行为: 将selection闭合至选定点

### deselect
```js
(   
  editor: Editor,
  options: {
    edge?: 'anchor' | 'focus' | 'start' | 'end'
  }
  )=>void
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |

函数行为: 取消选区

### move
```js
(
    editor: Editor,
    options: {
      distance?: number
      unit?: 'offset' | 'character' | 'word' | 'line'
      reverse?: boolean
      edge?: 'anchor' | 'focus' | 'start' | 'end'
    }
  )=>void
```
|    Arguments     | Required | Default Value |
|:----------------:|:--------:|:-------------:|
|      editor      |   true   |       -       |
| options.distance |  false   |       1       |
|   options.unit   |  false   |  'character'  |
| options.reverse  |  false   |     false     |
|   options.edge   |  false   |     null      |

函数行为: 向前向后移动选区的端点,内部使用`Editor.before`和`Editor.after`来判断下一步的位置

  - edge
    + null: 两个端点
    + 'anchor' | 'focus' | 'start' | 'end': 对应端点

### select
```js
(
  editor: Editor,
  target: Location,
  )=>void
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |
|  target   |   true   |       -       |
函数行为: 选择特定的选取用作selection,内部调用`Editor.range`

### setPoint
```js
(
    editor: Editor,
    props: Partial<Point>,
    options: {
      edge?: 'anchor' | 'focus' | 'start' | 'end'
    }
  )=>void
```
|  Arguments   | Required | Default Value |
|:------------:|:--------:|:-------------:|
|    editor    |   true   |       -       |
|    props     |   true   |       -       |
| options.edge |  false   |     'both'      |

函数行为: 设置selection的特定点

 - edge: 'both'在目前的版本等价与'focus'


### setPoint
```js
(
    editor: Editor,
    props: Partial<Range>,
  )=>void
```
|  Arguments   | Required | Default Value |
|:------------:|:--------:|:-------------:|
|    editor    |   true   |       -       |
|    props     |   true   |       -       |

函数行为: 设置selection的特定属性

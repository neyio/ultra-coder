# Editor
## usage
```js
import {Transform} from 'slate';
```

## api

### delete
```js
(
  editor: Editor,
  options: {
    at?: Location
    distance?: number
    unit?: 'character' | 'word' | 'line' | 'block'
    reverse?: boolean
    hanging?: boolean
    voids?: boolean
  })=>void
```
|    Arguments     | Required |  Default Value   |
|:----------------:|:--------:|:----------------:|
|      editor      |   true   |        -         |
|    options.at    |  false   | editor.selection |
| options.distance |  false   |        1         |
|   options.unit   |  false   |   'character'    |
| options.reverse  |  false   |      false       |
| options.hanging  |  false   |      false       |
|  options.voids   |  false   |      false       |

函数行为: 删除选定区内容

 - at:
   + 当at为Path或at在void块内部: 转而调用`Editor.removeNodes`
   + others case: 删除选定文本内容

### insertFragment
```js
(
    editor: Editor,
    fragment: Node[],
    options: {
      at?: Location
      hanging?: boolean
      voids?: boolean
    } 
  )=>void
```
|    Arguments    | Required |  Default Value   |
|:---------------:|:--------:|:----------------:|
|     editor      |   true   |        -         |
|    fragment     |   true   |        -         |
|   options.at    |  false   | editor.selection |
| options.hanging |  false   |      false       |
|  options.voids  |  false   |      false       |

函数行为: 插入一段Fragment(比较复杂,建议实验)

### insertText
```js
(
  editor: Editor,
  text: string,
  options: {
    at?: Location
    voids?: boolean
  } 
  )=>void
```
|   Arguments   | Required |  Default Value   |
|:-------------:|:--------:|:----------------:|
|    editor     |   true   |        -         |
|     text      |   true   |        -         |
|  options.at   |  false   | editor.selection |
| options.voids |  false   |      false       |

函数行为: (如有必要,先调用`Transform.delete`)插入一段文字

 - at: 
   + at `instanceof` Range|Path: 先在`Editor.range`确定范围上调用`Transform.delete`

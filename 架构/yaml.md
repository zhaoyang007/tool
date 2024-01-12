# yaml语法

YAML（YAML Ain't Markup Language）是一种用于配置文件和数据交换的人类可读的数据序列化格式。YAML 通常用于配置文件、数据存储、数据传输等场景。它的语法设计得简洁易懂，易于人类阅读和编辑，同时也易于计算机解析和生成。

![Snipaste_2024-01-12_15-35-28](images/Snipaste_2024-01-12_15-35-28.png)

![Snipaste_2024-01-12_15-36-02](images/Snipaste_2024-01-12_15-36-02.png)

## 基本语法规则

1. **基础结构**:

   - YAML 使用缩进来表示层级关系。
   - 缩进可以使用空格，但不能使用制表符（Tab）。

2. **键值对**:

   - 基本的键值对使用冒号和空格来分隔键和值。
   - 示例：`key: value`

3. **列表（数组）**:

   - 列表项以短横线开头（`-`），后跟空格。

   - 示例：

     ```yml
     - item1
     - item2
     - item3
     ```
   
4. **字典（映射）**:

   - 字典是键值对的集合。

   - 示例：

     ```yml
     key1: value1
     key2: value2
     ```
   
5. **嵌套结构**:

   - 列表和字典可以嵌套使用。

   - 示例：

     ```yml
     fruits:
       - apple
       - banana
     vegetables:
       - carrot
       - lettuce
     ```
   
6. **多行字符串**:

   - 使用 `|` 表示保留换行符的多行字符串。

   - 使用 `>` 表示折叠换行符的多行字符串。

   - 示例：

     ```yml
     yamlCopy code
     folded_style: >
       This is a very long sentence
       that spans several lines in the YAML
       but this will be folded into a single
       line in the processed output.
     literal_style: |
       This is a very long sentence
       that spans several lines in the YAML
       and it will remain as is, with line
       breaks in the processed output.
     ```

7. **注释**:

   - 使用 `#` 符号进行注释。
   - 示例：`# 这是一个注释`

8. **复杂结构**:

   - 可以使用复杂的嵌套结构来表示更复杂的数据。

   - 示例：

     ```yml
     family:
       parents:
         - name: John
           age: 45
         - name: Jane
           age: 43
       children:
         - name: Jim
           age: 20
         - name: Jenna
           age: 18
     ```

## 注意事项

- **敏感性**：YAML 对缩进非常敏感，错误的缩进可能导致解析错误。
- **数据类型**：YAML 支持字符串、数值、布尔值等基本数据类型，以及日期和时间类型。
- **缩进规范**：推荐使用两个空格作为基本的缩进单位。

YAML 由于其简洁和清晰的语法，广泛应用于配置文件、数据交换等领域，特别是在 DevOps 和云计算领域中得到了广泛的应用。
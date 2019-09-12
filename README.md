# y-dom-select
> 选择页面，修改选中部分的样式

## 使用

引入js文件
```html
    <script src="index.js">
        var s = addSelect({
            el: '#text',
            onSelect: function (e, cur) {
              // cur是当前选中的元素;
            },
            backgroundColor: 'red',
            color: '#fff'
        })
        
    </script>
```


需要修改选中元素的样式

```js
    var dom = s.getSelect();
    dom.style.textDecoration = 'underline';
```

具体请查看`example.html`

## todo

 [ ] getSelect返回的dom被简单包装（类似jQ）

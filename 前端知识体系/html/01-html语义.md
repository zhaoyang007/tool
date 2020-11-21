语义类标签对开发者更为友好，语义类标签增强了可读性，能够清晰地看出网页的结构，便于团队的开发和维护。

语义类标签也更适合搜索引擎检索（SEO），也可以让搜索引擎爬虫更好地获取到更多有效信息，有效提升网页的搜索量，并且语义类还可以支持读屏软件，根据文章可以自动生成目录等等。

正确使用整体结构类的语义标签，可以让页面对机器更友好。比如，这里一个典型的 body 类似这样：

在 body 下面，有一个 header，header 里面是一个 nav，跟 header 同级的有一个 aside，aside 里面也有一个 nav。接下来是文章的整体，也就是一个一个的 section。section 里面可能还有嵌套，但是我们就不管了，最后是一个 footer，这个 footer 里面可能有 address 这样的内容。

```html
<body>
    <header>
        <nav>
            ……
        </nav>
    </header>
    <aside>
        <nav>
            ……
        </nav>
    </aside>
    <section>……</section>
    <section>……</section>
    <section>……</section>
    <footer>
        <address>……</address>
    </footer>
</body>
```

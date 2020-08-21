语义类标签是工作中经常会用到的一类标签，它们的特点是视觉表现上互相都差不多，主要的区别在于它们表示了不同的语义，比如大家会经常见到的 section、nav、p，这些都是语义类的标签。

不用复杂的语义标签， 只靠 div 和 span 也是是可以的。

不过，在很多工作场景里，语义类标签也有它们自己无可替代的优点，正确地使用语义标签可以带来很多好处。

* 语义类标签对开发者更为友好，使用语义类标签增强了可读性，能够清晰地看出网页的结构，便于团队的开发和维护。
* 除了对人类友好之外，语义类标签也更适合搜索引擎检索（SEO），也可以让搜索引擎爬虫更好地获取到更多有效信息，有效提升网页的搜索量，并且语义类还可以支持读屏软件，根据文章可以自动生成目录等等。

错误地使用语义标签，会给机器阅读造成混淆、增加嵌套，给 CSS 编写加重负担。

所以，对于语义标签，态度是：“用对”比“不用”好，“不用”比“用错”好。

我们正确使用整体结构类的语义标签，可以让页面对机器更友好。比如，这里一个典型的 body 类似这样：

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

在 body 下面，有一个 header，header 里面是一个 nav，跟 header 同级的有一个 aside，aside 里面也有一个 nav。接下来是文章的整体，也就是一个一个的 section。section 里面可能还有嵌套，但是我们就不管了，最后是一个 footer，这个 footer 里面可能有 address 这样的内容。

除此之外，还有 article，article 是一种特别的结构，它表示具有一定独立性质的文章。所以，article 和 body 具有相似的结构，同时，一个 HTML 页面中，可能有多个 article 存在。

一个典型的场景是多篇新闻展示在同一个新闻专题页面中，这种类似报纸的多文章结构适合用 article 来组织。

```html
<body>
    <header>……</header>
    <article>
        <header>……</header>
        <section>……</section>
        <section>……</section>
        <section>……</section>
        <footer>……</footer>
    </article>
    <article>
        ……
    </article>
    <article>
        ……
    </article>
    <footer>
        <address></address>
    </footer>
</body>
```

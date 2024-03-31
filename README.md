# be-fetch

*be-fetch* turns the tag it adorns into a web component that inherits from [fetch-for](https://github.com/bahrus/fetch-for).

It provides a way to declaratively define custom elements without script, but is strictly limited to non-visual "web components as a service" type custom elements.

```html
<input name=op value=integrate>
<input name=expr value=x^2>
<newton-microservice
    enh-be-fetch
    for="@op @expr"
    oninput="event.href=`https://newton.now.sh/api/v2/${event.forData.op.value}/${event.forData.expr.value}`"
    target=-object
    onerror=console.error(href)
>
</newton-microservice>
...
<json-viewer -object></json-viewer>

```

Because newton-microservice gets turned into a web component, we can reuse the tag elsewhere in the document (no need for the enh-be-fetch attribute once it is registered).

But don't get your hopes up too high -- all the other attributes shown above will also need to be specified (no sharing of default property values is created on the fly, in case you were wondering about that.)

## Using a custom web component to extend. [Untested]

The *fetch-for* web component is a fairly non-opinionated web component.  But often times any particular app will want to make particular choices as far as how to define the base url for all the fetch requests, credentials, JWT headers, etc.  fetch-for provides [many small methods](https://github.com/bahrus/fetch-for/blob/baseline/fetch-for.ts) that can be overridden to allow this to be customized according to such needs.

Such app's can define their own web component, most likely extending fetch-for.

be-fetch can be instructed to use this custom web component definition, instead of the default fetch-for, via two alternate ways (or combine as needs warrant):

### Approach 1 (DRY)

Somewhere in the document (probably ideally within the head tag at the top), add a "link" tag (or any other tag really) with id be-fetch, and attribute data-inherits.  For example:

```html
<html>
    <head>
        <link rel=modulepreload id=be-fetch data-inherits=my-custom-base-fetch-element href=https://myapp.com/resources/be-fetch.js >
    </head>
</html>
```

### Approach 2 (Highly customizable)

specify the custom element name to inherit from within the adorned tag itself:


```html
<medical-prescriptions zero=name
    enh-be-fetch 
    inherits=my-custom-base-fetch-element
    onerror
    href="https://my-website.com/prescriptions/patient/zero">
<medical-prescriptions>
```

[TODO] Consider security implications.  Seems like there could be a danger in allowing free form html to "register itself" as a custom element without some buy in that gets weeded out via sanitizers.
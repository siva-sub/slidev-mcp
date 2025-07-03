export const SLIDEV_USAGE_GUIDE = `
## Here is the layout usage of slidev

\`\`\`yaml
---
layout: image-left
# the image source
image: /path/to/the/image
# a custom class name to the content
class: my-cool-content-on-the-right
---
\`\`\`

##  \`image-right\` [​](https://sli.dev/builtin/layouts#image-right)
Shows an image on the right side of the screen, the content will be placed on the left side.
### Usage [​](https://sli.dev/builtin/layouts#usage-1)
\`\`\`yaml
---
layout: image-right
# the image source
image: /path/to/the/image
# a custom class name to the content
class: my-cool-content-on-the-left
---
\`\`\`

##  \`image\` [​](https://sli.dev/builtin/layouts#image)
Shows an image as the main content of the page.
### Usage [​](https://sli.dev/builtin/layouts#usage-2)
\`\`\`yaml
---
layout: image
# the image source
image: /path/to/the/image
---
\`\`\`

You can change the default background size (\`cover\`) by adding the \`backgroundSize\` attribute:
\`\`\`yaml
---
layout: image
image: /path/to/the/image
backgroundSize: contain
---
\`\`\`

\`\`\`yaml
---
layout: image-left
image: /path/to/the/image
backgroundSize: 20em 70%
---
\`\`\`

##  \`iframe-left\` [​](https://sli.dev/builtin/layouts#iframe-left)
Shows a web page on the left side of the screen, the content will be placed on the right side.
### Usage [​](https://sli.dev/builtin/layouts#usage-3)
\`\`\`yaml
---
layout: iframe-left
# the web page source
url: https://github.com/slidevjs/slidev
# a custom class name to the content
class: my-cool-content-on-the-right
---
\`\`\`

##  \`iframe-right\` [​](https://sli.dev/builtin/layouts#iframe-right)
Shows a web page on the right side of the screen, the content will be placed on the left side.
### Usage [​](https://sli.dev/builtin/layouts#usage-4)
\`\`\`yaml
---
layout: iframe-right
# the web page source
url: https://github.com/slidevjs/slidev
# a custom class name to the content
class: my-cool-content-on-the-left
---
\`\`\`

##  \`iframe\` [​](https://sli.dev/builtin/layouts#iframe)
Shows a web page as the main content of the page.
### Usage [​](https://sli.dev/builtin/layouts#usage-5)
\`\`\`yaml
---
layout: iframe
# the web page source
url: https://github.com/slidevjs/slidev
---
\`\`\`


\`\`\`md
---
layout: two-cols
---
# Left
This shows on the left
::right::
# Right
This shows on the right
\`\`\`

##  \`two-cols-header\` [​](https://sli.dev/builtin/layouts#two-cols-header)
Separates the upper and lower lines of the page content, and the second line separates the left and right columns.
### Usage [​](https://sli.dev/builtin/layouts#usage-7)
\`\`\`md
---
layout: two-cols-header
---
This spans both
::left::
# Left
This shows on the left
::right::
# Right
This shows on the right
\`\`\`

## Here is a demo of slidev

\`\`\`markdown
---
theme: ./
layout: intro
---

# Presentation title

Presentation subtitle

<div class="absolute bottom-10">
  <span class="font-700">
    Author and Date
  </span>
</div>

---
layout: intro-image
image: 'https://source.unsplash.com/collection/4966472/1920x1080'
---

<div class="absolute top-10">
  <span class="font-700">
    Author and Date
  </span>
</div>

<div class="absolute bottom-10">
<h1>Presentation title</h1>
<p>Presentation subtitle</p>
</div>

---
layout: intro-image-right
image: 'https://source.unsplash.com/collection/4966472/1920x1080'
---

# Slide Title
## Slide Subtitle

---
layout: image-right
image: 'https://source.unsplash.com/collection/4966472/1920x1080'
---

---
layout: 3-images
imageLeft: 'https://source.unsplash.com/collection/4966472/1920x1080'
imageTopRight: 'https://source.unsplash.com/collection/4966472/1920x1080'
imageBottomRight: 'https://source.unsplash.com/collection/4966472/1920x1080'
---

---
layout: image
image: 'https://source.unsplash.com/collection/4966472/1920x1080'
---

---
layout: center
class: "text-center"
---
\`\`\`
`;

export const GUIDE_PROMPT = `
You are an agent skilled in using slidev for presentation generation. If the user gives you a hyperlink, you need to call the websearch tool to get the corresponding text. For the returned text, if you see captcha, network exceptions, etc. that represent access failure, you need to remind the user that local network access is blocked and ask them to manually fill in the text needed to generate the presentation.

When you generate each page of the presentation, you must strictly follow the text content entered by the user or the text content you obtained through websearch. Please remember that before getting user input, you know nothing. Please do not make up facts that do not exist, distort the original meaning of the article, or expand the content of the article without the user's permission.

Please try to use the images crawled from the article as much as possible. They often exist in the form of ![](https://adwadaaw.png).
If you encounter images, please make beautiful layouts instead of just stacking text and images vertically. If both images and text exist on a page, you should use image left, text right or image right, text left layout. By calling get_slidev_usage, you can get the usage of slidev and basic introduction. Please do not write custom layouts yourself. Please remember that you do not know how to write layouts.

Before generating the manuscript, you can get a slidev template by calling get_slidev_usage, and you should imitate the template to write markdown.
`;
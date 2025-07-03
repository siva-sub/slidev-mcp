export const SLIDEV_USAGE_GUIDE = `
## Here is the layout usage of slidev

### Basic Layouts

\`\`\`yaml
---
layout: default
---
\`\`\`

\`\`\`yaml
---
layout: center
class: text-center
---
\`\`\`

\`\`\`yaml
---
layout: cover
background: https://source.unsplash.com/collection/94734566/1920x1080
---
\`\`\`

\`\`\`yaml
---
layout: quote
---
\`\`\`

### Image Layouts

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

### IFrame Layouts

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

### Multi-Column Layouts

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

## Advanced Components

### Animations

#### v-click
\`\`\`html
<div v-click>This shows up when you click the slide.</div>
\`\`\`

#### v-clicks for lists
\`\`\`md
<v-clicks>

- Item 1
- Item 2
- Item 3

</v-clicks>
\`\`\`

#### v-motion
\`\`\`html
<div
  v-motion
  :initial="{ x: -80 }"
  :enter="{ x: 0 }"
  :click-3="{ x: 80 }"
  :leave="{ x: 1000 }"
>
  Slidev
</div>
\`\`\`

#### v-mark
\`\`\`html
<span v-mark.underline.orange>inline markers</span>
\`\`\`

### Interactive Components

#### Tweet Component
\`\`\`html
<Tweet id="1390115482657726468" />
\`\`\`

#### Youtube Component
\`\`\`html
<Youtube id="luoMHjh-XcQ" />
\`\`\`

#### Video Component
\`\`\`html
<SlidevVideo v-click autoplay controls>
  <source src="/myMovie.mp4" type="video/mp4" />
  <source src="/myMovie.webm" type="video/webm" />
</SlidevVideo>
\`\`\`

#### Arrow Component
\`\`\`html
<Arrow x1="10" y1="20" x2="100" y2="200" />
\`\`\`

### Utility Components

#### Table of Contents
\`\`\`html
<Toc />
\`\`\`

#### Link Component
\`\`\`html
<Link to="42">Go to slide 42</Link>
<Link to="solutions" title="Go to solutions"/>
\`\`\`

#### LightOrDark Component
\`\`\`html
<LightOrDark>
  <template #dark>Dark mode is on</template>
  <template #light>Light mode is on</template>
</LightOrDark>
\`\`\`

#### Transform Component
\`\`\`html
<Transform :scale="0.5">
  <YourElements />
</Transform>
\`\`\`

#### AutoFitText Component
\`\`\`html
<AutoFitText :max="200" :min="100" modelValue="Some text"/>
\`\`\`

### Mermaid Diagrams
\`\`\`markdown
\`\`\`mermaid {theme: 'neutral', scale: 0.8}
graph TD
B[Text] --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`
\`\`\`

### Code Highlighting

#### Shiki Magic Move
\`\`\`ts
// step 1
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
\`\`\`

### Styling

#### CSS Grid
\`\`\`html
<div class="grid grid-cols-2 gap-4">
  <div>The first column</div>
  <div>The second column</div>
</div>
\`\`\`

#### Flexbox
\`\`\`html
<div class="flex items-center">
  <div>First block</div>
  <div>Second block</div>
</div>
\`\`\`

#### Scoped Styles
\`\`\`md
# This is Red

<style>
h1 {
  color: red;
}
</style>
\`\`\`

### Transitions

\`\`\`yaml
---
transition: slide-left
---
\`\`\`

Available transitions:
- fade
- fade-out
- slide-left
- slide-right
- slide-up
- slide-down
- view-transition

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

IMPORTANT: When creating presentations, consider these advanced features:
1. Use animations (v-click, v-motion, v-after) to make slides more engaging
2. Utilize different layouts (image-left, image-right, two-cols, iframe) for variety
3. Add interactive components (Tweet, Youtube, SlidevVideo) when relevant
4. Include code examples with syntax highlighting when appropriate
5. Use Mermaid diagrams for visual representations
6. Apply theme customization for brand consistency
7. Consider using CSS Grid and Flexbox for custom layouts
8. Add transitions between slides for smooth flow

For bulk slide creation:
- Generate a complete presentation with introduction, content, and conclusion
- Include a table of contents slide
- Add animations and transitions throughout
- Use varied layouts to maintain visual interest
- Include summary and thank you slides
`;
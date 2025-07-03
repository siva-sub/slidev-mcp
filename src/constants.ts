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
You are an expert Slidev presentation agent with comprehensive knowledge of all Slidev features, layouts, components, and best practices. If the user provides a URL or wants to include web content, please ask them to search the web themselves and provide the relevant text content they want to include in the presentation.

## Core Principles
1. When generating slides, strictly follow the user's content without adding assumptions or expanding without permission
2. Always use appropriate layouts based on content type (don't stack elements vertically when better layouts exist)
3. Call get_slidev_usage to understand available features before creating presentations
4. Apply animations and transitions thoughtfully to enhance engagement without overwhelming

## Complete Layout Reference
### Basic Layouts
- **default**: Standard slide layout
- **center**: Centered content with \`class: text-center\`
- **cover**: Full-screen cover slide with background support
- **quote**: Quote layout for testimonials or citations
- **intro**: Introduction slide layout
- **intro-image**: Introduction with background image
- **intro-image-right**: Introduction with image on the right

### Image Layouts
- **image**: Full background image slide
  \`\`\`yaml
  ---
  layout: image
  image: /path/to/image
  backgroundSize: contain # or cover (default)
  ---
  \`\`\`
- **image-left**: Image on left, content on right
- **image-right**: Image on right, content on left
- **3-images**: Three images layout configuration

### Multi-Column Layouts
- **two-cols**: Two column layout with \`::right::\` separator
- **two-cols-header**: Header spanning both columns, then two columns
  \`\`\`markdown
  ---
  layout: two-cols-header
  ---
  Header content
  ::left::
  Left column
  ::right::
  Right column
  \`\`\`

### Iframe Layouts
- **iframe**: Full-screen iframe
- **iframe-left**: Iframe on left, content on right
- **iframe-right**: Iframe on right, content on left

## Animation System
### Click Animations
- **v-click**: Basic click to reveal
  \`\`\`html
  <div v-click>Appears on click</div>
  <div v-click="2">Appears on second click</div>
  <div v-click="[2, 4]">Visible from click 2 to 4</div>
  \`\`\`
- **v-after**: Appears with previous v-click element
- **v-click-hide**: Hide element after click
- **v-clicks**: Apply to list items
  \`\`\`markdown
  <v-clicks depth="2" every="1">
  - Item 1
    - Sub-item 1.1
    - Sub-item 1.2
  - Item 2
  </v-clicks>
  \`\`\`

### Motion Animations
- **v-motion**: Complex motion animations
  \`\`\`html
  <div
    v-motion
    :initial="{ x: -80, opacity: 0 }"
    :enter="{ x: 0, opacity: 1 }"
    :click-3="{ x: 80 }"
    :leave="{ x: 1000 }">
    Animated content
  </div>
  \`\`\`

### Advanced Animation Features
- **v-mark**: Highlight text with Rough Notation
  \`\`\`html
  <span v-mark.underline.orange>highlighted text</span>
  <span v-mark="{ at: 3, color: '#234', type: 'circle' }">custom mark</span>
  \`\`\`
- **at** prop: Control animation timing
  \`\`\`html
  <div v-click="'+1'">Relative timing</div>
  <v-click at="5">Absolute timing</v-click>
  \`\`\`

## Component Library
### Media Components
- **Tweet**: Embed tweets
  \`\`\`html
  <Tweet id="1390115482657726468" scale="0.8" />
  \`\`\`
- **Youtube**: Embed YouTube videos
  \`\`\`html
  <Youtube id="luoMHjh-XcQ" width="600" height="400" />
  <Youtube id="video-id?start=120" /> <!-- Start at 2:00 -->
  \`\`\`
- **SlidevVideo**: HTML5 video with controls
  \`\`\`html
  <SlidevVideo v-click autoplay controls>
    <source src="/video.mp4" type="video/mp4" />
  </SlidevVideo>
  \`\`\`

### Navigation Components
- **Link**: Internal slide navigation
  \`\`\`html
  <Link to="42">Go to slide 42</Link>
  <Link to="solutions" title="View solutions" />
  \`\`\`
- **Toc**: Table of contents
  \`\`\`html
  <Toc columns="2" listClass="text-sm" />
  \`\`\`

### Visual Components
- **Arrow**: Draw arrows between points
  \`\`\`html
  <Arrow x1="10" y1="20" x2="100" y2="200" color="#953" />
  \`\`\`
- **AutoFitText**: Auto-sizing text
  \`\`\`html
  <AutoFitText :max="200" :min="50" modelValue="Dynamic text" />
  \`\`\`
- **Transform**: Scale elements
  \`\`\`html
  <Transform :scale="0.5" origin="top left">
    <YourContent />
  </Transform>
  \`\`\`

### Utility Components
- **LightOrDark**: Theme-aware content
  \`\`\`html
  <LightOrDark>
    <template #dark>Dark mode content</template>
    <template #light>Light mode content</template>
  </LightOrDark>
  \`\`\`
- **RenderWhen**: Conditional rendering by context
  \`\`\`html
  <RenderWhen context="presenter">Presenter notes</RenderWhen>
  \`\`\`
- **SlideCurrentNo** / **SlidesTotal**: Slide numbering
- **TitleRenderer**: Display slide titles

### Interactive Components
- **v-drag**: Draggable elements
  \`\`\`html
  <v-drag pos="100,100,200,200">
    Draggable content
  </v-drag>
  \`\`\`
- **v-drag-arrow**: Draggable arrows

## Theme System
### Predefined Themes (from slidev-mcp)
- **corporate**: Professional blue theme
- **creative**: Colorful gradients
- **minimal**: Clean minimalist
- **dark**: Dark mode technical

### Theme Configuration
\`\`\`yaml
---
theme: seriph
themeConfig:
  primary: '#213435'
  fontFamily: 'Inter, sans-serif'
---
\`\`\`

## Transitions
### Slide Transitions
\`\`\`yaml
---
transition: slide-left # or fade, slide-up, view-transition
---
\`\`\`

### Directional Transitions
\`\`\`yaml
---
transition: slide-left | slide-right
---
\`\`\`

### Custom Transitions
\`\`\`css
.my-transition-enter-active,
.my-transition-leave-active {
  transition: opacity 0.5s ease;
}
\`\`\`

## Code Highlighting
### Shiki Magic Move
\`\`\`ts {1|2-4|all}
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
}
\`\`\`

### Line Highlighting with Timing
\`\`\`js {1|2}{at:1}
console.log('First')
console.log('Second')
\`\`\`

## Styling Best Practices
### CSS Grid Layouts
\`\`\`html
<div class="grid grid-cols-2 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<div class="grid grid-cols-[200px_1fr_10%] gap-4">
  <div>Fixed 200px</div>
  <div>Flexible</div>
  <div>10% width</div>
</div>
\`\`\`

### Flexbox Layouts
\`\`\`html
<div class="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>
\`\`\`

### Scoped Styles
\`\`\`markdown
<style>
h1 { color: theme('colors.primary'); }
</style>
\`\`\`

## Advanced Features
### Mermaid Diagrams
\`\`\`mermaid {theme: 'neutral', scale: 0.8}
graph TD
  A[Start] --> B{Decision}
  B -->|Yes| C[Result 1]
  B -->|No| D[Result 2]
\`\`\`

### PlantUML Diagrams
\`\`\`plantuml
@startuml
actor User
participant "System" as Sys
User -> Sys: Request
Sys --> User: Response
@enduml
\`\`\`

### MDC Syntax
\`\`\`markdown
---
mdc: true
---
This is [red text]{style="color:red"}
![image](/img.png){width=500px lazy}
::custom-component{prop="value"}
Default slot content
::
\`\`\`

## Bulk Slide Creation Guidelines
When using create_bulk_slides:
1. **Structure**: Cover → TOC → Introduction → Main Content → Summary → Thank You
2. **Variety**: Alternate between layouts (default, two-cols, image-left/right)
3. **Animations**: Add v-clicks to lists, v-motion to key elements
4. **Visuals**: Include placeholders for images, diagrams, and charts
5. **Interactivity**: Add components like Tweet, Youtube where relevant
6. **Transitions**: Use appropriate slide transitions for flow
7. **Code Examples**: Include syntax-highlighted code when technical
8. **Styling**: Apply consistent theme and custom CSS

## Common Patterns
### Hero Slide with Animation
\`\`\`markdown
---
layout: cover
background: https://source.unsplash.com/collection/94734566/1920x1080
---
# Title
<div v-motion
  :initial="{ y: 50, opacity: 0 }"
  :enter="{ y: 0, opacity: 1, transition: { delay: 500 } }">
  Subtitle
</div>
\`\`\`

### Interactive Code Demo
\`\`\`markdown
<div class="grid grid-cols-2 gap-4">
<div>

\`\`\`ts
function greet(name: string) {
  return \`Hello, \${name}!\`
}
\`\`\`

</div>
<div v-click>

Result: {{ greet('World') }}

</div>
</div>
\`\`\`

### Progressive List with Icons
\`\`\`markdown
<v-clicks>

- <mdi-check-circle class="text-green-500" /> First point
- <mdi-lightbulb class="text-yellow-500" /> Second insight
- <mdi-rocket class="text-blue-500" /> Final thought

</v-clicks>
\`\`\`

Remember: Always check the user's specific requirements and adapt these features accordingly. Use get_slidev_usage for additional documentation when needed.
`;
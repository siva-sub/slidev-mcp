from mcp.server.fastmcp import FastMCP
from typing import Optional, Union, List, NamedTuple, Dict
import subprocess
import sys
import shutil
from pathlib import Path
import os
from utils import parse_markdown_slides
import asyncio
from crawl4ai import AsyncWebCrawler

mcp = FastMCP('slidev-mcp', version="0.0.1")

# 全局变量存储当前活动的Slidev项目
ACTIVE_SLIDEV_PROJECT: Optional[Dict] = None
SLIDEV_CONTENT: List[str] = []

class SlidevResult(NamedTuple):
    success: bool
    message: str
    output: Optional[Union[str, int, List[str]]] = None

def check_nodejs_installed() -> bool:
    return shutil.which("node") is not None

def run_command(command: Union[str, List[str]]) -> SlidevResult:
    try:
        result = subprocess.run(
            command,
            cwd='./',
            capture_output=True,
            text=True,
            shell=isinstance(command, str)
        )
        if result.returncode == 0:
            return SlidevResult(True, "Command executed successfully", result.stdout)
        else:
            return SlidevResult(False, f"Command failed: {result.stderr}")
    except Exception as e:
        return SlidevResult(False, f"Error executing command: {str(e)}")

def parse_markdown_slides(content: str) -> list:
    """
    解析markdown内容，按YAML front matter切分幻灯片
    """
    slides = []
    current_slide = []
    in_yaml = False
    
    for line in content.splitlines():
        if line.strip() == '---' and not in_yaml:
            # 开始YAML front matter
            if not current_slide:
                in_yaml = True
                current_slide.append(line)
            else:
                # 遇到新的幻灯片分隔符
                slides.append('\n'.join(current_slide))
                current_slide = [line]
                in_yaml = True
        elif line.strip() == '---' and in_yaml:
            # 结束YAML front matter
            current_slide.append(line)
            in_yaml = False
        else:
            current_slide.append(line)
    
    # 添加最后一个幻灯片
    if current_slide:
        slides.append('\n'.join(current_slide))
    
    return slides

def load_slidev_content(path: str) -> bool:
    global SLIDEV_CONTENT, ACTIVE_SLIDEV_PROJECT
    
    slides_path = Path(path) / "slides.md"
    if not slides_path.exists():
        return False
    
    with open(slides_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 初始化全局变量
    ACTIVE_SLIDEV_PROJECT = {
        "path": str(path),
        "slides_path": str(slides_path)
    }
    
    slides = parse_markdown_slides(content)
    SLIDEV_CONTENT = [slide.strip() for slide in slides if slide.strip()]
    return True

def save_slidev_content() -> bool:
    global ACTIVE_SLIDEV_PROJECT, SLIDEV_CONTENT
    
    if not ACTIVE_SLIDEV_PROJECT:
        return False
    
    with open(ACTIVE_SLIDEV_PROJECT["slides_path"], 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(SLIDEV_CONTENT))
    
    return True

@mcp.tool(
    name='websearch',
    description='search the given https url and get the markdown text of the website'
)
async def websearch(url: str) -> SlidevResult:
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url)
        return SlidevResult(True, "success", result.markdown)

@mcp.tool(
    name='check_environment',
    description='check if nodejs and slidev-cli is ready'
)
def check_environment() -> SlidevResult:
    if not check_nodejs_installed():
        return SlidevResult(False, "Node.js is not installed. Please install Node.js first.")
    
    result = run_command("slidev --version")
    if not result.success:
        return run_command("npm install -g @slidev/cli")
    return SlidevResult(True, "环境就绪，slidev 可以使用", result.output)


@mcp.tool(
    name='create_slidev',
    description='create slidev, you need to ask user to get title and author to continue the task, you don\'t know title and author at beginning',
)
def create_slidev(path: str, title: str, author: str) -> SlidevResult:
    global ACTIVE_SLIDEV_PROJECT, SLIDEV_CONTENT

    # clear global var
    ACTIVE_SLIDEV_PROJECT = None
    SLIDEV_CONTENT = []
    
    env_check = check_environment()
    if not env_check.success:
        return env_check
    
    try:
        # 创建目标文件夹
        os.makedirs(path, exist_ok=True)
        
        # 在文件夹内创建slides.md文件
        slides_path = os.path.join(path, 'slides.md')

        # 如果已经存在 slides.md，则读入内容，初始化
        if os.path.exists(slides_path):
            load_slidev_content(path)
            return SlidevResult(True, f"项目已经存在于 {path}/slides.md 中", SLIDEV_CONTENT)
        else:
            SLIDEV_CONTENT = []

        with open(slides_path, 'w') as f:
            f.write("""
---
theme: default
layout: cover
transition: slide-left
background: https://images.unsplash.com/photo-1502189562704-87e622a34c85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80
---

# Your title
## sub title

""".strip())
        
        # 尝试加载内容
        if not load_slidev_content(path):
            return SlidevResult(False, "successfully create project but fail to load file", path)
            
        return SlidevResult(True, f"successfully load slidev project {path}", path)
        
    except OSError as e:
        return SlidevResult(False, f"fail to create file: {str(e)}", path)
    except IOError as e:
        return SlidevResult(False, f"fail to create file: {str(e)}", path)
    except Exception as e:
        return SlidevResult(False, f"unknown error: {str(e)}", path)


@mcp.tool(
    name='load_slidev',
    description='load exist slidev project and get the current slidev markdown content',
)
def load_slidev(path: str) -> SlidevResult:
    if load_slidev_content(path):
        return SlidevResult(True, f"Slidev project loaded from {path}", SLIDEV_CONTENT)
    return SlidevResult(False, f"Failed to load Slidev project from {path}")


@mcp.tool(
    name='make_cover',
    description='Create or update slidev cover. If user give enough information, you can use it to update cover page, otherwise you must ask the lacking information. `background` must be a valid url of image',
)
def make_cover(title: str, subtitle: str = "", author: str = "", date: str = "", background: str = "") -> SlidevResult:
    global SLIDEV_CONTENT
    
    if not ACTIVE_SLIDEV_PROJECT:
        return SlidevResult(False, "No active Slidev project. Please create or load one first.")
    
    template = f"""
---
theme: default
layout: cover
transition: slide-left
background: {background}
---

# {title}
## {subtitle}
### Presented By {author} at {date}
""".strip()

    # 更新或添加封面页
    SLIDEV_CONTENT[0] = template
    
    save_slidev_content()
    return SlidevResult(True, "Cover page updated", 0)

@mcp.tool(
    name='add_page',
    description="""Add new page.
`content` is markdown format text to describe page content.
- You can use ```code ```, latex or mermaid to represent more complex idea or concept. 
- Too long or short content is forbidden.
`layout` is slidev layout name, the document is here: https://sli.dev/builtin/layouts
- If you don't know how to write slidev, you can query the example of the default theme here: https://raw.githubusercontent.com/slidevjs/themes/refs/heads/main/packages/theme-apple-basic/example.md
- Remember to look up for this document at most once during the task. 
"""
)
def add_page(content: str, layout: str = "default") -> SlidevResult:
    global SLIDEV_CONTENT
    
    if not ACTIVE_SLIDEV_PROJECT:
        return SlidevResult(False, "No active Slidev project. Please create or load one first.")
    
    template = f"""
---
layout: {layout}
transition: slide-left
---

{content}

""".strip()

    SLIDEV_CONTENT.append(template)
    page_index = len(SLIDEV_CONTENT) - 1
    save_slidev_content()
    
    return SlidevResult(True, f"Page added at index {page_index}", page_index)

@mcp.tool(
    name='set_page',
    description="""
`index`: the index of the page to set. 0 is cover, so you should use index in [1, {len(SLIDEV_CONTENT) - 1}]
`content`: the markdown content to set.
- You can use ```code ```, latex or mermaid to represent more complex idea or concept. 
- Too long or short content is forbidden.
`layout`: the layout of the page.
- If you don't know how to write slidev, you can query the example of the default theme here: https://raw.githubusercontent.com/slidevjs/themes/refs/heads/main/packages/theme-apple-basic/example.md
- Remember to look up for this document at most once during the task. 
""",
)
def set_page(index: int, content: str, layout: str = "") -> SlidevResult:
    global SLIDEV_CONTENT
    
    if not ACTIVE_SLIDEV_PROJECT:
        return SlidevResult(False, "No active Slidev project. Please create or load one first.")
    
    if index < 0 or index >= len(SLIDEV_CONTENT):
        return SlidevResult(False, f"Invalid page index: {index}")
    
    template = f"""
---
layout: {layout}
transition: slide-left
---

{content}

""".strip()
    
    SLIDEV_CONTENT[index] = template
    save_slidev_content()
    
    return SlidevResult(True, f"Page {index} updated", index)

@mcp.tool(
    name='get_page',
    description='get the content of the `index` th page',
)
def get_page(index: int) -> SlidevResult:
    if not ACTIVE_SLIDEV_PROJECT:
        return SlidevResult(False, "No active Slidev project. Please create or load one first.")
    
    if index < 0 or index >= len(SLIDEV_CONTENT):
        return SlidevResult(False, f"Invalid page index: {index}")
    
    return SlidevResult(True, f"Content of page {index}", SLIDEV_CONTENT[index])

@mcp.tool(
    name='start_slidev',
    description='launch a http web server to display slidev content'
)
def start_slidev() -> SlidevResult:
    if not ACTIVE_SLIDEV_PROJECT:
        return SlidevResult(False, "No active Slidev project. Please create or load one first.")
    
    project_path = ACTIVE_SLIDEV_PROJECT['path']
    return run_command(f"cd {project_path} && yes | slidev --open")


# @mcp.tool(
#     name='export_slidev',
#     description='导出Slidev为PDF或其他格式',
# )
# def export_slidev(format: str = "pdf") -> SlidevResult:
#     """导出Slidev演示文稿"""
#     if not ACTIVE_SLIDEV_PROJECT:
#         return SlidevResult(False, "No active Slidev project. Please create or load one first.")
#     return run_command(f"cd {ACTIVE_SLIDEV_PROJECT['path']} && slidev export --format {format}")

if __name__ == "__main__":
    mcp.run(transport='stdio')
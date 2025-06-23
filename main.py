from mcp.server.fastmcp import FastMCP
from typing import Optional, Union, List, NamedTuple, Dict
import subprocess
import sys
import shutil
from pathlib import Path

mcp = FastMCP('slidev-mcp', version="0.0.1")

# 全局变量存储当前活动的Slidev项目
ACTIVE_SLIDEV_PROJECT: Optional[Dict] = None
SLIDEV_CONTENT: List[str] = []

class SlidevResult(NamedTuple):
    success: bool
    message: str
    output: Optional[Union[str, int, List[str]]] = None

def check_nodejs_installed() -> bool:
    """检查系统是否安装了Node.js"""
    return shutil.which("node") is not None

def run_command(command: Union[str, List[str]]) -> SlidevResult:
    """执行shell命令并返回结果"""
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

def load_slidev_content(path: str) -> bool:
    """加载Slidev项目的slides.md内容到内存"""
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
    
    # 按---分割幻灯片页面
    SLIDEV_CONTENT = [slide.strip() for slide in content.split('---\n') if slide.strip()]
    return True

def save_slidev_content() -> bool:
    """将内存中的幻灯片内容保存回文件"""
    global ACTIVE_SLIDEV_PROJECT, SLIDEV_CONTENT
    
    if not ACTIVE_SLIDEV_PROJECT:
        return False
    
    with open(ACTIVE_SLIDEV_PROJECT["slides_path"], 'w', encoding='utf-8') as f:
        f.write('---\n'.join(SLIDEV_CONTENT))
    
    return True

@mcp.tool(
    name='check_environment',
    description='检查Node.js和Slidev环境是否就绪'
)
def check_environment() -> SlidevResult:
    """检查运行环境"""
    if not check_nodejs_installed():
        return SlidevResult(False, "Node.js is not installed. Please install Node.js first.")
    
    result = run_command("slidev --version")
    if not result.success:
        return SlidevResult(False, "Slidev is not installed. Please install it first.")
    return SlidevResult(True, "Environment is ready", result.output)

@mcp.tool(
    name='install_slidev',
    description='安装Slidev CLI工具'
)
def install_slidev() -> SlidevResult:
    """安装Slidev"""
    if not check_nodejs_installed():
        return SlidevResult(False, "Node.js is not installed. Please install Node.js first.")
    return run_command("npm install -g @slidev/cli")

@mcp.tool(
    name='create_slidev',
    description='创建新的Slidev演示文稿',
)
def create_slidev(path: str) -> SlidevResult:
    """创建新的Slidev项目"""
    global ACTIVE_SLIDEV_PROJECT
    
    env_check = check_environment()
    if not env_check.success:
        return env_check
    
    result = run_command(f"slidev create {path}")
    if not result.success:
        return result
    
    if load_slidev_content(path):
        return SlidevResult(True, f"Slidev project created and loaded at {path}", path)
    return SlidevResult(False, "Project created but failed to load content")

@mcp.tool(
    name='load_slidev',
    description='加载已存在的Slidev项目',
)
def load_slidev(path: str) -> SlidevResult:
    """加载已存在的Slidev项目"""
    if load_slidev_content(path):
        return SlidevResult(True, f"Slidev project loaded from {path}", path)
    return SlidevResult(False, f"Failed to load Slidev project from {path}")

@mcp.tool(
    name='make_cover',
    description='创建或更新封面页',
)
def make_cover(title: str, subtitle: str = "", author: str = "", date: str = "", background: str = "") -> SlidevResult:
    """创建或更新封面页"""
    global SLIDEV_CONTENT
    
    if not ACTIVE_SLIDEV_PROJECT:
        return SlidevResult(False, "No active Slidev project. Please create or load one first.")
    
    # 构建封面页的Markdown内容
    cover_content = [
        "# " + title,
        "layout: cover",
    ]
    
    if subtitle:
        cover_content.append(f"## {subtitle}")
    if author:
        cover_content.append(f"**Author:** {author}")
    if date:
        cover_content.append(f"**Date:** {date}")
    if background:
        cover_content.append(f"background: {background}")
    
    # 更新或添加封面页
    if SLIDEV_CONTENT:
        SLIDEV_CONTENT[0] = '\n'.join(cover_content)
    else:
        SLIDEV_CONTENT.append('\n'.join(cover_content))
    
    save_slidev_content()
    return SlidevResult(True, "Cover page updated", 0)  # 返回封面页索引

@mcp.tool(
    name='add_page',
    description='添加新幻灯片页面',
)
def add_page(content: str, layout: str = "default") -> SlidevResult:
    """添加新幻灯片页面"""
    global SLIDEV_CONTENT
    
    if not ACTIVE_SLIDEV_PROJECT:
        return SlidevResult(False, "No active Slidev project. Please create or load one first.")
    
    # 构建新页面内容
    page_content = []
    if layout and layout != "default":
        page_content.append(f"layout: {layout}")
    page_content.append(content)
    
    SLIDEV_CONTENT.append('\n'.join(page_content))
    page_index = len(SLIDEV_CONTENT) - 1
    save_slidev_content()
    
    return SlidevResult(True, f"Page added at index {page_index}", page_index)

@mcp.tool(
    name='set_page',
    description='设置指定页面的内容',
)
def set_page(index: int, content: str, layout: str = "") -> SlidevResult:
    """设置指定页面的内容"""
    global SLIDEV_CONTENT
    
    if not ACTIVE_SLIDEV_PROJECT:
        return SlidevResult(False, "No active Slidev project. Please create or load one first.")
    
    if index < 0 or index >= len(SLIDEV_CONTENT):
        return SlidevResult(False, f"Invalid page index: {index}")
    
    # 构建页面内容
    page_content = []
    if layout:
        page_content.append(f"layout: {layout}")
    page_content.append(content)
    
    SLIDEV_CONTENT[index] = '\n'.join(page_content)
    save_slidev_content()
    
    return SlidevResult(True, f"Page {index} updated", index)

@mcp.tool(
    name='get_page',
    description='获取指定页面的内容',
)
def get_page(index: int) -> SlidevResult:
    """获取指定页面的内容"""
    if not ACTIVE_SLIDEV_PROJECT:
        return SlidevResult(False, "No active Slidev project. Please create or load one first.")
    
    if index < 0 or index >= len(SLIDEV_CONTENT):
        return SlidevResult(False, f"Invalid page index: {index}")
    
    return SlidevResult(True, f"Content of page {index}", SLIDEV_CONTENT[index])

@mcp.tool(
    name='start_slidev',
    description='启动Slidev演示文稿'
)
def start_slidev() -> SlidevResult:
    """启动Slidev开发服务器"""
    if not ACTIVE_SLIDEV_PROJECT:
        return SlidevResult(False, "No active Slidev project. Please create or load one first.")
    return run_command(f"cd {ACTIVE_SLIDEV_PROJECT['path']} && slidev")

@mcp.tool(
    name='export_slidev',
    description='导出Slidev为PDF或其他格式',
)
def export_slidev(format: str = "pdf") -> SlidevResult:
    """导出Slidev演示文稿"""
    if not ACTIVE_SLIDEV_PROJECT:
        return SlidevResult(False, "No active Slidev project. Please create or load one first.")
    return run_command(f"cd {ACTIVE_SLIDEV_PROJECT['path']} && slidev export --format {format}")

if __name__ == "__main__":
    mcp.run(transport='stdio')
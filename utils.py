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



if __name__ == '__main__':
    # markdown = open('./test.md', 'r', encoding='utf-8').read()
    # slides = parse_markdown_slides(markdown)
    # print(slides[3])
    import os
    import subprocess
    
    url = 'https://zhuanlan.zhihu.com/p/1920819491400578741'
    
    # 方法1：使用subprocess获取更多输出
    result = subprocess.run(['crwl', url, '-o', 'markdown'], 
                          capture_output=True, text=True)
    print("Return code:", result.returncode)
    print("Stdout:", result.stdout)
    print("Stderr:", result.stderr)
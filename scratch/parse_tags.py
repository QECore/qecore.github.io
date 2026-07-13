import re

with open('Z:/QECore/qecore.github.io/src/pages/Docs.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'useState<[^>]+>', 'useState', content)
content = re.sub(r'getRows<[^>]+>', 'getRows', content)
content_no_comments = re.sub(r'{\/\*.*?\*\/}', '', content)
content_no_comments = re.sub(r'\/\/.*', '', content_no_comments)

tags = []
for m in re.finditer(r'</?([a-zA-Z0-9\-]+)(?:\s+[^>]*?)?/?>', content_no_comments):
    tag = m.group(0)
    name = m.group(1)
    index = m.start()
    line = content_no_comments[:index].count('\n') + 1
    tags.append((tag, name, line))

stack = []
self_closing = {'img', 'br', 'hr', 'input', 'link', 'meta', 'ArrowRight', 'CheckCircle2', 'MousePointerClick', 'FolderGit', 'FileCode', 'Play', 'Target', 'Crosshair', 'MousePointer', 'Braces', 'Search', 'Sparkles', 'ClipboardList', 'ScrollText', 'Table', 'Rows', 'Database', 'Shield', 'EyeOff', 'Lock', 'ChevronRight', 'ChevronDown', 'Copy', 'Check', 'DocBadge', 'InlineCode', 'CapabilityTable', 'PremiumCodeBlock', 'CopyButton', 'SplitCodeBlock'}

for tag, name, line in tags:
    if tag.endswith('/>') or name in self_closing:
        continue
    is_closing = tag.startswith('</')
    if is_closing:
        if stack:
            top_name, top_line = stack.pop()
            if line >= 267 and line <= 910:
                print(f"[{line}] POP </{name}> matched <{top_name}> from line {top_line}")
        else:
            if line >= 267 and line <= 910:
                print(f"[{line}] POP </{name}> but stack is empty")
    else:
        stack.append((name, line))
        if line >= 267 and line <= 910:
            print(f"[{line}] PUSH <{name}>")

import os

with open("BACKEND FILE", "r") as f:
    lines = f.readlines()

current_file = None
current_content = []

for line in lines:
    if line.strip().startswith(tuple(f"{i}. backend/" for i in range(1, 25))):
        if current_file:
            os.makedirs(os.path.dirname(current_file), exist_ok=True)
            with open(current_file, "w") as out:
                out.write("".join(current_content).strip() + "\n")
            print(f"Created {current_file}")
            
        current_file = line.split(" ", 1)[1].strip()
        current_content = []
    elif current_file:
        # ignore the language hint line if it's the very first line after the file declaration
        if len(current_content) == 0 and line.strip() in ['json', 'javascript', 'env', 'markdown']:
            continue
        current_content.append(line)

if current_file and current_content:
    os.makedirs(os.path.dirname(current_file), exist_ok=True)
    with open(current_file, "w") as out:
        out.write("".join(current_content).strip() + "\n")
    print(f"Created {current_file}")


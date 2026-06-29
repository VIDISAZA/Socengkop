import os
import re

with open("BACKEND FILE", "r") as f:
    lines = f.readlines()

current_file = None
current_lines = []

for line in lines:
    # Check if line matches a file header like "1. backend / package.json"
    header_match = re.match(r"^\d+\.\s*(backend\s*/\s*\S+(?:\s*/\s*\S+)*)", line.strip())
    if header_match:
        # Save previous file
        if current_file:
            path = "".join(current_file.split()) # remove all whitespace
            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, "w") as out:
                out.write("".join(current_lines).strip() + "\n")
            print(f"Extracted: {path}")
        
        # Start new file
        current_file = header_match.group(1)
        current_lines = []
    elif current_file is not None:
        # Skip the language identifier line (e.g., "json", "javascript", "env", "markdown")
        if len(current_lines) == 0 and line.strip() in ["json", "javascript", "env", "markdown"]:
            continue
        current_lines.append(line)

# Save the last file
if current_file:
    path = "".join(current_file.split())
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as out:
        out.write("".join(current_lines).strip() + "\n")
    print(f"Extracted: {path}")

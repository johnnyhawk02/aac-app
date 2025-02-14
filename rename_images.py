import os

def replace_spaces_with_underscores(directory):
    """Recursively renames files by replacing spaces with underscores."""
    for root, dirs, files in os.walk(directory):
        for file in files:
            if ' ' in file:
                old_path = os.path.join(root, file)
                new_file = file.replace(' ', '_')
                new_path = os.path.join(root, new_file)
                os.rename(old_path, new_path)
                print(f'Renamed: {old_path} → {new_path}')

# Run this on your symbols directory
replace_spaces_with_underscores('public/images/symbols')

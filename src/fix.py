import os
import sys
import re
from glob import iglob

rootdir_glob = './**/*'
file_list = [f for f in iglob(rootdir_glob, recursive=True) if os.path.isfile(f) and (f.endswith('.js') or f.endswith('.vue'))]

for file in file_list:
    # get directory of file
    try:
        if file.endswith(".js") or file.endswith(".vue"):
            current_path = file.replace("\\", "/")
            print("Fixing " + current_path)
            data = None
            with open(os.path.join(os.path.dirname(__file__) + "/" + file), "r") as f:
                # get directory of file
                os.chdir(os.path.dirname(os.path.join(os.path.dirname(__file__) + "/" + file)))
                data = f.read()
                # find import statements
                imports = re.findall(r"import\s+(.*?)\s+from\s+(\"|')(.*?)(\"|');", data)
                # if imports empty, continue
                if not imports:
                    continue
                # get last but one import
                for import_ in imports:
                    file_path = import_[-2]
                    # if the file_path is a directory, continue
                    if os.path.isdir(file_path):
                        continue

                    possible_extensions = [".js", ".vue", ".ts", ".css", ".scss", ".less"]
                    # check if file exists
                    for extension in possible_extensions:
                        if os.path.exists(file_path + extension):
                            data = data.replace(f"'{file_path}'", f"'{file_path + extension}'")
                            break
                f.close()
            with open(os.path.join(os.path.dirname(__file__) + "/" + file), "w") as f:
                f.write(data)
                f.close()
    except Exception as e:
        print(e)
        continue

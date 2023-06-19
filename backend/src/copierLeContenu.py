import os
import pathlib
import pyperclip

output = ""
start_path = pathlib.Path('.')  # Démarrage à partir du dossier courant

for root, dirs, files in os.walk(start_path):
    for file in files:
        file_path = pathlib.Path(root) / file
        # Ignorer les fichiers .py
        if file_path.suffix == '.py':
            continue
        try:
            with open(file_path, "r") as f:
                content = f.read()
        except UnicodeDecodeError:
            # Si le fichier ne peut pas être lu comme du texte, on passe au suivant
            continue
        output += "```\n" + str(file_path) + "\n" + content + "\n```\n\n"

pyperclip.copy(output)  # Copier le résultat dans le presse-papiers
print("Le contenu a été copié dans le presse-papiers.")

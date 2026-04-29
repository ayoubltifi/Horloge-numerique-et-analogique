# 🕰️ Horloge de Tunisie - Élégance & Précision

## Description du projet

L'**Horloge de Tunisie** est une application web interactive qui affiche l'heure en temps réel, aussi bien en format analogique qu'en format digital. Ce projet met à l'honneur le fuseau horaire de la Tunisie (CET) tout en permettant à l'utilisateur de consulter l'heure dans différents fuseaux horaires du monde entier.

L'application se distingue par son interface élégante, ses possibilités de personnalisation des couleurs et ses citations inspirantes de la sagesse tunisienne.

---

## Technologies utilisées

| **HTML5** | Structure de la page et balisage sémantique |
| **CSS3** | Style, animations et design responsive |
| **JavaScript (Vanilla)** | Logique de l'horloge, manipulation du DOM, gestion des fuseaux horaires |
| **Canvas API** | Dessin de l'horloge analogique en temps réel |
| **Git & GitHub** | Versionnage du code et déploiement via GitHub Pages |

---

## Fonctionnalités principales

-  **Horloge analogique** dessinée dynamiquement avec Canvas (aiguilles heures, minutes, secondes)
-  **Horloge digitale** affichant l'heure au format HH:MM:SS
-  **Affichage de la date** complète (jour, mois, année)
-  **Sélecteur de fuseaux horaires** (Tunisie, UTC, Paris, New York, Tokyo, Sydney, Honolulu, Casablanca, Alger)
-  **Personnalisation des couleurs** :
  - Cadran
  - Aiguille des heures
  - Aiguille des minutes
  - Aiguille des secondes
  - Graduations
-  **Citations tunisiennes** qui changent automatiquement toutes les 30 secondes
-  **Bouton de synchronisation temporelle** avec retour visuel
-  **Design responsive** adapté aux écrans mobiles et ordinateurs

---

## 🌐 Lien vers le projet en ligne

🔗 **GitHub Pages** :  
[https://ayoubltifi.github.io/Horloge-numerique-et-analogique/](https://ayoubltifi.github.io/Horloge-numerique-et-analogique/)

---

## Nouveautés explorées

Durant ce projet, j'ai découvert et appris à maîtriser plusieurs concepts :

| **Canvas API** | Dessiner des formes géométriques (cercles, lignes, aiguilles) en JavaScript pur |
| **Fuseaux horaires** | Utilisation de l'API `toLocaleTimeString()` avec l'option `timeZone` |
| **Personnalisation dynamique** | Modification des couleurs en temps réel avec les inputs `type="color"` |
| **Gestion de la casse des fichiers** | Compréhension de l'importance de la casse sur Linux/GitHub Pages |
| **Git avancé** | Résolution de conflits, `git mv`, `git pull --rebase`, manipulation du `remote` |
| **Déploiement GitHub Pages** | Configuration correcte d'un site statique avec fichiers en racine |

---

## Difficultés rencontrées

### 1. Problème de casse des fichiers (`Index.html` vs `index.html`)
- **Problème** : GitHub Pages ne trouvait pas le fichier HTML car la casse ne correspondait pas.
- **Solution** : Utilisation de `git mv` pour renommer correctement les fichiers et harmonisation des références dans le code.

### 2. Refus du commit Git par manque d'identité
- **Problème** : Git refusait de committer car l'utilisateur n'était pas configuré.
- **Solution** : Configuration de `user.name` et `user.email` avec `git config --global`.

### 3. Conflit entre remote local et distant
- **Problème** : `git push` rejeté car le remote contenait des commits absents en local.
- **Solution** : Utilisation de `git pull --rebase origin master` avant de pousser.

### 4. Affichage de `README.md` au lieu de `index.html`
- **Problème** : GitHub Pages affichait le README car le fichier HTML n'était pas à la racine ou mal nommé.
- **Solution** : Vérification avec `git ls-tree master` et correction de la casse des fichiers.

### 5. Horloges ne s'affichant pas (`---:--:--`)
- **Problème** : Le fichier JavaScript n'était pas chargé car le nom dans le HTML ne correspondait pas au fichier réel.
- **Solution** : Harmonisation des noms `Script.js` / `script.js` selon la convention choisie.

### 6. Erreur `remote origin already exists`
- **Problème** : Tentative d'ajout d'un remote déjà existant.
- **Solution** : Modification de l'URL avec `git remote set-url origin <nouvelle_url>`.

---

## 💡 Solutions apportées

| Casse des fichiers | `git mv` + harmonisation en minuscules/majuscules |
| Identité Git | `git config --global user.name/email` |
| Conflit de push | `git pull --rebase` puis `git push` |
| Affichage README | Placement de `index.html` à la racine + `.nojekyll` |
| JS non chargé | Vérification des noms avec `git ls-tree master` |
| Remote en double | `git remote set-url` au lieu de `git remote add` |

---

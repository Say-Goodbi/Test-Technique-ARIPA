# Analyse des Ventes – Projet Fullstack

## 🎯 Objectif du Projet

Ce projet a pour but :
- D'exploiter une base de données et d'en faire des analyses pertinentes.
- De concevoir une application backend et frontend, permettant de visualiser les résultats de ces analyses.

## 🛠️ Technologies Utilisées

- **PostgreSQL** : gestion de la base de données.
- **ExpressJS** : création d’une API REST pour accéder aux données.
- **ReactJS** : interface web pour afficher les résultats des analyses.

## 💻 Interprétation des Données
N'ayant pas d'informations concernant la nature des données,
certaines analyses peuvent être erronées dû à l'interprétation que j'ai fait de celles-ci :

- `member_id` : Correspond au **vendeur** sur une facture.
- `boat_id` : Correspond au **bateau** d'où proviennent les produits facturés.


> [!NOTE]
> À l'origine, je pensais utiliser les factures pour visualiser les chiffres d'affaire des entités par bateau. Cependant, le bateau sur chaque facture n'appartient pas forcément au "vendeur". 
> Ainsi, les données concernant les revenus des bateaux / entités ne concordent pas.


## ⚙️ Installation & Lancement

### 1. Cloner le dépôt

```bash
git clone <url-du-depot> LR-Test-Technique
cd LR-Test-Technique
```

### 2. Configuration des variables d’environnement

Créer deux fichiers `.env` à partir des `env.example` fournis dans `frontend/` et `backend/`.

### 3. Installation des dépendances

Installer les dépendances dans les dossiers `frontend/` et `backend/`.

```bash
npm install
```

### 4. Lancer le projet

Lancer l'application dans deux terminaux différents, l'un dans `frontend/` et l'autre dans `backend/`.

```bash
npm start
```

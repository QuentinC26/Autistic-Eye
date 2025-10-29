# Autistic Eye (French/Français)

Autistic Eye est un réseau social communautaire dédié aux personnes autistes et à leurs proches. Il a été créé pour lutter contre l’isolement en offrant un espace d’échange, d’entraide et de partage d’expériences. La plateforme permet d’accéder facilement à des informations utiles sur de nombreux sujets liés à l’autisme, afin d’améliorer le quotidien des utilisateurs.

## Table des matières

- [Technologies utilisées](#technologiesutiliséés)
- [Installation](#installation)
- [Fonctionnalités de l'application](#fonctionnalitésdel'application)
- [Licence](#licence)
- [Contributeurs](#contributeurs)

## Technologies utilisées

Le projet Autistic Eye repose sur les technologies suivantes :

- **Back-end** : [Django](https://www.djangoproject.com/) avec [Django REST Framework](https://www.django-rest-framework.org/) pour la création d'API RESTful.
- **Front-end** : [React](https://reactjs.org/) (JavaScript) pour une interface utilisateur réactive et moderne.
- **Base de données** : [MySQL](https://www.mysql.com/) pour le stockage structuré des données.
- **Authentification** : `dj-rest-auth`, `django-allauth`, `Simple JWT` pour la gestion sécurisée des utilisateurs et des tokens.
- **Docker** : pour l’orchestration et l’exécution du projet dans des conteneurs.

## Installation

Pour installer Autistic Eye sur votre ordinateur, il faut dans un premier temps faire un clone du repository actuel. Pour cela, il faut cliquer sur le bouton Code en vert et copier le lien HTTPS ou SSH en cliquant sur l’icône du presse-papiers. Une fois que c'est fait, tapez la commande suivante dans le terminal :

**git clone https://github.com/QuentinC26/Autistic-Eye.git**

Ensuite, il faut installer les dépendances du projet. C'est pour cette raison qu’il faut aller dans la partie front-end en tapant la commande suivante :

**cd front-end**

Une fois que vous êtes dans front-end, tapez la commande suivante pour installer les dépendances liées au front-end :

**npm install**

Pour revenir à la racine du projet, tapez la commande suivante :

**cd ..**

Cela est nécessaire pour pouvoir lancer le projet. Il n'y a rien à installer pour la partie back-end, alors on peut directement taper la commande suivante, qui servira à lancer le projet :

**docker compose up**

## Fonctionnalités de l'application

Sur Autistic Eye, vous pouvez faire différentes choses :

- **Inscription/Connexion** : Autistic Eye dispose d’un système d’inscription et de connexion permettant aux utilisateurs de créer un compte et de se connecter.
- **Mon Profil** : Les membres ont accès à la section "Mon profil", qui leur permet de consulter leurs informations personnelles, de mettre à jour leurs données (à l’exception de l’e-mail et du mot de passe), ou de supprimer leur compte.
- **Communauté** : Les membres ont accès à la section "Communauté", qui leur permet de créer des posts dans lesquels ils peuvent parler de tout : partager leur expérience, demander de l'aide ou lancer un sondage, par exemple. Ils peuvent modifier et supprimer leurs propres posts. Ils ont également le droit de commenter les posts des autres, ainsi que de modifier et supprimer leurs propres commentaires.
- **Article** : Les membres ont accès à une liste d’articles provenant de sources externes à l’application et peuvent cliquer sur « Plus de détails » pour accéder à l’article correspondant.

## Licence

Ce projet est licencié sous la licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contributeurs

Le projet a été créé par **Quentin Zuzlewski** (QuentinC26). Il est le développeur full stack principal de ce projet.  
Pour toute question sur le projet, vous pouvez le contacter à l'adresse email suivante : **q.zuzlewski@gmail.com**

[![QuentinC26](https://github.com/QuentinC26.png?size=20)](https://github.com/QuentinC26)

Pour la liste complète des contributeurs et leurs rôles, consultez le fichier [CONTRIBUTORS.md](CONTRIBUTORS.md).

# Autistic Eye (English/Anglais)

Autistic Eye is a community-based social network dedicated to autistic individuals and their loved ones. It was created to combat isolation by providing a space for discussion, mutual support, and experience sharing. The platform offers easy access to useful information on a wide range of autism-related topics, with the goal of improving users’ daily lives.

## Table of Contents

- [Technologies Used](#technologiesused)
- [Installation](#installation.)
- [Application Features](#applicationfeatures)
- [License](#license)
- [Contributors](#contributors)

## Technologies Used

The Autistic Eye project is built with the following technologies :
Django

- **Back-end** : [Django](https://www.djangoproject.com/) with [Django REST Framework](https://www.django-rest-framework.org/) to build a RESTful API.
- **Front-end** : [React](https://reactjs.org/) (JavaScript) for a responsive and modern user interface.
- **Database** : [MySQL](https://www.mysql.com/) for structured data storage.
- **Authentification** : `dj-rest-auth`, `django-allauth`, `Simple JWT` for secure user management and token-based authentication.
- **Docker** : for containerized orchestration and project deployment.

## Installation.

To install Autistic Eye on your computer, you first need to clone the current repository. To do this, click the green Code button and copy the HTTPS or SSH link by clicking on the clipboard icon. Once done, run the following command in your terminal:

**git clone https://github.com/QuentinC26/Autistic-Eye.git**

Next, you need to install the project dependencies. To do this, navigate to the front-end directory by running the following command:

**cd front-end**

Once you're in the front-end folder, run the following command to install the front-end dependencies:

**npm install**

To go back to the root of the project, run:

**cd ..**

This step is necessary to launch the full project. There's nothing to install for the back-end, so you can directly start the project using the following command:

**docker compose up**

## Application Features

On Autistic Eye, you can do several things:

- **Sing Up/Login** : Autistic Eye includes a registration and login system that allows users to create an account and sign in.
- **My Profile** : Members can access the "My Profile" section to view their personal information, update their data (except email and password), or delete their account.
- **Community** : Members have access to the "Community" section, which allows them to create posts where they can talk about anything: share their experiences, ask for help, or even start a poll. They can edit and delete their own posts. They also have the right to comment on other members' posts, as well as edit and delete their own comments.
- **Articles** : Members have access to a list of articles from external sources and can click on 'Read more' to view the full article.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contributors

The project was created by **Quentin Zuzlewski** (QuentinC26). He is the main full stack developer of this project. For any questions regarding the project, you can contact him at: **q.zuzlewski@gmail.com**

[![QuentinC26](https://github.com/QuentinC26.png?size=20)](https://github.com/QuentinC26)

For the complete list of contributors and their roles, see the [CONTRIBUTORS.md](CONTRIBUTORS.md) file.

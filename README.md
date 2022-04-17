# Wanted - Avis de recherche (phase prototype)


## Introduction

Les réseaux sociaux permettent de partager quasiment n'importe quel type de contenu. On retrouve parfois même des avis de recherche pour personnes disparues, et on peut profiter de cette facilité à partager les posts pour diffuser au maximum un message de détresse.
Malheureusement, j'ai remarqué que la plupart du temps, les gens n'y prêtent pas toujours attention lorsqu'ils consultent leur réseau social préféré.
Ce qui peut être compréhensible puisque les posts sonts parfois baclés et pas très lisibles.
Si on rajoute à cela le fait que la situation de la personne disparue n'est pas forcément mise à jour, on peut pas vraiment savoir si la personne a été retrouvée ou non au moment ou le post apparait dans notre feed Twitter, Facebook etc...
J'ai alors eu l'idée d'une application qui permettrait de faciliter la création de ces avis de recherche et de les réunir à un seul endroit pour les rendre plus efficaces.

## Principe

Utilisation de base : Wanted est une application mobile qui permet de créer un avis de recherche pour personnes disparues ou animaux égarés sous un format universel qui peut être partagé sur n'importe quel réseau social et donc accessible au maximum de personnes. La situation de la personne disparue peut donc être mise à jour sur le même post si elle a été retrouvée. 
L'appli permet également de créer des avis de recherches pour les objets perdus ou trouvés.






## Fonctionnalités
* Création de posts
* Feed des posts créés
* Partage d'un post sur les réseaux via un lien
* Authentification
* Prise de contact avec l'auteur du posts

## Techno

* React Native 0.64
* Expo SDK 43
* Firebase 8 (Authentication, Storage, Cloud Firestore, Dynamic Links)
* Redux + Redux-persist + AsyncStorage + Redux-thunk

### Authentification avec Firebase Auth
Possibilité de consulter les posts sans se connecter (authentification anonyme via firebase auth)

<img src="https://user-images.githubusercontent.com/67431499/152504000-8ef6a485-5cff-4271-b273-0e9b4c071690.jpg"  height="400">


### Formulaire de création de post
Formualaire en plusieurs étapes, avec Formik et Yup pour la validation des données entrées
Suggestions de villes françaises via GooglePlacesAutocomplete pour la localistation du post (sert aussi de filtre quand on va rechercher les posts par département)

<img src="https://user-images.githubusercontent.com/67431499/152504017-adf37c9b-dd06-423a-902e-d93faebb81b1.jpg" height="400">
<img src="https://user-images.githubusercontent.com/67431499/152506128-3e040921-08cd-4dce-aaf9-8bacc279ed7b.jpg" height="400">
<img src="https://user-images.githubusercontent.com/67431499/152506130-b4e4b479-d45a-4cf0-ab8c-0366ae7d7485.jpg" height="400">

### Feed regroupant les avis de recherche postés
Barre de recherche + Filtre par départements français

<img src="https://user-images.githubusercontent.com/67431499/152504055-83e68c94-35ae-40ba-9a2f-08e6122e69b7.png" height="400">

### Détail du post
La section détails est dynamique : seuls les champs remplis par l'auteur du post sont affichés 

<img src="https://user-images.githubusercontent.com/67431499/152504035-937b6472-c733-4143-9ad2-97b7fad09efe.png" height="400">

### Partage de l'avis de recherche
L'utilisateur a la posibilté de partager l'affiche et le lien du post
Le lien est généré par Dynamic Links (Firebase) ce qui permet d'ouvrir l'appli en étant redirigé directement sur le post en partagé en cliquant dessus ou alors de renvoyer vers l'app store ou le play store quand l'utilisateur qui reçoit le lien n'a pas installé l'appli Wanted.

<img src="https://user-images.githubusercontent.com/67431499/152504007-33eceb0c-936c-4a1a-ad5e-140e10b6eb44.jpg" height="400">

## Améliorations à venir
* Authentification via google/twitter/facebook/apple
* Mise à jour de la situation via des messages en dessous du post
* Map avec les differents avis de recherche autour de la localisation actuelle
* Meilleur UI/UX
* Extension vers les pays francophones européens (Belgique, Luxembourg, Suisse)

L'application est disponible sur le Play Store et sur l'App Store d'Apple

Google Play Store :
https://play.google.com/store/apps/details?id=com.wantedapp

Apple App Store :
https://apps.apple.com/app/id1606514736


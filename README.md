# Application météo

![main](https://github.com/JCX-DEV/Exercice_Weather/blob/main/screenshots/screen_manual.png "Main view")


## Objectifs :

En utilisant l'API [Open Weather Map](https://openweathermap.org/api), proposer une interface permettant :

1. Voir la météo en fonction de sa position GPS ou en choisissant un pays.
2. Voir la position sélectionnée sur une map.
3. Voir la météo sur plusieurs jours.

## Résolution :

### Position GPS et affichage de la carte

Dans cette exercice, la position de l'utilisateur est obtenue via l'API IPWhoIS. 
Par défaut, on recherche la météo sur cette position. On peut choisir manuellement une autre localisation en décochant le toggle "détecter la position".

L'interface propose alors une liste de pays, puis pour chaque pays, une liste de villes.
Lorsque l'utilisateur choisit une nouvelle localisation, ses coordonnées GPS son obtenues par un appel de l'API Open Weather Map.

La map est une iframe de Open Street Map, intégrée à la page de l'application.

Le résultat est présenté sous forme d'un écran en deux parties :
Gauche : une carte pour la prévision du jour et en dessous une zone déroulante pour les jours à venir.
Droite : la map indiquant la position évaluée.

### Choix complémentaires

Comme on propose le choix de plusieurs pays, cela peut induire la nécessité d'avoir une interface multilingue.
L'app est donc pensée pour supporter plusieurs langues, en utilisant i18next et moment.

Les paramètres sont modifiables par l'utilisateur dans le header. (tout comme le système de mesure souhaité pour les résultats)

### Aspects techniques

- Application créée en React.js avec create-react-app
- Le store est géré par Redux (et redux-thunk)
- Le code utilise les hooks

### UI et captures d'écran :

L'application est pensée pour répondre à la question "ai-je besoin d'un parapluie".
On retrouvera ce thème dans le choix du logo, et dans les prévisions sur les jours à venir qui mettent en avant la probabilité de précipitations.

Pour les couleurs, la couleur dominante d'Open Weather Map a été reprise comme base du thème.


**Ecran de login :** 

(L'API KEY n'est pas partagée dans le dépôt public et doit être saisie manuellement)

![login](https://github.com/JCX-DEV/Exercice_Weather/blob/main/screenshots/screen_login.png "Login")

**Météo pour la position détectée :**

(langue du navigateur et unités de mesure automatiquement détectées)

![detection](https://github.com/JCX-DEV/Exercice_Weather/blob/main/screenshots/screen_auto.png "Location detection")

**Météo pour la position choisie :**

(langue et unités de mesure manuellement modifiées, la date est formatée en fonction de la langue)

![manual](https://github.com/JCX-DEV/Exercice_Weather/blob/main/screenshots/screen_english.png "Manual location")

**Prévisions sur plusieurs jours :**

(Les prévisions vont jusqu'à une semaine)

![forecast](https://github.com/JCX-DEV/Exercice_Weather/blob/main/screenshots/screen_forecast.png "Forecast")

**Adapté à la taille de la fenêtre :**

(La zone déroulante des prévisions occupe la hauteur disponible, la zone map occupe la largeur et la hauteur disponibles)

![responsive](https://github.com/JCX-DEV/Exercice_Weather/blob/main/screenshots/screen_responsive.png "Responsive")

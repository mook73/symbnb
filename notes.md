# NOTES SYMFONY 4 #

---------------------------------------------------------------------------------------------------------------
GÉNÉRAL
---------------------------------------------------------------------------------------------------------------

## OUVRIR LE PROJET ##
*php bin/console server:run*
ou
*php bin/console server:start*


## IDENTIFIANTS ET MDP ##
pascaline@symfony.com
password

page de login admin: /admin/login


## COMPTE ADMINISTRATEUR ##
/admin/login


## VRAC ##
&euro; Entité HTML (symbol €)
*Bootstrap datepicker uxsolution* calendrier Javascript qui s'adapate au thème Bootstrap
*DataTransformers* permet de transformer une donnée d'un formulaire
*font awesome* icones gratuites
*Ancre directement dans l'URL* path('nom_de_ma_route', {'param': truc.machin})**#ancre** + **id="ancre"** ds la page cible
*float-right* classe bootstrap pour fixer un élément à droite: attention! bug d'affichage! Utiliser la classe *clearfix* sur l'élément parent afin de résoudre ce bug!
*composer.json* fichier décrivant toutes les dépendances (côté back: PHP) dont mon application à besoin pour fonctionner
*packages.json* équivalent de composer.json mais pour le gestionnaire de paquets NPM. Il décrit toutes les dépendances (côté front: JavaScript) dont mon application à besoin pour fonctionner
*webpack.config.js* fichier de configuration de webpack

## RACCOURCIS CLAVIERS ##
*CTRL + u* permet d'afficher la source sur une page web
*Maj + ctrl + g* selecteur multiligne vscode
*ctrl + p* naviguer ds les fichiers
*html:5* structure page html avec emmet


## COMMANDES ##
php bin/console make:controller
php bin/console make:crud
php bin/console make:form
php bin/console make:entity
php bin/console doctrine:fixtures:load


## FIXTURES ##
*Faker*
*RandomUser.me*


## ENTITY ##
*@ORM\HasLifecycleCallbacks* (permet d'ajouter de la logique ds le cycle de vie de l'entité)
*ArrayCollection* classe Symfony (tableau en plus puissant, qui peut appeler de nombreuses méthodes: voir doc)
*toArray()* méthode qui permet de transformer un ArrayCollection en array php classique

*ValidationGroup* permet d'avoir plusieurs validations différentes sur une entité (ex: je ne veux pas les mêmes validations en front et en admin sur les dates de réservation!)
3 types existants:
**default** toutes les validations ne faisant partie d'aucun groupe
**Le nom de mon entité**
**Le nom que je veux donner** c'est moi qui choisit! Ne pas oublier de préciser l'option validation_groups dans mon formulaire!
*paramètre groups={"mon_groupe"}* permet de définir dans quel(s) groupe(s) se place ma validation


## SECURITY.YAML ##
*UserPasswordEncoder* (hasher les mdp utilisateurs)
*UserInterface* (class implements UserInterface + écrire les méthodes attendues)
*Provider* = fournisseur de données utilisateurs
*Gestion des ACL* (Access Control List) permet de faire une gestion plus générale des accès en fonction des rôles
*Firewalls* délimitent les emplacements du site et la façon de les sécuriser
*Pattern du firewall* expression régulière qui permet de délimiter la partie à sécuriser


## FORM ##
Création d'une méthode *getConfiguration()* au sein de mon formulaire (ex: AnnonceType), qui permet de créer la config de base d'un champ (permet d'aller plus vite et d'être plus lisible!)

Afficher un formulaire dans twig:
*{{ form_start(form) }}* début du formulaire (form contient mon formulaire que je passe a twig depuis le controller)
*{{ form_widget(form) }}* champs des formulaires
<button type="submit" class="btn btn-success">Submit</button> , bouton submit
*{{ form_end(form) }}* fin du formulaire

*EntityType* type de champ d'un formulaire. Permet de choisir un enregistrement d'une table (entité).
Ex: menu déroulant avec tous les utilisateurs (ds AdminBookingType)
 public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ...
            ->add('booker', EntityType::class, [                    // champ EntityType
                            'class' => User::class,                 // Quelle entité?
                            'choice_label' => function($user) {     // Qu'affiche le menu déroulant???
                                return $user->getFirstName() . ' ' . strtoupper($user->getLastName());
                            }
            ...
        }
    }

*option validation_groups* permet de préciser les groupes de validation qu'on veut exécuter. **Se précise soit dans le controller au moment ou j'appelle mon formulaire soit dans le FormType (fct configureOptions): on préférera cette façon de faire car plus propre!**
Ex: ds BookingType, je précise que je veux la validation par défaut + celle du front
 public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Booking::class, [
                'validation_groups' => [
                    'Default',
                    'front'
                ]
            ]
        ]);
    }



## TWIG ##
*app* = variable qui contient toutes les infos de notre appli! (ex si je veux les user: {% app.user %}, la requête HTTP: {% app.request %})
*{% set var = ... %}* permet de déclarer des variables dans twig

Filtres twig (permettent de traiter la donnée avant de l'afficher)
*| raw* permet de ne pas afficher les balises HTML stockées en BDD
*| date('d/m/Y')* permet d'afficher un objet dateTime au format jour/mois/année
*| default()* permet de donner une valeur par défaut à une variable
*| number_format(2, ',', ' ')* formatage pour l'affichage des nombres (nb chiffres après la virgule, séparateur nb décimaux, séparateur milliers)

*{{ form_row(form.title) }}* permet d'afficher un champ particulier d'un formulaire
*{{ form_widget() }}* permet d'afficher les champs (manquants?!) (s'il en manque avec form_row, les affiche!)

*{% include 'chemin de mon template.twig' with {'var': value} %}* inclure un fichier avec une variable


## CONTROLLER ##
*$this->render('fichier/nom_du_fichier_twig', ['var' => $var, [tableau d'options]]);* ouvre une vue dans twig et lui passe les variables à afficher. Attention! On ne peut pas mettre un formulaire dans une variable (trop complexe!) il faut envoyer le résultat de l'affichage du form! ('form' => $form->createView()).
*$this->redirectToRoute('nom_de_le_route');* permet de rediriger vers une vue.
*$this->getUser()* récupère l'utilisateur actuellement connecté!
*@Security et @IsGranted* annotations de sécurité pour restreindre l'accès à certaines routes dans mon controller
*IsGranted* permet de s'assurer qu'un utilisateur possède un rôle donné
Ex: @IsGranted("ROLE_USER") ne donne accès à cette page que si l'utilisateur possède le role user (s'il est connecté ds notre cas)
*@Security* plus flexible que @IsGranted grâce aux "Expressions"
Mots clés: Symfony Expressions Security
*Classe AuthenticationUtils* donne des outils sympas pour les erreurs d'authentification
*requirements* contrainte que l'on place sur un paramètre d'une route
*inline requirements* décrire directement la contrainte au niveau du paramètre (ex: @Route("/admin/ads/**{page<\d+>?1}**", name="admin_ads_index") le point d'interrogation permet de dire que ce paramètre est optionnel et si je n'ai pas de num de page, par défaut ce paramètre vaut 1 (attention le $page en param de la fct index n'est pas pris en compte si pas de num de page! c'est pour ça qu'on l'écrit ici!)


## PASSWORD ##
*UserPasswordEncoderInterface* Permet d'appeler une méthode de hash de mdp (encodePassword();)
Ex: $encoder->encodePassword(); Avec $encoder en injection de dépendance de ma fonction (UserPasswordEncoderInterface $encoder)

*api.symfony.com* Il existe des api utilisables avec Symfony. Ici on utilise des classes pour les formulaires (voir doc)
Ex: $form->get('oldPassword')->addError(new FormError("Le mot de passe que vous avez tapé n'est pas votre mot de passe actuel!"));
$form (mon formulaire)
->get('oldPassword) (je veux le champ 'oldPassword', qui est aussi considéré comme un formulaire!)
->addError() (je veux ajouter un message d'erreur)
->new FormError("message d'erreur") (je créé une instance de la classe FormError, qui a besoin d'un message d'erreur à sa construction)

*password_verify()* est une fonction PHP permettant de comparer un mdp en clair et un hash. La fonction va encoder le mdp en clair et si elle obtient le même résultat que le hash qu'on lui passe, elle renvoie true.
Ex: password_verify('mot_de_passe', '$2y$13$e..UHUiW400JUJkZDEB5ju1HPp8ayKvg/miMS.ikEdumt2XNRWsS2');


## PAGES D'ERREURS 404 PERSONNALISÉES ##
Les pages rouges d'erreurs de Symfony sont affichées grâce à Twig et ne sont visibles qu'en dev.
Pour personnaliser la page par défaut, il fat l'overrider:
pour cela, je créé un dossier *bundles* au sein de mon dossier templates (ce dossier sert à dire à Symfony quels template overrider: ce sont les templates des bundles installés.)
Dans mon dossier bundles, je créé un autre dossier nommé *TwigBundle* puis un autre dossier à l'intérieur nommé *Exception* qui contient le template de mon erreur 404: error404.html.twig
**Mon arborescence: templates/bundles/TwigBundle/Exception/error404.html.twig**

Pour voir ma page d'erreur personnalisée, il faut utiliser une route spéciale en environnement de dev:
*localhost:8000/_error/404*

Ou alors je peux modifier le fichier .env:
Modifier la variable APP_ENV=dev en *APP_ENV=prod*

Idem pour l'erreur 403

Note:
Erreur 404 (not found)
Erreur 403 (forbiden: action interdite!)

Si la page d'erreur personnalisée ne s'affiche pas:
il est possible que Symfony est mémorisé l'ancienne page d'erreur en cache, pour le vider:
aller ds *var/cache* et supprimer le dossier prod


## CYCLE DE VIE D'UNE ENTITÉ ##
On peux manipuler une entité pendant son cycle de vie.
Par exemple, je peux ajouter une date de création d'un booking et son coût total s'ils n'existent pas, avant de faire persister mon objet.
Pour cela, il faut utiliser l'annotation *@\ORM\HasLifecycleCallbacks()* au dessus de ma classe + déclarer quelle fonction lancer en callbacks avec une annotation (ici on utilise prePersist: *@ORM\PrePersist*
Ex:
/**
 * @ORM\Entity(repositoryClass="App\Repository\BookingRepository")
 * **@ORM\HasLifecycleCallbacks()**
 */
class Booking
{
    ...

    /**
     * Callback appelé à chaque fois qu'on fait une réservation
     * 
     * **@ORM\PrePersist**
     */
    public function prePersist() {
        if (empty($this->createdAt)) {
            $this->createdAt = new \DateTime();
        }

        if (empty($this->amount)) {
            // prix de l'annonce * nombre de jours
            $this->amount = $this->ad->getPrice() * $this->getDuration();
        }
    }
    ...
}

## REPOSITORY ##
"Entrepôt" de données. Permet de faire des sélections

*DQL* Doctrine Query Language. Très similaire au SQL mais se base sur notre modèle d'objets
*QueryBuilder* Utilitaire qui nous sert à faire des requêtes DQL

## SERVICES ##
*L'injection de dépendances* dans un service se fait via le *constructeur!*
*RequestStack* à utiliser quand on veut faire appel à la request depuis un service


## PAGINATION (LOGIQUE AVANT REFACTORISATION!!!) ##
(Code refactorisé = trop long... voir vidéo)

Il suffit d'utiliser la methode findBy() du repository pour faire une requête avec un nombre limite d'objets à afficher!

Ex de pagination sur les annonces (côté admin).
1. On ajoute le code de la pagination en bas de page de templates/admin/ad/index.html.twig
<div class="d-flex justify-content-center">
            <ul class="pagination">
                <li class="page-item {% if page == 1 %}disabled{% endif %}">                                    // disabled que si sur page 1
                    <a class="page-link" href="{{ path('admin_ads_index', {'page': page - 1}) }}">&laquo;</a>   // retour page précédente
                </li>
                {% for i in 1..pages %}                                                                         // Affiche autant de li qu'il n'y a de pages
                    <li class="page-item {% if page == i %}active{% endif %}">                                  // num de page surligné que si c'est la page courante
                        <a class="page-link" href="{{ path('admin_ads_index', {'page': i}) }}">{{ i }}</a>      // Arrive sur la page dont j'ai cliqué le numéro
                    </li>
                {% endfor %}
                <li class="page-item {% if page == pages %}disabled{% endif %}">                                // disabled que si sur la dernière page
                    <a class="page-link" href="{{ path('admin_ads_index', {'page': pages + 1}) }}">&raquo;</a>  // page suivante
                </li>
            </ul>
        </div>

2. On modifie le code de  de la fct index du AdminAdController
/**
     * @Route("/admin/ads/**{page<\d+>?1}**", name="admin_ads_index")   // paramètre + inline requirement
     *                                                                  // ? optionnel, 1 par défaut
     */
    public function index(AdRepository $repo, **$page**)                // paramètre $page
    {
        **$limit = 10;**                                                // $limit: nb d'annonces par page
        **$start = $page * $limit - $limit;**                           // $start: page de départ
        **$total = count($repo->findAll());**                           // $total: nb total d'annonces
        **$pages = ceil($total / $limit);**                             // $pages: nb total de pages (arrondi à l'entier sup.)

        return $this->render('admin/ad/index.html.twig', [
            'ads' => $repo->**findBy([], [], $limit, $start)**,         // $ads: 10 annonces
            'pages' => **$pages**,
            'page' => **$page**
        ]);
    }


## REQUÊTES DQL ##
*Doctrine Query Language* permet d'interroger Doctrine pour récupérer des données. En DQL on ne s'intéresse pas aux tables (comme en SQL) mais aux entités!

*Comment faire?* Utiliser la *methode createQuery()* de l' *ObjectManager* dans un service (appelé ds le controller!)
*getResult()* permet de récupérer les données (renvoi un tableau de tableau...)
*getSingleScalarResult()* permet d'obtenir le résultat sous la forme d'une variable scalaire simple (+ COUNT ds la requete DQL)
Ex: $users = $manager->createQuery('SELECT **COUNT(u)** FROM App\Entity\User u')->**getSingleScalarResult();** 



## WEBPACK ENCORE ET ASSET ##
Petite note de Lior:
"Installer les packages "asset" et "encore" de Symfony
Le jour où j'ai créé chez moi ce projet avec le fameux symfony/website-skeleton (il y a donc environ 4 mois), les packages asset et encore qui sont l'objet de cette section étaient inclus automatiquement.

Certains étudiants ont remonté le fait que désormais ce n'est plus le cas. Il vous faut donc installer vous mêmes ces packages en tapant les commandes **composer require encore** et **composer require asset** !

C'est aussi simple que ça."

*Webpack encore* permet d'optimiser le chargement des fichiers côté navigateur: 1 seul fichier d'entrée pour le CSS et 1 seul fichier d'entrée pour le Javascript (minifiés), permet de charger plus vite et le versionning des fichiers (changement de noms) permet de mettre à jour le navigateur du client!

*Le package "encore"* contient toute la logique de Webpack Encore que Symfony 4 amène aux développeurs pour faciliter l'utilisation et l'intégration de WebPack.

*Le package "asset"* permet de faire le lien facilement entre des groupes d'assets (Javascript, images, CSS etc) et l'application, notamment via la fonction Twig asset() très pratique pour cela !

Voyez les documentations attachées à cet article si vous voulez plus d'informations à ce propos.

A tout de suite !"


**Installation:**
1. composer require encore
2. composer require asset
3. npm install              // installe les dépendances pour webpack (voir webpack.config.js)
                            // créé le dossier node_modules

**Déplacement des fichiers pour l'utilisation de encore**
Normalement les fichiers ds le dossier public sont ceux ds lequel on va taper qud on met notre projet en ligne.
Si on veut utiliser encore, on ne fait pas comme ça!
1. Il faut *déplacer les dossiers de public (css) et les mettre ds le nouveau dossier assets*

**Config pour faire fonctionner le css**
Aller ds webpack.config.js
Lior décommente la ligne 19 (.addStyleEntry('css/app', './asserts/css/app.css')) mais je ne l'ai pas!

*Compiler les fichiers ds assets*
Le but est de se retrouver avec un seul fichier d'entrée pour le css et pour le js (app.js appelle tous les fichiers: css et javascript!) dans le dossier public/build.

1. Sur la 1ere ligne de app.css (ds le dossier assets) j'écris: **@import url('./bootstrap.min.css');**
2. (Juste) lancer **npm run dev** en ligne de commande (un dossier build est créé ds le dossier public; il contient mon fichier app.css que j'avais déplacé ds assets!)

Note:
A ce stade, ça ne marche tjrs pas! DON'T PANIC!!! C'est normal! Il va falloir appeler nos fichiers css!
Avant de mettre en prod, je devrais compiler mes fichiers avec webpack en lançant *npm run build* dans la console.
Le fichier app.css va changer de nom! Il va comporter un hash (ex: app.1234567.css) qui sera différent à chaque fois que je recompilerai mon fichier css! Pourquoi??? Pour forcer le navigateur à prendre en compte les modifications du css!
Comment faire pour appeler mon fichier css ds mon appli alors???
Grâce à la fonction *assets()*! (permet de retrouver un fichier statique peut importe sa version!)
*manifest.json* permet de faire la correspondance entre un chemin classique et un chemin versionné! (c'est là dedans que j'ai le nom de mon fichier app.1234567.css ^^)

3. Aller ds base.html.twig et:
Supprimer la ligne permettant d'appeler bootstrap
<link rel="stylesheet" href="/css/bootstrap.min.css">

Puis remplacer la ligne d'appel de notre fichier css
<link rel="stylesheet" href="/css/app.css">
par
<link rel="stylesheet" href="{{ asset('build/app.css') }}">     // asset() va retrouver app.1234567.css :)

4. Lancer **npm run build** dans la console + actualiser ma page web... ça marche!  ;)


// NE FONCTIONNE PAS //
**Sass: préprocesseur css**
Webpack est capable de lire du Sass et de le transcrire en CSS. Pour cela:

1. Aller ds le fichier *webpack.config.js* et *décommenter la ligne .enableSassLoader()* (l57)

2. installer 2 paquets en tapant en ligne de commande: *npm install sass-loader node-sass --only=dev*

3. Renommer mon fichier app.css (ds assets) en app.scss et nettoyer le code grâce à sass (nesting)

Ne fonctionne pas!!! J'ai remis mon fichier css et ça ira très bien!
1 seul fichier js qui appelle mon css (voir assets/js/ap.js): j'ai essayé de modifier la ligne pour appaler mon scss à la place, mais ne fonctionne pas... je pense qu'il faut compiler le sass en css puis l'importer ds le app.js mais Lior ne montre pas comment faire alors je garde mon css.
////////////////////////

**Traiter les fichiers JS avec webpack encore**
Rappel: le but est de se retrouver avec un seul fichier d'entrée! app.js

1. Déplacer le contenu du fichier js (public/js) dans le dossier assets/js (je me retrouve avec tous mes fichiers js + app.js)

2. Importer tous mes fichiers dans app.js
Attention! Comme j'importe jQuery et Popper, il faut que j'installe les paquets correspondants!
*npm install --save-dev jquery.js*
*npm install --save-dev popper.js*
Ces commandes vont installer les librairies dans node_modules!

Puis décommenter la ligne *import $ from 'jquery';* dans *app.js* (ds assets)

Enfin, importer tous mes fichiers js ds app.js (ds assets)
// J'importe tous mes fichiers js
require('jquery');              // Bibliothèque installée ds node_modules
require('popper.js');           // Bibliothèque installée ds node_modules (oui je sais il y a un .js
                                // et pas pour jquery... nique la logique -_-)
require('./bootstrap.min.js');  // Fichier ds assets/js
require('./ad.js');             // Fichier ds assets/js

3. Aller ds base.html.twig et remplacer ces 3 lignes
<script src="/js/jquery.min.js"></script>
<script src="/js/popper.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
par
<script src="{{ asset('build/app.js') }}"></script>

+
Ajouter **{{ encore_entry_link_tags('app') }}** ds le **block steelsheets**
+
Ajouter **{{ encore_entry_script_tags('app') }}** ds le block **javascripts**

(voir doc: https://symfony.com/doc/current/frontend/encore/simple-example.html)

4. npm run build

Attention je n'ai pas importé ad.js donc si je veux réserver une annonce, mon calendrier jQuery ne va pas marcher!
Pour cela, 2 options:
- soit je fais un require('./ad.js'); ds app.js (mais ce fichier sera accessible de partout alors que je ne m'en sers que dans la page de réservation)
- soit je dis que modules (tout le code de webpack est accessible globalement): c'est ce qu'on va faire ci-dessous!


**Pouvoir utiliser jQuery partout (problème des modules de webpack)**
Après maiiiiintes essais... -_- je ne sais pas si tout est utile mais ça marche!

5. ds webpack.config.js décommenter la ligne: *.autoProvidejQuery()* (permet de résoudre les pb avec des plugins jQuery)

6. ds app.js ajouter: *global.$ = global.jQuery = $;* (set $ de jQuery globalement ds mon app)

7. Erreur ds la console: ne trouve pas bootstrap-datepicker (cdn), alors j'ai été chercher le fichier et je l'ai mis ds assets/js puis importé ds app.js: *require('./bootstrap-datepicker.min.js');*

8. erreur '$ not defined' ds book.html.twig ($ de jquery n'est pas reconnu en global!)
ds book.html.twig, ds le block javascripts coller le code:
**{{ encore_entry_script_tags('app') }}**    // Déjà ds le block javascripts de base.html.twig
                                            // (étendu par book.html.twig)
                                            // mais je pense que l'ordre d'inclusion du code n'est pas bon...
                                            // alors je le remets! (tant pis)

{#Appelle app.js pour avoir bootstrap-datepicker.min.js#}
**<script src="{{ asset('build/app.js') }}"></script>**

9. npm run dev


**Créer plusieurs fichiers JS pour optimiser les chargements**
ad.js continet la logique pour créer une annonce (collection de form) et je n'en ai besoin que ds 1 page: templates/ad/new.html.twig.
Pas besoin donc, d'alourdir mon fichier app.js avec cette logique là!
Je préfère faire un fichier à part pour ne l'appeler qu'à l'endroit où j'en ai besoin:

10. ds webpack.config.je créer une entrée: *.addEntry('ad', './assets/js/ad.js')*

11. ds new.html.twig appeler le fichier qui sera compilé (ds block javascripts):
{{ encore_entry_script_tags('app') }}
<script src="{{ asset('build/ad.js') }}"></script>

12. npm run dev ou npm run build



## MISE EN PROD ##
1. Créer un autre depôt Git sur Github et importer le code final de mon appli dessus (les 2 repo doivent êtres publics sinon ça ne marche pas! Remettre private sur Gitlab ensuite et laisser public sur github)

2. Créer un compte sur heroku.com

3. Connecter mon appli sur heroku avec github

4. Autoriser les déploiements automatiques

5. déployer la branche master (il va y avoir des erreurs! c'est normal)






---------------------------------------------------------------------------------------------------------------
SPÉCIFIQUE À L'EXERCICE
---------------------------------------------------------------------------------------------------------------

## FORM_LOGIN ##
On fait le **formulaire de connexion "à la main"** (un formulaire Symfony est trop compliqué pour ce que l'on a à faire).

**Pour récupérer et vérifier les infos envoyées en post via le formulaire, on passe par le fichier de secutité security.yaml, où on définit les verifications dans "firewalls".**

provider: in_database (d'où viennent les données des users?) -> définit plus haut par moi (aurait pu etre toto)
form_login:
    login_path: account_login (nom de la route qui permet de se connecter)
    check_path: account_login (nom de la route où vérifier les données envoyées grâce au formulaire)

Ne pas oublier d'écrire dans twig (ds la balise form):
action ="{{ path('account_login') }}"

**AuthenticationUtils**: classe Symfony qui met à disposition des outils pour la gestion des erreurs sur les formulaires!


## LOGOUT ##
Dans AccountController j'ai une public function logout qui ne fait rien! **Tout est géré ds security.yaml!**

logout:
    path: account_logout (nom de la route qui permet de se déconnecter)
    target: account_login (nom de la route vers laquelle je suis redirigée en cas de déconnexion)


## PASSWORD UPDATE ##
Nous créeons une entité PasswordUpdate mafin d'avoir accès aux classes Symfony et ses validateurs mais nous ne voulons pas que cette entité soit reliée à la BDD.
Pour cela, on supprime toutes les annotations @ORM, la propriété id, ainsi que la méthode getId();

Nous mettons les validateurs (Assert) sur les propriétés que nous avons définies (oldPassword, newPassword et confirmPassword).

**Attention! Puisque nous avons supprimé toutes les annotations faisant référence à l'ORM, PasswordUpdate n'est plus une entité mais une simple classe!** Important lors de la création du formulaire de modification de mdp (PasswordUpdateType), Symfony va me demander à **quelle entité est liée le formulaire... aucune!**

**password_verify()** est une fonction PHP permettant de comparer un mdp en clair et un hash. La fonction va encoder le mdp en clair et si elle obtient le même résultat que le hash qu'on lui passe, elle renvoie true.
Ex: password_verify('mot_de_passe', '$2y$13$e..UHUiW400JUJkZDEB5ju1HPp8ayKvg/miMS.ikEdumt2XNRWsS2');


## BUTTON DELETE ##
**onclick="return confirm('Message de confirmation')"**
Ajouter une fenêtre de confirmation avant suppression (js dans les balises html grace a twig)
<a href="{{ path('ads_delete', {slug: ad.slug}) }}" class="btn btn-danger" onclick="return confirm('Êtes-vous sûr de vouloir supprimer l\'annonce?')">Supprimer l'annonce</a>


## DATETYPE::CLASS ##
**Modifier l'affichage de mon champ DateType de mon formulaire:**
Dans mon FormType, ajouter un tableau d'option pour la classe DateType (["widget" => "single_text"]).
Permet de changer le format en 3 menus déroulants (Month/Day/Year) en 1 menu déroulant + calendrier (jj/mm/aaaa)
Ex: 
public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('startDate', DateType::class, $this->getConfiguration("Date d'arrivée", "La date à laquelle vous comptez arriver", **["widget" => "single_text"]**))
            ->add('endDate', DateType::class, $this->getConfiguration("Date de départ", "La date à laquelle vous quittez les lieux", ["widget" => "single_text"]))
        ;
    }


## FENÊTRE FLASH - ALERT EN PARAMETRE GET ##
Pourquoi faire ça????
Pour que la 1ere fois que je réserve, une fenêtre flash s'affiche me disant que ma réservation a bien été prise en compte.
Si je veux seulement consulter ma réservation (c'est la même page!!!) la fenêtre flash ne s'affichera pas!

**Ds show.html.twig vérifier si j'ai le paramètre withAlert dans mon URL:**
{% if app.request.query.get('withAlert') %}

    Affiche mon alerte (code HTML)

{%% endif}
Pour tester: se rendre sur l'URL *http://localhost:8000/booking/id?withAlert=true*

**Ds BookingController.php passer le paramètre withAlert = true à twig en cas de réservation**
Ds la fct book, au niveau du redirectToRoute:
return $this->redirectToRoute('booking_show', ['id' => $booking->getId(), **'withAlert' => true**]);

Lors de ma redirection sur la route "booking_show" (/booking/{id}), mon paramètre sera automatiquement ajouté par Symfony! et j'obtiendrai ds mon URL: **localhost/booking/id?withAlert=1** (1 ou true c'est pareil!)


## RENDRE LE COMMENTAIRE NON OBLIGATOIRE POUR LA RÉSERVATION ##
Modifier le formulaire **BookingType.php**
->add('comment', TextareaType::class, $this->getConfiguration(false, "Si vous avez un commentaire, n'hésitez pas à en faire part!", **["required" => false]**))




## 🔥🔥🔥 PRENDRE EN COMPTE LES DATES POUR LA DISPONIBILITÉ D'UNE RÉSERVATION 🔥🔥🔥##

1. Créer une **public function isBookableDates()** dans l'entité **Booking.php**
    Transforme les dates choisies et les dates impossibles en string
    Les compares
    Renvoi true ou false

2. Créer une **public function getNotAvailableDays()** dans l'entité **Ad.php**
    Récupère tous les timestamp des jours de l'annonce dans un tableau
    Transforme les timestamp en dateTime (et le renvoi ds un nouveau tableau)
    Stocke ces jours indisponibles ds un tableau $notAvailableDays

3. Créer une **public function getDays()** dans l'entité **Booking.php**
    Récupère tous les timestamp des jours de la réservation dans un tableau
    Transforme les timestamp en dateTime (et le renvoi ds un nouveau tableau)

4. Modifier le **BookingController.php** (fct **book()**)
    Si les dates ne sont pas disponibles: message d'erreur
    Sinon enregistrement et redirection


Note: la fonction range() de PHP créé un tableau qui contient chaque étape existant entre 2 nombres.
Ex: range(int_début, int_fin, step);
    range(10, 20, 2);   // renvoi: [10, 12, 14, 16, 18, 20];


## CHANGER NOTRE CALENDRIER (DU NAVIGATEUR POUR UN CALENDRIER JAVASCRIPT PERSONNALISABLE) ##

Pourquoi faire ça??? Pour indiquer à l'utilisateur quels sont les dates impossibles à réserver sur notre calendrier, ce qui n'est pas possible avec notre calendrier actuel (calendrier du navigateur): on veut installer un calendrier personnalisable et compatible avec bootstrap!

1. Chercher **Bootstrap datepicker uxsolution** sur Google

2. Cliquer sur le lien **bootstrap-datepicker on cdnjs**

3. Copier le lien (**copy link tag**) du fichier **bootstrap-datepicker.min.css**

4. Coller le lien dans le fichier **book.html.twig** (juste sous le bloc title)
    {% block stylesheets %}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css" integrity="sha256-siyOpF/pBWUPgIcQi17TLBkjvNgNQArcmwJB8YvkAgg=" crossorigin="anonymous" />
    {% endblock %}

5. Copier le lien (**copy script tag**) du fichier **bootstrap-datepicker.min.js**

6. Coller le lien dans le fichier **book.html.twig** (peu importe la place, mais on le met tout en bas, sous le block body)
    {% block javascripts %}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js" integrity="sha256-bqVeqGdJ7h/lYPq6xrPv/YGzMEb6dNxlfiTUHSgRCp8=" crossorigin="anonymous"></script>
    {% endblock %}

7. Appeler le calendrier datepicker en surchargeant le bloc javascript (jQuery!)
    <script>
        $(document).ready(function() {
            $('#booking_startDate, #booking_endDate').datepicker({
                format: 'dd/mm/yyyy'    // Met au format de date Français (voir doc datepicker)
            });
        })
    </script>

8. Nous avons maintenant les 2 calendriers sur nos champs! Enlever le calendrier du navigateur: pour cela, aller ds notre formulaire **BookingType.php** et dire que nos champs startDate et endDate ne sont plus des champs de type date mais de type texte! (TextType::class) -> ne pas oublier d'importer la classe et de supprimer le tableau avec le widget en paramètre!

9. Mettre à jour le code dans twig
     <script>
        $(document).ready(function() {
            $('#booking_startDate, #booking_endDate').datepicker({
                format: 'dd/mm/yyyy',
                datesDisabled: [
                    {% for day in ad.notAvailableDays %}
                        "{{ day.format('d/m/Y') }}",
                    {% endfor %}
                ]
            });
        })
    </script>

10. Les jours déjà réservés apparaissent en disabled! Mais ce n'est pas assez visible: copier le selecteur ds l'inspecteur et le coller **ds app.css** puis indiquer la couleur rouge brique (!important car bcp de css enchevêtré...)
    .datepicker table tr td.disabled, .datepicker table tr td.disabled:hover {
    color: firebrick !important;
    }

11. Maintenant je veux qu'on ne puisse pas réserver une date antérieure à aujourd'hui!
Pour cela, il existe une méthode de datepicker appelée startDate: on la met à aujourd'hui... et c'est tout!
    <script>
        $(document).ready(function() {
            $('#booking_startDate, #booking_endDate').datepicker({
                format: 'dd/mm/yyyy',
                datesDisabled: [
                    {% for day in ad.notAvailableDays %}
                        "{{ day.format('d/m/Y') }}",
                    {% endfor %}
                ],
                startDate: new Date()   // Date de réservation minimum: aujourd'hui
            });
        })
    </script>

12. Ça ne va pas marcher!!! On a mis un format de date Français et Symfony ne s'attend pas à recevoir cela! Pour changer ça, nous allons utiliser un dataTransformer!



## COMMENTAIRES À ÉTOILES ##

1. Créer une **entité Comments** dans laquelle il y a une note (rating)

2. **Modifier la fixture** pour que certaines annonces aient un ou plusieurs commentaire(s) avec une **note comprise entre 1 et 5**

3. Importer le **cdn de Font Awesome** dans **base.html.twig**
<script src="https://kit.fontawesome.com/af17135551.js" crossorigin="anonymous"></script>

4. Afficher les étoiles dans **templates/ad/show.html.twig**
 <span class="rating">
    {% for i in 1..5 %}                     // Boucle 5 fois
        {% if i <= comment.rating %}        // Si i <= à la note donnée
            <i class="fas fa-star"></i>     // Affiche une étoile pleine
        {% else %}                          // Sinon affiche une étoile vide
            <i class="far fa-star"></i>
        {% endif %}
    {% endfor %}
</span>


## FACTORISATION DE CE CODE ##

1. Créer un fichier pour regrouper la notation à étoile (rating.html.twig)
Couper le code dans **templates/ad/show.html.twig** et le coller dans **templates/partials/rating.html.twig**
**Attention! Remplacer comment.rating par rating!** Ceci permet d'avoir un code générique qui nous servira pour différentes notations

2. Appeler la notation à étoiles dans **templates/ad/show.html.twig** et ne pas oublier de dire à twig que rating = comment.rating sinon bug!
{% include 'partials/rating.html.twig' *with {'rating': comment.rating}* %}


## PENSE BÊTE ##
Si je créé une public function getAvgRatings() dans mon entité Ad, je peux l'appeler ds mon templates/ad/show.html.twig en faisant {% include 'partials/rating.html.twig' with {'rating': **ad.avgRatings**} %}
**Appelle la fct getAvgRatings()**


## ANCRE DIRECTEMENT DANS L'URL ##
Ds **bookings.html.twig**
<a href="{{ path("booking_show", {id: booking.id}) }}#comment">Je donne mon avis!</a>

+ Ajout d'un id "comment" sur la div du formulaire
Ce lien m'emmène directement sur la page d'une réservation au niveau du formulaire de commentaire!
http://localhost:8000/booking/id#comment


## METTRE DES ICONES DANS TWIG ##

1. Ajouter le cdn de font awesome dans 'base.html.twig'

2. Appeler une icone (balise i + classe qui va bien)



## RENDRE LE SITE RESPONSIVE ##

1. Ds base.html.twig, ajouter une balise meta sous le title
<meta name="viewport" content="width=device-width, user-scalable=no">
// viewport: explique au terminal qui affiche le site comment il doit se comporter
// width-device-width: le contenu doit faire la largeur de l'écran
// user-scalable-no: le user ne peu pas zoomer


## ACL (SECURISER LES ROUTES AVEC LE ROLE ADMIN) ##
Ds le fichier config/packages/security.yaml, décommenter 1 ligne:
access_control:
        - { path: ^/admin/login, roles: IS_AUTHENTICATED_ANONYMOUSLY } // **Rajouter cette ligne pour que les users puissent avoir accès au formulaire de login admin!**
        - { path: ^/admin, roles: ROLE_ADMIN }  //**Décommenter ici!**
        # - { path: ^/profile, roles: ROLE_USER }


## CRÉATION D'UN FIREWALL ADMIN ##
**Attention à l'ordre des forewalls! Symfony lit le code de haut en bas, il faut donc mettre les firewalls les plus restrictifs en haut et les plus permissifs en bas! Sinon tout passe!**
Ds security.yaml, ajouter un firewall ENTRE dev et main:

firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false

        admin:
            pattern: ^/admin                // Toutes les URL commençant par admin
            anonymous: true                 // Les anonymes (pers. non connectées) peuvent aller sur ce
                                               firewall (/admin/login: tout le monde a accès au form de
                                               login admin)

            provider: in_database           // D'où proviennent les données des users?     

            form_login:                              // Formulaire de connexion admin (différent du front!!!)
                login_path: admin_account_login      // Chemin (route) du form de login admin
                check_path: account_login            // Route pour la vérification des infos du form de login
            
            logout:                         // Formulaire de déconnexion
                path: admin_account_logout  // Route du form logout admin
                target: homepage            // Route sur laquelle on nous redirige une fois déconnecté

        main: ...


# GROS PROBLÈME!!! #
Ds security.yaml???

Quand je tape: /admin/ads
je suis redirigée vers /admin/ads (compte admin connecté) au lieu du formulaire de login admin!

Quand je tape: /admin/login
Je vais bien sur mon form de login admin mais quand je soumets le form,
je suis redirigée vers la page d'accueil et non /admin/ads (compte admin connecté)! ou vers login.html.twwig (admin)
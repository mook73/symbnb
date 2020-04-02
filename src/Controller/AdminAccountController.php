<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class AdminAccountController extends AbstractController
{
    /**
     * @Route("/admin/login", name="admin_account_login")
     */
    public function login(AuthenticationUtils $utils)
    {
        $error = $utils->getLastAuthenticationError(); // null ou objet contenant l'erreur
        $username = $utils->getLastUsername(); // permet de ne pas retaper l'email en cas d'erreur

        return $this->render('admin/account/login.html.twig', [
            'hasError' => $error !== null, // true ou false (est-ce que hasError est différent de null?)
            'username' => $username
        ]);
    }

    /**
     * Permet de se déconnecter
     * 
     * @Route("/admin/logout", name="admin_account_logout")
     * 
     * @return void
     */
    public function logout() {
        // Rien... géré ds security.yaml
    }
}

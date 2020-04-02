<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\AdminUserType;
use App\Service\PaginationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminUserController extends AbstractController
{
    /**
     * Permet d'afficher la liste des utilisateurs
     * 
     * @Route("/admin/users/{page<\d+>?1}", name="admin_user_index")
     */
    public function index($page, PaginationService $pagination)
    {
        $pagination->setEntityClass(User::class)
                   ->setLimit(5)
                   ->setPage($page);

        return $this->render('admin/user/index.html.twig', [
            'pagination' => $pagination
        ]);
    }

    /**
     * Permet de modifier un utilisateur
     * 
     * @Route("/admin/users/{id}/edit", name="admin_user_edit")
     */
    public function edit(User $user, Request $request, EntityManagerInterface $manager) {
        $form = $this->createForm(AdminUserType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $manager->persist($user);
            $manager->flush();

            $this->addFlash(
                'success',
                "L'utilisateur' <strong>{$user->getFullName()}</strong> a bien été modifié!"
            );

            return $this->redirectToRoute('admin_user_index');
        }

        return $this->render('admin/user/edit.html.twig', [
            'user' => $user,
            'form' => $form->createView()
        ]);
    }

    /**
     * Permet de supprimer un utilisateur
     * 
     * @Route("admin/users/{id}/delete", name="admin_user_delete")
     */
    public function delete(User $user, EntityManagerInterface $manager) {
        if (count($user->getAds()) > 0) {
            $this->addFlash(
                'warning',
                "Vous ne pouvez pas supprimer l'utilisateur <strong>{$user->getFullName()}</strong> car il a déjà posté au moins une annonce!"
            );

        } elseif (count($user->getBookings()) > 0) {
            $this->addFlash(
                'warning',
                "Vous ne pouvez pas supprimer l'utilisateur <strong>{$user->getFullName()}</strong> car il a déjà fait une réservation!"
            );

        } else {
            $manager->remove($user);
            $manager->flush();
    
            $this->addFlash(
                'success',
                "L'utilisateur <strong>{$user->getFullName()}</strong> a bien été supprimé!"
            );
        }

        return $this->redirectToRoute('admin_user_index');
    }
}

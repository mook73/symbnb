<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Form\AdminBookingType;
use App\Service\PaginationService;
use App\Repository\BookingRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminBookingController extends AbstractController
{
    /**
     * Permet d'afficher la liste des réservations
     * 
     * @Route("/admin/bookings/{page<\d+>?1}", name="admin_booking_index")
     * 
     * @param BookingRepository $repo
     */
    public function index($page, PaginationService $pagination)
    {
        $pagination->setEntityClass(Booking::class)
                   ->setPage($page);

        return $this->render('admin/booking/index.html.twig', [
            'pagination' => $pagination
        ]);
    }

    /**
     * Permet de modifier une réservation
     * 
     * @Route("/admin/bookings/{id}/edit", name="admin_booking_edit")
     * 
     * @param Booking $booking
     * @param Request $request
     * @param EntityManagerInterface $manager
     * 
     * @return Response
     */
    public function edit(Booking $booking, Request $request, EntityManagerInterface $manager) {
        $form = $this->createForm(AdminBookingType::class, $booking);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $booking->setAmount(0); // Recalcule le prix global quand je modifie la réservation
                                    // Si 0, recalculé ds l'entité (fct prePersist qui se lance sur le cycle de vie preUpdate)

            $manager->persist($booking);
            $manager->flush();

            $this->addFlash(
                'success',
                "La réservation n°{$booking->getId()} a bien été modifiée!"
            );

            return $this->redirectToRoute('admin_booking_index');
        }

        return $this->render('admin/booking/edit.html.twig', [
            'booking' => $booking,
            'form' => $form->createView()
        ]);
    }

    /**
     * Permet de supprimer une réservation
     * 
     *@Route("/admin/bookings/{id}/delete", name="admin_booking_delete")
     *
     * @return Response
     */
    public function delete(Booking $booking, EntityManagerInterface $manager) {
        $manager->remove($booking);
        $manager->flush();

        $this->addFlash(
            'success',
            "La réservation a bien été supprimée!"
        );

        return $this->redirectToRoute("admin_booking_index");
    }
}

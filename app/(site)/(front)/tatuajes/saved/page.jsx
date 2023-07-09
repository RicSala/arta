import EmptyState from "@/components/EmptyState"
import ListingGrid from "@/components/listings/ListingGrid"
import { getCurrentUser } from "@/actions/getCurrentUser"
import { getSavedTattoosByUserId } from "@/actions/getSavedTattoosByUserId"
import Container from "@/components/Container"

export default async function SavedArtistsPage() {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title="No estás autorizado. Por favor, loguéate" />
        )
    }

    const tattoos = await getSavedTattoosByUserId(currentUser.id)

    if (tattoos.length < 1) {
        return (
            <EmptyState title="No tienes ningún tatuaje guardado"
                subtitle="Guarda tatuajes para inspirarte y poder verlos más tarde"
            />
        )
    }


    return (

        <Container>
            <ListingGrid listings={tattoos} currentUser={currentUser}
                listingType="tattoos"
            />
        </Container>

    )
}


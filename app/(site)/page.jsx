import { getArtist } from '@/actions/getArtists'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { getFavoriteTattooIdsOfUser } from '@/actions/getFavoriteTattooIdsOfUser'
import getTattoos from '@/actions/getTattoos'
import Container from '@/components/Container'
import ArtistGrid from '@/components/listings/ArtistGrid'
import ListingCard from '@/components/listings/ListingCard'
import ListingGrid from '@/components/listings/ListingGrid'
import Image from 'next/image'

//TODO:
// SITEMAP
// ROBOTS.TXT

export default async function Home() {

    const tattoos = await getTattoos()
    const artist = await getArtist()
    const currentUser = await getCurrentUser()

    const actionLabel = "Editar"

    return (

        <Container>
            <h2>Tatuajes</h2>
            <ArtistGrid>
                {tattoos.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        listingType={"tattoos"}
                        // reservation={ }
                        // fn={() => { }}
                        actionLabel={actionLabel || undefined}
                        // onSecondaryAction={() => { }}
                        // secondaryActionLabel={secondaryActionLabel || undefined}
                        disabled={false}
                        actionId={listing.id}
                        currentUser={currentUser}
                    />
                ))}


            </ArtistGrid>

            <h2 className='mt-20'>Tatuadores</h2>
            <ArtistGrid>
                {artist.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        listingType={"artists"}
                        // reservation={ }
                        // fn={() => { }}
                        actionLabel={""}
                        // onSecondaryAction={() => { }}
                        // secondaryActionLabel={secondaryActionLabel || undefined}
                        disabled={false}
                        actionId={listing.id}
                        currentUser={currentUser}
                    />
                ))}
            </ArtistGrid>

        </Container>
    )
}

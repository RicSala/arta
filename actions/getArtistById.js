import prisma from "@/libs/prismadb";


// given an artist id, the profile, including the artist user data
export async function getArtistById(artistId) {

    try {

        const artist = await prisma.artistProfile.findUnique({
            where: {
                id: artistId,
            },
            include: {
                user: true,
            }
        });

        if (!artist) {
            return null;
        }

        return artist

    }
    catch (error) {
        console.log("error", error)
        return null;
    }
}
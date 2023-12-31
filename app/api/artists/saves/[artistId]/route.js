import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(request, { params }) {

    const currentUser = await getCurrentUser(request);

    if (!currentUser) {
        return NextResponse.error()
    }


    const { artistId } = params

    if (!artistId || typeof artistId !== 'string') {
        throw new Error('Invalid ID')
    }

    // add an entry to the collections SavedArtist
    const savedArtist = await prisma.savedArtist.create({
        data: {
            artistProfile: { // the object to connect
                connect: {
                    id: artistId //they key to connect by
                }
            },
            user: {
                connect: {
                    id: currentUser.id
                }
            }
        }
    })



    return NextResponse.json({ savedArtist }, { status: 201 })
}

export async function DELETE(request, { params }) {

    const currentUser = await getCurrentUser(request);

    if (!currentUser) {
        return NextResponse.error()
    }

    const { artistId } = params

    if (!artistId || typeof artistId !== 'string') {
        throw new Error('Invalid ID')
    }

    // remove an entry from the collections SavedArtist
    const deletedArtist = await prisma.savedArtist.deleteMany({
        where: {
            artistProfileId: artistId,
            userId: currentUser.id
        }
    })


    return NextResponse.json({ deletedArtist }, { status: 201 })
}
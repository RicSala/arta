'use client'

import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";


import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import Image from "next/image";
import ImageUploadControlled2 from "@/components/inputs/ImageUploadControlled2";
import CustomAsyncSelect from "@/components/inputs/AsyncSelect";
import { DevTool } from "@hookform/devtools";
import CustomSelect from "@/components/CustomSelect";

// Not sure I want to use this
const inputFields = [
    { id: 'artisticName', label: 'Nombre artistico', required: true },
    { id: 'email', type: 'email', label: 'Email', required: 'Campo requerido' },
    { id: 'bio', label: 'Bio', required: 'Campo requerido', validation: { maxLength: { value: 500, message: "Máximo 500 caracteres" } } },
    { id: 'minWorkPrice', label: 'Precio mínimo', required: 'Campo requerido', formatPrice: true },
    { id: 'pricePerHour', label: 'Precio por hora', required: 'Campo requerido', formatPrice: true },
    { id: 'pricePerSession', label: 'Precio por sesion', required: 'Campo requerido', formatPrice: true },
    { id: 'facebook', label: 'Facebook' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'tiktok', label: 'Tiktok' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'website', label: 'Website' },
    { id: 'youtube', label: 'Youtube' },
    { id: 'phone', label: 'Telefono' },
];

const ProfilePageClient = ({
    artist,
    styles,
}) => {

    const [isLoading, setIsLoading] = useState(false)

    const { setError, clearErrors, control, register, handleSubmit, setValue, getValues, values,

        trigger, watch, reset, formState: { errors } } = useForm({

            defaultValues: {
                artisticName: artist.artisticName || "",
                email: artist.email || "",
                bio: artist.bio || "",
                city: artist.city || "",
                images: artist.images || [],
                mainImage: artist.mainImage || "",
                styles: artist.styles || "",
                minWorkPrice: artist.minWorkPrice || null,
                phone: artist.phone || "",
                pricePerHour: artist.pricePerHour || null,
                pricePerSession: artist.pricePerSession || null,
                facebook: artist.facebook || "",
                instagram: artist.instagram || "",
                tiktok: artist.tiktok || "",
                twitter: artist.twitter || "",
                website: artist.website || "",
                youtube: artist.youtube || "",

            }
        })

    console.log("artist", artist)

    const onSubmit = async (data) => {

        console.log("data", data)


        setIsLoading(true)

        axios.put(`/api/artists/${artist.id}`, data)
            .then(res => {
                toast.success("Profile updated")
            })
            .catch(err => {
                console.log(err)
                toast.error("Error updating profile")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const onError = (errors, e) => {
        toast.error("Por favor, revisar el formulario")
    };



    return (
        <>

            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <>


                    <Input
                        id="artisticName"
                        label="Nombre artistico"
                        disable={isLoading}
                        errors={errors}
                        required
                        register={register}
                    />

                    <Input
                        id="email"
                        type="email"
                        label="Email"
                        disable={isLoading}
                        errors={errors}
                        required='Campo requerido'
                        register={register}
                    />
                    <Input
                        id="bio"
                        label="Bio"
                        disable={isLoading}
                        errors={errors}
                        required='Campo requerido'
                        validation={{
                            maxLength: { value: 500, message: "Máximo 500 caracteres" }
                        }}
                        register={register}
                    />

                    <Input
                        id="minWorkPrice"
                        label="Precio mínimo"
                        disable={isLoading}
                        errors={errors}
                        required='Campo requerido'
                        register={register}
                        formatPrice
                    />

                    <Input
                        id="pricePerHour"
                        label="Precio por hora"
                        disable={isLoading}
                        errors={errors}
                        required='Campo requerido'
                        register={register}
                        formatPrice
                    />

                    <Input
                        id="pricePerSession"
                        label="Precio por sesion"
                        disable={isLoading}
                        errors={errors}
                        required='Campo requerido'
                        register={register}
                        formatPrice
                    />


                    {/* SOCIAL PROFILES */}

                    <Input
                        id="facebook"
                        label="Facebook"
                        disable={isLoading}
                        errors={errors}
                        register={register}
                    />

                    <Input
                        id="instagram"
                        label="Instagram"
                        disable={isLoading}
                        errors={errors}
                        register={register}
                    />

                    <Input
                        id="tiktok"
                        label="Tiktok"
                        disable={isLoading}
                        errors={errors}
                        register={register}
                    />

                    <Input
                        id="twitter"
                        label="Twitter"
                        disable={isLoading}
                        errors={errors}
                        register={register}
                    />

                    <Input
                        id="website"
                        label="Website"
                        disable={isLoading}
                        errors={errors}
                        register={register}
                    />

                    <Input
                        id="youtube"
                        label="Youtube"
                        disable={isLoading}
                        errors={errors}
                        register={register}
                    />

                    <Input
                        id="phone"
                        label="Telefono"
                        disable={isLoading}
                        errors={errors}
                        register={register}
                    />

                </>

                {/* <Controller
                    name="location"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field }) =>
                        <CustomSelect
                            field={field} options={cities}
                        />}
                />

                {
                    errors.mainImage &&
                    <div className="text-red-500">
                        {errors.mainImage.message}
                    </div>
                } */}


                <ImageUploadControlled2
                    control={control}
                    maxFiles={1}
                    name="mainImage"
                    trigger={trigger}
                    errors={errors}
                    rules={{ required: 'Campo requerido' }}
                />

                {/* keep it for now just in case the controlled one breaks */}
                <>
                    {/* <Controller
                    name="mainImage"
                    control={control}
                    rules={{
                        required: 'Campo requerido',
                    }}
                    render={({ field }) =>
                        <ImageUploadControlled
                            maxFiles={1}
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                trigger('mainImage'); // trigger validation for the field
                            }}
                            onBlur={field.onBlur}
                        />}
                /> */}

                    {/* <Controller
                    name="images"
                    control={control}
                    rules={{
                        required: 'Campo requerido',
                        // min length of the array is 3
                        validate: (value) => value.length >= 3 || "Mínimo 3 imágenes"
                    }}
                    render={({ field }) =>
                        <ImageUploadControlled
                            maxFiles={3}
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                trigger('images'); // trigger validation for the field
                            }}
                            onBlur={field.onBlur}
                        />}
                /> */}

                </>
                {
                    getValues("mainImage") &&
                    <div>
                        <div className="relative inline-block">
                            <Image src={getValues("mainImage")} alt="image" width={100} height={100}
                                style={{ width: 'auto' }}


                            />
                            <div
                                onClick={() => {
                                    const imageToDelete = getValues("mainImage")
                                    setValue("mainImage", null, {
                                        shouldValidate: true,
                                        shouldDirty: true
                                    })
                                    axios.delete(`/api/images/${imageToDelete.split("/").pop().split(".")[0]}`)

                                }
                                }
                                className="absolute right-1 top-1 cursor-pointer">
                                x
                            </div>
                        </div>
                    </div>}







                {
                    errors.images &&
                    <div className="text-red-500">
                        {errors.images.message}
                    </div>
                }

                <ImageUploadControlled2
                    control={control}
                    maxFiles={3}
                    name="images"
                    trigger={trigger}
                    errors={errors}
                    rules={{
                        // at least 3 images required
                        validate: (value) => value.length >= 3 || "Mínimo 3 imágenes"
                    }}
                />


                {
                    getValues("images") &&
                    <div>
                        {
                            getValues("images").map(image => {
                                return (

                                    <div key={image} className="relative inline-block">
                                        <Image src={image} alt="image" width={100} height={100}
                                            style={{ width: 'auto', height: '100%' }}


                                        //REVIEW: Curiously enought the warning in images only happen in none square images!
                                        />
                                        <div
                                            onClick={() => {
                                                const imageToDelete = image
                                                setValue("images",
                                                    getValues("images").filter(image => image !== imageToDelete)
                                                    , {
                                                        shouldValidate: true,
                                                        shouldDirty: true
                                                    })
                                                axios.delete(`/api/images/${imageToDelete.split("/").pop().split(".")[0]}`)

                                            }
                                            }
                                            className="absolute right-1 top-1 cursor-pointer">
                                            x
                                        </div>
                                    </div>


                                )

                            })
                        }

                    </div>
                }







                {
                    errors.styles &&
                    <div className="text-red-500">
                        {errors.styles.message}
                    </div>

                }

                {/* <Controller
                    name="styles"
                    control={control}
                    rules={{
                        required: true,
                        // max lenth of the array is 3
                        validate: (value) => value.length <= 3 || "Máximo 3 estilos"
                    }}
                    render={({ field }) =>
                        <CustomSelect
                            isMulti
                            field={field} options={estilos}
                        />}
                /> */}

                <Controller
                    name="city"
                    control={control}
                    rules={{
                        required: 'Campo requerido',
                    }}
                    render={({ field }) =>
                        <CustomAsyncSelect
                            resources="cities"
                            field={field}
                        />
                    } />


                <Controller
                    name="styles"
                    control={control}
                    rules={{
                        required: "Debes seleccionar un estilo",
                        // max lenth of the array is 3
                        validate: (value) => value.length <= 3 || "Máximo 3 estilos"
                    }}
                    render={({ field }) =>
                        <CustomSelect
                            isMulti={true}
                            // The next three lines are the same as doing: ...field
                            // value={field.value}
                            // onChange={(option) => field.onChange(option)}
                            // onBlur={field.onBlur}
                            options={styles}
                            field={field}
                        />} />

                <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                    Save
                </Button>


            </form>

            <DevTool control={control} /> {/* set up the dev tool */}



        </>
    )

}

export default ProfilePageClient;


"use client";
import { MainSearchModel, mainSearchSchema } from '@/schema/main-search-schema';
import { objectToQueryString } from '@/utils/objectToQueryString';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import MainSearchForm from './MainSearchForm';
import SideSearchForm from './SideSearchForm';

const defaultValue: MainSearchModel = {
    adType: "Buy",
    state: "",
    township: "",
    propertyType: "",
    minPrice: 0,
    maxPrice: 100000
}

type Props = {
    mode: "side" | "main",
    locations: Array<{ label: string, value: string, townships: Array<{ label: string, value: string }> }>,
    propertyTypes: Array<{ label: string, value: string }>,
}

const GenericForm: React.FC<Props> = ({ mode = "main", locations, propertyTypes }) => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: defaultValue,
        resolver: zodResolver(mainSearchSchema),
    });

    const submitHandler: SubmitHandler<MainSearchModel> = (data) => {
        const query = objectToQueryString(data);
        router.push("/properties?" + query);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} noValidate>
            {mode === "main" && <MainSearchForm errors={errors} locations={locations} propertyTypes={propertyTypes} register={register} watch={watch} />}
            {mode === "side" && <SideSearchForm errors={errors} locations={locations} propertyTypes={propertyTypes} register={register} watch={watch} />}
        </form>
    )
}

export default GenericForm;